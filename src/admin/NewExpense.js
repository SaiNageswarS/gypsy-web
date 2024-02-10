import './Admin.css';
import * as React from 'react';
import dayjs from 'dayjs';

import {
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
    Button,
    Grid,
    Checkbox,
    IconButton,
} from '@mui/material';
import { SaveExpense } from '../repo/ExpensesRepo';

import { useNavigate } from 'react-router-dom';

function NewExpense({ loggedInUser }) {
    if (loggedInUser === null || loggedInUser === undefined || loggedInUser.isAdmin === false) {
        return (
            <div className="Admin">
                <h1>Admin</h1>
                <p>You must be an admin to view this page.</p>
            </div>
        );
    }

    return (
        <div className="NewBooking">
            <h1>New Expense</h1>
            <NewExpenseForm loggedInUser={loggedInUser} />
        </div>
    );
}

function NewExpenseForm({ loggedInUser }) {
    const [formData, setFormData] = React.useState({
        date: dayjs().format('YYYY-MM-DD'),
        amount: 0,
        description: '',
        cashier: loggedInUser['displayName'],
    });

    const navigate = useNavigate();

    function handleSave() {
        SaveExpense(formData).then(() => {
            // navigate back to the cash sheet
            navigate(-1);
        });
    }

    return (
        <div className="NewExpenseForm">
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        id="amount"
                        label="Amount"
                        type="number"
                        value={formData.amount}
                        fullWidth
                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Select
                        id="description"
                        value={formData.description}
                        fullWidth
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    >
                        <MenuItem value="House Keeping">House Keeping</MenuItem>
                        <MenuItem value="Grocery">Grocery</MenuItem>
                        <MenuItem value="Electricity">Electricity</MenuItem>
                        <MenuItem value="Water">Water</MenuItem>
                        <MenuItem value="Gas">Gas</MenuItem>
                        <MenuItem value="Internet">Internet</MenuItem>
                        <MenuItem value="Building Lease">Building Lease</MenuItem>
                        <MenuItem value="Building Maintenance">Building Maintenance</MenuItem>
                        <MenuItem value="Account Transfer">Account Transfer</MenuItem>
                        <MenuItem value="Misc">Misc</MenuItem>
                    </Select>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={handleSave} variant='contained' color='primary' fullWidth>Save</Button>
                </Grid>
                <Grid item xs={6}>
                    <Button onClick={() => navigate(-1)} variant='contained' color='secondary' fullWidth>
                        Cancel</Button>
                </Grid>
            </Grid>
        </div>
    );
}

export default NewExpense;
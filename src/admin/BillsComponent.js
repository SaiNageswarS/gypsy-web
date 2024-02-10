import * as React from 'react';

import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import dayjs from 'dayjs';

import {
    TextField,
    Select,
    Button,
    IconButton,
    Dialog,
    DialogContent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
    MenuItem,
    FormControl,
    InputLabel,
} from '@mui/material';

function BillsComponent({ loggedInUser, bills, setBills }) {
    const [isDialogOpen, setDialogOpen] = React.useState(false);

    function handleAmntEdit(idx, newAmnt) {
        var newBills = [...bills];
        newBills[idx].amount = newAmnt;
        setBills(newBills);
    }

    function deleteBill(idx) {
        var newBills = [...bills];
        newBills.splice(idx, 1);
        setBills(newBills);
    }

    function handleAddBill() {
        setDialogOpen(true);
    }

    return (
        <div className="Bills" style={{ width: '100%' }}>
            <NewBillDialog
                loggedInUser={loggedInUser}
                bills={bills}
                setBills={setBills}
                isDialogOpen={isDialogOpen}
                setDialogOpen={setDialogOpen} />
            <h1>
                Bills &nbsp;
                <IconButton
                    onClick={() => handleAddBill()}
                    style={{ backgroundColor: 'green', color: 'white' }}
                    aria-label="Add">
                    <AddIcon />
                </IconButton>
            </h1>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Amount</TableCell>
                            <TableCell>By</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {bills.map((bill, idx) => {
                            return (
                                <TableRow key={idx}>
                                    <TableCell>{bill.date}</TableCell>
                                    <TableCell>{bill.description}</TableCell>
                                    <TableCell>{bill.amount}</TableCell>
                                    <TableCell>{bill.cashier}</TableCell>
                                    <TableCell>
                                        <IconButton aria-label="delete" onClick={() => { deleteBill(idx) }}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

function NewBillDialog({ loggedInUser, bills, setBills, isDialogOpen, setDialogOpen }) {
    const [newBill, setNewBill] = React.useState({
        amount: 0,
        description: 'Room Rent',
        date: dayjs().format('DD-MMM-YYYY'),
        cashier: loggedInUser['displayName'],
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBill((prevData) => ({ ...prevData, [name]: value }));
    };

    const appendNewBill = (e) => {
        e.preventDefault();

        if (newBill.description === 'Credit' && newBill.amount > 0) {
            newBill.amount = -newBill.amount;
        }

        var newBills = [...bills];
        newBills.push(newBill);
        setBills(newBills);

        setDialogOpen(false);
    }

    return (
        <Dialog open={isDialogOpen} onClose={() => setDialogOpen(false)} fullScreen>
            <DialogContent>
                <h1>New Bill</h1>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={12}>
                            <FormControl fullWidth>
                                <InputLabel>Description</InputLabel>
                                <Select
                                    name='description'
                                    onChange={handleInputChange}
                                    value={newBill.description}>
                                    <MenuItem value="Room Rent">Room Rent</MenuItem>
                                    <MenuItem value="Food">Food</MenuItem>
                                    <MenuItem value="Laundry">Laundry</MenuItem>
                                    <MenuItem value="Taxi Profit">Taxi Profit</MenuItem>
                                    <MenuItem value="Exchange Profit">Exchange Profit</MenuItem>
                                    <MenuItem value="Sor Profit">Sor Profit</MenuItem>
                                    <MenuItem value="Early CheckIn">Early CheckIn</MenuItem>
                                    <MenuItem value="Late Checkout">Late CheckOut</MenuItem>
                                    <MenuItem value="Credit">Credit</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} md={12}>
                            <TextField
                                label="Amount"
                                name="amount"
                                type='number'
                                value={newBill.amount}
                                onChange={handleInputChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={6} md={6}>
                            <Button
                                onClick={appendNewBill}
                                variant='contained'
                                color='primary'
                                fullWidth>
                                Submit
                            </Button>
                        </Grid>
                        <Grid item xs={6} md={6}>
                            <Button
                                variant='contained'
                                color='secondary'
                                onClick={() => setDialogOpen(false)}
                                fullWidth>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </DialogContent>
        </Dialog>
    );
}

export default BillsComponent;
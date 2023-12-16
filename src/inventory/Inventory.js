import { useSearchParams } from 'react-router-dom';

function Inventory() {
    const [searchParams] = useSearchParams();
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    return (
        <div className="Inventory">
            Searching rooms from {startDate} to {endDate}.
        </div>
    );
}

export default Inventory;
import './FilterStyle.css';

const DisputeTypeFilter = (props:any) => {

    //Dispute Type Filter 
    const filterDispute = (e: any) => {
        const updateSupervisorData = props.data.filter((curElem:any) => {
            return curElem.dispute_type === e;
        })
        props.setData(updateSupervisorData);
    }

    return (
        <>
            <select className="selectFilter">
                <option onClick={() => props.setData(props.data)}>All Dispute Types</option>
                <option onClick={() => filterDispute("Day")}>Day</option>
                <option onClick={() => filterDispute("Week")}>Week</option>
                <option onClick={() => filterDispute("Pay Period")}>Pay Period</option>
            </select>
        </>
    );

}

export default DisputeTypeFilter;

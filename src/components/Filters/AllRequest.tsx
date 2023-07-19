
import { I2cSelect, I2cMenuItem } from '@webcomponents/i2cwebcomponents/dist/react';

const AllRequest = (props: any) => {

    const filterRequest = (e: any) => {
        if (e.target.__value === "All Request") {
            props.setData(props.data)
        } else {
            const filterRequestData = props.data.filter((curElem: any) => {
                return curElem.status === e.target.__value;
            })
            props.setData(filterRequestData);
        }
    }

    return (
        <>
            <I2cSelect className="selectFilter" size="medium" placeholder="All Request" onI2cChange={filterRequest}>
                <I2cMenuItem value="All Request">All Request</I2cMenuItem>
                <I2cMenuItem value="Pending">Pending</I2cMenuItem>
                <I2cMenuItem value="Approved">Approved</I2cMenuItem>
                <I2cMenuItem value="Reject">Reject</I2cMenuItem>
            </I2cSelect>
        </>
    );

}

export default AllRequest;

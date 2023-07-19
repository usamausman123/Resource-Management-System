import {  I2cMenuItem,  I2cSelect,} from "@webcomponents/i2cwebcomponents/dist/react";

const TimeOffRequest = (props:any) => {
    //Dispute Type Filter 
    const filterRequest = (e: any) => {
        if(e.target.__value === "All Request"){
            props.setData(props.data)
        }else{
            const filterRequestData = props.data.filter((curElem:any) => {
                return curElem.Request_type === e.target.__value;
            })
            props.setData(filterRequestData);
        }
    }

    return (
        <>
            <I2cSelect className="selectFilter" size="medium" placeholder="All Request" onI2cChange={filterRequest}>
             <I2cMenuItem value="All Request">All Request</I2cMenuItem>
             <I2cMenuItem value="Paid Time Off">Paid Time Off</I2cMenuItem>
             <I2cMenuItem value="Unpaid Time Off">Unpaid Time Off</I2cMenuItem>
           </I2cSelect>
        </>
    );

}

export default TimeOffRequest;

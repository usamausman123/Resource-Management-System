import { useState } from "react";
import classes from "../Occurrence.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  I2cButton,
  I2cInput,
  I2cMenuItem,
  I2cSelect,
} from "@webcomponents/i2cwebcomponents/dist/react";
import "../../../commonStyle.css";
import Select from "react-select";


const NCNS = () => {
  const [id, setId] = useState("NCNS (No Call No Show)");
  const [endOcc, setEndOcc] = useState("");

  const NcscformData = { id: "", endOcc: "" };

  const handleNCSCSubmit = (event: any) => {
    event.preventDefault();
    NcscformData.id = id;
    NcscformData.endOcc = endOcc;
    console.log(NcscformData);
    alert("submitted");
  };

  const shiftCategory: any = [
    { value: "NCNS (No Call No Show)", label: "NCNS (No Call No Show)" },
    { value: "Unapproved Absent", label: "Unapproved Absent" },
    
  ];

  return (
    <div className={classes.content}>
      <div className={classes.tabHeader}>
        <h3>NCNS/Unapproved Absence</h3>
        <p>
          The No call no show/unapproved absence policy for employees states
          that if he miss a scheduled shift without notice or rejected approvals
        </p>
      </div>

      <form onSubmit={handleNCSCSubmit}>
        
          <div className={`${classes.ncns} mb-5`}>
            <div className={classes.ncnsField1}>
              <label>Occurence ID/Name</label>
              <Select
                className='custom-select'
                options={shiftCategory}
                isSearchable={false}
                defaultValue={shiftCategory[0]}
              />
            
            </div>

            <div className={`${classes.startRadioOccurence} ${classes.ncnsOcc}`}>
              <span>pt</span>
              <I2cInput label="Occurrence" className={classes.occurrencInput} value={endOcc} onI2cChange={(event: any) => setEndOcc(event.target.value)} placeholder='0' />
            </div>
          </div>
        
        <div className={`${classes.occLateButtons} ${classes.ncnsButtons}`}>
          <I2cButton variant="default">Cancel</I2cButton>
          <I2cButton type="submit" variant="primary">
            Save
          </I2cButton>
        </div>
      </form>
    </div>
  );
};

export default NCNS;

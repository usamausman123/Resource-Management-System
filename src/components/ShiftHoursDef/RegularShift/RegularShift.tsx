import { I2cButton } from "@webcomponents/i2cwebcomponents/dist/react";
import { useState } from "react";
import NotSameDay from "../NotSameDay/NotSameDay";
import SameDay from "../SameDay/SameDay";
import '../../../commonStyle.css'


import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import classes from "../ShiftHourDef.module.css"


const RegularShift = () => {
  // Date States
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  // Toggle States
  const [sameEdToggle, setSameEdToggle] = useState(1);
  const [customDateToggle, setCustomdateToggle] = useState(0);

  // Toggle Functionality
  let sameEdToggleChecked: boolean = true;
  let customDateToggleChecked: boolean = true;
  if (sameEdToggle === 1) {
    sameEdToggleChecked = true;
  } else {
    sameEdToggleChecked = false;
  }
  if (customDateToggle === 1) {
    customDateToggleChecked = true;
  } else {
    customDateToggleChecked = false;
  }

  // Toggles
  const SameEverydayToggle = () => {
    return (
      <>
        <label className={classes.switch}>
          <input
            type="checkbox"
            onChange={() => {
              sameEdToggle === 1 ? setSameEdToggle(0) : setSameEdToggle(1);
              setCustomdateToggle(0);
            }}
            checked={sameEdToggleChecked}
          />
          <span className={`${classes.slider} ${classes.round}`}></span>
        </label>
      </>
    );
  };
  const CustomDatesToggle = () => {
    return (
      <>
        <label className={classes.switch}>
          <input
            type="checkbox"
            onChange={() => {
              customDateToggle === 1
                ? setCustomdateToggle(0)
                : setCustomdateToggle(1);
            }}
            checked={customDateToggleChecked}
          />
          <span className={`${classes.slider} ${classes.round}`}></span>
        </label>
        <span className={classes.switchText}>Custom Dates</span>
      </>
    );
  };

  let days = [
    {
        id:0,
        day:'mon',
        abv:'Mo',
        startTime:'',
        endtime:''
    },
    {
        id:1,
        day:'tue',
        abv:'Tu',
        startTime:'',
        endtime:''
    },
    {
        id:2,
        day:'wed',
        abv:'We',
        startTime:'',
        endtime:''
    },
    {
        id:3,
        day:'thu',
        abv:'Th',
        startTime:'',
        endtime:''
    },
    {
        id:4,
        day:'fri',
        abv:'Fr',
        startTime:'',
        endtime:''
    },
    {
        id:5,
        day:'sat',
        abv:'Sa',
        startTime:'',
        endtime:''
    },
    {
        id:6,
        day:'sun',
        abv:'Su',
        startTime:'',
        endtime:''
    }
]
  const formHandler = (event: any) => {
    event.preventDefault();
    console.log(startDate);
  };

  return (
    <div className={classes.content}>
      <div className={classes.tabHeader}>
        <h3>Regular Shift</h3>
      </div>

      <form onSubmit={formHandler}>
        {/* Dates */}
        <div className="row mb-4">
          <div className="col-2"> 
              <label>Start Date</label>
              <DatePicker selected={startDate} onChange={(date:any) => setStartDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
          </div>
          <div className="col-2"> 
              <label>End Date</label>
              <DatePicker selected={endDate} onChange={(date:any) => setEndDate(date)}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
          </div>
        </div>
        {/* Toggles */}
        <div className={classes.switches}>
          <div className={classes.same}>
            <SameEverydayToggle />
            <span className={classes.switchText}>Same Everyday</span>
          </div>
          <div className={classes.custom}>
            {sameEdToggle === 1 ? "" : <CustomDatesToggle />}
          </div>
        </div>
        {/* Times */}
        
          <div>{sameEdToggle === 1 ? <SameDay days={days} /> : <NotSameDay customDateToggle={customDateToggle} days={days}/>}</div>
        
      </form>
    </div>
  );
};

export default RegularShift;

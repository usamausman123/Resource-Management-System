import { I2cButton } from '@webcomponents/i2cwebcomponents/dist/react';
import React, { useState } from 'react'
import { TimeSelector } from '../../calendar/TimeSelector'
import classes from './NotSameDay.module.css'

import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";

import '../../../commonStyle.css'


const NotSameDay = (props:any) => {
    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('')

    


    
  return (
    <React.Fragment>
        <ul className={classes.notSameDay}>
            {props.days.map((menu:any) => (
                <li key={menu.id} className={(menu.id === 5 || menu.id ===6)? `${classes.inactive} d-flex mb-4`:'d-flex mb-4'}>
                   
                        <div className={classes.days}>
                            <div>
                                <span className={props.customDateToggle ==  true?  classes.updatedFontSize:''}> {menu.abv} </span>
                                 {props.customDateToggle ==  true? <span>{10 + menu.id}</span> :''} 
                            </div>
                            
                            
                        </div>
                        <div className={classes.startTime}>
                            <label>Start Time</label>
                            <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                        </div>
                        <div className={classes.endTime}>
                            <label>End Time</label>
                            <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                        </div>
                        <div className={`${classes.calculatedTime} d-flex align-items-end`}>
                            <span>No Shift</span>
                        </div>
                    
                </li>
            ))}
        </ul>
        <div className={classes.sameDaybuttons}>
          <I2cButton className="me-4" variant="default">Cancel</I2cButton>
          <I2cButton type='submit' variant="primary">Save</I2cButton>
        </div>
    </React.Fragment>
  )
}

export default NotSameDay
import { I2cButton } from '@webcomponents/i2cwebcomponents/dist/react';
import { useState } from 'react'
import { TimeSelector } from '../../calendar/TimeSelector';
import classes from './SameDay.module.css'

import '../../../commonStyle.css'
import TimePicker from "rc-time-picker";
import "rc-time-picker/assets/index.css";



const SameDay = (props:any) => {

    const [activeDay, setActiveDay] = useState(0);
    const dayClick = (index: any) => {setActiveDay(index);};

    const [startTime, setStartTime] = useState('');
    const [endTime, setEndTime] = useState('')


    

    const timeSetter = () =>{
        props.days[activeDay].startTime =startTime;
        props.days[activeDay].endtime =endTime;
    }

   

  return (
    <>
        <div className={classes.sameDay}>
            <ul>
                {props.days.map((menu:any) => (
                    <li key={menu.id} onClick={() => {dayClick(menu.id);}} className={ menu.id === activeDay? classes.activeLi: (menu.id === 5 || menu.id === 6) ? classes.inactiveLi:''} >
                    <span>{menu.abv}</span>
                </li>
                ))}
            </ul>
            <div className='d-flex'>
                <div className={classes.startTime}>
                    <label>Start Time</label>
                    <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                </div>
                <div className={classes.endTime}>
                    <label>End Time</label>
                    <TimePicker placeholder="Select Time" use12Hours minuteStep={1} showSecond={false} focusOnOpen={true} format="hh:mm A" onChange={(e:any) => setStartTime(e)} inputReadOnly placement={'bottomLeft'} />
                </div>
                <div className={classes.calculatedTime}>
                    <span>8h 30min</span> 
                </div>
               
            </div>
        </div>
        <div className={classes.sameDaybuttons}>
          <I2cButton className="me-4" variant="default">Cancel</I2cButton>
          <I2cButton type='submit' variant="primary">Save</I2cButton>
        </div>

    </>
  )
}

export default SameDay
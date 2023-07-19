import { ArrowLeft2, ArrowRight2 } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import classes from './ScheduleCalender.module.css';
import awardIcon from '../../../assets/award-tag.svg';
import { monthData } from './calenderMonthData';
import PopOver from '../../../common/Popover-component/PopOver';
import ReactTooltip from "react-tooltip";

const ScheduleCalender = () => {
    // const allDays: Array<any> = [];
    const weekdays = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    // let activeMonth = new Date();
    const [activeMonthState, setActiveMonthState] = useState(new Date()); // use to store active month 
    let allDates: Array<any> = [];
    const [allDatesState, setAllDatesState] = useState <Array<any>>([]); // use to store all the dates
    const [calenderUpdated, setCalenderUpdated] = useState (false); // use to rerender the component when the 'allDatesState' gets the updated calender value
    const [anchorElPopover, setAnchorElPopover] = React.useState<HTMLDivElement | null>(null); // for Material UI Popover toggling
    let counter=0;
    useEffect(() => {
        calenderInit();
        // console.log('rerendered : ', calenderUpdated);
    }, [calenderUpdated]);

    const calenderInit = () => {
        // console.log('calender initializing');
        allDates = [];
        // setAllDatesState([]);
        
        // console.log('before ' + activeMonthState);
        // activeMonth.setDate(1); // setting the date to 1st the month
        setActiveMonthState(prevState => {
            prevState.setDate(1);
            return prevState;
        });
        // console.log('after ' +  activeMonthState);
        
        
        /* const day = activeMonth.getDay(); */
        const day = activeMonthState.getDay();
        console.log(activeMonthState);
        /* const currMonthStatic = JSON.parse(JSON.stringify(activeMonth)); */
        const currMonthStatic = JSON.parse(JSON.stringify(activeMonthState));

        const prevMonth =  new Date(currMonthStatic).setMonth(new Date(currMonthStatic).getMonth()-1);
        const lastDayOfMonth = new Date(new Date(prevMonth).getFullYear(), new Date(prevMonth).getMonth()+1, 0); // Date(prevMonth).getMonth() will return 10(november) and we will add 1 to it to get the exact previous month
        // console.log('currMonthStatic ' + currMonthStatic);
        // console.log('prevMonth ' + prevMonth);
        // console.log('lastDayOfMonth ' + lastDayOfMonth);

        for (let i = 0; i < (day !== 0 ? day - 1 : day + 6); i++) { // if 'day === 0', that means the 'day' is sunday and then we will add 6 in 'day' for loop condition
            allDates.unshift({ // allDates.unshift() inserts new elements at the start of an array, and returns the new length of the array.
                date: new Date(`${new Date(prevMonth).getFullYear()}-${new Date(prevMonth).getMonth()+1}-${lastDayOfMonth.getDate() - i}`),
                type: 'disabled',
                shift: '',
                badge: ''
            });
        }
        // console.log('all dates : ', allDates);
        // setAllDatesState(allDates);
        // console.log('all dates state : ', allDatesState);
        /* monthDates(activeMonth.getMonth(), activeMonth.getFullYear()); */
        monthDates(activeMonthState.getMonth(), activeMonthState.getFullYear());

    }

    const monthDates = (monthInput: number, year: number) => {
        const looplength = new Date(year, monthInput + 1, 0).getDate();
        // console.log('counter : ', ++counter);
        if(monthInput + 1 === monthData.month && year === monthData.year) {
            allDates= [...allDates, ...monthData['data']];
        } else {
            for (let i = 0; i < looplength; i++) {
                allDates.push({
                    date: new Date(`${year}-${monthInput + 1}-${i + 1}`),
                    type: '',
                    shift: '',
                    badge: ''
                });
            }
        }
        const nextMonthDatesLength = allDates.length > 35 ? 42 - allDates.length: 35 - allDates.length;
        /* console.log(allDates.length, nextMonthDatesLength);
        console.log('month input : ', monthInput); */
        for (let i = 0; i < nextMonthDatesLength; i++) {
            allDates.push({
                date: new Date(`${year}-${monthInput === 11 ? 1 : monthInput+2}-${i + 1}`),
                type: 'disabled',
                shift: '',
                badge: ''
            });
            
        }
        console.log(allDates);
        setAllDatesState([...allDates]);
        
    }

    const monthNavigate = (val: string) => {
        if (val === 'prev') {
            /* activeMonth = new Date(activeMonth.setMonth(activeMonth.getMonth() - 1)); */
            setActiveMonthState(prevState => {
                return new Date(prevState.setMonth(prevState.getMonth() - 1))
            })

        } else if (val === 'next') {
            /* activeMonth = new Date(activeMonth.setMonth(activeMonth.getMonth() + 1)); */
            setActiveMonthState(prevState => {
                return new Date(prevState.setMonth(prevState.getMonth() + 1));
            })
        }
        setCalenderUpdated(prev => !prev);
        // console.log(activeMonthState);
        // calenderInit();
    }

    const isToday = (selectedDate: any) => {
        return (new Date(selectedDate).getDate() === new Date().getDate() && new Date(selectedDate).getMonth() === new Date().getMonth() && new Date(selectedDate).getFullYear() === new Date().getFullYear());
    }
    const isFutureDate = (selectedDate: any) => {
        return (new Date(selectedDate) > new Date());
    }
    const isPastDate = (selectedDate: any) => {
        return (new Date(selectedDate) < new Date());
    }
    const dateCellBackground = (selectedDate: any, shift: string) => {
        if (new Date(selectedDate).getMonth() !== new Date(activeMonthState).getMonth()) {
            return 'disabled';
        } else {
            if(shift) {
                if(isToday(selectedDate)) { // if scheduled date is today
                    return shift.toLowerCase().includes('leave') ? 'red': (shift.toLowerCase().includes('flex') ? 'yellow' : 'blue');
                }
                else {

                    if(isPastDate(selectedDate)) { // if scheduled date is in past
                        if(shift.toLowerCase().includes('flex'))
                            return 'yellow';
                        else if(shift.toLowerCase().includes('scheduled'))
                            return 'blue';
                        else if(shift.toLowerCase().includes('leave'))
                            return 'red';
                    } else { // if scheduled date is in future
                        return shift.toLowerCase().includes('leave') ? 'red' :  'gray';
                    }

                }
            }
            return 'white';
        }
        
    }

    const togglePopoverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
        setAnchorElPopover(event.currentTarget);
    };
    const closePopoverHandler = () => {
        setAnchorElPopover(null);
    };
    const open = !!anchorElPopover;

    return (
        <div className={`${classes['tbl-container']}`}>
            <div className={`${classes['calendar-header']} d-md-flex ps-4 pe-4 justify-content-between align-items-center`}>
                <div className={`${classes['current-shift-detail']} order-1`}>Current Scheduled Shift: Mar 07,2021 - Mar 18, 2021</div>
                <div className={`${classes['calendar-month-controls']} order-2`}>
                    <a href="#" onClick={() => monthNavigate('prev')}>
                        <i> <ArrowLeft2 size="20" /> </i>
                    </a>
                    <span className="d-inline-block">{monthNames[new Date(activeMonthState).getMonth()] + ' ' + new Date(activeMonthState).getFullYear()}</span>
                    <a href="#" onClick={() => monthNavigate('next')}>
                        <i> <ArrowRight2 size="20" /> </i>
                    </a>
                </div>
                <div className="d-none d-xl-block order-3">&nbsp;</div>
            </div>
            <div className={`d-flex ${classes['calendar-weekdays']}`}>
                {
                    weekdays.map((day, index) => 
                        <div key={index} className={classes['weekday']}>
                            <span className="text-center d-block">{day}</span>
                        </div>
                    )
                }
            </div>
            <div className={`${classes['calendar-days']} d-flex `}>
                {
                    allDatesState && allDatesState.length > 0 && allDatesState.map((day, index) => {
                        return (dateCellBackground(day.date, day.shift)=== 'blue' || dateCellBackground(day.date, day.shift)=== 'yellow' ) ?
                            <div key={index} className={`${classes['day']} position-relative ${isToday(day.date) ? classes['active'] : ''}`}
                                onClick={togglePopoverHandler}>
                                <div role="button" className={classes[dateCellBackground(day.date, day.shift)]} >
                                    <span className="d-none d-lg-block">&nbsp;</span>
                                    <span className={classes['date']}>{new Date(day.date).getDate()}</span>
                                    <span className={`${classes['shift-text']} d-none d-lg-block`}>{day.shift}</span>
                                    {
                                        day.shift && day.shift.toLowerCase().includes('flex') &&
                                        <span className={classes['date-badge']}>
                                            <img src={awardIcon} className="d-block" alt="flextime badge" />
                                        </span>
                                    }
                                </div>
                            </div> :
                            <div key={index} className={`${classes['day']} position-relative ${isToday(day.date) ? classes['active'] : ''}`}>
                                <div role="button" className={classes[dateCellBackground(day.date, day.shift)]} data-tip data-for={"datecell-tooltip-" + index}>
                                    <span className="d-none d-lg-block">&nbsp;</span>
                                    <span className={classes['date']}>{new Date(day.date).getDate()}</span>
                                    <span className={`${classes['shift-text']} d-none d-lg-block`}>{day.shift}</span>
                                    
                                    <ReactTooltip id={"datecell-tooltip-" + index} effect='solid'> <span>{day.shift || 'No Shift Scheduled' }</span></ReactTooltip>
                                    {
                                        day.shift && day.shift.toLowerCase().includes('flex') &&
                                        <span className={classes['date-badge']}>
                                            <img src={awardIcon} className="d-block" alt="flextime badge" />
                                        </span>
                                    }
                                </div>
                            </div>
                        
                    })
                }
            </div>

            <PopOver openPopover={open} anchorEl={anchorElPopover} closePopover={closePopoverHandler}
                anchorOrigin={{vertical: 'bottom', horizontal: 'right'}} 
                transformOrigin={{vertical: 'center', horizontal: 'left',}} isSupAttendance={true} />
        </div>
    )
}

export default ScheduleCalender;
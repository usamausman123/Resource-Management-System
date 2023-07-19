import React, { useRef, useState } from "react";
import { DateRange, Range } from "react-date-range";
import { I2cButton } from "@webcomponents/i2cwebcomponents/dist/react";
import { ArrowDown2, Calendar } from "iconsax-react";
import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import './DateRangeDropdown.css';

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const DateRangeDropdown = (props: any) => {

  const [showDateRange, setShowDateRange] = useState(false);
  const [collapsed, setCollapsed] = useState(true);
  const [dateRangeText, setDateRangeText] = useState<string>(`Current ${props.scheduledTime ? 'Month' : 'Week'}`);
  const dateRangeDropdownRef = useRef<HTMLDivElement>(null);
  /* useEffect(() => {
    function handleClickOutside(event:any) {
      if (dateRangeDropdownRef.current && !dateRangeDropdownRef.current.contains(event.target)) {
        setCollapsed(true);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dateRangeDropdownRef]); */

  // const toggleCollapse = (event: any) => {
  //   (event.target.classList.contains("rdrDateDisplay") ||
  //     event.target.classList.contains("rdrDateDisplayWrapper")) &&
  //     setCollapsed((prev) => !prev);
  //     console.log('clicked');
  // };
  const [dateSelection, setDateSelection] = useState<Range>(
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }
  );
  const dateFormatter = (date: Date | undefined) => {
    return  (MONTHS[date!.getMonth()] + ' ' + date?.getDate() + ', ' + date?.getFullYear());
  }
  const toggleDataRange = () => {
    setCollapsed((prev) => !prev);
  }
  
  const cancelDataRangeHandler = () => {
    setCollapsed(true);
    // setShowDateRange(false);
  }
  const applyDataRangeHandler = () => {
    setCollapsed(true);
    // setShowDateRange(false);
    console.log('start date : ' + dateFormatter(dateSelection.startDate));
    console.log('end date : ' + dateFormatter(dateSelection.endDate));
    setDateRangeText(dateFormatter(dateSelection.startDate) + ' - ' + dateFormatter(dateSelection.endDate));
  }

  return (
    <React.Fragment>
      <div className="daterange-picker-container position-relative" ref={dateRangeDropdownRef}>
        {/* <h3>{dateRangeText}</h3> */}
        <I2cButton className="dateranger-picker-opener" onClick={toggleDataRange} size="medium">
          {dateRangeText} <i className={`ms-2 dropdown-icon ${!collapsed ? 'dropdown-icon-rotation' : ''}`}><ArrowDown2 size="12" color="#222" /></i>
        </I2cButton>
        {
          props.isFlex ?
          <div className={`daterange-picker p-3 ${collapsed ? 'daterange-picker-collapsed' : ''}`}>
            <div>
              <I2cButton className={`w-100 mb-3 border-0 ${dateRangeText==='Current Week' ? 'active' : ''}`} size="large" variant="default" 
                onClick={() => {
                  setDateRangeText('Current Week');
                }}> Current Week </I2cButton>
              <I2cButton className={`w-100 mb-3 border-0 ${dateRangeText==='Last Week' ? 'active' : ''}`} size="large" variant="default" 
                onClick={() => {
                  setDateRangeText('Last Week');
                }}> Last Week </I2cButton>
              <I2cButton className={`w-100 border-0 ${dateRangeText==='Last 15 Days' ? 'active' : ''}`} size="large" variant="default" 
                onClick={() => {
                  setDateRangeText('Last 15 Days');
                }}> Last 15 Days </I2cButton>
            </div>
          </div> :
          <div className={`daterange-picker p-4 ${collapsed ? 'daterange-picker-collapsed' : ''}`}>
            {
              props.scheduledTime ?
              <div className='d-flex mb-3'>
                <I2cButton className={`w-100 me-2 ${dateRangeText==='Current Month' ? 'active' : ''}`} size="large" variant="default" 
                  onClick={() => {
                    setShowDateRange(false);
                    setDateRangeText('Current Month');
                  }}>Current Month</I2cButton>
                <I2cButton className={`w-100 ${dateRangeText!=='Current Month' ? 'active' : ''}`} size="large" variant="default" 
                  onClick={() => {
                    setShowDateRange(true);
                    setDateRangeText(dateFormatter(dateSelection.startDate) + ' - ' + dateFormatter(dateSelection.endDate))
                  }}> Date Range </I2cButton>
              </div> :
              <React.Fragment>
                <div className='d-flex mb-3'>
                  <I2cButton className={`w-100 me-2 ${dateRangeText==='Current Week' ? 'active' : ''}`} size="large" variant="default" 
                    onClick={() => {
                      setShowDateRange(false);
                      setDateRangeText('Current Week');
                    }}> {props.scheduledTime ? 'Current Month' : 'Current Week'}</I2cButton>
                  <I2cButton className={`w-100 me-2 ${dateRangeText==='Last Week' ? 'active' : ''}`} size="large" variant="default" 
                    onClick={() => {
                      setShowDateRange(false);
                      setDateRangeText('Last Week');
                    }}> Last Week </I2cButton>
                  <I2cButton className={`w-100 ${dateRangeText==='Last 15 Days' ? 'active' : ''}`} size="large" variant="default" 
                    onClick={() => {
                      setShowDateRange(false);
                      setDateRangeText('Last 15 Days');
                    }}> Last 15 Days </I2cButton>
                </div>
                <div className="mb-3 d-flex">
                  <I2cButton className={`w-100 ${(dateRangeText!=='Current Week' && dateRangeText!=='Last Week' && dateRangeText!=='Last 15 Days') ? 'active' : ''}`} size="large" variant="default" 
                    onClick={() => {
                      setShowDateRange(true);
                      setDateRangeText(dateFormatter(dateSelection.startDate) + ' - ' + dateFormatter(dateSelection.endDate))
                    }}> Date Range </I2cButton>
                </div>
              </React.Fragment>
            }
            {
              showDateRange && 
              <>
                <div className="p-2 mb-2 daterange-picker-header-text">
                  <Calendar size="20" color="#666" />
                  <span className="ps-2">{dateFormatter(dateSelection.startDate) + ' - ' + dateFormatter(dateSelection.endDate)}</span>
                </div>
                <DateRange
                editableDateInputs={false}
                onChange={item => setDateSelection(item.selection)}
                moveRangeOnFirstSelection={false}
                ranges={[dateSelection]}
                rangeColors={['#46b0e6']}
                showPreview={true}
                />
                <div className="text-center date-ranger-footer-buttons d-flex">
                    <I2cButton className='w-100 me-2' size="large" variant="default" onClick={cancelDataRangeHandler}> Cancel </I2cButton>
                    <I2cButton className='w-100 ms-2' size="large" variant="primary" onClick={applyDataRangeHandler}> Apply </I2cButton>
                </div>
              </>
            }
          </div>
        }
        {
          !collapsed &&
          <div className='daterange-picker-backdrop' onClick={cancelDataRangeHandler}></div>
        }

      </div>
      
    </React.Fragment>

  );
};

export default DateRangeDropdown;
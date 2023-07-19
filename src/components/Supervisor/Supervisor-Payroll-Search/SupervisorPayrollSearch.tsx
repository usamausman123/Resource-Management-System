import React, { useState } from 'react'
import './SupervisorPayrollSearch.css';
import DateSelector from '../../calendar/DateSelector';
import '../../dialogs/dialog.css'
import { I2cButton, I2cMenuItem, I2cSelect } from '@webcomponents/i2cwebcomponents/dist/react';
import { useNavigate } from 'react-router-dom';
import AgentSearch from '../../AgentSearch/AgentSearch';
import { ArrowDown2 } from 'iconsax-react';
import { agentsData } from '../Attendance-Search/AgentsData';

import DatePicker from "react-datepicker";
import Select from 'react-select';

const SupervisorPayrollSeacrh = () => {
  let agentsDatasource = [...agentsData];
  const [showAgentsSearch, setShowAgentsSearch] = useState(false);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const navigate = useNavigate();
  const startDateChangeHandler = (value:any) => {
    setStartDate(value);
    console.log('start date: ' + value);
  }

  const endDateChangeHandler = (value:any) => {
    setEndDate(value);
    console.log('end date: ' + value);
  }
  const searchHandler = () => {
    navigate('/supervisor-payroll');
  }
  const onfilterData = (filteredData: any[]) => {
    agentsDatasource = [...filteredData];
  }


  const selectLocations:any = [
    {value :'All Sites',label:'All Sites'},
    {value :'New York',label:'New York'},
    {value :'Los Angeles',label:'Los Angeles'},
    {value :'Chicago',label:'Chicago'},
    {value :'Houston',label:'Houston'},
    
  ]
  return (
    <div className='bg-white payroll-search-wrapper'>
      <div className="pt-3 pe-3 ps-3 pb-4">
        <div className="text-center pt-4 pb-4 pe-5 ps-5">
          <h1>Payroll Report</h1>
          <p>The Salary structure includes salary, allowances, deductions,<br /> and net payable tot he employees.</p>
        </div>
        <div className="row justify-content-around">
          <div className="col-md-5 mb-3">
              <label>From Date</label>
              <DatePicker selected={startDate} onChange={startDateChangeHandler}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
            {/* <DateSelector className='w-100' text='From Date'  value={startDate} onChange={startDateChangeHandler} /> */}
            {/* <DatePicker onChange={startDateChangeHandler} value={startDate}  /> */}
          </div>
          <div className="col-md-5 mb-3">
          <label>To Date</label>
              <DatePicker selected={endDate} onChange={endDateChangeHandler}  dateFormat="MMM d, yyyy" placeholderText={'MM DD, YYYY'}   disabledKeyboardNavigation/>
            {/* <DateSelector className='w-100' text='To Date' value={endDate} onChange={endDateChangeHandler} /> */}
            {/* <DatePicker onChange={endDateChangeHandler} value={endDate} /> */}
          </div>
          <div className="col-md-5 mb-3">
            <div className='cursor-pointer mt-4' style={{color: '#666'}} onClick={() => setShowAgentsSearch(prevState => !prevState)}>
              Select Employee
              <i className="ms-2 float-end"><ArrowDown2 size="16" color="#999" /></i>
            </div>
            { showAgentsSearch && <AgentSearch data={agentsData} setData={onfilterData} hideAgentSearch= {() => setShowAgentsSearch(prevState => !prevState)} /> }
          </div>
          <div className="col-md-5 mb-3">
            
                <label>Select Locations</label>
                <Select options={selectLocations} isSearchable={false} defaultValue={selectLocations[0]}/>

          </div>
        </div>
      </div>

      <div className="text-center w-100 p-3 search-footer">
        <I2cButton className='m-2' size="x-large" variant="default"> Cancel </I2cButton>
        <I2cButton className='m-2' size="x-large" variant="primary" onClick={searchHandler}> Search </I2cButton>
      </div>
    </div>
  )
}

export default SupervisorPayrollSeacrh;
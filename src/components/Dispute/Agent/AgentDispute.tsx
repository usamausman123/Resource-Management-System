import React, { useState } from 'react';
import { Element3, RowVertical } from 'iconsax-react';
import PaginatedItems from "../../react-paginate/react-paginate";
import agentHistoryData from './agentHistoryData.json';
import Agent_Active_Data from './agentActiveData.json';
import DisputeTypeFilter from '../../Filters/DisputeTypeFilter';
import AgentDisputeHistory from './History/DisputeAgentHistory';
import AgentDisputeActive from './Active/DisputeAgentActive';
import { I2cButton, I2cMenuItem, I2cSelect } from '@webcomponents/i2cwebcomponents/dist/react';
import DateRangeDropdown from '../../../common/DateRangeDropdown/DateRangeDropdown';
import AgentRequestDisputeDialog from '../../dialogs/AgentRequestDisputeDialog/AgentRequestDisputeDialog';
import classes from  './AgentDispute.module.css';
import tabsClasses from  '../../../assets/css/tabs.module.css';
import filterClasses from  '../../../assets/css/i2c-dropdown.module.css';


const AgentDispute = () => {
  const [tabVal, setTabVal] = useState('Active'); // use to store tab values
  const [toggle, setToggle] = useState(true);
  const [historyAgent, setHistoryAgent] = useState(agentHistoryData);
  const [agentActiveData, setAgentActiveData] = useState(Agent_Active_Data);
  const [modalShow, setModalShow] = useState(false);

  const toggler = (e: any) => { //Change View List or Grid
    return toggle === false ? setToggle(true) : setToggle(false);
  }
  const tabChange = (val: string) => { // tabs value change handler
    setTabVal(val);
  }

  return (
    <React.Fragment>
      <div className={`component-container ${classes['agent-disputes-wrapper']}`}>
        
        <div className={`p-4 ${classes['header-content']}`}>
          <div className='row justify-content-between align-items-center'>
            <div className='col-xl-4 d-flex justify-content-xl-start justify-content-center'>
                <h1 className='mb-0'>My Dispute Requests</h1>
            </div>
            <div className='col-xl-4 d-flex justify-content-center my-xl-0 my-3'>
                <div className={`nav btn-group btn-group-sm d-inline-block ${tabsClasses['tabs-toggle']}`} role="group" aria-label="toggle button group">
                    <input type="radio" className={tabsClasses['btn-check']} name="btnradio" id="btnradio1" onChange={() => {tabChange('Active'); } } autoComplete="off"  defaultChecked aria-label="Schedule Tab" />
                    <label className={`btn ms-0 me-2 ${tabsClasses['btn-outline-secondary']}`} htmlFor="btnradio1">Active</label>

                    <input type="radio" className={tabsClasses['btn-check']} name="btnradio" id="btnradio2" onChange={() => { tabChange('History'); } } autoComplete="off" value="0" aria-label="Shifts Bid Tab" />
                    <label className={`btn ${tabsClasses['btn-outline-secondary']}`} htmlFor="btnradio2">History</label>
                </div>
            </div>
            <div className='col-xl-4 d-flex justify-content-xl-end justify-content-center align-items-center flex-wrap'>
              <div className="d-inline-block">
                <I2cSelect className={`${filterClasses["filters-dropdown"]} ${classes["disputes-dropdown"]}`} value="all-disputes-types">
                  <I2cMenuItem className={filterClasses["dropdown-item"]} value="all-disputes-types">
                    All Dispute Types
                  </I2cMenuItem>
                  <I2cMenuItem className={filterClasses["dropdown-item"]} value="day">
                    Day
                  </I2cMenuItem>
                  <I2cMenuItem className={filterClasses["dropdown-item"]} value="week">
                    Week
                  </I2cMenuItem>
                  <I2cMenuItem className={filterClasses["dropdown-item"]} value="pay-period">
                    Pay Period
                  </I2cMenuItem>
                </I2cSelect>
              </div>
              <div className="d-inline-block me-2"><DateRangeDropdown /></div>
              { 
                tabVal === 'Active' &&
                <div className="d-inline-block me-3">
                  <I2cButton size="medium" variant="primary" onClick={() => setModalShow(true)}>+ Add New Dispute</I2cButton>
                </div>
              }
              <div className='switch-container'>
                <button className="button" onClick={toggler} disabled={toggle}><RowVertical size="18" /></button> 
                <button disabled={toggle === false} className="button" onClick={toggler}><Element3 size="20" /></button>
              </div>
            </div>
          </div>
        </div>
        
        <div className='table-container'>
          {tabVal === 'Active' ? <AgentDisputeActive toggle={toggle} data={agentActiveData} /> : <AgentDisputeHistory toggle={toggle} data={historyAgent} />}
        </div>

        <div className="component-footer p-4">
          <PaginatedItems />
        </div>
      </div>
      {
        modalShow && <AgentRequestDisputeDialog   show={modalShow} editonhide={()=>setModalShow(false)} modalid={'Day'}/>
      }
    </React.Fragment>
  );

}

export default AgentDispute;

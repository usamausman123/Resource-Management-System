import { useState } from 'react';
import { RowVertical, Element3, ArrowDown2 } from 'iconsax-react';
import SupervisorLeaveList from './SupervisorListLeave';
import SupervisorLeaveGrid from './SupervisorLeaveGrid';
import Supervisor_Leave_Data from './Supervisor_Leave_Data.json';
import AgentSearch from '../../AgentSearch/AgentSearch';
import AllRequest from '../../Filters/AllRequest';
import PaginatedItems from './../../react-paginate/react-paginate';
import DateRangeDropdown from '../../../common/DateRangeDropdown/DateRangeDropdown';
import { I2cButton, I2cMenuItem, I2cSelect } from '@webcomponents/i2cwebcomponents/dist/react';
import classes from "./SupervisorLeaveStyle.module.css";
import filterClasses from  '../../../assets/css/i2c-dropdown.module.css';

const SupervisorLeave = () => {
  const [toggle, setToggle] = useState(true);
  const [showAgentsSearch, setShowAgentsSearch] = useState(false);
  const [supervisorData, setSupervisorData] = useState(Supervisor_Leave_Data);

  /*Change View */
  const toggler = (e: any) => {
    return toggle === false ? setToggle(true) : setToggle(false);
  }

  return (
    <div className={`component-container ${classes.supervisorLeave}`}>
      
      <div className={`p-4 ${classes["header-content"]}`}>
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-4 d-flex justify-content-lg-start justify-content-center mb-lg-0 mb-3">
            <h1 className='mb-0'>Leaves Requests</h1>
          </div>
          <div className="col-lg-8 d-flex justify-content-lg-end justify-content-center align-items-center flex-wrap">
            <div className="d-inline-block">
              <I2cSelect className={filterClasses["filters-dropdown"]} value="all-requets">
                <I2cMenuItem className={filterClasses["dropdown-item"]} value="all-requets">
                  All Requets
                </I2cMenuItem>
                <I2cMenuItem className={filterClasses["dropdown-item"]} value="pending">
                  Pending
                </I2cMenuItem>
                <I2cMenuItem className={filterClasses["dropdown-item"]} value="approved">
                  Approved
                </I2cMenuItem>
                <I2cMenuItem className={filterClasses["dropdown-item"]} value="reject">
                  Reject
                </I2cMenuItem>
              </I2cSelect>
            </div>
            <div className="d-inline-block">
              <I2cButton className={classes['agents-filter-opener']} onClick={() => setShowAgentsSearch(prevState => !prevState)} size="medium">
                All Agents <i className={`ms-2 dropdown-icon ${showAgentsSearch ? 'dropdown-icon-rotation' : ''}`}><ArrowDown2 size="12" color="#222" /></i>
              </I2cButton>
              {showAgentsSearch && <AgentSearch data={Supervisor_Leave_Data} setData={setSupervisorData} hideAgentSearch={() => setShowAgentsSearch(prevState => !prevState)} />}
            </div>
            <div className="d-inline-block me-2"><DateRangeDropdown /></div>

            <div className="dropdown d-inline-block">
              <div className="switch-container">
                <button className="button" onClick={toggler} disabled={toggle}>
                  <RowVertical size="18" />
                </button>
                <button disabled={toggle == false} className="button" onClick={toggler}>
                  <Element3 size="20" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className='table-container'>
      {
        toggle === true ? 
        <SupervisorLeaveList data={supervisorData} /> : 
        <SupervisorLeaveGrid data={supervisorData} />
      }
      </div>

      <div className="component-footer">
        <div className="col-md-12">
          <PaginatedItems />
        </div>
      </div>
    </div>
  );

}

export default SupervisorLeave;

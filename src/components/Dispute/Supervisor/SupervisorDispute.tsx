import { useState } from 'react';
import { ArrowDown2, Element3, RowVertical } from 'iconsax-react';
import SupervisorDisputeList from './SupervisorDisputeList';
import SupervisorDisputeGrid from './SupervisorDisputeGrid';
import Supervisor_Data from './SupervisorData.json';
import AgentSearch from '../../AgentSearch/AgentSearch';
import DisputeTypeFilter from '../../Filters/DisputeTypeFilter';
import DateRangeDropdown from '../../../common/DateRangeDropdown/DateRangeDropdown';
import PaginatedItems from './../../react-paginate/react-paginate';
import { I2cButton, I2cMenuItem, I2cSelect } from '@webcomponents/i2cwebcomponents/dist/react';
import classes from './SupervisorDispute.module.css';
import filterClasses from  '../../../assets/css/i2c-dropdown.module.css';
// import '../dispute.css';
// import '../../../commonStyle.css';

const SupervisorDispute = () => {
  const [toggle, setToggle] = useState(true);
  const [supervisorData, setSupervisorData] = useState(Supervisor_Data);
  const [showAgentsSearch, setShowAgentsSearch] = useState(false);

  /*Change View */
  const toggler = (e: any) => {
    return toggle == false ? setToggle(true) : setToggle(false);
  }

  return (
    <>
      <div className={`component-container ${classes['supervisor-disputes-wrapper']}`}>
        <div className={`p-4 ${classes["header-content"]}`}>
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-4 d-flex justify-content-lg-start justify-content-center mb-lg-0 mb-3">
              <h1 className='mb-0'>Dispute Requests</h1>
            </div>
            <div className="col-lg-8 d-flex justify-content-lg-end justify-content-center align-items-center flex-wrap">
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
              <div className="d-inline-block">
                <I2cButton className={classes['agents-filter-opener']} onClick={() => setShowAgentsSearch(prevState => !prevState)} size="medium">
                  All Agents <i className={`ms-2 dropdown-icon ${showAgentsSearch ? 'dropdown-icon-rotation' : ''}`}><ArrowDown2 size="12" color="#222" /></i>
                </I2cButton>
                {showAgentsSearch && <AgentSearch data={Supervisor_Data} setData={setSupervisorData} hideAgentSearch={() => setShowAgentsSearch(prevState => !prevState)} />}
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
          {toggle === true ? <SupervisorDisputeList data={supervisorData} supervisorData={supervisorData} /> : <SupervisorDisputeGrid data={supervisorData} />}
        </div>

        <div className="component-footer p-4">
          <PaginatedItems />
        </div>
      </div>
    </>
  );

}

export default SupervisorDispute;

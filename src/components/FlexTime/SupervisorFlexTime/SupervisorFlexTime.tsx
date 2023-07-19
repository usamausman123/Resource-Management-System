import React, { useState } from "react";
import agentFlexTimeData from "./Flex_Time_Data.json";
import SupervisorFlexPromotion from "../SupervisorFlexTime/promotions/SupervisorFlexPromotion";
import SupervisorFlexRequest from "./request/SupervisorFlexRequest";
import SupervisorFlexPromotionGrid from "../SupervisorFlexTime/promotions/SupervisorFlexPromotionGrid";
import PaginatedItems from "./../../react-paginate/react-paginate";
import { RowVertical, Element3 } from "iconsax-react";
import { I2cButton, I2cMenuItem, I2cSelect } from "@webcomponents/i2cwebcomponents/dist/react";
import AddNewFlex from "../../dialogs/AddNewFlex/AddNewFlex";
import classes from  './SupervisorFlexTime.module.css';
import tabsClasses from  '../../../assets/css/tabs.module.css';
import filterClasses from  '../../../assets/css/i2c-dropdown.module.css';

const SupervisorFlexTime = () => {
  const [flexTime, setFlexTime] = useState(agentFlexTimeData);
  const [tabVal, setTabVal] = useState('Promotions'); // for tabs toggling
  const [toggle, setToggle] = useState(true); // for toggling list and grid view
  const [modalShow, setModalShow] = useState(false);
  
  const toggler = () => { //Change List View or Grid View
    return toggle === false ? setToggle(true) : setToggle(false);
  };
   const tabChange = (val: string) => { // tabs value change handler
    setTabVal(val);
  }

  return (
    <React.Fragment>
      <div className="component-container">
        <div className={`p-4 ${classes['header-content']}`}>
        <div className={`row justify-content-between align-items-center`}>
          <div className='col-xl-4 d-flex justify-content-xl-start justify-content-center'>
              <h1 className="mb-0">Flex Time</h1>
          </div>
          <div className='col-xl-4 d-flex justify-content-center my-xl-0 my-3'>
              <div className={`nav btn-group btn-group-sm d-inline-block ${tabsClasses['tabs-toggle']}`} role="group" aria-label="toggle button group">
                  <input type="radio" className={tabsClasses['btn-check']} name="btnradio" id="btnradio1" onChange={ () => {tabChange('Promotions');} } autoComplete="off"  defaultChecked aria-label="Schedule Tab" />
                  <label className={`btn ms-0 me-2 ${tabsClasses['btn-outline-secondary']}`} htmlFor="btnradio1">Promotions</label>

                  <input type="radio" className={tabsClasses['btn-check']} name="btnradio" id="btnradio2" onChange={ () => {tabChange('Requests');} } autoComplete="off" value="0" aria-label="Shifts Bid Tab" />
                  <label className={`btn ${tabsClasses['btn-outline-secondary']}`} htmlFor="btnradio2">Requests</label>
              </div>
          </div>
          <div className='col-xl-4 d-flex justify-content-xl-end justify-content-center align-items-center flex-wrap'>
            <div className="dropdown d-inline-block me-3">
              <I2cSelect className={filterClasses["filters-dropdown"]} value="current-week">
                <I2cMenuItem className={filterClasses["dropdown-item"]} value="current-week">
                  Current Week
                </I2cMenuItem>
                <I2cMenuItem className={filterClasses["dropdown-item"]} value="last-week">
                  Last Week
                </I2cMenuItem>
                <I2cMenuItem className={filterClasses["dropdown-item"]} value="last-15-days">
                  Last 15 Days
                </I2cMenuItem>
              </I2cSelect>
            </div>
            <div className="d-inline-block me-3">
              <I2cButton size="medium" variant="primary" onClick={() => setModalShow(true)}>+ Add New Flex</I2cButton>
            </div>
            { 
              tabVal === 'Promotions' && 
              <div className='switch-container'>
                <button className="button" onClick={toggler} disabled={toggle}><RowVertical size="18" /></button> 
                <button disabled={toggle === false} className="button" onClick={toggler}><Element3 size="20" /></button>
              </div>
            }
          </div>
        </div>
        </div>

        <div className="table-container">
          { 
            tabVal === 'Promotions' ? 
            <>
              {
                toggle === true ? 
                <SupervisorFlexPromotion promotionData={flexTime} /> :
                <SupervisorFlexPromotionGrid promotionGridData={flexTime} />
              }
            </> : 
            <SupervisorFlexRequest requestData={flexTime} />  
          }
        </div>
        <div className="component-footer p-4">
            <PaginatedItems />
        </div>
      </div>
      { modalShow && <AddNewFlex show={modalShow} editOnHide={() => setModalShow(false)} /> }
    </React.Fragment>
  );
};

export default SupervisorFlexTime;

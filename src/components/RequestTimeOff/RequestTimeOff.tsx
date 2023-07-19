import React from "react";
import { useState } from "react";
import Request_Time_Off_Agent_Data from "./Request_Time_Off_Agent_Data.json";
import RequestTimeOffGrid from "./RequestTimeOffGrid";
import RequestTimeOffList from "./RequestTimeOffList";
import PaginatedItems from "../react-paginate/react-paginate";
import { RowVertical, Element3, Add, Clock } from "iconsax-react";
import { I2cButton, I2cSelect, I2cMenuItem } from "@webcomponents/i2cwebcomponents/dist/react";
import TimeOff from "../dialogs/TimeOff/TimeOff";
import classes from "./RequestTimeOff.module.css";
import filterClasses from  '../../assets/css/i2c-dropdown.module.css';
// import TimeOffRequest from "../Filters/TimeOffRequest";

const RequestTimeOff = () => {
  const [requestTime, setRequestTime] = useState(Request_Time_Off_Agent_Data);
  const [toggle, setToggle] = useState(true);

  const [openRequestModal, setOpenRequestModal] = useState(false);
  const closeRequestModal = (value: boolean) => {
    setOpenRequestModal(value);
  };

  /*Change View */
  const toggler = (e: any) => {
    // return toggle === false ? setToggle(true) : setToggle(false);
    setToggle((prevState) => !prevState);
  };

  return (
    <React.Fragment>
      <div className={classes["request-time-off-wrapper"]}>
        <div className={`p-4 ${classes["header-content"]}`}>
          <div className="row justify-content-between align-items-center">
            <div className="col-lg-4 d-flex justify-content-lg-start justify-content-center mb-lg-0 mb-3">
              <h1 className="mb-0">Request Time Off(Paid/Unpaid)</h1>
            </div>
            <div className="col-lg-8 d-flex align-items-center justify-content-lg-end justify-content-center flex-md-row flex-column">
              <div className="d-inline-block">
                <div className="d-inline-block me-1">
                  <I2cSelect className={filterClasses["filters-dropdown"]} value="all-requests">
                    <I2cMenuItem className={filterClasses["dropdown-item"]} value="all-requests">
                      All Requests
                    </I2cMenuItem>
                    <I2cMenuItem className={filterClasses["dropdown-item"]} value="paid">
                      Paid Time Off
                    </I2cMenuItem>
                    <I2cMenuItem className={filterClasses["dropdown-item"]} value="unpaid">
                      Unpaid Time Off
                    </I2cMenuItem>
                  </I2cSelect>
                </div>
                <div className="d-inline-block me-3">
                  {/* <DateRangeDropdown isFlex={true} /> */}
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
              </div>
              <div className="d-inline-block">
                <div className="d-inline-block me-3">
                  {/* <I2cButton className="button-default" onClick={() => { setOpenRequestModal(true) }}>Request</I2cButton> */}
                  <I2cButton
                    size="medium"
                    variant="primary"
                    onClick={() => {
                      setOpenRequestModal(true);
                    }}
                  >
                    <Add className="mb-1" size="16" color="#ffffff" />
                    Add New Request
                  </I2cButton>
                </div>
                <div className="d-inline-block">
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
        </div>
        <div className="px-4">
          <div
            className={` ${classes["alert-warning-custom"]} d-flex justify-content-between align-items-center`}
          >
            <div>
              <Clock size="20" className="me-2" />{" "}
              <span className="d-inline-block align-middle" style={{ fontSize: "0.9285714285714286rem" }}>
                Your employer requires 7 days advance notice for time off
                requests (except sick time).
              </span>
            </div>
            <div
              aria-hidden="true"
              className="cross-icon cursor-pointer"
              style={{ fontSize: "24px" }}
            >
              &times;
            </div>
          </div>
        </div>

        <div className="table-container">
          {toggle === true ? (
            <RequestTimeOffList requestDataList={requestTime} />
          ) : (
            <RequestTimeOffGrid requestDataGrid={requestTime} />
          )}
        </div>

        <div className="component-footer">
          <div className="col-md-12">
            <PaginatedItems />
          </div>
        </div>
      </div>
      {
        openRequestModal && <TimeOff
          title="Request Time (Paid/Unpaid)"
          openModal={openRequestModal}
          isStatsView={true}
          closeModal={()=>setOpenRequestModal(false)}
          // closeModalCancel={()=>setOpenRequestModal(false)}
        />
      }
      
    </React.Fragment>
  );
};

export default RequestTimeOff;

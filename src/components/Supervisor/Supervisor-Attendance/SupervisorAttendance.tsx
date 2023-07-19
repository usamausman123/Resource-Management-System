import {
  I2cButton,
  I2cCheckbox,
  I2cDialog,
  I2cDivider,
  I2cDropdown,
  I2cMenu,
  I2cMenuItem,
  I2cSelect,
} from "@webcomponents/i2cwebcomponents/dist/react";
import {
  ArrowDown2,
  CloseCircle,
  Edit,
  Filter,
  Monitor,
  More,
  TickCircle,
} from "iconsax-react";
import React, { useRef, useState } from "react";
import "../common.css";
import classes from "./SupervisorAttendance.module.css";
import userImage from "../../../assets/profile.png";
import { Link } from "react-router-dom";
import { Tooltip } from "@material-ui/core";
import { dataSource, shiftsBidTabData } from "../agentsAttendanceData";
import { agentsData } from "../Attendance-Search/AgentsData";
import AgentSearch from "../../AgentSearch/AgentSearch";
import DateRangeDropdown from "../../../common/DateRangeDropdown/DateRangeDropdown";
import PaginatedItems from "../../react-paginate/react-paginate";
import PopOver from "../../../common/Popover-component/PopOver";
import AddScheduleDialog from "../../dialogs/AddScheduleDialog/AddScheduleDialog";
import BulkUpload from "../../dialogs/BulkUpload/BulkUpload";
import AddShiftBid from "../../dialogs/AddShiftBid/AddShiftBid";
import EditShiftBid from "../../dialogs/EditShiftBid/EditShiftBid";
import ShiftBidApproval from "../../dialogs/ShiftBidApproval/ShiftBidApproval";

const SupervisorAttendance = () => {
  const footerRef = useRef<HTMLDivElement>(null); // page footer reference
  const scrollBoxRef = useRef<HTMLDivElement>(null); // scrollbox reference in which scroll will be applied
  const [agentsDataSource, setAgentsDataSource] = useState<any[]>(dataSource);
  const [shiftBidDataSource, setshiftBidDataSource] =
    useState<any[]>(shiftsBidTabData);
  const [showAgentsSearch, setShowAgentsSearch] = useState(false);
  const [tabVal, setTabVal] = useState("Schedule");
  const [anchorElPopover, setAnchorElPopover] =
    React.useState<HTMLDivElement | null>(null); // for Material UI Popover toggling
  let tabValHolder: string = "Schedule"; // it will be either 'Schedule' or 'Shifts Bid'
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let agentsDatasource = [...agentsData];
  const tabChange = (val: string) => {
    tabValHolder = val;
    setTabVal(tabValHolder);
  };
  const formatAMPM = (date: Date) => {
    let hours = date.getHours();
    let minutes: any = date.getMinutes();
    var ampm = hours >= 12 ? "PM" : "AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let formattedTime = hours + ":" + minutes + " " + ampm;
    return formattedTime;
  };
  const onfilterData = (filteredData: any[]) => {
    agentsDatasource = [...filteredData];
  };

  const togglePopoverHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorElPopover(event.currentTarget);
  };
  const closePopoverHandler = () => {
    setAnchorElPopover(null);
  };
  const open = !!anchorElPopover;

  const [modalShow, setModalShow] = useState(false);
  const [bulkUploadmodalShow, setBulkUploadmodalShow] = useState(false);
  const [addShiftBidmodalShow, setAddShiftBidmodalShow] = useState(false);
  const [editShiftBidmodalShow, setEditShiftBidmodalShow] = useState(false);
  const [shiftBidApprovalmodalShow, setShiftBidApprovalmodalShow] =
    useState(false);

  // Edit Shift Bid Logic
  const [editShiftEmpId, setEditShiftEmpId] = useState("");
  const [editShiftRecId, setEditShiftRecId] = useState("");
  const shiftBidApproval = (agent_id: any, record_id: any) => {
    setEditShiftEmpId(agent_id);
    setEditShiftRecId(record_id);
    setShiftBidApprovalmodalShow(true);
  };

  return (
    <React.Fragment>
      {/* <h2>{'report view : ' + reportView  + ' Tab view : ' + tabVal}</h2> */}
      <div className={classes["attendance-wrapper"]}>
        <div className="p-4 header-content">
          <div className="row justify-content-between align-items-center">
            <div className="col-xxl-4 col-xl-3 d-flex justify-content-xl-start justify-content-center">
              <h1>Attendance &amp; Schedule</h1>
            </div>
            <div className="col-xl-3 justify-content-center d-flex mt-xl-0 mb-xl-0 mb-3 mt-3">
              <div
                className={`nav btn-group btn-group-sm d-inline-block ${classes["tabs-toggle"]}`}
                role="group"
                aria-label="toggle button group"
              >
                <input
                  type="radio"
                  className={classes["btn-check"]}
                  name="btnradio"
                  id="btnradio1"
                  onChange={() => {
                    tabChange("Schedule"); /* tableHeight(); */
                  }}
                  autoComplete="off"
                  defaultChecked
                  aria-label="Schedule Tab"
                />
                <label
                  className={`btn ${classes["btn-outline-secondary"]}`}
                  htmlFor="btnradio1"
                >
                  Schedule
                </label>

                <input
                  type="radio"
                  className={classes["btn-check"]}
                  name="btnradio"
                  id="btnradio2"
                  onChange={() => {
                    tabChange("Shifts Bid"); /* tableHeight(); */
                  }}
                  autoComplete="off"
                  value="0"
                  aria-label="Shifts Bid Tab"
                />
                <label
                  className={`btn ${classes["btn-outline-secondary"]}`}
                  htmlFor="btnradio2"
                >
                  Shifts Bid
                </label>
              </div>
            </div>
            <div className="d-flex justify-content-xl-end justify-content-center flex-wrap align-items-center col">
              {tabVal === "Schedule" && (
                <React.Fragment>
                  <div className="dropdown d-inline-block me-3">
                    <button
                      className={`btn btn-sm dropdown-toggle font-12 font-w-500 ${classes["icon-dropdown-btn"]}`}
                      id="dropdownMenuClickableOutside"
                      type="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                      data-bs-auto-close="outside"
                    >
                      <i className="">
                        <Filter size="12" color="#fff" />
                      </i>
                    </button>
                    <ul
                      className={`dropdown-menu ${classes["combine-filters"]} menu-right-minus`}
                      aria-labelledby="dropdownMenuClickableOutside"
                    >
                      <li className={classes["filter-heading"]}>
                        <h1 className="mb-0">Filters</h1>
                      </li>
                      <li>
                        <span
                          className="collape"
                          data-bs-toggle="collapse"
                          data-bs-target="#locations"
                        >
                          Locations{" "}
                          <i>
                            <ArrowDown2 size="12" color="#7A7B87" />
                          </i>
                        </span>
                        <div className="collapse" id="locations">
                          <ul>
                            <li>
                              <a href="#">New York</a>
                            </li>
                            <li>
                              <a href="#">Los Angeles</a>
                            </li>
                            <li>
                              <a href="#">Chicago</a>
                            </li>
                            <li>
                              <a href="#">Houston</a>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <span
                          className="collape"
                          data-bs-toggle="collapse"
                          data-bs-target="#shifts"
                        >
                          Shifts{" "}
                          <i className="icon-down-arrow">
                            <ArrowDown2 size="12" color="#7A7B87" />
                          </i>
                        </span>
                        <div className="collapse" id="shifts">
                          <ul>
                            <li>
                              <I2cCheckbox
                                className={classes["shift-checkbox"]}
                                value="Select All"
                              >
                                Select All
                              </I2cCheckbox>
                            </li>
                            <li>
                              <I2cCheckbox
                                className={classes["shift-checkbox"]}
                                value="Regular Shift"
                              >
                                Regular Shift
                              </I2cCheckbox>
                            </li>
                            <li>
                              <I2cCheckbox
                                className={classes["shift-checkbox"]}
                                value="D1 Shift"
                              >
                                D1 Shift
                              </I2cCheckbox>
                            </li>
                            <li>
                              <I2cCheckbox
                                className={classes["shift-checkbox"]}
                                value="D2 Shift"
                              >
                                D2 Shift
                              </I2cCheckbox>
                            </li>
                            <li>
                              <I2cCheckbox
                                className={classes["shift-checkbox"]}
                                value="D3 Shift"
                              >
                                D3 Shift
                              </I2cCheckbox>
                            </li>
                            <li>
                              <I2cCheckbox
                                className={classes["shift-checkbox"]}
                                value="Custom Shift"
                              >
                                Custom Shift
                              </I2cCheckbox>
                            </li>
                            <li>
                              <I2cCheckbox
                                className={classes["shift-checkbox"]}
                                value="Shift Bid"
                              >
                                Shift Bid
                              </I2cCheckbox>
                            </li>
                          </ul>
                        </div>
                      </li>
                      <li>
                        <span
                          className="collape"
                          data-bs-toggle="collapse"
                          data-bs-target="#status"
                        >
                          Status{" "}
                          <i className="icon-down-arrow">
                            <ArrowDown2 size="12" color="#7A7B87" />
                          </i>
                        </span>
                        <div className="collapse" id="status">
                          <div className={classes["radio-btns"]}>
                            <label className={classes["radio-btn"]}>
                              <input type="radio" name="statusRadio" />
                              <strong>
                                <span className={classes["radio-btn-name"]}>
                                  All Status
                                </span>
                              </strong>
                            </label>
                            <label className={classes["radio-btn"]}>
                              <input type="radio" name="statusRadio" />
                              <strong>
                                <span className={classes["radio-btn-name"]}>
                                  Available
                                </span>
                              </strong>
                            </label>
                            <label className={classes["radio-btn"]}>
                              <input type="radio" name="statusRadio" />
                              <strong>
                                <span className={classes["radio-btn-name"]}>
                                  On Leave
                                </span>
                              </strong>
                            </label>
                          </div>
                        </div>
                      </li>
                      <li>
                        <span
                          className="collape"
                          data-bs-toggle="collapse"
                          data-bs-target="#workFrom"
                        >
                          Work From{" "}
                          <i className="icon-down-arrow">
                            <ArrowDown2 size="12" color="#7A7B87" />
                          </i>
                        </span>
                        <div className="collapse" id="workFrom">
                          <div className={classes["radio-btns"]}>
                            <label className={classes["radio-btn"]}>
                              <input type="radio" name="workRadio" />
                              <strong>
                                <span className={classes["radio-btn-name"]}>
                                  Both
                                </span>
                              </strong>
                            </label>
                            <label className={classes["radio-btn"]}>
                              <input type="radio" name="workRadio" />
                              <strong>
                                <span className={classes["radio-btn-name"]}>
                                  Office
                                </span>
                              </strong>
                            </label>
                            <label className={classes["radio-btn"]}>
                              <input type="radio" name="workRadio" />
                              <strong>
                                <span className={classes["radio-btn-name"]}>
                                  Home
                                </span>
                              </strong>
                            </label>
                          </div>
                        </div>
                      </li>
                      <li className={classes.footer}>
                        {/* <span className="custom-btn custom-btn-sm custom-secondary-btn w-100">Cancel</span>
                                                <span className="custom-btn custom-btn-sm custom-primary-btn w-100">Apply</span> */}
                        <I2cButton
                          className="w-100 me-2"
                          size="small"
                          variant="default"
                        >
                          {" "}
                          Cancel{" "}
                        </I2cButton>
                        <I2cButton
                          className="w-100 ms-2"
                          size="small"
                          variant="primary"
                        >
                          {" "}
                          Apply{" "}
                        </I2cButton>
                      </li>
                    </ul>
                  </div>
                  <div className="dropdown d-inline-block me-3">
                    {/* <AgentSearch /> */}
                    <I2cButton
                      className={classes["agents-opener-button"]}
                      onClick={() =>
                        setShowAgentsSearch((prevState) => !prevState)
                      }
                      size="large"
                    >
                      All Agents{" "}
                      <i className="ms-2">
                        <ArrowDown2 size="12" color="#222" />
                      </i>
                    </I2cButton>
                    {showAgentsSearch && (
                      <AgentSearch
                        data={agentsData}
                        setData={onfilterData}
                        hideAgentSearch={() =>
                          setShowAgentsSearch((prevState) => !prevState)
                        }
                      />
                    )}
                  </div>
                </React.Fragment>
              )}
              <div className="dropdown d-inline-block me-3">
                <DateRangeDropdown />
              </div>
              <div
                className="nav btn-group btn-group-sm d-inline-block tabs-toggle view-switch-tabs"
                role="group"
                aria-label="toggle button group"
              >
                {tabVal === "Schedule" ? (
                  <I2cButton
                    size="small"
                    variant="primary"
                    className={classes["add-schedule-dropdown-button"]}
                    onClick={() => setModalShow(true)}
                  >
                    {" "}
                    + Add Schedule{" "}
                  </I2cButton>
                ) : (
                  <I2cButton
                    size="small"
                    variant="primary"
                    className={classes["add-schedule-dropdown-button"]}
                    onClick={() => setAddShiftBidmodalShow(true)}
                  >
                    {" "}
                    + Add New Shifts Bid{" "}
                  </I2cButton>
                )}

                <I2cDropdown>
                  <I2cButton
                    slot="trigger"
                    size="small"
                    variant="primary"
                    caret
                    className={classes["last-dropdown-button"]}
                  ></I2cButton>
                  <I2cMenu>
                    <I2cMenuItem onClick={() => setBulkUploadmodalShow(true)}>
                      Bulk Upload
                    </I2cMenuItem>
                  </I2cMenu>
                </I2cDropdown>
                {/*dialog start*/}
                <>
                  {" "}
                  {addShiftBidmodalShow && (
                    <AddShiftBid
                      show={addShiftBidmodalShow}
                      bulkOnHide={() => setAddShiftBidmodalShow(false)}
                    />
                  )}
                  {bulkUploadmodalShow && (
                    <BulkUpload
                      show={bulkUploadmodalShow}
                      bulkOnHide={() => setBulkUploadmodalShow(false)}
                    />
                  )}
                  {modalShow && (
                    <AddScheduleDialog
                      show={modalShow}
                      onHide={() => setModalShow(false)}
                    />
                  )}
                </>
                {/*dialog end*/}
              </div>
            </div>
          </div>
        </div>

        <div className={classes["report-summary"]}>
          {/* {{totalScheduledAgents}} {{totalAvailableAgents}} {{totalScheduledHours}} {{totalAvailableHours}} */}
          <div className="">
            Total Scheduled Agents
            <span className={classes["blue"]}>250</span>
          </div>
          <div>
            Available Agents
            <span className={classes["green"]}>215</span>
          </div>
          <div>
            On leaves
            <span className={classes["red"]}>16</span>
          </div>
          <div>
            Scheduled Hours
            <span className={classes["blue"]}>127</span>
          </div>
          <div>
            Available Hours
            <span className={classes["blue"]}>1900</span>
          </div>
        </div>

        {tabVal === "Schedule" && (
          <div className={`${classes["tbl-container"]} w-100 slim-scroll`}>
            <table
              className={`${classes["standard-tbl-structure"]} ${classes["attendance-schedule-table"]} ${classes["no-alternat"]} `}
            >
              <thead>
                <tr>
                  <th
                    rowSpan={2}
                    className={`ps-4 ${classes["right-shadow-cell"]}`}
                    style={{ width: "260px" }}
                  >
                    Employee DETAILS
                  </th>
                  {agentsDataSource.length &&
                    Object.keys(agentsDataSource[0]["attendanceDetail"]).map(
                      (singleDate: any, index) => {
                        return (
                          <th
                            key={singleDate + index}
                            className="text-center"
                            style={{ width: "138px" }}
                          >
                            <div className="d-flex align-items-center">
                              {/* <span className="icon-left-arrow text-muted font-12 cursor-pointer" ></span> */}
                              <span className="ms-auto me-auto">
                                {monthNames[
                                  new Date(singleDate).getUTCMonth()
                                ] +
                                  " " +
                                  new Date(singleDate).getDate()}
                              </span>
                              {/* <span className="icon-right-arrow  text-muted font-12 ms-auto cursor-pointer" ></span> */}
                            </div>
                          </th>
                        );
                      }
                    )}
                  <th
                    colSpan={3}
                    className={`text-center ${classes["left-shadow-cell"]}`}
                    style={{ width: "240px" }}
                  >
                    Hours
                  </th>
                </tr>
                <tr>
                  <th className="text-center" style={{ width: "138px" }}>
                    Sun
                  </th>
                  <th className="text-center" style={{ width: "138px" }}>
                    Mon
                  </th>
                  <th className="text-center" style={{ width: "138px" }}>
                    Tue
                  </th>
                  <th className="text-center" style={{ width: "138px" }}>
                    Wed
                  </th>
                  <th className="text-center" style={{ width: "138px" }}>
                    Thu
                  </th>
                  <th className="text-center" style={{ width: "138px" }}>
                    Fri
                  </th>
                  <th
                    className={`text-center ${classes["weekend-cell"]}`}
                    style={{ width: "138px" }}
                  >
                    Sat
                  </th>
                  <th
                    className={`text-center ${classes["weekend-cell"]}`}
                    style={{ width: "138px" }}
                  >
                    Sun
                  </th>
                  <th
                    className={`text-center bg-white ${classes["left-shadow-cell"]}`}
                    style={{ width: "80px" }}
                  >
                    scheduled
                  </th>
                  <th
                    className="text-center bg-white"
                    style={{ width: "80px" }}
                  >
                    available
                  </th>
                  <th
                    className="text-center bg-white"
                    style={{ width: "80px" }}
                  >
                    occurrence
                  </th>
                </tr>
              </thead>

              <tbody>
                <tr>
                  <td
                    colSpan={12}
                    className="scrollParent"
                    style={{ padding: "0px", border: "0px" }}
                  >
                    <div className="table-scroll" ref={scrollBoxRef}>
                      <table className="scrollChild">
                        {agentsDataSource.length &&
                          agentsDataSource.map((agent: any, index) => {
                            // console.log(agent.agentName);
                            return (
                              <tr key={agent.agentId + index}>
                                <td
                                  className={`ps-4 text-left ${classes["right-shadow-cell"]}`}
                                  width="260"
                                >
                                  <Tooltip
                                    title={
                                      <div className="pt-2">
                                        <p className="text-white">Available</p>
                                        <p style={{ color: "#46b0e6" }}>
                                          Working from: Office
                                        </p>
                                      </div>
                                    }
                                    placement="bottom"
                                  >
                                    <div className="d-flex align-items-center cursor-pointer">
                                      <div className="me-3 position-relative">
                                        <img
                                          src={userImage}
                                          className="media-img"
                                          alt="user pic"
                                        />
                                      </div>
                                      <div className="font-12 text-left">
                                        <Link
                                          to={"/supervisor-attendance-report"}
                                          className={
                                            classes["employee-details-cell"]
                                          }
                                        >
                                          <span>{agent.agentName}</span>
                                          <span className="d-block">
                                            124567898
                                          </span>
                                        </Link>
                                      </div>
                                    </div>
                                  </Tooltip>
                                </td>
                                {agent["attendanceDetail"] &&
                                  Object.values(agent["attendanceDetail"]).map(
                                    (singleDate: any, index) => {
                                      return (
                                        <td
                                          key={agent.agentId + index}
                                          className="text-center"
                                          style={{ width: "138px" }}
                                        >
                                          <div
                                            onClick={togglePopoverHandler}
                                            className={`cursor-pointer ${classes["time-slot-box"]} ${classes.blue}`}
                                          >
                                            <span className="d-block">
                                              D1 Shift
                                            </span>
                                            {formatAMPM(
                                              new Date(singleDate.loginTime)
                                            ) +
                                              " - " +
                                              formatAMPM(
                                                new Date(singleDate.logoutTime)
                                              )}
                                          </div>
                                        </td>
                                      );
                                    }
                                  )}
                                <td
                                  className={classes["left-shadow-cell"]}
                                  style={{ width: "80px" }}
                                >
                                  <div>12</div>
                                </td>
                                <td style={{ width: "80px" }}>12</td>
                                <td style={{ width: "80px" }}>12</td>
                              </tr>
                            );
                          })}
                      </table>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {shiftBidDataSource.length && tabVal === "Shifts Bid" && (
          <div className={`${classes["tbl-container"]} w-100 slim-scroll`}>
            <table
              className={`${classes["standard-tbl-structure"]} ${classes["schedule-time-table"]}`}
            >
              <thead>
                <tr>
                  <th style={{ width: "70px" }} className="text-center">
                    ID
                  </th>
                  <th>Request To</th>
                  <th>Start Date &amp; time</th>
                  <th>Stop Date &amp; time</th>
                  <th style={{ width: "40%" }}>Shifts Offer by Supervisor</th>
                  <th className="text-center" style={{ width: "100px" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td
                    colSpan={6}
                    className="scrollParent"
                    style={{ padding: "0px", border: "0px" }}
                  >
                    <div className="table-scroll" ref={scrollBoxRef}>
                      <table className="scrollChild">
                        {shiftBidDataSource.map((rowData, index) => {
                          return (
                            <tr key={rowData.recordId}>
                              <td colSpan={6} className="p-0">
                                <table>
                                  <tr>
                                    <td
                                      style={{ width: "70px" }}
                                      className="text-center cursor-pointer"
                                      data-bs-toggle="collapse"
                                      data-bs-target={
                                        "#expandRow" + (index + 1)
                                      }
                                    >
                                      {index + 1}
                                    </td>
                                    <td
                                      data-bs-toggle="collapse"
                                      data-bs-target={
                                        "#expandRow" + (index + 1)
                                      }
                                      className="cursor-pointer"
                                    >
                                      <div className={classes.avatars}>
                                        {rowData.agentsDetails &&
                                          rowData.agentsDetails.length &&
                                          rowData.agentsDetails.map(
                                            (agent: any) => (
                                              <span key={agent.agentId}>
                                                <img
                                                  src={userImage}
                                                  className="media-img"
                                                  alt="media-img"
                                                />
                                              </span>
                                            )
                                          )}
                                      </div>
                                    </td>
                                    <td
                                      data-bs-toggle="collapse"
                                      data-bs-target={
                                        "#expandRow" + (index + 1)
                                      }
                                      className="cursor-pointer"
                                    >
                                      {rowData.startDateTime}
                                    </td>
                                    <td
                                      data-bs-toggle="collapse"
                                      data-bs-target={
                                        "#expandRow" + (index + 1)
                                      }
                                      className="cursor-pointer"
                                    >
                                      {rowData.stopDateTime}
                                    </td>
                                    <td
                                      data-bs-toggle="collapse"
                                      data-bs-target={
                                        "#expandRow" + (index + 1)
                                      }
                                      className="cursor-pointer"
                                      style={{ width: "40%" }}
                                    >
                                      {rowData.offeredShifts &&
                                        rowData.offeredShifts.length &&
                                        rowData.offeredShifts.map(
                                          (shift: string, index: number) => {
                                            return (
                                              <div
                                                key={
                                                  rowData.recordId + "" + index
                                                }
                                                className={`${classes["badge-item"]} d-inline-block me-1`}
                                              >
                                                <span
                                                  className={`${
                                                    classes["status-badge"]
                                                  } ${classes.dotless} ${
                                                    shift.includes("Regular")
                                                      ? classes.purple
                                                      : shift.includes("D1")
                                                      ? classes.yellow
                                                      : shift.includes("D2")
                                                      ? classes.blue
                                                      : classes.green
                                                  } d-flex align-items-center`}
                                                >
                                                  <i className="me-1">
                                                    <Monitor
                                                      size="10"
                                                      variant="Bold"
                                                    />
                                                  </i>
                                                  {shift}
                                                </span>
                                              </div>
                                            );
                                          }
                                        )}
                                    </td>
                                    <td
                                      className="text-center"
                                      style={{ width: "100px" }}
                                    >
                                      <i className="cursor-pointer">
                                        <Edit
                                          size="20"
                                          color="#666"
                                          onClick={() =>
                                            setEditShiftBidmodalShow(true)
                                          }
                                        />
                                      </i>
                                    </td>
                                  </tr>

                                  <tr
                                    className={`${classes["rendered-row-parent"]} opacity-row`}
                                  >
                                    <td
                                      colSpan={6}
                                      className="p-0 bg-transparent"
                                    >
                                      <div
                                        className="collapse"
                                        id={"expandRow" + (index + 1)}
                                      >
                                        <div className="m-4 mt-0">
                                          <div
                                            className={`${classes["compare_Wrapper"]} slim-scroll`}
                                          >
                                            <table
                                              className={`table ${classes["compare_Table"]}`}
                                            >
                                              <thead>
                                                <tr>
                                                  <th
                                                    className={`${classes["comp_heading"]} ${classes["comp_heading_1"]} ${classes["user-info-cell"]} text-center`}
                                                  >
                                                    Agents
                                                  </th>
                                                  <th
                                                    colSpan={2}
                                                    className={`${classes["comp_heading"]} ${classes["comp_heading_1"]} ${classes["bg-yellow"]} ${classes["text-center"]}`}
                                                  >
                                                    Agents Shift Priorities
                                                  </th>
                                                  <th
                                                    className={`${classes["comp_heading"]} ${classes["comp_heading_1"]} ${classes["bg-green"]} ${classes["text-center"]}`}
                                                  >
                                                    Supervisor Approval
                                                  </th>
                                                  <th
                                                    rowSpan={2}
                                                    className={`${classes["comp_heading"]} ${classes["grey-text"]} ${classes["border-left"]}  ${classes["text-center"]}`}
                                                    style={{ width: "130px" }}
                                                  >
                                                    Status
                                                  </th>
                                                  <th
                                                    rowSpan={2}
                                                    className={`${classes["comp_heading"]} ${classes["grey-text"]} ${classes["text-center"]}`}
                                                    style={{ width: "100px" }}
                                                  >
                                                    Actions
                                                  </th>
                                                  <th
                                                    className={` ${classes["status-dropdown"]} ${classes["comp_heading"]} ${classes["grey-text"]}`}
                                                    rowSpan={2}
                                                  >
                                                    <div className="dropdown d-inline-block  ">
                                                      <button
                                                        className="btn btn-sm dropdown-toggle"
                                                        type="button"
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                      >
                                                        <i>
                                                          <More
                                                            size="20"
                                                            color="#222"
                                                          />
                                                        </i>
                                                      </button>
                                                      <ul className="dropdown-menu menu-right">
                                                        <li>
                                                          <a
                                                            className="dropdown-item"
                                                            href="#"
                                                          >
                                                            Aprove All
                                                          </a>
                                                        </li>
                                                        <li>
                                                          <a
                                                            className="dropdown-item"
                                                            href="#"
                                                          >
                                                            Reject all
                                                          </a>
                                                        </li>
                                                      </ul>
                                                    </div>
                                                  </th>
                                                </tr>
                                                <tr>
                                                  <th
                                                    className={`${classes["comp_heading"]} ${classes["grey-text"]} ${classes["align_left"]} ${classes["user-name-cell"]} `}
                                                  >
                                                    Name
                                                  </th>
                                                  <th
                                                    className={`${classes["border-left"]} ${classes["comp_heading"]} ${classes["grey-text"]} ${classes["user-location-cell"]} ${classes["bg-light-yellow"]} ${classes["text-center"]}`}
                                                  >
                                                    Agent's Shift Priority 1
                                                  </th>
                                                  <th
                                                    className={`${classes["border-left"]} ${classes["comp_heading"]} ${classes["grey-text"]} ${classes["bg-light-yellow"]} ${classes["text-center"]}`}
                                                  >
                                                    Agent's Shift Priority 2
                                                  </th>
                                                  <th
                                                    className={`${classes["border-left"]} ${classes["comp_heading"]} ${classes["grey-text"]} ${classes["border-right-light"]} ${classes["bg-light-green"]}  ${classes["text-center"]}`}
                                                  >
                                                    Shift Approved by Supervisor
                                                  </th>
                                                </tr>
                                              </thead>
                                              <tbody>
                                                {rowData.agentsDetails &&
                                                  rowData.agentsDetails
                                                    .length &&
                                                  rowData.agentsDetails.map(
                                                    (agent: any) => {
                                                      return (
                                                        <tr
                                                          key={agent.agentId}
                                                          className={`${classes["rendered-row"]} ${classes["bg-white"]}`}
                                                        >
                                                          <td
                                                            className={`text-start ${classes["bg-white"]}`}
                                                          >
                                                            <div className="d-flex align-items-center">
                                                              <div className="me-3 position-relative">
                                                                <img
                                                                  src={
                                                                    userImage
                                                                  }
                                                                  className="media-img"
                                                                  alt="media-img"
                                                                />
                                                              </div>
                                                              <div className="media-body">
                                                                <span>
                                                                  {
                                                                    agent.agentName
                                                                  }
                                                                </span>
                                                                <span className="d-block text-muted">
                                                                  {
                                                                    agent.agentId
                                                                  }
                                                                </span>
                                                              </div>
                                                            </div>
                                                          </td>
                                                          <td
                                                            className={`${classes["text-center"]} ${classes["bg-white"]}`}
                                                          >
                                                            <div
                                                              className={`${classes["badge-item"]} d-inline-block`}
                                                            >
                                                              {agent.agentShiftPriority1 &&
                                                              agent
                                                                .agentShiftPriority1
                                                                .length > 0 ? (
                                                                <span
                                                                  className={`${
                                                                    classes[
                                                                      "status-badge"
                                                                    ]
                                                                  } ${
                                                                    classes.dotless
                                                                  } d-flex align-items-center ${
                                                                    agent.agentShiftPriority1.includes(
                                                                      "Regular"
                                                                    )
                                                                      ? classes.purple
                                                                      : agent.agentShiftPriority1.includes(
                                                                          "D1"
                                                                        )
                                                                      ? classes.yellow
                                                                      : agent.agentShiftPriority1.includes(
                                                                          "D2"
                                                                        )
                                                                      ? classes.blue
                                                                      : classes.green
                                                                  }`}
                                                                >
                                                                  <i className="me-1">
                                                                    <Monitor
                                                                      size="10"
                                                                      variant="Bold"
                                                                    />
                                                                  </i>
                                                                  {
                                                                    agent.agentShiftPriority1
                                                                  }
                                                                </span>
                                                              ) : (
                                                                "-"
                                                              )}
                                                            </div>
                                                          </td>
                                                          <td
                                                            className={`${classes["text-center"]} ${classes["bg-white"]}`}
                                                          >
                                                            <div
                                                              className={`${classes["badge-item"]} d-inline-block`}
                                                            >
                                                              {agent.agentShiftPriority2 &&
                                                              agent
                                                                .agentShiftPriority2
                                                                .length > 0 ? (
                                                                <span
                                                                  className={`${
                                                                    classes[
                                                                      "status-badge"
                                                                    ]
                                                                  } ${
                                                                    classes.dotless
                                                                  } d-flex align-items-center ${
                                                                    agent.agentShiftPriority2.includes(
                                                                      "Regular"
                                                                    )
                                                                      ? classes.purple
                                                                      : agent.agentShiftPriority2.includes(
                                                                          "D1"
                                                                        )
                                                                      ? classes.yellow
                                                                      : agent.agentShiftPriority2.includes(
                                                                          "D2"
                                                                        )
                                                                      ? classes.blue
                                                                      : classes.green
                                                                  }`}
                                                                >
                                                                  <i className="me-1">
                                                                    <Monitor
                                                                      size="10"
                                                                      variant="Bold"
                                                                    />
                                                                  </i>
                                                                  {
                                                                    agent.agentShiftPriority2
                                                                  }
                                                                </span>
                                                              ) : (
                                                                "-"
                                                              )}
                                                            </div>
                                                          </td>
                                                          <td
                                                            className={`${classes["text-center"]} ${classes["bg-white"]}`}
                                                          >
                                                            <div
                                                              className={`${classes["badge-item"]} d-inline-block`}
                                                            >
                                                              {agent.agentShiftApprovedbySupervisor &&
                                                              agent
                                                                .agentShiftApprovedbySupervisor
                                                                .length > 0 ? (
                                                                <span
                                                                  className={`${
                                                                    classes[
                                                                      "status-badge"
                                                                    ]
                                                                  } ${
                                                                    classes.dotless
                                                                  } d-flex align-items-center ${
                                                                    agent.agentShiftApprovedbySupervisor.includes(
                                                                      "Regular"
                                                                    )
                                                                      ? classes.purple
                                                                      : agent.agentShiftApprovedbySupervisor.includes(
                                                                          "D1"
                                                                        )
                                                                      ? classes.yellow
                                                                      : agent.agentShiftApprovedbySupervisor.includes(
                                                                          "D2"
                                                                        )
                                                                      ? classes.blue
                                                                      : classes.green
                                                                  }`}
                                                                >
                                                                  <i className="me-1">
                                                                    <Monitor
                                                                      size="10"
                                                                      variant="Bold"
                                                                    />
                                                                  </i>
                                                                  {
                                                                    agent.agentShiftApprovedbySupervisor
                                                                  }
                                                                </span>
                                                              ) : (
                                                                "-"
                                                              )}
                                                            </div>
                                                          </td>

                                                          <td
                                                            className={`${classes["text-center"]} ${classes["bg-white"]}`}
                                                          >
                                                            <span
                                                              className={`text-center ${
                                                                classes[
                                                                  "status-badge"
                                                                ]
                                                              } ${
                                                                agent.shiftStatus ===
                                                                "Pending"
                                                                  ? classes.yellow
                                                                  : agent.shiftStatus ===
                                                                    "Approved"
                                                                  ? classes.green
                                                                  : classes.purple
                                                              }`}
                                                            >
                                                              {
                                                                agent.shiftStatus
                                                              }
                                                            </span>
                                                          </td>
                                                          <td
                                                            className={`${classes["text-center"]} ${classes["bg-white"]}`}
                                                          >
                                                            {/* <span className={classes['action-icon']} data-bs-target="#approveShiftBidModal" data-bs-toggle="modal"> */}
                                                            {agent.shiftStatus ===
                                                            "Pending" ? (
                                                              <i className="me-2 cursor-pointer">
                                                                <TickCircle
                                                                  size="20"
                                                                  color="#666"
                                                                  className={
                                                                    classes[
                                                                      "approve-shift-icon"
                                                                    ]
                                                                  }
                                                                  onClick={() =>
                                                                    shiftBidApproval(
                                                                      agent.agentId,
                                                                      rowData.recordId
                                                                    )
                                                                  }
                                                                />
                                                              </i>
                                                            ) : (
                                                              <i className="me-2 cursor-pointer">
                                                                <Edit
                                                                  size="20"
                                                                  color="#666"
                                                                  className={
                                                                    classes[
                                                                      "edit-shift-icon"
                                                                    ]
                                                                  }
                                                                  onClick={() =>
                                                                    setEditShiftBidmodalShow(
                                                                      true
                                                                    )
                                                                  }
                                                                />
                                                              </i>
                                                            )}
                                                            <i className="cursor-pointer">
                                                              <CloseCircle
                                                                size="20"
                                                                color="#666"
                                                                className={
                                                                  classes[
                                                                    "reject-shift-icon"
                                                                  ]
                                                                }
                                                              />
                                                            </i>
                                                          </td>
                                                          <td
                                                            className={`${classes["text-center"]} ${classes["bg-white"]}`}
                                                          ></td>
                                                        </tr>
                                                      );
                                                    }
                                                  )}
                                              </tbody>
                                            </table>
                                          </div>
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                </table>
                              </td>
                            </tr>
                          );
                        })}
                        {/* <tr>
                                                    <td colSpan={6} className="p-0">
                                                        <table>

                                                            <tr>
                                                                <td style={{width: '70px'}} className="text-center" data-bs-toggle="collapse" data-bs-target="#expandRow">1</td>
                                                                <td data-bs-toggle="collapse" data-bs-target="#expandRow">
                                                                    <div className={classes.avatars}>
                                                                        <span><img src={userImage} className="media-img" alt="media-img" /></span>
                                                                        <span><img src={userImage} className="media-img" alt="media-img" /></span>
                                                                    </div>
                                                                </td>
                                                                <td data-bs-toggle="collapse" data-bs-target="#expandRow">29 Nov 2021, 11:00 PM CST</td>
                                                                <td data-bs-toggle="collapse" data-bs-target="#expandRow">29 Nov 2021, 03:00 AM CST</td>
                                                                <td data-bs-toggle="collapse" data-bs-target="#expandRow" style={{width: '40%'}}>
                                                                    <div className={`${classes['badge-item']} d-inline-block me-1`}>
                                                                        <span className={`${classes['status-badge']} ${classes.dotless} ${classes.purple} d-flex align-items-center`}><i className="me-1"><Monitor size="10" color="#6F82E8" variant="Bold"/></i>Regular (9:00AM - 6:00PM)</span>
                                                                    </div>
                                                                    <div className={`${classes['badge-item']} d-inline-block me-1`}>
                                                                        <span className={`${classes['status-badge']} ${classes.dotless} ${classes.yellow} d-flex align-items-center`}><i className="me-1"><Monitor size="10" color="#ef9829" variant="Bold"/></i>D1 (6:00PM - 2:00AM)</span>
                                                                    </div>
                                                                    <div className={`${classes['badge-item']} d-inline-block`}>
                                                                        <span className={`${classes['status-badge']} ${classes.dotless} ${classes.blue} d-flex align-items-center`}><i className="me-1"><Monitor size="10" color="#46b0e6" variant="Bold"/></i>D2 (6:00PM - 2:00AM)</span>
                                                                    </div>
                                                                    <div className={`${classes['badge-item']} d-inline-block me-1`}>
                                                                        <span className={`${classes['status-badge']} ${classes.dotless} ${classes.green} d-flex align-items-center`}><i className="me-1"><Home2 size="10" color="#03C04A" variant="Bold"/></i><i className="me-1"><Monitor size="10" color="#03C04A" variant="Bold"/></i>D3 (12:00AM - 12:59AM)</span>
                                                                    </div>
                                                                    
                                                                </td>
                                                                <td className="text-center" style={{width: '100px'}}>
                                                                    <a href="#" className="action-icon" data-bs-toggle="modal" data-bs-target="#addShiftBidModal"><i className="icon icon-edit"><Edit size="20" color="#666" /></i></a>
                                                                </td>
                                                            </tr>

                                                            <tr className={`${classes['rendered-row-parent']} opacity-row`}>
                                                                <td colSpan={6} className="p-0 bg-transparent">
                                                                    <div className="collapse" id="expandRow">
                                                                        <div className="m-4 mt-0">
                                                                            <div className={`${classes['compare_Wrapper']} slim-scroll`}>
                                                                                <table className={`table ${classes['compare_Table']}`}>
                                                                                    <thead>
                                                                                        <tr>
                                                                                            <th className={`${classes['comp_heading']} ${classes['comp_heading_1']} ${classes['user-info-cell']} text-center`}>Agents</th>
                                                                                            <th colSpan={2} className={`${classes['comp_heading']} ${classes['comp_heading_1']} ${classes['bg-yellow']} ${classes['text-center']}`}>Agents Shift Priorities</th>
                                                                                            <th className={`${classes['comp_heading']} ${classes['comp_heading_1']} ${classes['bg-green']} ${classes['text-center']}`}>Supervisor Approval</th>
                                                                                            <th rowSpan={2} className={`${classes['comp_heading']} ${classes['grey-text']} ${classes['border-left']}  ${classes['text-center']}`} style={{width: '130px'}}>Status</th>
                                                                                            <th rowSpan={2} className={`${classes['comp_heading']} ${classes['grey-text']} ${classes['text-center']}`} style={{width: '100px'}}>Actions
                                                                                            </th>
                                                                                            <th className={` ${classes['status-dropdown']} ${classes['comp_heading']} ${classes['grey-text']}`} rowSpan={2}>
                                                                                                <div className="dropdown d-inline-block  ">
                                                                                                    <button className="btn btn-sm dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                                                                                                        <i><More size="20" color="#222" /></i>
                                                                                                    </button>
                                                                                                    <ul className="dropdown-menu menu-right">
                                                                                                        <li><a className="dropdown-item" href="#">Aprove All</a></li>
                                                                                                        <li><a className="dropdown-item" href="#">Reject all</a></li>
                                                                                                    </ul>
                                                                                                </div>
                                                                                            </th>
                                                                                        </tr>
                                                                                        <tr>
                                                                                            <th className={`${classes['comp_heading']} ${classes['grey-text']} ${classes['align_left']} ${classes['user-name-cell']} `}>Name</th>
                                                                                            <th className={`${classes['border-left']} ${classes['comp_heading']} ${classes['grey-text']} ${classes['user-location-cell']} ${classes['bg-light-yellow']} ${classes['text-center']}`}>Agent's Shift Priority 1</th>
                                                                                            <th className={`${classes['border-left']} ${classes['comp_heading']} ${classes['grey-text']} ${classes['bg-light-yellow']} ${classes['text-center']}`}>Agent's Shift Priority 2</th>
                                                                                            <th className={`${classes['border-left']} ${classes['comp_heading']} ${classes['grey-text']} ${classes['border-right-light']} ${classes['bg-light-green']}  ${classes['text-center']}`}>Shift Approved by Supervisor</th>
                                                                                        </tr>
                                                                                    </thead>
                                                                                    <tbody>
                                                                                        <tr className={`${classes['rendered-row']} ${classes['bg-white']}`}>
                                                                                            <td className={`text-start ${classes['bg-white']} `}>
                                                                                                <div className="d-flex align-items-center">
                                                                                                    <div className="me-3 position-relative">
                                                                                                        <img src={userImage} className="media-img" alt="media-img" />
                                                                                                    </div>
                                                                                                    <div className="media-body">
                                                                                                        <span>Jeobiden Smith</span>
                                                                                                        <span className="d-block text-muted">34567</span>
                                                                                                    </div>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className={`${classes['text-center']} ${classes['bg-white']}`}>
                                                                                                <div className={`${classes['badge-item']} d-inline-block`}>
                                                                                                    <span className={`${classes['status-badge']} ${classes.dotless} d-flex align-items-center ${classes.purple}`}><i className="me-1"><Monitor size="10" color="#6F82E8" variant="Bold"/></i>Regular (9:00AM - 6:00PM)</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className={`${classes['text-center']} ${classes['bg-white']}`}>
                                                                                                <div className={`${classes['badge-item']} d-inline-block`}>
                                                                                                    <span className={`${classes['status-badge']} ${classes.dotless} d-flex align-items-center ${classes.yellow}`}><i className="me-1"><Monitor size="10" color="#ef9829" variant="Bold"/></i>D1 (6:00PM - 2:00AM)</span>
                                                                                                </div>
                                                                                            </td>
                                                                                            <td className={`${classes['text-center']} ${classes['bg-white']}`}>
                                                                                                <div className={`${classes['badge-item']} d-inline-block`}>
                                                                                                    - 
                                                                                                </div>
                                                                                            </td>

                                                                                            <td className={`${classes['text-center']} ${classes['bg-white']}`}>
                                                                                                <span className={`${classes['status-badge']} ${classes.yellow} text-center`}>Pending</span>
                                                                                            </td>
                                                                                            <td className={`${classes['text-center']} ${classes['bg-white']}`}>
                                                                                                <a href="#" className={classes['action-icon']} data-bs-target="#approveShiftBidModal" data-bs-toggle="modal"><i><TickCircle size="20" color="#666" className={classes['approve-shift-icon']} /></i></a>
                                                                                                <a href="#" className={classes['action-icon']}><i><CloseCircle size="20" color="#666" className={classes['reject-shift-icon']} /></i></a>
                                                                                            </td>
                                                                                            <td className={`${classes['text-center']} ${classes['bg-white']}`}></td>
                                                                                        </tr>
                                                                                    </tbody>
                                                                                </table>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </table>
                                                    </td>
                                                </tr> */}
                      </table>
                    </div>
                    <>
                      {editShiftBidmodalShow && (
                        <EditShiftBid
                          show={editShiftBidmodalShow}
                          editOnHide={() => setEditShiftBidmodalShow(false)}
                        />
                      )}
                      {shiftBidApprovalmodalShow && (
                        <ShiftBidApproval
                          show={shiftBidApprovalmodalShow}
                          editOnHide={() => setShiftBidApprovalmodalShow(false)}
                          editShiftEmpId={editShiftEmpId}
                          editShiftRecId={editShiftRecId}
                        />
                      )}
                    </>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
        <div className="bg-white p-4" ref={footerRef}>
          <PaginatedItems />
        </div>
      </div>
      <PopOver
        openPopover={open}
        anchorEl={anchorElPopover}
        closePopover={closePopoverHandler}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "center", horizontal: "left" }}
        isSupAttendance={true}
      />
    </React.Fragment>
  );
};

export default SupervisorAttendance;

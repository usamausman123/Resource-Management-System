import { TickCircle, CloseCircle, More } from "iconsax-react";
import {I2cButton, I2cDropdown, I2cMenuItem } from "@webcomponents/i2cwebcomponents/dist/react";
// import "./SupervisorFlexRequest.css";
import classes from "./SupervisorFlexRequest.module.css";

export const SupervisorFlexRequestDetail = (props: any) => {
  let dataSets: any;
  dataSets = props.agents;

  // Edit
  const Edit = (e: any) => {
    alert("alert");
  };

  // Edit
  const Delete = (e: any) => {
    alert("alert");
  };

  // Handler
  const handleClick = (e: any) => {
    alert("Popup");
  };

  return (
    <div className={classes['supervisor-flex-request-childrow']}>
      <table>
        <thead>
          <tr className={`table-header ${classes['first-header-group']}`}>
            <th colSpan={2}>User</th>
            <th colSpan={2}>Regular Shift Time</th>
            <th colSpan={2}>Agent's Flex Time</th>
            <th style={{ background: "#FAFAFC" }} rowSpan={2}>
              Status
            </th>
            <th className="border-end-0" style={{ background: "#FAFAFC" }} rowSpan={2}  >
              <div>Actions</div>
            </th>
            <th className="border-start-0" style={{ background: "#FAFAFC" }} rowSpan={2}>
                <I2cDropdown>
                  <I2cButton slot="trigger"><More size="18" color="#000" /></I2cButton>
                  <I2cMenuItem onClick={handleClick}>Approve All</I2cMenuItem>
                  <I2cMenuItem onClick={handleClick}>Reject All</I2cMenuItem>
                </I2cDropdown>
            </th>
          </tr>
          <tr className={`table-header ${classes['second-header-group']}`}>
            <th className="text-start border-end-0 ps-4">Name</th>
            <th className="text-start border-start-0">Location</th>
            <th className="border-end-0">Start Time</th>
            <th className="border-start-0">Stop Time</th>
            <th className="border-end-0">Start Time</th>
            <th className="border-start-0">Stop Time</th>
          </tr>
        </thead>
        <tbody>
          {
            dataSets.map((dataSet: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="text-start ps-4">
                    {
                      dataSet.availibility === "Available" ?
                      // <div className={`tooltip ${classes['agent-name']}`}>
                      <div className={classes['agent-name']}>
                        <div className={classes.tooltiptext}>
                          <span className="online"></span> Available
                        </div>
                        <img className="rounded-circle me-3" src={dataSet.image} alt="Agent Profile" style={{background: 'rgb(238, 238, 238)'}} />
                        <p className="d-inline-block align-middle mb-0">
                          {dataSet.agent_name}
                          <span className="d-block">{dataSet.ticket_number}</span>
                        </p>
                      </div> :
                      <>
                        <img className="rounded-circle me-3" src={dataSet.image} alt="Agent Profile" style={{background: 'rgb(238, 238, 238)'}} />
                        <p className="d-inline-block align-middle mb-0">
                          {dataSet.agent_name}
                          <span className="d-block">{dataSet.ticket_number}</span>
                        </p>
                      </>
                    }
                  </td>
                  <td className="text-start">{dataSet.location}</td>
                  <td>{dataSet.start_date}</td>
                  <td>{dataSet.stop_date}</td>
                  <td>{dataSet.flex_start_date}</td>
                  <td>{dataSet.flex_stop_date}</td>
                  <td><span className={"status-badge status" + dataSet.status}>{dataSet.status}</span></td>
                  <td className="text-center">
                    {/* <div className={`tooltip ${classes['agent-name']}`}> */}
                    <div className={`me-1 ${classes['agent-name']}`}>
                      <div className={classes.tooltiptext}>Approve</div>
                      <TickCircle className="cursor-pointer" size="20" color="#70728F" onClick={(e) => Edit(e)} />
                    </div>
                    {/* <div className={`tooltip ${classes['agent-name']}`}> */}
                    <div className={classes['agent-name']}>
                      <div className={classes.tooltiptext}>Reject</div>
                      <CloseCircle className="cursor-pointer" size="20" color="#70728F" onClick={(e) => Delete(e)} />
                    </div>
                  </td>
                  <td></td>
                </tr>
              );
            })
          }
        </tbody>
      </table>
    </div>
  );
};

export default SupervisorFlexRequestDetail;

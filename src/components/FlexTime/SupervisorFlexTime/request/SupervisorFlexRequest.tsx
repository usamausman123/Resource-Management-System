import React from "react";
import SupervisorFlexRequestDetail from "./SupervisorFlexRequestDetail";
// import "./SupervisorFlexRequest.css";
import classes from "./SupervisorFlexRequest.module.css";

export const SupervisorFlexRequest = (props: any) => {
  let dataSets: any;
  dataSets = props.requestData;

  const handleClick = (e: any) => {
    let getDataId = e.currentTarget.getAttribute("data-id");
    var child_id = "child_id" + getDataId;
    if (document.getElementById(child_id)?.hasAttribute("class")) {
      document.getElementById(child_id)?.removeAttribute("class");
    } else {
      document.getElementById(child_id)?.setAttribute("class", "hidden");
    }
  };

  return (
    <table className={classes['supervisor-flex-request-table']}>
      <thead>
        <tr className="table-header">
          <th className="ps-4">ID</th>
          <th>Request From</th>
          <th>Start Date &amp; Time</th>
          <th>stop Date &amp; Time</th>
          <th>Criteria</th>
          <th className="text-center">Factor</th>
          <th className="text-center">Amount</th>
          <th>Incentive Description</th>
        </tr>
      </thead>
      <tbody>
        {dataSets.map((dataSet: any, index: any) => {
          return (
            <React.Fragment key={index}>
              {/* <tr className={`parent-row ${classes['alternate-row']}`} id={"parent_id" + dataSet.id} data-id={dataSet.id} onClick={(e) => handleClick(e)}> */}
              <tr className='parent-row' id={"parent_id" + dataSet.id} data-id={dataSet.id} onClick={(e) => handleClick(e)}>
                <td className="ps-4"> {dataSet.id}</td>
                <td>
                  {
                    dataSet.agents.length <= 3 ?
                    <ul className={`d-flex align-items-center ${classes['request-agent']}`}>
                      {
                        dataSet.agents.map((agent: any, i: any) => {
                          return (
                            <li key={i}>
                              {
                                agent.availibility === "Available" ?
                                // <div className={`tooltip ${classes['agent-name']}`}>
                                <div className={`${classes['agent-name']}`}>
                                  <div className={classes.tooltiptext}><span className="online"></span> Available</div>
                                  <img key={i} style={{borderRadius: 50, background: "#eee", width: '40px'}} src={agent.image} alt="Agent profile" />
                                </div> :
                                <img key={i} style={{ borderRadius: 50, background: "#eee", width: '40px'}} src={agent.image} alt="Agent profile" />
                              }
                            </li>
                          );
                        })
                      }
                    </ul> :
                    <ul className={`d-flex align-items-center ${classes['request-agent']} ${classes['list-style']}`}>
                      {
                        dataSet.agents.map((agent: any, i: any) => {
                          return (
                            <li key={i}>
                              {
                                agent.status ?
                                // <div className={`tooltip ${classes['agent-name']}`}>
                                <div className={`${classes['agent-name']}`}>
                                  <div className={classes.tooltiptext}><span className="online"></span> Available</div>
                                  <img style={{ borderRadius: 50, background: "#eee", width: '40px'}} src={agent.image} alt="Agent Profile" />
                                </div> :
                                <img style={{ borderRadius: 50, background: "#eee", width: '40px'}} src={agent.image} alt="Agent Profile" />
                              }
                            </li>
                          );
                        })
                      }
                      <li>
                        <span>+{dataSet.agents.length - 3}</span>
                      </li>
                    </ul>

                  }
                </td>
                <td>{dataSet.start_date}</td>
                <td>{dataSet.stop_date}</td>
                <td>{dataSet.criteria}</td>
                <td className="text-center">{dataSet.factor}</td>
                <td className="text-center" style={{color: `${dataSet.Amount ? '#46B0E6' : 'inherit'}`}}>{dataSet.Amount ? ('$'+dataSet.Amount) : '-'}</td>
                <td>{dataSet.description}</td>
              </tr>
              <tr id={"child_id" + dataSet.id} data-id={dataSet.id} className="hidden">
                <td colSpan={9}>
                  <SupervisorFlexRequestDetail agents={dataSet.agents} />
                </td>
              </tr>
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default SupervisorFlexRequest;

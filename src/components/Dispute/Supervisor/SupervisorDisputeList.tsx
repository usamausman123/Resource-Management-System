import React, { useState } from "react";
import { I2cAvatar } from "@webcomponents/i2cwebcomponents/dist/react";
import Approved from "./SupervisorDisputeTables/Approved";
import Pending from "./SupervisorDisputeTables/Pending";
import { Edit2, CloseCircle } from "iconsax-react";
import ApproveRejectDisputeDialog from "../../dialogs/ApproveRejectDisputeDialog/ApproveRejectDisputeDialog";
import DisputeRejection from "../../dialogs/DisputeRejection/DisputeRejection";
import classes from './SupervisorDispute.module.css';

export const SupervisorDisputeList = (props: any) => {
  let dataSets: any;
  dataSets = props.data;

  const [editModalId, setEditModalId] = useState(null);
  const [deleteModalId, setDeleteModalId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [rejectionModalShow, setRejectionModalShow] = useState(false);


  // Edit
  const Edit = (i: any) => {
    setModalShow(true);
    setEditModalId(i);
  };

  // Delete
  const Delete = (i: any) => {
    setRejectionModalShow(true);
    setDeleteModalId(i);
  };

  const modalHide = () => {
    setModalShow(false);
    setRejectionModalShow(false);
  };

  const handleClick = (e: any, i: any) => {
    let getDataId = e.currentTarget.getAttribute("data-id");
    var child_id = "child_id" + getDataId;
    if (document.getElementById(child_id)?.hasAttribute("class")) {
      document.getElementById(child_id)?.removeAttribute("class");
    } else {
      document.getElementById(child_id)?.setAttribute("class", "hidden");
    }
    setEditModalId(i);
  };

  return (
    <>
      <table className={classes['supervisor-dispute-table']}>
        <thead>
          <tr className="table-header">
            <th className="ps-4">Name</th>
            <th>Ticket Number</th>
            <th>Dispute Type</th>
            <th>Start Date &amp; Time</th>
            <th>stop Date &amp; Time</th>
            <th className="text-center">Hours</th>
            <th>Agent Notes/Comments</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataSets.map((dataSet: any, index: any) => {
            return (
              <React.Fragment key={index}>
                <tr className="parent-row" key={dataSet.id}>
                  <td className="ps-4" data-id={dataSet.id} onClick={(e) => handleClick(e, dataSet.dispute_type)}>
                    <I2cAvatar className={`me-3 ${classes['dispute-avatar']}`} image={dataSet.image} label="Agent Image" />
                    <span className="d-inline-block mb-0 align-middle">
                      {dataSet.agent_name} 
                      <span style={{ display: "block" }}> {dataSet.ticket_number}</span>
                    </span>
                  </td>
                  <td data-id={dataSet.id} onClick={(e) => handleClick(e, dataSet.dispute_type)}>{dataSet.ticket_number}</td>
                  <td data-id={dataSet.id} onClick={(e) => handleClick(e, dataSet.dispute_type)}>{dataSet.dispute_type}</td>
                  <td data-id={dataSet.id} onClick={(e) => handleClick(e, dataSet.dispute_type)}>{dataSet.start_date}</td>
                  <td data-id={dataSet.id} onClick={(e) => handleClick(e, dataSet.dispute_type)}>{dataSet.stop_date}</td>
                  <td className="text-center" data-id={dataSet.id} onClick={(e) => handleClick(e, dataSet.dispute_type)}>{dataSet.hour}</td>
                  <td data-id={dataSet.id} onClick={(e) => handleClick(e, dataSet.dispute_type)}>{dataSet.comments}</td>
                  <td data-id={dataSet.id} onClick={(e) => handleClick(e, dataSet.dispute_type)}><span className={"status-badge status" + dataSet.status}>{dataSet.status}</span></td>
                  <td>
                    <Edit2 className="cursor-pointer" size="16" color="#70728F" onClick={(e) => Edit(dataSet.dispute_type)} />
                    <CloseCircle className="cursor-pointer" size="16" color="#70728F" onClick={(e) => Delete(dataSet.dispute_type)} />
                  </td>
                </tr>
                <tr id={"child_id" + dataSet.id} data-id={dataSet.id} className="hidden">
                  <td colSpan={9}>
                    {
                      dataSet.status === "Pending" ?
                      <Pending className="child-table" agents={dataSet.agents} dataset={dataSets} modalid={editModalId} /> :
                      <Approved className="child-table" agents={dataSet.agents} dataset={dataSets} modalid={editModalId} />
                    }
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      
      {modalShow && (
        <ApproveRejectDisputeDialog
          show={modalShow}
          edithide={modalHide}
          modalid={editModalId}
          dataset={dataSets}
        />
      )}
      {rejectionModalShow && (
        <DisputeRejection
          show={rejectionModalShow}
          edithide={modalHide}
          modalid={deleteModalId}
          dataset={dataSets}
        />
      )}
    </>
  );
};

export default SupervisorDisputeList;

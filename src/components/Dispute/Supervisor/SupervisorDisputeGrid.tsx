import { useEffect, useState } from "react";
import { I2cAvatar } from '@webcomponents/i2cwebcomponents/dist/react';
import { TickCircle, CloseCircle } from "iconsax-react";
import ApproveRejectDisputeDialog from "../../dialogs/ApproveRejectDisputeDialog/ApproveRejectDisputeDialog";
import DisputeRejection from "../../dialogs/DisputeRejection/DisputeRejection";
import classes from './SupervisorDispute.module.css';

export const SupervisorDisputeGrid = (props: any) => {
  let dataSets: any;
  dataSets = props.data;

  const [modalId, setModalId] = useState(null);
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
  useEffect(() => {}, []);

  const modalHide = () => {
    setModalShow(false);
    setRejectionModalShow(false);
  };
  return (
    <>
      <div className={`grid-container ${classes['grid-container']}`}>
        {dataSets.map((dataSet: any, index: any) => {
          return (
            <div className="col-xl-4 col-lg-4 col-md-6 col-sm-12" key={index}>
              <div className="component-grid">
                <table className="component-grid-table">
                  <tbody className="component-grid-tbody">
                    <tr className="component-grid-tr">
                      <td className="component-grid-td">
                        <div className="d-flex align-items-center">
                          <I2cAvatar
                            className={`me-3 ${classes['dispute-avatar']}`}
                            image={dataSet.image}
                            label="Avatar"
                          />
                          <div className={classes.avatarInfo}>
                            <h5>{dataSet.agent_name}</h5>
                            {dataSet.ticket_number}
                          </div>
                        </div>
                      </td>
                      <td className="component-grid-td">
                        <h5>Ticket Number</h5>
                        {dataSet.ticket_number}
                      </td>
                      <td className="component-grid-td text-end">
                        <div className="hourCalendar">
                          <span className="value">{dataSet.hour}</span>
                          <span className="unit">Hrs</span>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="component-grid-td">
                        <h5>Start Date &amp; Time</h5>
                        {dataSet.start_date}
                      </td>
                      <td className="component-grid-td" colSpan={2}>
                        <h5>Stop Date &amp; Time</h5>
                        {dataSet.stop_date}
                      </td>
                    </tr>

                    <tr>
                      <td className="component-grid-td" colSpan={3}>
                        <h5>Dispute Type</h5>
                        {dataSet.dispute_type}
                      </td>
                    </tr>

                    <tr>
                      <td className="component-grid-td" colSpan={3}>
                        <h5>Agents Notes/Comments</h5>
                        {dataSet.comments}
                      </td>
                    </tr>

                    <tr>
                      <td className="component-grid-td" colSpan={2}>
                        <span className={"status-badge status" + dataSet.status}>
                          {dataSet.status}
                        </span>
                      </td>
                      <td className="component-grid-td text-end">
                        <TickCircle
                          className="cursor-pointer me-2"
                          size="20"
                          color="#70728F"
                          onClick={(e) => Edit(dataSet.dispute_type)}
                        />
                        <CloseCircle
                          className="cursor-pointer"
                          size="20"
                          color="#70728F"
                          onClick={(e) => Delete(dataSet.dispute_type)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}

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
      </div>
    </>
  );
};

export default SupervisorDisputeGrid;

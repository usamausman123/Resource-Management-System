import React, { useState } from "react";
import { Popover } from "@mui/material";
import popoverClasses from "./PopOver.module.css";
import TimeOff from "../../components/dialogs/TimeOff/TimeOff";
import DisputeModal from "../../components/dialogs/DisputeModal";
import { PercentageSquare, Clock } from "iconsax-react";
import AgentRequestDisputeDialog from "../../components/dialogs/AgentRequestDisputeDialog/AgentRequestDisputeDialog";
import HoursCalculator from "../../components/dialogs/HoursCalculator/HoursCalculator";

const PopOver = (props: any) => {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openDisputeModal, setOpenDisputeModal] = useState(false);
  const [open, setOpen] = useState(false);

  const openRequestModalHandler = () => {
    setOpenRequestModal(true);
    props.closePopover();
  };
  const closeRequestModal = (value: boolean) => {
    setOpenRequestModal(value);
  };
  const openDisputeModalHandler = () => {
    setOpenDisputeModal(true);
    props.closePopover();
  };

  const openHoursCalculator = () => {
    setOpen(true);
    props.closePopover();
  };

  const closeDisputeModal = (value: boolean) => {
    setOpenDisputeModal(value);
  };

  return (
    <React.Fragment>
      <Popover
        open={props.openPopover}
        anchorEl={props.anchorEl}
        onClose={props.closePopover}
        anchorOrigin={props.anchorOrigin}
        transformOrigin={props.transformOrigin}
      >
        <div className={`${popoverClasses["popover-custom"]} text-left pb-0`}>
          <ul className={popoverClasses["shift-details"]}>
            <li className="pt-0 pe-0 ps-0">
              <div className={popoverClasses["popover-custom-header"]}>
                <h3 className="mb-2">
                  <i className="me-1">
                    <Clock size="16" />
                  </i>{" "}
                  Shift Schedule
                </h3>
                <div className={popoverClasses["scheduled-shift-time"]}>
                  <span
                    className={popoverClasses["scheduled-shift-time-label"]}
                  >
                    Scheduled:
                  </span>{" "}
                  <span className={popoverClasses["font-w-500"]}>
                    9h (09:00 AM - 6:00 PM)
                  </span>
                </div>
                <div
                  className={`${popoverClasses["text-blue"]} ${popoverClasses["available-shift-time"]}`}
                >
                  <span
                    className={popoverClasses["scheduled-shift-time-label"]}
                  >
                    Available:
                  </span>
                  <span className="font-w-500">
                    {" "}
                    8h 25m (09:35 AM - 6:00 PM)
                  </span>
                </div>
              </div>
            </li>
            <li className="d-flex justify-content-between">
              <span>Call Time</span>
              <span className={popoverClasses["shift-item-value"]}>2h 30m</span>
            </li>
            <li className="d-flex justify-content-between">
              <span>Training Time</span>
              <span className={popoverClasses["shift-item-value"]}>30m</span>
            </li>
            <li className="d-flex justify-content-between">
              <span>Ticket Management</span>
              <span className={popoverClasses["shift-item-value"]}>2h 30m</span>
            </li>
            <li className="d-flex justify-content-between">
              <span>Case Management</span>
              <span className={popoverClasses["shift-item-value"]}>1h 15m</span>
            </li>
            <li className="d-flex justify-content-between">
              <span>QA Time</span>
              <span className={popoverClasses["shift-item-value"]}>1h 25m</span>
            </li>
            <li className="d-flex justify-content-between">
              <span>Break Time</span>
              <span className={popoverClasses["shift-item-value"]}>1h</span>
            </li>
            <li className="d-flex justify-content-between">
              <span>Paid Time Off</span>
              <span className={popoverClasses["shift-item-value"]}>30m</span>
            </li>
            <li className="d-flex justify-content-between">
              <span>Unpaid Time Off</span>
              <span className={popoverClasses["shift-item-value"]}>30m</span>
            </li>
            <li className="d-flex justify-content-between">
              <span>Flex Time</span>
              <span className={popoverClasses["shift-item-value"]}>1h</span>
            </li>
            <li className="d-flex justify-content-between">
              <span>Occurences</span>
              <span className={popoverClasses["shift-item-value"]}>1.5pt</span>
            </li>

            {!props.isSupAttendance && (
              <li className="d-flex justify-content-between">
                <span>Request Time Off</span>
                <span className={popoverClasses["shift-item-value"]}>
                  <button
                    className={popoverClasses["text-red"]}
                    onClick={openRequestModalHandler}
                  >
                    Apply for Approval
                  </button>
                </span>
              </li>
            )}
          </ul>
          <div className="pb-2">
            <div className={popoverClasses.note}>
              An occurrence is point deductions documented as an absence, tardy
              or missed time clock in/out.
            </div>
          </div>
          {!props.isSupAttendance && (
            <div className={popoverClasses["custom-popover-footer"]}>
              <div>
                <i className="me-1">
                  <Clock size="16" color="#EE4723" />
                </i>
                <button
                  className={popoverClasses["text-red"]}
                  onClick={openDisputeModalHandler}
                >
                  Mark as Dispute
                </button>
              </div>
              <div>
                <span className="icon icon-calculator-2 me-1"></span>
                <i className="me-2">
                  <PercentageSquare size="16" />
                </i>
                <a href="#" onClick={openHoursCalculator}>Hours Calculator</a>
              </div>
            </div>
          )}
        </div>
      </Popover>
      {openRequestModal && <TimeOff
        title="Request Time Off"
        openModal={openRequestModal}
        closeModal={()=>setOpenRequestModal(false)}
      />}
      {/* <DisputeModal
        title="Dispute Request"
        openModal={openDisputeModal}
        closeModal={closeDisputeModal}
      /> */}
      {openDisputeModal && <AgentRequestDisputeDialog show={openDisputeModal} editonhide={()=>setOpenDisputeModal(false)} modalid={'Day'}/>}
      {open && (
              <HoursCalculator show={open} onHide={() => setOpen(false)} />
            )}
     </React.Fragment>
     
  );
};

export default PopOver;

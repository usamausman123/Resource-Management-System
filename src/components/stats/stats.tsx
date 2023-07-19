import { I2cCard, I2cButton } from "@webcomponents/i2cwebcomponents/dist/react";
import HoursCalculator from "../dialogs/HoursCalculator/HoursCalculator";
import TimeOff from "../dialogs/TimeOff/TimeOff";
import FlexTime from "../dialogs/FlexTime/FlexTime";
import RequestList from "../dialogs/RequestList/RequestList";
import DateRangePicker from "../calendar/DateRangePicker";
import {
  Calendar,
  DocumentText,
  Clock,
  Buildings2,
  Location,
  TickCircle,
  CloseCircle,
  PercentageSquare,
} from "iconsax-react";
import { useState } from "react";
import "./stats.css";

function Stats() {
  const [openRequestModal, setOpenRequestModal] = useState(false);
  const [openRequestListModal, setOpenRequestListModal] = useState(false);
  const [openFlexModal, setOpenFlexModal] = useState(false);

  const [open, setOpen] = useState(false);

  const closeRequestModal = (value: boolean) => {
    setOpenRequestModal(value);
  };
  return (
    <div className="stats">
      <div className="component-container">
        <div className="row">
          <div className="col-md-6">
            <h2>Quick Stats</h2>
            <p>
              Scheduled Shift: Mar 11,2021 - Mar 25, 2021{" "}
              <span className="d-inline-block">
                {" "}
                <DateRangePicker />{" "}
              </span>{" "}
            </p>
          </div>
          <div className="col-md-6 text-right mb-3 hours-calculator">
            <I2cButton
              className="button-default"
              size="x-small"
              onClick={() => setOpen(true)}
            >
              <PercentageSquare size="18" color="#666666" /> Hours Calculator
            </I2cButton>

            {open && (
              <HoursCalculator show={open} onHide={() => setOpen(false)} />
            )}
          </div>
        </div>

        <div className="row">
          <div className="col-xl-3 col-md-6">
            <I2cCard className="card-basic">
              <Calendar size="25" className="icon" />
              <strong className="card-title">Shift Time</strong>
              <p>09:00 AM to 6:00 PM</p>
              <span>
                {" "}
                <Location size="18" color="#46B0E6" /> NYK Office
              </span>
            </I2cCard>
          </div>

          <div className="col-xl-3 col-md-6">
            <I2cCard className="card-basic">
              <Clock size="25" className="icon" />
              <strong className="card-title">
                Request Time Off (Paid/Unpaid)
              </strong>
              <p>PTO Balnace - 4h 30m</p>
              <I2cButton
                className="button-default"
                onClick={() => {
                  setOpenRequestModal(true);
                }}
              >
                Request
              </I2cButton>
              <TimeOff
                title="Request Time Off (Paid/Unpaid)"
                openModal={openRequestModal}
                isStatsView={true}
                closeModal={()=>setOpenRequestModal(false)}
              />
            </I2cCard>
          </div>

          <div className="col-xl-3 col-md-6">
            <I2cCard className="card-basic">
              <DocumentText size="25" className="icon" />
              <strong className="card-title">Flex Time (6 hrs)</strong>
              <ul className="request-list">
                <li>Mar 21 to Mar 22</li>
                <li>Factor (2x)</li>
              </ul>
              <I2cButton
                className="button-default"
                onClick={() => { setOpenFlexModal(true); }}
              >
                View
              </I2cButton>

              <FlexTime title={"Request"} btnText={"Request"} show={openFlexModal} onHide={()=>setOpenFlexModal(false)}/>
            </I2cCard>
          </div>

          <div className="col-xl-3 col-md-6">
            <I2cCard className="card-basic">
              <Buildings2 size="25" className="icon" />
              <strong className="card-title">Requests</strong>
              <ul className="request-list">
                <li>
                  <TickCircle size="18" color="#03C04A" /> 1 Leave Approved
                </li>
                <li>
                  <CloseCircle size="18" color="#EE4723" /> 2 Pending Approvals
                </li>
              </ul>
              <I2cButton
                className="button-default"
                onClick={() => { setOpenRequestListModal(true); }}
              >
                View
              </I2cButton>

              <RequestList title={"Request"} btnText={"Request"} show={openRequestListModal} onHide={()=>setOpenRequestListModal(false)}/>
            </I2cCard>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Stats;

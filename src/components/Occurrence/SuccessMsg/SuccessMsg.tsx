import React from "react";
import classes from "../Occurrence.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../commonStyle.css";
import { CloseCircle, TickCircle } from "iconsax-react";

const SuccessMsg = (prop: any) => {
  return (
    <>
      <div className="Success-Alert row">
        <div className="col-sm-2 icon">
          <TickCircle size="32" color="#03C04A" />
        </div>
        <div className="col-sm-10">
          <p>Occurrence Rules Added Successfully!</p>
          <span>You have Added a new occurence rules successfully!</span>
        </div>
        <CloseCircle size="20" color="#666" onClick={prop.closeAlertProp} />
      </div>
    </>
  );
};

export default SuccessMsg;

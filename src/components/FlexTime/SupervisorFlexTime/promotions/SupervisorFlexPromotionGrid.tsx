import React, { useState } from "react";
import { Edit2, MessageEdit, PercentageCircle, Star1 } from "iconsax-react";
import EditFlex from "../../../dialogs/EditFlex/EditFlex";
import classes from "./SupervisorFlexPromotion.module.css";

export const SupervisorFlexPromotionGrid = (props: any) => {
  let dataSets: any;
  dataSets = props.promotionGridData;

  const [editModalShow, setEditModalShow] = useState(false);

  return (
    <div className={`grid-container ${classes['supervisor-flex-promotion-grid']}`}>
      {
        dataSets.map((dataSet: any, index: any) => {
          return (
            <React.Fragment key={index}>
              <div className="col-xxl-4 col-md-6 col-sm-12">
                <div className="component-grid">
                  <table className="component-grid-table">
                    <tbody className="component-grid-tbody">
                      <tr className="component-grid-tr">
                        <td className="component-grid-td">
                          <h5>Start Date &amp; Time</h5>
                          {dataSet.start_date}
                        </td>
                        <td className="component-grid-td">
                          <h5>Stop Date &amp; Time</h5>
                          {dataSet.stop_date}
                        </td>
                      </tr>

                      <tr>
                        <td className="component-grid-td" colSpan={2}>
                          <h5>Criteria</h5>
                          {dataSet.criteria}
                        </td>
                      </tr>

                      <tr>
                        <td className="component-grid-td" colSpan={2}>
                          <h5>Incentive Description</h5>
                          {dataSet.description}
                        </td>
                      </tr>

                      <tr>
                        <td className="component-grid-td">
                          <div className="d-flex align-items-center">
                            <span className={`${classes.factorLabel} me-3`}>
                              <PercentageCircle size="14" color="#EF9829" variant="Bold"/>
                              <span className={classes.textOrange}>{dataSet.factor}x</span> Factor
                            </span>
                            {
                              dataSet.Amount &&
                              <span className={`${classes.amountLabel} ms-3`}>
                                <Star1 size="14" color="#46B0E6" variant="Bold"/> 
                                <span className={classes.textBlue}>&#36;{dataSet.Amount}</span> Amount
                              </span>
                            }
                          </div>
                        </td>
                        <td className="component-grid-td text-end">
                          <Edit2 size="16" color="#70728F" className="cursor-pointer" onClick={() => setEditModalShow(true)} />
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </React.Fragment>
          );
        })
      }
      <EditFlex show={editModalShow} editOnHide={() => setEditModalShow(false)} />
    </div>
  );
};

export default SupervisorFlexPromotionGrid;

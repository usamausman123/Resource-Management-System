import React, { useState } from "react";
import { Edit2 } from "iconsax-react";
import classes from "./SupervisorFlexPromotion.module.css";
import EditFlex from "../../../dialogs/EditFlex/EditFlex";

export const SupervisorFlexPromotion = (props: any) => {
  let dataSets: any;
  dataSets = props.promotionData;

  const [editModalShow, setEditModalShow] = useState(false);

  // Edit
  const Edit = (e: any) => {
    setEditModalShow(true);
  };

  return (
    <div className={classes['supervisor-flex-promotion-list']}>
      <table>
        <thead>
          <tr className="table-header">
            <th className="ps-4">Start Date &amp; Time</th>
            <th>stop Date &amp; Time</th>
            <th>Criteria</th>
            <th className="text-center">Factor</th>
            <th className="text-center">Amount</th>
            <th>Incentive Description</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataSets.map((dataSet: any, index: any) => {
            return (
              <React.Fragment key={index}>
                <tr>
                  <td className="ps-4">{dataSet.start_date}</td>
                  <td>{dataSet.stop_date}</td>
                  <td>{dataSet.criteria}</td>
                  <td className="text-center">{dataSet.factor}</td>
                  <td className="text-center" style={{color: `${dataSet.Amount ? '#46B0E6' : 'inherit'}`}}>{dataSet.Amount ? ('$'+dataSet.Amount) : '-'}</td>
                  <td>{dataSet.description}</td>
                  <td className="text-center">
                    <Edit2 className="cursor-pointer" size="16" color="#70728F" onClick={(e) => Edit(dataSet.id)} />
                  </td>
                </tr>
              </React.Fragment>
            );
          })}
        </tbody>
      </table>
      <EditFlex show={editModalShow} editOnHide={() => setEditModalShow(false)} />
    </div>
  );
};

export default SupervisorFlexPromotion;

import { I2cButton } from "@webcomponents/i2cwebcomponents/dist/react";
import React, { useState } from "react";
import SelectFlextimeDialog from "../../dialogs/SelectFlextimeDialog/SelectFlextimeDialog";
import classes from './AgentFlexTime.module.css';

export const AgentFlexPromotionList = (props: any) => {
  let dataSets: any;
  dataSets = props.promotionData;

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className={classes['agent-flextime-list']}>
      <table>
        <thead>
          <tr className="table-header">
            <th className="ps-4">Start Date &amp; Time</th>
            <th>stop Date &amp; Time</th>
            <th>Criteria</th>
            <th className="text-center">Factor</th>
            <th className="text-center">Amount</th>
            <th>Incentive Description</th>
            <th className="pe-4 text-end">Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataSets.map((dataSet: any, index: any) => {
            return (
              <tr key={index}>
                <td className="ps-4">{dataSet.start_date}</td>
                <td>{dataSet.stop_date}</td>
                <td>{dataSet.criteria}</td>
                <td className="text-center">{dataSet.factor}</td>
                <td className="text-center" style={{color: `${dataSet.Amount ? '#46B0E6' : 'inherit'}`}}>{dataSet.Amount ? ('$'+dataSet.Amount) : '-'}</td>
                <td>{dataSet.description}</td>
                <td className="pe-4 text-end">
                  {
                    dataSet.status === "optin" ?
                    // <button className={"status" + dataSet.status} onClick={() => setModalShow(true)}>Opt In</button> : 
                    <I2cButton className="btn-optin" variant="primary" size="medium" onClick={() => setModalShow(true)}>Opt In</I2cButton> : 
                    <span className={"status-badge status" + dataSet.status}>{dataSet.status}</span>
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {
        modalShow && <SelectFlextimeDialog
        show={modalShow}
        editOnHide={() => setModalShow(false)}
        />
      }
      
    </div>
  );
};

export default AgentFlexPromotionList;

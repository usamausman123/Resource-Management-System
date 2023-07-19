import { I2cButton } from "@webcomponents/i2cwebcomponents/dist/react";
import { PercentageCircle, Star1 } from "iconsax-react";
import { useEffect, useState } from "react";
import SelectFlextimeDialog from "../../dialogs/SelectFlextimeDialog/SelectFlextimeDialog";
import classes from './AgentFlexTime.module.css';

export const AgentFlexPromotionGrid = (props: any) => {
  let dataSets: any;
  dataSets = props.promotionGridData;

  useEffect(() => {}, []);

  const [modalShow, setModalShow] = useState(false);

  return (
    <div className={`grid-container ${classes['agent-flextime-grid']} `}>
      {
        dataSets.map((dataSet: any, index: any) => {
          return (
            <div key={index} className="col-xxl-4 col-md-6 col-sm-12">
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
                    <tr className="component-grid-tr">
                      <td className="component-grid-td" colSpan={2}>
                        <h5>Criteris</h5>
                        {dataSet.criteria}
                      </td>
                    </tr>
                    <tr className="component-grid-tr">
                      <td className="component-grid-td" colSpan={2}>
                        <h5>Incentive Description</h5>
                        {dataSet.description}
                      </td>
                    </tr>
                    <tr className="component-grid-tr">
                      <td className="component-grid-td">
                        <div className="d-flex align-items-center">
                          <span className={`${classes.factorLabel} me-3`}>
                            <PercentageCircle size="14" color="#EF9829" variant="Bold"/>
                            <span className={classes.textOrange}>{dataSet.factor}x</span> Factor
                          </span> 
                          <span className={`${classes.amountLabel} ms-3`}>
                            <Star1 size="14" color="#46B0E6" variant="Bold"/> 
                            <span className={classes.textBlue}>&#36;{dataSet.Amount}</span> Amount
                          </span>
                        </div>
                      </td>
                      <td className="component-grid-td text-end">
                        {
                          dataSet.status === "optin" ?
                          <I2cButton className="btn-optin" variant="primary" size="medium" onClick={() => setModalShow(true)}>{dataSet.status}</I2cButton>:
                          <span className={"status-badge status" + dataSet.status}>{dataSet.status}</span>
                        }
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          );
        })
      }
      <SelectFlextimeDialog
        show={modalShow}
        editOnHide={() => setModalShow(false)}
      />
    </div>
  );
};

export default AgentFlexPromotionGrid;

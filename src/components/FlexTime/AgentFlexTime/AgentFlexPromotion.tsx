import { useState } from 'react';
import Flex_Time_Agent_Data from './Flex_Time_Agent_Data.json';
import AgentFlexPromotionGrid from './AgentFlexPromotionGrid';
import AgentFlexPromotionList from './AgentFlexPromotionList';
import PaginatedItems from './../../react-paginate/react-paginate'
import { Element3, RowVertical } from 'iconsax-react';
import { I2cMenuItem, I2cSelect } from '@webcomponents/i2cwebcomponents/dist/react';
import classes from  './AgentFlexTime.module.css';
import filterClasses from  '../../../assets/css/i2c-dropdown.module.css';

const AgentFlexPromotion = () => {
  const [flexTime, setFlexTime] = useState(Flex_Time_Agent_Data);
  const [toggle, setToggle] = useState(true);

  /*Change View */
  const toggler = () => {
    setToggle(prevState => !prevState);
  }
  return (
    <div className={`component-container ${classes['agent-flextime-wrapper']}`}>
      
      <div className={`p-4 ${classes["header-content"]}`}>
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-4 d-flex justify-content-lg-start justify-content-center mb-lg-0 mb-3">
            <h1 className="mb-0">Flex Time</h1>
          </div>
          <div className="col-lg-8 d-flex justify-content-lg-end justify-content-center align-items-center flex-wrap">
            <div className="dropdown d-inline-block me-3">
              <I2cSelect className={filterClasses["filters-dropdown"]} value="current-week">
                <I2cMenuItem className={filterClasses["dropdown-item"]} value="current-week">
                  Current Week
                </I2cMenuItem>
                <I2cMenuItem className={filterClasses["dropdown-item"]} value="last-week">
                  Last Week
                </I2cMenuItem>
                <I2cMenuItem className={filterClasses["dropdown-item"]} value="last-15-days">
                  Last 15 Days
                </I2cMenuItem>
              </I2cSelect>
            </div>

            <div className="dropdown d-inline-block">
              <div className="switch-container">
                <button className="button" onClick={toggler} disabled={toggle}>
                  <RowVertical size="18" />
                </button>
                <button disabled={toggle === false} className="button" onClick={toggler}>
                  <Element3 size="20" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      { toggle ? <AgentFlexPromotionList promotionData={flexTime} /> : <AgentFlexPromotionGrid promotionGridData={flexTime} /> }

      <div className="component-footer p-4">
        <PaginatedItems />
      </div>
    </div>
  );

}

export default AgentFlexPromotion;

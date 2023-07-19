import { useState } from "react";
import classes from "./Occurrence.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { CalendarRemove, ReceiveSquare2, TransmitSqaure2 } from "iconsax-react";
import "../../commonStyle.css";
import LateArrival from "./LateArrival/LateArrival";
import EarlyArrival from "./EarlyArrival/EarlyArrival";
import NCNS from "./NCNS/NCNS";

const Occurence = () => {
  const [activeTab, setActiveTab] = useState(1);
  const tabClick = (index: any) => {
    setActiveTab(index);
  };

  const tabs = [
    {
      id: 1,
      name: "Late Arrival",
      icon: <ReceiveSquare2 size="20" color="#46B0E6" />,
    },
    {
      id: 2,
      name: "Early Leave",
      icon: <TransmitSqaure2 size="20" color="#46B0E6" />,
    },
    {
      id: 3,
      name: "NCNS/Unapproved Absence",
      icon: <CalendarRemove size="20" color="#46B0E6" />,
    },
  ];

  let content: any = "";
  if (activeTab === tabs[0].id) {
    content = <LateArrival />;
  } else if (activeTab === tabs[1].id) {
    content = <EarlyArrival />;
  } else if (activeTab === tabs[2].id) {
    content = <NCNS />;
  }

  return (
    <>
      <div className={classes.occurenceRuleDef}>
        <div className="component-container">
          {/* main header */}
          <div className="component-header">
            <div className="col-md-12">
              <h2>Occurence Rules Definition</h2>
            </div>
          </div>
          <div className={`${classes.main} row`}>
            {/* tabs */}
            <div className="col-3 col-xxl-2">
              <div className={classes.tabs}>
                <ul>
                  {tabs.map((menu) => (
                    <li
                      key={menu.name}
                      onClick={() => tabClick(menu.id)}
                      className={menu.id === activeTab ? classes.activeLi : " "}
                    >
                      <i className="menu-icon">{menu.icon}</i>
                      <span>{menu.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="col-9 col-xxl-10">
              {/* tab-content */}
              <div className={classes.contentContainer}>{content}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Occurence;

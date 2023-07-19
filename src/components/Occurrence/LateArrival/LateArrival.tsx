import { useState } from "react";
import classes from "../Occurrence.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Trash, AddCircle } from "iconsax-react";
import {
  I2cButton,
  I2cInput,
  I2cMenuItem,
  I2cSelect,
} from "@webcomponents/i2cwebcomponents/dist/react";
import Select from "react-select";
import "../../../commonStyle.css";

const LateArrival = () => {
  const [id, setId] = useState("T1 (Late Arrivals)");
  const [startShift, setstartShift] = useState("Shift Time");
  const [startValue, setStartValue] = useState("");
  const [endShift, setEndShift] = useState("Shift Time");
  const [endValue, setEndValue] = useState("");
  const [endOcc, setEndOcc] = useState("");
  const [startRadio, setStartRadio] = useState("");
  const [endRadio, setEndRadio] = useState("");

  const [showEnd, setShowEnd] = useState(1);

  const LateformData = {
    id: "",
    startShift: "",
    startRadio: "",
    startValue: "",
    endShift: "",
    endRadio: "",
    endValue: "",
    endOcc: "",
  };

  const handleLateArrivalSubmit = (event: any) => {
    event.preventDefault();
    LateformData.id = id;
    LateformData.startShift = startShift;
    LateformData.startRadio = startRadio;
    LateformData.startValue = startValue;
    LateformData.endRadio = endRadio;
    LateformData.endShift = endShift;
    LateformData.endValue = endValue;
    LateformData.endOcc = endOcc;
    alert("submitted!");
  };
  const removeEndBlock = () => {
    showEnd === 1 ? setShowEnd(0) : setShowEnd(1);
  };

  const occurenceId: any = [
    { value: "t1", label: "T1 (Late Arrivals)" },
    { value: "t2", label: "T2 (Late Arrivals)" },
    { value: "t3", label: "T3 (Late Arrivals)" },
  ];

  const shiftCategory: any = [
    { value: "shift time", label: "Shift Time" },
    { value: "Shift Percentage", label: "Shift Percentage" },
    
  ];




  return (
    <div className={classes.content}>
      <div className={classes.tabHeader}>
        <h3>Schedule Occurrences Rules (Late Arrivals)</h3>
      </div>

      {/* tab-form */}
      <form onSubmit={handleLateArrivalSubmit}>
        <div className={classes.id}>
          <label>Dispute Type</label>
          <Select
            className="custom-select"
            options={occurenceId}
            isSearchable={false}
            defaultValue={occurenceId[0]}
          />
        </div>
        {/* Start */}
        <span>Start</span>
        <div className={classes.start}>
          <div className={classes.startCategory}>
          <label>Shift Category</label>
          <Select
            className="custom-select"
            options={shiftCategory}
            isSearchable={false}
            defaultValue={shiftCategory[0]}
          />
          </div>
          <div className={classes.startRadioButtons}>
            <input
              type="radio"
              id="test10"
              name="radio-group"
              value="="
              onChange={(event: any) => setStartRadio(event.target.value)}
            />
            <label htmlFor="test10">
              =<span>Time is Equal to</span>
            </label>
            <input
              type="radio"
              id="test11"
              name="radio-group"
              value="<"
              onChange={(event: any) => setStartRadio(event.target.value)}
            />
            <label htmlFor="test11">
              &lt;<span>Time is Less than</span>
            </label>
            <input
              type="radio"
              id="test12"
              name="radio-group"
              value="<="
              onChange={(event: any) => setStartRadio(event.target.value)}
            />
            <label htmlFor="test12">
              {" "}
              &le;<span>Time is Less than Equal to</span>
            </label>
            <input
              type="radio"
              id="test13"
              name="radio-group"
              value=">"
              onChange={(event: any) => setStartRadio(event.target.value)}
            />
            <label htmlFor="test13">
              &gt;<span>Time is Greater than</span>
            </label>
            <input
              type="radio"
              id="test14"
              name="radio-group"
              value=">="
              onChange={(event: any) => setStartRadio(event.target.value)}
            />
            <label htmlFor="test14">
              &ge;<span>Time is Greater than Equal to</span>
            </label>
          </div>
          <div className={classes.startRadioInput}>
            <span>min</span>
            <I2cInput
              label="Value"
              className={classes.occurrencInput}
              value={startValue}
              onI2cChange={(event: any) => setStartValue(event.target.value)}
              placeholder="0"
            />
          </div>
        </div>
        {/* End */}

        <div className={showEnd === 1 ? classes.lateEnd : `${classes.lateEnd} ${classes.hide}`}>
          <span>End</span>
          <div className={classes.end}>
            <div className={classes.startCategory}>
              <label>Shift Category</label>
              <Select
                className="custom-select"
                options={shiftCategory}
                isSearchable={false}
                defaultValue={shiftCategory[0]}
              />
            </div>
            <div className={classes.startRadioButtons}>
              <input
                type="radio"
                id="test15"
                name="radio-group2"
                value="="
                onChange={(event: any) => setEndRadio(event.target.value)}
              />
              <label htmlFor="test15">
                =<span>Time is Equal to</span>
              </label>
              <input
                type="radio"
                id="test16"
                name="radio-group2"
                value="<"
                onChange={(event: any) => setEndRadio(event.target.value)}
              />
              <label htmlFor="test16">
                &lt;<span>Time is Less than</span>
              </label>
              <input
                type="radio"
                id="test17"
                name="radio-group2"
                value="<="
                onChange={(event: any) => setEndRadio(event.target.value)}
              />
              <label htmlFor="test17">
                {" "}
                &le;<span>Time is Less than Equal to</span>
              </label>
              <input
                type="radio"
                id="test18"
                name="radio-group2"
                value=">"
                onChange={(event: any) => setEndRadio(event.target.value)}
              />
              <label htmlFor="test18">
                &gt;<span>Time is Greater than</span>
              </label>
              <input
                type="radio"
                id="test19"
                name="radio-group2"
                value=">="
                onChange={(event: any) => setEndRadio(event.target.value)}
              />
              <label htmlFor="test19">
                &ge;<span>Time is Greater than Equal to</span>
              </label>
            </div>
            <div className={classes.startRadioOccurence}>
              <span>min</span>
              <I2cInput
                label="Value"
                className={classes.occurrencInput}
                value={endValue}
                onI2cChange={(event: any) => setEndValue(event.target.value)}
                placeholder="0"
              />
            </div>
            <div className={classes.startRadioOccurence}>
              <span>pt</span>
              <I2cInput
                label="Occurrence"
                className={classes.occurrencInput}
                value={endOcc}
                onI2cChange={(event: any) => setEndOcc(event.target.value)}
                placeholder="0"
              />
            </div>
            <div className={classes.startRadioDelete}>
              <div className={classes.dltIcon} onClick={removeEndBlock}>
                <Trash size="20" color="#666" />
              </div>
            </div>
          </div>
        </div>
        {/* Add End */}
        <div
          className={showEnd === 0 ? classes.occLateAdd : `${classes.occLateAdd} ${classes.hide}`}
          onClick={removeEndBlock}
        >
          <AddCircle size="32" color="#CCCCCC" />
          <span>Add End Rule</span>
        </div>
        <div className={classes.occLateButtons}>
          <I2cButton variant="default">Cancel</I2cButton>
          <I2cButton type="submit" variant="primary">
            Save
          </I2cButton>
        </div>
      </form>
    </div>
  );
};

export default LateArrival;

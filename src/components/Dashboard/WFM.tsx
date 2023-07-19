import { useEffect } from 'react';
import AttendanceOverview from '../attendanceOverview/AttendanceOverview';
import './Dashboard.css';
import List from '../Lists/List'
import ScheduleReport from '../SchedulreReport/ScheduleReport';
import PayrollReport from '../PayrollReport/PayrollReport';

const Wfm = () => {

  useEffect(() => {
  }, []);


  return (
    <>
      <div className="wrapper">
        <article>
          <div className='row mb-2'>
            <AttendanceOverview />
          </div>
          <div className='row'>
            <div className="col-md-6 vt"><ScheduleReport /></div>
            <div className="col-md-6 vt"><PayrollReport /></div>
          </div>
        </article>

        <aside> <List /></aside>

      </div>
    </>
  );

}

export default Wfm;

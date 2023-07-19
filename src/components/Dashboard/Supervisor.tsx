import AttendanceOverview from '../attendanceOverview/AttendanceOverview';
import List from '../Lists/List'
import ScheduleReport from '../SchedulreReport/ScheduleReport';
import FlexReport from '../FlexReport/FlexReport';
import './Dashboard.css';

const Supervisor = () => {
  
  return (
    <div className="wrapper">
    <article className='supervisor-article'>
      <div className='row mb-20'>
        <AttendanceOverview />
      </div>
      <div className='row'>
        <div className="col-6"><ScheduleReport /></div>
        <div className="col-6"><FlexReport /></div>
      </div>
    </article>

    <aside className='sup-dash'> <List /></aside>

  </div>
  );

}

export default Supervisor;

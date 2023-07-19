import Stats from '../stats/stats';
import HoursView from '../HoursView/HoursView';
import AgentAttendance from '../Agent-Attendance/AgentAttendance';
import './Dashboard.css';
import '../../commonStyle.css';

const Dashboard = () => {

  return (
    <div className='agent-dashboard'>
      <div className="row mb-4">
        <div className="col-md-6 mb-3"> <Stats /></div>
        <div className="col-md-6"><HoursView /></div>
      </div>
      <div className='row'>
        <AgentAttendance />
      </div>
      
    </div>
  );

}

export default Dashboard;

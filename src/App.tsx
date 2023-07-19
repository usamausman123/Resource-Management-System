// import Login from "./components/Login/Login";
// import Toast from './common/Toast/Toast';
import Header from "./components/Header/Header";
import Sidenav from "./components/Sidenav/Sidenav";
import Dashboard from "./components/Dashboard/Dashboard";
import AgentAttendance from "./components/Agent-Attendance/AgentAttendance";
import ScheduledTime from './components/Scheduled-Time/ScheduledTime';
import RequestTimeOff from "./components/RequestTimeOff/RequestTimeOff";
import AgentFlexPromotion from './components/FlexTime/AgentFlexTime/AgentFlexPromotion';
import AgentDispute from './components/Dispute/Agent/AgentDispute';
import AgentPayroll from './components/Agent/AgentPayroll';
import Supervisor from './components/Dashboard/Supervisor';
import SupervisorAttendanceSearch from './components/Supervisor/Attendance-Search/SupervisorAttendanceSearch';
import SupervisorAttendance from './components/Supervisor/Supervisor-Attendance/SupervisorAttendance';
import SupervisorAttendanceReport from './components/Supervisor/Supervisor-Attendance-Report/SupervisorAttendanceReport';
import SupervisorFlexTime from './components/FlexTime/SupervisorFlexTime/SupervisorFlexTime';
import SupervisorLeave from './components/Leave/SupervisorLeaves/SupervisorLeave';
import Occurrence from './components/Occurrence/Occurrence';
import ShiftHourDef from './components/ShiftHoursDef/ShiftHourDef';
import SupervisorDispute from './components/Dispute/Supervisor/SupervisorDispute';
import SupervisorPayrollSearch from './components/Supervisor/Supervisor-Payroll-Search/SupervisorPayrollSearch';
import SupervisorPayroll from './components/Supervisor/Supervisor-Payroll/SupervisorPayroll';
import Wfm from './components/Dashboard/WFM';
import { Routes, Route, Navigate } from "react-router-dom";
import { ArchiveTick, Calendar, Category, Clock, DollarCircle, NoteRemove, Stickynote } from "iconsax-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "rc-time-picker/assets/index.css";
import "react-datepicker/dist/react-datepicker.css";
import 'bootstrap/dist/js/bootstrap.js';
// import "animate.css/animate.min.css";
import "react-toastify/dist/ReactToastify.css";
import "simplebar/src/simplebar.css"; // React-sidebar scroll package
import './commonStyle.css';
import "./App.css";
import Login from "./components/Login/Login";

function App() {
  const agentMenus = [
    {
      name: 'Agent Dashboard',
      route: '/dashboard',
      menuIcon: <Category />
    },
    {
      name: 'Agent Attendance',
      route: '/attendance',
      menuIcon: <Calendar />
    },
    {
      name: 'Agent Scheduled Time',
      route: '/schedule',
      menuIcon: <Clock />
    },
    {
      name: 'Agent Request Time Off', 
      route: '/request-time-off',
      menuIcon: <Clock />
    },
    {
      name: 'Agent Flex Time',
      route: '/flex-time',
      menuIcon: <Clock />
    },
    {
      name: 'Agent Disputes',
      route: '/my-disputes',
      menuIcon: <NoteRemove />
    },
    {
      name: 'Agent Payroll',
      route: '/agent-payroll',
      menuIcon: <DollarCircle />
    },
    {
      name: 'Sup Dashboard',
      route: '/sup-dashboard',
      menuIcon: <Category />
    },
    {
      name: 'Sup Attendance',
      route: '/supervisor-attendance-search',
      menuIcon: <Calendar />
    },
    {
      name: 'Sup Flex Time',
      route: '/suppervisor-flex-time',
      menuIcon: <Clock />
    },
    {
      name: 'Sup Leaves Requests',
      route: '/sup-leaves-requests',
      menuIcon: <ArchiveTick />
    },
    {
      name: 'Sup Occurrence Rules',
      route: '/sup-occurrence-rules',
      menuIcon: <Stickynote />
    },
    {
      name: 'Sup Shift Hours Definition',
      route: '/sup-shifthoursdef',
      menuIcon: <Clock />
    },
    {
      name: 'Sup Dispute Requests',
      route: '/sup-dispute-requests',
      menuIcon: <NoteRemove />
    },
    {
      name: 'Sup Payroll',
      route: '/supervisor-payroll-search',
      menuIcon: <DollarCircle />
    },
    {
      name: 'WFM Dashboard',
      route: '/wfm-dashboard',
      menuIcon: <Category />
    },
    
  ];
  return (
    <div className="app-container">
      <Header></Header>
      <main id="main">
        <Sidenav menus={agentMenus}></Sidenav>
        {/* <Toast /> */}
        <div className="page-content">
          <Routes>
            <Route path="/" element={<Navigate to='/dashboard' />}></Route>
            <Route path="/dashboard" element={<Dashboard />}></Route>
            <Route path="/attendance" element={<AgentAttendance />}></Route>
            <Route path="/schedule" element={<ScheduledTime />}></Route>
            <Route path="/request-time-off" element={<RequestTimeOff />}></Route>
            <Route path="/flex-time" element={<AgentFlexPromotion />}></Route>
            <Route path="/my-disputes" element={<AgentDispute />}></Route>
            <Route path="/agent-payroll" element={<AgentPayroll />}></Route>
      
            <Route path="/sup-dashboard" element={<Supervisor />}></Route>
            <Route path="/supervisor-attendance-search" element={<SupervisorAttendanceSearch />}></Route>
            <Route path="/supervisor-attendance" element={<SupervisorAttendance />}></Route>
            <Route path="/supervisor-attendance-report" element={<SupervisorAttendanceReport />}></Route>
            <Route path="/suppervisor-flex-time" element={<SupervisorFlexTime />}></Route>
            <Route path="/sup-leaves-requests" element={<SupervisorLeave />}></Route>
            <Route path="/sup-occurrence-rules" element={<Occurrence />}></Route>
            <Route path="/sup-shifthoursdef" element={<ShiftHourDef />}></Route>
            <Route path="/sup-dispute-requests" element={<SupervisorDispute />}></Route>
            <Route path="/supervisor-payroll-search" element={<SupervisorPayrollSearch />}></Route>
            <Route path="/supervisor-payroll" element={<SupervisorPayroll />}></Route>
            <Route path="/supervisor-payroll-report" element={<AgentPayroll />}></Route>
            <Route path="/login" element={<Login />}></Route>
            
            <Route path="/wfm-dashboard" element={<Wfm />}></Route>
            <Route path="*" element={<h2>No Page Found</h2>}></Route>

          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;

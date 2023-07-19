import { Edit2 } from 'iconsax-react';
import { useState } from 'react';
import AgentRequestDisputeDialog from '../../../../dialogs/AgentRequestDisputeDialog/AgentRequestDisputeDialog';
// import './DisputeAgentActiveListChild.css';
import classes from './DisputeAgentActiveListChild.module.css';

export const DisputeAgentActiveListChild = (props: any) => {

    let dataSets: any;
    dataSets = props.week;

    // Edit 
    const Edit = (e: any) => {
        setModalShow(true)
    }

    const [modalShow, setModalShow] = useState(false);

    return (
        <>
            <table className={`table ${classes['child-table-row']}`}>
                <thead>
                    <tr className={`table-header ${classes['table-head']}`}>
                        <th>Start Date &amp; Time</th>
                        <th>End Date &amp; Time</th>
                        <th>Hours</th>
                        <th>Notes to Supervisor/Admin</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {dataSets.map((dataSet: any, index: any) => {
                        return (
                            <tr key={index} className={classes['table-data']}>
                                <td>{dataSet.start_date}</td>
                                <td>{dataSet.stop_date}</td>
                                <td>{dataSet.Hours}</td>
                                <td>{dataSet.note}</td>
                                <td><Edit2 size="18" color="#666666" onClick={(e) => Edit(e)} /></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            {modalShow && <AgentRequestDisputeDialog   show={modalShow} editonhide={()=>setModalShow(false)} />}
            
        </>
    );

}

export default DisputeAgentActiveListChild;

import React from 'react';
import DisputeAgentHistoryGrid from './DisputeAgentHistoryGrid';
import DisputeAgentHistoryList from './DisputeAgentHistoryList';

const AgentDisputeHistory = (props: any) => {

    return (
        <React.Fragment>
             {props.toggle === true ? <DisputeAgentHistoryList data={props.data} /> : <DisputeAgentHistoryGrid data={props.data} />}
        </React.Fragment>
    );

}

export default AgentDisputeHistory;

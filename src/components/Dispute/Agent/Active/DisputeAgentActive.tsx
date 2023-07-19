import React from 'react';
import DisputeAgentActiveGrid from './DisputeAgentActiveGrid';
import DisputeAgentActiveList from './DisputeAgentActiveList';

const AgentDisputeActive = (props: any) => {

    return (
        <React.Fragment>
            {props.toggle === true ? <DisputeAgentActiveList data={props.data} /> : <DisputeAgentActiveGrid data={props.data} />}
        </React.Fragment>
    );

}

export default AgentDisputeActive;

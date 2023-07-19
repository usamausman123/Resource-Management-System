import { useState } from 'react';
import { I2cCheckbox, I2cAvatar, I2cDivider } from '@webcomponents/i2cwebcomponents/dist/react';
import './AgentSearch.css';
const AgentSearch = (props: any) => {

    const [agentList, setAgentList] = useState(props.data);
    const [isCheckAll, setIsCheckAll] = useState(false);
    const [search, setSearch] = useState("");
    const [name, setAgentName] = useState("");
    const [hide, setHide] = useState(false);
    const Alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

    //Dispute Filter 
    const filterAgents = (e: any) => {
        const updateAgentsList = props.data.filter((curElem:any) => {
            return curElem.agent_name === name;
        });
        props.setData(updateAgentsList);
        props.hideAgentSearch();
    }


    //Filter on Letters
    const AlphabitLetters = (e: any) => {
        const letter = e.target.innerHTML;
        const startsWithN = props.data.filter((name:any) => name.agent_name.startsWith(letter));
        setAgentList(startsWithN);
    }

    return (
        <>
            <div className="allAgentsFilter" >

                {/* <button onClick={() => setHide(!hide)}>All Agents</button> */}

                {/* {hide ? */}
                    <div className='allAgentsdropdown'>
                        <div className='agentHeader'>
                            <I2cCheckbox onClick={() => setIsCheckAll(!isCheckAll)}>Select All</I2cCheckbox>
                            <input className="agentSearch" type="text" placeholder="Search Agent" onChange={e => setSearch(e.target.value)} />
                        </div>

                        <div className='agentLettters'>
                            <ul>
                                {Alphabets.map((letter, index) => {
                                    return (

                                        <li key={index} onClick={AlphabitLetters}>{letter}</li>
                                    )
                                })}
                            </ul>

                        </div>

                        <div className='agentBody'>
                            <ul style={{ textAlign: "left" }}>
                                {agentList.filter((item:any) => item.agent_name.toLowerCase().includes(search)).map((item:any, index:any) => (
                                    <li key={index}>
                                        {isCheckAll ? <><I2cCheckbox checked onClick={(e) => setAgentName(item.agent_name)}></I2cCheckbox> </> : <><I2cCheckbox onClick={(e) => setAgentName(item.agent_name)}></I2cCheckbox> </>}
                                        <I2cAvatar className="avatar" image={item.image} label="Agent Image" /><span>{item.agent_name}</span>   <I2cDivider />

                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className='agentFooter'>
                            {/* <button className='cancelbtn' onClick={() => setHide(!hide)}>Cancel</button>  */}
                            <button className='cancelbtn' onClick={() => props.hideAgentSearch()}>Cancel</button>
                            <button onClick={(e) => filterAgents(e)} className='applybtn'>Apply</button>
                        </div>
                    </div> {/* : <></> */}
                {/* } */}
                <div className='agent-search-backdrop' onClick={() => props.hideAgentSearch()}></div>
                
            </div>
        </>
    );

}

export default AgentSearch;

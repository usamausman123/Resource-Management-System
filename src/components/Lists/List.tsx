import { useEffect, useState } from 'react';
import data from '../../data.json';
import { I2cAvatar, I2cInput, I2cMenuItem, I2cSelect } from '@webcomponents/i2cwebcomponents/dist/react';
import { CloseCircle, SearchNormal1 } from 'iconsax-react';
import './List.css';

const List = (props: any) => {

  //Code to fetch data from API
  const [agent, setAgent] = useState(data);
  const [search, setSearch] = useState("");
  const [toggle, setToggle] = useState(false);

  const filter = () => {
    const filterData = [...agent].sort((a, b) => a.name.localeCompare(b.name));
    setAgent(filterData);
  }

  const toggler = (e: any) => {
    console.log(e.target);
    return toggle === false ? setToggle(true) : setToggle(false);
  }

  var list_menu_content:any = '';


  useEffect(() => {
  }, [])

  return (
    <div className='agentList'>
      <div className="component-container">
        <div className="component-header">
          <div className="col-md-6">
            <h2>Available Agent(s)</h2>
          </div>
          <div className="col-md-6 list-menu">
            {toggle === true ? <>    <I2cInput className='input' type="text" size="small" placeholder="Search People" onI2cChange={(event:any) => setSearch(event.target.value)} /><button onClick={toggler} className="close-btn"><CloseCircle size="15" color="#8E90AA" variant="Bold"/></button></> : <><I2cSelect value="recents" className='select'> <I2cMenuItem value="recents">Recents</I2cMenuItem> <I2cMenuItem value="alphabetically">Alphabetically</I2cMenuItem> </I2cSelect><button onClick={toggler} className="btn btn-search"><SearchNormal1 size='18'/></button></>}
          </div>
        </div>

        <table>
          <thead>
            <tr className='table-header'>
              <th>Name</th>
              <th>Shift Time</th>
              <th>Occ</th>
            </tr>
          </thead>
          <tbody>
            {agent.filter(agent => agent.name.toLowerCase().includes(search)).map((agent, index) => {
              return (
                <tr key={index} className="table-tr">
                  <td>
                    {agent.status ?

                      <div className="tooltip list-status">
                        <div className="tooltiptext"> <span className='online'></span> Available</div>
                        <I2cAvatar className="avatar" image={agent.image} label="Agent Image" />
                        <div className='online available-status'></div>
                      </div> :

                      <div className="tooltip list-status">
                        <span className="tooltiptext"> <div className='offline'></div> Offline</span>
                        <I2cAvatar className="avatar" image={agent.image} label="Agent Image" />
                        <div className='offline available-status'></div>
                      </div>}

                    {agent.name}

                  </td>
                  <td>{agent.from_date} - {agent.to_date}</td>
                  <td>{agent.occ}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

}

export default List;

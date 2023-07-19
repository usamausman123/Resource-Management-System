import { useState } from 'react';
// import './dispute.css';

const RecordFilter = (props:any) => {

    const [sizePerPage, setSizePerPage] = useState([1, 2, 3]);

  /*Record Filter*/
  const handlePaginationDropdown = (page: any) => {
    let result = props.data.slice(0, page);
    props.setData(result);
  };

    return (
        <>
            <select className="filterRecord">
              {sizePerPage.map((page, index) => {
                return <option key={index} onClick={e => handlePaginationDropdown(page)}>Record <span className='page'>{page}</span> </option>
              })}
            </select>
        </>
    );

}

export default RecordFilter;

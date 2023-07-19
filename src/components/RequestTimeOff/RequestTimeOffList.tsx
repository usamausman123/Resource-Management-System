import React from 'react';
import { useRef } from 'react';
import classes from './RequestTimeOffList.module.css';

export const RequestTimeOffList = (props: any) => {

  let dataSets: any;
  dataSets = props.requestDataList;
  const footerRef = useRef<HTMLDivElement>(null); // page footer reference
  const scrollBoxRef = useRef<HTMLDivElement>(null); // scrollbox reference in which scroll will be applied


  return (
    <React.Fragment>
      <div className={`${classes['tbl-container']} w-100 slim-scroll`}>
        <table className={classes['standard-tbl-structure']}>
          <thead>
              <tr>
                  <th className="text-start ps-4">Request Type</th>
                  <th className="text-start">Leave Type</th>
                  <th className="text-start">Start Date &amp; Time</th>
                  <th className="text-start">Stop Date &amp; Time</th>
                  <th className="text-center">Hours</th>
                  <th className="text-start" style={{width: '21%'}}>Note to Manager/Administrator</th>
                  <th className="text-end pe-4">Status</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <td colSpan={7} className="p-0 border-0">
                    <div className="table-scroll" ref={scrollBoxRef} >
                      <table className='table-body-content'>
                        <tbody>
                          {
                            dataSets && dataSets.map((dataSet: any, index: any) => {
                              return (
                                <tr key={dataSet.id}>
                                    <td className="text-start ps-4">{dataSet.Request_type}</td>
                                    <td className="text-start">{dataSet.Leave_type}</td>
                                    <td className="text-start">{dataSet.start_date}</td>
                                    <td className="text-start">{dataSet.stop_date}</td>
                                    <td className="text-center">{dataSet.Hours}</td>
                                    <td className="text-start" style={{width: '21%'}}>{dataSet.note}</td>
                                    <td className="text-end pe-4"><span className={"status-badge status" + dataSet.status}>{dataSet.status}</span></td>
                                  </tr>
                              )
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                  </td>
              </tr>
          </tbody>
        </table>
      </div>
    </React.Fragment>
  );

}

export default RequestTimeOffList;

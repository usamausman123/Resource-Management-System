import { useTable, TableOptions, Column, useBlockLayout, usePagination } from "react-table";
import { useSticky } from 'react-table-sticky';
import styled from 'styled-components';
import React, { useState } from "react";
import { SaveRemove, MessageEdit } from 'iconsax-react';

type Cols = {
  id: string;
  agent_note: string;
  supervisor_note: string;
  start_date: string;
  stop_date: string;
  hours: string;
  supervisor_start_date: string;
  supervisor_stop_date: string;
  supervisor_hours: string;
  status: string;
  action: string
};

export const Styles = styled.div`
  .table {
    width:1680px !important;
    margin:auto;
    height:auto !important;
    border: 1px solid #F0F0F0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.03);
    border-radius: 5px;
 
    .tr {
        .th{
            background: #EFF0F5;
            border: 1px solid #F0F0F0;
        }
      :last-child {
       .th{
        background: #FAFAFC;
        border:none;
        border: none;
       }
        .td {
          border-bottom: 0;
          background: #ffffff;
          border-bottom: 1px solid #F0F0F0;
          top:0;
        }
      }
    }
 
    .th,
    .td {
      padding: 5px;
      overflow: hidden;
      :last-child {
        border-right: 0;
      }
    }
 
    &.sticky {
      overflow-x: scroll;
      .header,
      .footer {
        position: sticky;
        z-index: 1;
      }
 
      .header {
        top: 0;
      }
 
      .footer {
        bottom: 0;
        box-shadow: 0px -3px 3px #ccc;
      }
 
      .body {
        position: relative;
        z-index: 0;
      }
 
      [data-sticky-td] {
        position: sticky;
        background: #FAFAFC !important;
        border: none;
        text-align:center;
        top:0;
        right: 0px !important; 
      }
 
      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }
 
      [data-sticky-first-right-td] {
        box-shadow: none;
        background: #FAFAFC !important;
        text-align:center;
      }
    }
  }
`;
export default function HistoryDetail(props: any) {

  // Status Handler
  const getStatus = (e: any) => {
    return <button className={"status-badge status" + e}>{e}</button>
  }

  let [state, setState] = useState(
    {
      id: props.data.id,
      agent_note: props.data.agent_note,
      supervisor_note: props.data.supervisor_note,
      start_date: props.data.start_date,
      stop_date: props.data.stop_date,
      hours: props.data.hours,
      status: props.data.status,
      action: props.data.action,
      supervisor_start_date: props.data.supervisor_start_date,
      supervisor_stop_date: props.data.supervisor_stop_date,
      supervisor_hours: props.data.supervisor_hours,
    }
  );



  const data = React.useMemo(
    (): Cols[] => [state], []
  );

  const columns: Column<Cols>[] = React.useMemo(
    () => [
      {
        id: "id",
      }, {
        Header: "Agent's Requested Time & Hours",
        columns: [
          {
            width: 200,
            Header: "Start Date & Time",
            accessor: 'start_date'
          },
          {
            width: 200,
            Header: "End Date & Time",
            accessor: 'stop_date'
          },
          {
            width: 200,
            Header: "Hours",
            accessor: 'hours'
          },
          {
            width: 200,
            Header: "Agent Notes Comments",
            accessor: 'agent_note'
          },
        ]
      },
      {

        Header: "Supervisor's Requested Time & Hours",
        columns: [
          {
            width: 200,
            Header: "Start Date & Time",
            accessor: 'supervisor_start_date'
          },
          {
            width: 200,
            Header: "End Date & Time",
            accessor: 'supervisor_stop_date'
          },
          {
            width: 200,
            Header: "Hours",
            accessor: 'supervisor_hours'
          },
          {
            width: 200,
            Header: "Supervisor/Admin Comments",
            accessor: 'supervisor_note'
          },

        ]
      },

      {
        Header: "Status",
        columns: [
          {
            accessor: 'status',
            Cell: ({ value }) => getStatus(value),

          }
        ],
        sticky: 'right',
        rowSpan: 2,
      }
    ],
    []
  );

  const options: TableOptions<Cols> = {
    data,
    columns
  };

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(options, useSticky, useBlockLayout, usePagination);

  return (
    <Styles>
      <div {...getTableProps()} className="table sticky" style={{ width: 1000, height: 500 }}>
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render('Header')}
                </div>
              ))}
            </div>
          ))}
        </div>
        <div {...getTableBodyProps()} className="body">
          {rows.map((row) => {
            prepareRow(row);
            return (
              <div {...row.getRowProps()} className="tr">
                {row.cells.map((cell) => (
                  <div {...cell.getCellProps()} className="td">
                    {cell.render('Cell')}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </Styles>
  );
}
import {
  useTable,
  TableOptions,
  Column,
  useBlockLayout,
  usePagination,
} from "react-table";
import { useSticky } from "react-table-sticky";
import styled from "styled-components";
import React, { useState } from "react";
import { CloseCircle, Edit2 } from "iconsax-react";
import DisputeRejection from "../../../dialogs/DisputeRejection/DisputeRejection";
import ApproveRejectDisputeDialog from "../../../dialogs/ApproveRejectDisputeDialog/ApproveRejectDisputeDialog";

type Cols = {
  id: string;
  agent_note: string;
  supervisor_note: string;
  start_date: string;
  stop_date: string;
  hours: string;
  status: string;
  action: string;
};

export const Styles = styled.div`
  .table {
    width: 1888px !important;
    margin: auto;
    height: auto !important;
    border: 1px solid #f0f0f0;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.03);
    border-radius: 5px;

    .tr {
      .th {
        background: #eeeeee;
        border: 1px solid #f0f0f0;
      }
      :last-child {
        .th {
          background: #fafafc;
          border: none;
          border: none;
        }
        .td {
          border-bottom: 0;
          background: #ffffff;
          border-bottom: 1px solid #f0f0f0;
          top: 0;
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
        background: #fafafc !important;
        border: none;
        text-align: center;
        top: 0;
        right: 0px !important;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: none;
        background: #fafafc !important;
        text-align: center;
        right: 150px !important;
      }
    }
  }
`;
export default function Approved(props: any) {
  const [rejectionModalShow, setRejectionModalShow] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [editModalId, setEditModalId] = useState("Day");
  const [deleteModalId, setDeleteModalId] = useState(null);

  // console.log(editModalId)

  // Edit
  const Edit = (i: any) => {
    setModalShow(true);
    setEditModalId(i);
  };

  // Delete
  const Delete = (i: any) => {
    setRejectionModalShow(true);
    setDeleteModalId(i);
  };

  const modalHide = () => {
    setModalShow(false);
    setRejectionModalShow(false);
  };

  // Action Handler
  const handleAction = (e: any) => {
    return (
      <>
        <div>
          <Edit2
            size="18"
            color="#666666"
            onClick={() => {
              Edit(props.modalid);
            }}
          />
          <CloseCircle
            size="18"
            color="#666666"
            onClick={() => {
              Delete(e);
            }}
          />
        </div>
      </>
    );
  };

  // Status Handler
  const getStatus = (e: any) => {
    return <button className={"status-badge status" + e}>{e}</button>;
  };

  let [state, setState] = useState({
    id: props.agents.id,
    agent_note: props.agents.agent_note,
    supervisor_note: props.agents.supervisor_note,
    start_date: props.agents.start_date,
    stop_date: props.agents.stop_date,
    hours: props.agents.hours,
    status: props.agents.status,
    action: props.agents.action,
    supervisor_start_date: props.agents.supervisor_start_date,
    supervisor_stop_date: props.agents.supervisor_stop_date,
    supervisor_hours: props.agents.supervisor_hours,
  });

  const data = React.useMemo((): Cols[] => [state], []);

  const columns: Column<Cols>[] = React.useMemo(
    () => [
      {
        id: "id",
      },
      {
        Header: "Agent's Requested Time & Hours",
        columns: [
          {
            width: 200,
            Header: "Start Date & Time",
            accessor: "start_date",
          },
          {
            width: 200,
            Header: "End Date & Time",
            accessor: "stop_date",
          },
          {
            width: 200,
            Header: "Hours",
            accessor: "hours",
          },
          {
            width: 200,
            Header: "Agent Notes Comments",
            accessor: "agent_note",
          },
        ],
      },
      {
        Header: "Supervisor's Requested Time & Hours",
        columns: [
          {
            width: 200,
            Header: "Start Date & Time",
            accessor: "supervisor_start_date",
          },
          {
            width: 200,
            Header: "End Date & Time",
            accessor: "supervisor_stop_date",
          },
          {
            width: 200,
            Header: "Hours",
            accessor: "supervisor_hours",
          },
          {
            width: 200,
            Header: "Supervisor/Admin Comments",
            accessor: "supervisor_note",
          },
        ],
      },

      {
        Header: "Status",
        columns: [
          {
            accessor: "status",
            Cell: ({ value }) => getStatus(value),
          },
        ],

        sticky: "right",
        rowSpan: 2,
      },
      {
        Header: "Actions",
        columns: [
          {
            accessor: "action",
            Cell: ({ value }) => handleAction(value),
          },
        ],
        sticky: "right",
      },
    ],
    []
  );

  const options: TableOptions<Cols> = {
    data,
    columns,
  };

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(options, useSticky, useBlockLayout, usePagination);

  return (
    <Styles>
      <div
        {...getTableProps()}
        className="table sticky"
        style={{ width: 1000, height: 500 }}
      >
        <div className="header">
          {headerGroups.map((headerGroup) => (
            <div {...headerGroup.getHeaderGroupProps()} className="tr">
              {headerGroup.headers.map((column) => (
                <div {...column.getHeaderProps()} className="th">
                  {column.render("Header")}
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
                    {cell.render("Cell")}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
        {modalShow && (
          <ApproveRejectDisputeDialog
            show={modalShow}
            edithide={modalHide}
            modalid={editModalId}
            // dataset={dataSets}
          />
        )}
        {rejectionModalShow && (
          <DisputeRejection
            show={rejectionModalShow}
            edithide={modalHide}

            // dataset={dataSets}
          />
        )}
      </div>
    </Styles>
  );
}

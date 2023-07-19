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
import {
  SaveRemove,
  MessageEdit,
  CloseCircle,
  TickCircle,
} from "iconsax-react";
import ApproveRejectDisputeDialog from "../../../dialogs/ApproveRejectDisputeDialog/ApproveRejectDisputeDialog";
import DisputeRejection from "../../../dialogs/DisputeRejection/DisputeRejection";

type Cols = {
  id: string;
  agent_note: string;
  start_date: string;
  stop_date: string;
  hours: string;
  status: string;
  action: string;
};
export const Styles = styled.div`
  .table {
    width: 100% !important;
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
      :last-child {
        border-right: 0;
      }
    }

    &.sticky {
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
        top: 0;
      }

      [data-sticky-last-left-td] {
        box-shadow: 2px 0px 3px #ccc;
      }

      [data-sticky-first-right-td] {
        box-shadow: none;
        background: #fafafc !important;
      }
    }
  }
`;
export default function Pending(props: any) {
  const [editModalId, setEditModalId] = useState("Day");
  const [deleteModalId, setDeleteModalId] = useState(null);
  const [modalShow, setModalShow] = useState(false);
  const [rejectionModalShow, setRejectionModalShow] = useState(false);
  const modalHide = () => {
    setModalShow(false);
    setRejectionModalShow(false);
  };
  //Agent Edit
  const Edit = (e: any) => {
    setModalShow(true);
  };
  //Agent Delete
  const Delete = (e: any) => {
    setRejectionModalShow(true);
  };
  // Action Handler
  const handleAction = (e: any) => {
    return (
      <>
        <div>
          <TickCircle
            size="18"
            color="#666666"
            onClick={() => {
              Edit(e);
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
    agent_name: props.agents.agent_name,
    agent_note: props.agents.agent_note,
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
        width: 300,
        Header: "Start Date & Time",
        accessor: "start_date",
      },
      {
        width: 300,
        Header: "End Date & Time",
        accessor: "stop_date",
      },
      {
        width: 300,
        Header: "Hours",
        accessor: "hours",
      },
      {
        width: 300,
        Header: "Agent Notes Comments",
        accessor: "agent_note",
      },
      {
        width: 300,
        Header: "Status",
        accessor: "status",
        Cell: ({ value }) => getStatus(value),
      },
      {
        width: 300,
        Header: "Actions",
        accessor: "action",
        Cell: ({ value }) => handleAction(value),
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
      <div {...getTableProps()} className="table sticky child-table">
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
            dataset={props.dataset}
          />
        )}
        {rejectionModalShow && (
          <DisputeRejection
            show={rejectionModalShow}
            edithide={modalHide}
            modalid={deleteModalId}
            dataset={props.dataset}
          />
        )}
      </div>
    </Styles>
  );
}

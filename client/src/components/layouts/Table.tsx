import React from "react";
import { RouteComponentProps } from "react-router-dom";
import { IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import VisibilityIcon from "@material-ui/icons/Visibility";

import "./table.scss";

function formatDate(date: Date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
interface Props extends RouteComponentProps {
  data: Task[];
  deleteTask: (id: string) => void;
}
interface Task {
  id: string;
  userName: string;
  email: string;
  phone: string;
  createAt: string;
}
export const Table: React.FC<Props> = (props) => {
  const { data, deleteTask, history } = props;

  const editTask = (task: Task) => {
    history.push("/create-task", { task });
  };
  let table;
  const createTable = (data: Props["data"]) => {
    // create header table start
    const tableHeadArray = [];
    const tableBodyArray: any[] = [];
    if (data.length) {
      Object.keys(data[0]).forEach((key) => {
        switch (key) {
          case "userName":
            tableHeadArray[0] = (
              <th key={key}>
                <p>{key}</p>
              </th>
            );
            break;
          case "email":
            tableHeadArray[1] = (
              <th key={key}>
                <p>{key}</p>
              </th>
            );
            break;
          case "phone":
            tableHeadArray[2] = (
              <th key={key}>
                <p>{key}</p>
              </th>
            );
            break;
          case "createAt":
            tableHeadArray[3] = (
              <th key={key}>
                <p>{key}</p>
              </th>
            );
            break;
          default:
            break;
        }
      });
      tableHeadArray.push(
        <th className="action-column" key="last-head">
          <p>actions</p>
        </th>
      );
      // create header table end

      //create body table start
      data.forEach((object) => {
        const rowTableArray: any[] = [];
        // create table row
        Object.entries(object).forEach(([key, value]) => {
          switch (key) {
            case "userName":
              rowTableArray[0] = (
                <td key={key}>
                  <p>{value}</p>
                </td>
              );
              break;
            case "email":
              rowTableArray[1] = (
                <td key={key}>
                  <p>{value}</p>
                </td>
              );
              break;
            case "phone":
              rowTableArray[2] = (
                <td key={key}>
                  <p>{value}</p>
                </td>
              );
              break;
            case "createAt":
              rowTableArray[3] = (
                <td key={key}>
                  <p>{formatDate(value)}</p>
                </td>
              );
              break;
            case "id":
              rowTableArray[4] = (
                <td key={key}>
                  <div className="icon-wrapper">
                    <IconButton
                      onClick={() => deleteTask(object.id.toString())}
                    >
                      <DeleteIcon fontSize="small" className="delete-icon" />
                    </IconButton>
                    <IconButton onClick={() => editTask(object)}>
                      <EditIcon fontSize="small" className="edit-icon" />
                    </IconButton>
                    <IconButton onClick={() => editTask(object)}>
                      <VisibilityIcon
                        fontSize="small"
                        className="visibillity-icon"
                      />
                    </IconButton>
                  </div>
                </td>
              );
              break;
            default:
              break;
          }
        });
        return tableBodyArray.push(<tr key={object.id}>{rowTableArray}</tr>);
      });
      return { tableHeadArray, tableBodyArray };
    }
  };
  if (data?.length) {
    table = createTable(data);
  }
  return (
    <>
      <div className="table-container">
        {data?.length && (
          <table className="form-table">
            <thead>
              <tr>{table?.tableHeadArray}</tr>
            </thead>
            <tbody>{table?.tableBodyArray}</tbody>
          </table>
        )}
      </div>
    </>
  );
};

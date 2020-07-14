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
            tableHeadArray[0] = <th key={key}>{key}</th>;
            break;
          case "email":
            tableHeadArray[1] = <th key={key}>{key}</th>;
            break;
          case "phone":
            tableHeadArray[2] = <th key={key}>{key}</th>;
            break;
          case "createAt":
            tableHeadArray[3] = <th key={key}>{key}</th>;
            break;
          default:
            break;
        }
      });
      tableHeadArray.push(<th key="last-head">actions</th>);
      // create header table end

      //create body table start
      data.forEach((object) => {
        const rowTableArray: any[] = [];
        // create table row
        Object.entries(object).forEach(([key, value]) => {
          switch (key) {
            case "userName":
              rowTableArray[0] = <td key={key}>{value}</td>;
              break;
            case "email":
              rowTableArray[1] = <td key={key}>{value}</td>;
              break;
            case "phone":
              rowTableArray[2] = <td key={key}>{value}</td>;
              break;
            case "createAt":
              rowTableArray[3] = <td key={key}>{formatDate(value)}</td>;
              break;
            case "id":
              rowTableArray[4] = (
                <td key={key}>
                  <IconButton onClick={() => deleteTask(object.id.toString())}>
                    <DeleteIcon className="delete-icon" />
                  </IconButton>
                  <IconButton onClick={() => editTask(object)}>
                    <EditIcon className="edit-icon" />
                  </IconButton>
                  <IconButton onClick={() => editTask(object)}>
                    <VisibilityIcon className="visibillity-icon" />
                  </IconButton>
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

import React, { useEffect, useState } from "react";
import { RouteComponentProps } from "react-router-dom";
import { NavLink } from "react-router-dom";
import "./tasks.scss";
import { Table } from "../layouts/Table";
import useRequest from "../../hooks/use-request";
import { Button } from "@material-ui/core";
import { Title } from "../layouts/Title";
import { Task } from "../../types";
export const Tasks: React.FC<RouteComponentProps> = ({
  history,
  location,
  match,
}) => {
  const { doRequest } = useRequest();
  const [tasks, setTasks] = useState<Task[] | []>([]);
  const deleteTask = (id: string) => {
    doRequest({
      url: `/tasks/${id}`,
      method: "delete",
      onSuccess: () =>
        setTasks((prevState) => prevState.filter((task) => task.id !== id)),
    });
  };
  useEffect(() => {
    const fetchTasks = async () => {
      await doRequest({
        url: "/tasks",
        method: "get",
        onSuccess: (data: [Task]) => setTasks(data),
      });
    };
    fetchTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="tasks-page-container">
      <Title title="User Tasks" />
      <div className="new-task-container">
        <NavLink to="/create-task">
          <Button variant="outlined" color="primary">
            Create task
          </Button>
        </NavLink>
      </div>
      <div className="tasks-table-container">
        {tasks.length ? (
          <Table
            location={location}
            match={match}
            history={history}
            deleteTask={deleteTask}
            data={tasks}
          />
        ) : (
          <h4>no tasks found</h4>
        )}
      </div>
    </div>
  );
};

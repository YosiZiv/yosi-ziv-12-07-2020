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
  const [tasks, setTasks] = useState<Task[] | []>([
    {
      createAt: "2020-07-13T21:33:12.600Z",

      userName: "test3",
      email: "test@test.com",
      phone: "455245",
      id: "5f0bc6547e0cbb5114c55a8f",
    },
    {
      createAt: "2020-07-14T01:50:51.421Z",

      userName: "new task",
      email: "test@test.com",
      phone: "0527721411",
      id: "5f0d86d97c91f80018c1fb88",
    },
  ]);
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

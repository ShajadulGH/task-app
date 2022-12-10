import React, { useEffect, useState } from "react";

import Tasks from "./components/Tasks/Tasks";
import NewTask from "./components/NewTask/NewTask";
import useRequest from "./components/Hooks/use-request";
function App() {
  const [tasks, setTasks] = useState([]);
  const configReq = {
    url: "https://task-app-4d609-default-rtdb.firebaseio.com/tasks.json",
  };
  const gotData = (data) => {
    console.log(data);
    const loadedTasks = [];

    for (const taskKey in data) {
      loadedTasks.push({ id: taskKey, text: data[taskKey].text });
    }
    setTasks(loadedTasks);
  };
  const {
    isLoading,
    error,
    request: fetchTasks,
  } = useRequest(configReq, gotData);
  useEffect(() => {
    fetchTasks();
  }, []);
  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;

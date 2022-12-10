import Section from "../UI/Section";
import TaskForm from "./TaskForm";
import useRequest from "../Hooks/use-request";
const NewTask = (props) => {
  const { isLoading, error, request: addTask } = useRequest();
  const gotData = (taskText, data) => {
    console.log(taskText);
    console.log(data);
    const generatedId = data.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    console.log(createdTask);
    props.onAddTask(createdTask);
  };
  const enterTaskHandler = async (taskText) => {
    console.log(taskText);
    const dataForAdd = {
      url: "https://task-app-4d609-default-rtdb.firebaseio.com/tasks.json",
      method: "POST",
      body: { text: taskText },
      headers: { "Content-Type": "application/json" },
    };
    addTask(dataForAdd, gotData.bind(null, taskText));
  };
  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;

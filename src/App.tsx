import { useEffect, useState } from "react";
import { remult } from "./common";
import { Task } from "./Task";
import { TaskEditor } from "./TaskEditor";

const taskRepo = remult.repo(Task);

function App() {
  const [title, setTitle] = useState("");
  const [tasks, setTasks] = useState([] as Task[]);
  const [loadTasks, setLoadTasks] = useState(true);

  useEffect(() => {
    if (loadTasks) {
      setLoadTasks(false);
      taskRepo
        .find({
          orderBy: {
            completed: "asc"
          }
        })
        .then(setTasks);
    }
  }, [loadTasks]);
  const createTask = async () => {
    try {
      await taskRepo.save({ title });
      setTitle("");
      setLoadTasks(true);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <input value={title} onChange={(e) => setTitle(e.target.value)} />
      <button onClick={createTask}>Create Task</button>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <TaskEditor task={task} />
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

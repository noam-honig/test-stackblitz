import { useEffect, useState } from "react";
import { Task } from "./Task";
import { remult } from "./common";

export const TaskEditor: React.FC<{ task: Task }> = ({ task }) => {
  const [title, setTitle] = useState(task.title);
  const [completed, setCompleted] = useState(task.completed);
  useEffect(() => {
    setCompleted(task.completed);
  }, [task]);

  const save = () => {
    try {
      remult.repo(Task).save({ ...task, title, completed });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <span>
      <input
        checked={completed}
        type="checkbox"
        onChange={(e) => setCompleted(e.target.checked)}
      />
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={{ textDecoration: completed ? "line-through" : undefined! }}
      />
      <button onClick={() => save()}>save</button>
    </span>
  );
};

import { useState } from "react";
import DeleteIcon from "../assets/Icons/DeleteIcon";
import { Id, Task } from "@/Interfaces";

interface Props {
  task: Task;
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

function TaskCard(props: Props) {
  const { task, deleteTask, updateTask } = props;
  const [EditMode, setEditMode] = useState(false);

  const [MouseInOver, setMouseInOver] = useState(false);

  const toggleEditMode = () => {
    setEditMode(prev => !prev);
    setMouseInOver(false);
  };
  if (EditMode) {
    return (
      <div className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-blue-500 cursor-grab relative task">
        <textarea
          className="
             h-[90%]
             w-full resize-none border-none rounded bg-mainBackgroundColor text-white focus:outline-none
             "
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={toggleEditMode}
          onKeyDown={e => {
            if (e.key === "Enter" || e.shiftKey) {
              toggleEditMode();
            }
          }}
          onChange={e => updateTask(task.id, e.target.value)}
        ></textarea>
      </div>
    );
  }
  return (
    <div
      onClick={toggleEditMode}
      onMouseEnter={() => setMouseInOver(true)}
      onMouseLeave={() => setMouseInOver(false)}
      className="bg-mainBackgroundColor p-2.5 h-[100px] min-h-[100px] items-center flex text-left rounded-xl hover:ring-2 hover:ring-inset hover:ring-blue-500 cursor-grab relative task"
    >
      {task.content}
      {MouseInOver && (
        <button
          onClick={() => deleteTask(task.id)}
          className="stroke-white absolute right-4 top-1/2 -translate-y-1/2 bg-columnBackgroundColor p-2 rounded opacity-60 hover:opacity-100"
        >
          <DeleteIcon />
        </button>
      )}
    </div>
  );
}

export default TaskCard;

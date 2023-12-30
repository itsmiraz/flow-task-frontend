import { useSortable } from "@dnd-kit/sortable";
import DeleteIcon from "../assets/Icons/DeleteIcon";
// import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import PlusIcons from "../assets/Icons/PlusIcons";
import TaskCard from "./TaskCard";
import { Column, Id, Task } from "@/Interfaces";
interface Props {
  column: Column;
  deleteColumn: (id: Id) => void;
  updateColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  tasks: Task[];
  deleteTask: (id: Id) => void;
  updateTask: (id: Id, content: string) => void;
}

const ColumnContainer = (props: Props) => {
  const {
    column,
    deleteColumn,
    updateTask,
    deleteTask,
    tasks,
    updateColumn,
    createTask,
  } = props;
  const [ContentEditable, setContentEditable] = useState(false);

  const { setNodeRef, attributes, transition, listeners, isDragging } =
    useSortable({
      id: column.id,
      data: {
        type: "Column",
        column,
      },
      disabled: ContentEditable,
    });

  const style = {
    transition,
  };

  if (isDragging) {
    console.log(tasks?.length * 100);
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-columnBackgroundColor ${
          tasks?.length !== 0 ? `h-[${tasks?.length * 100}px]` : "h-[200px]"
        } opacity-40 ring-4 ring-blue-500   rounded-md flex flex-col `}
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-columnBackgroundColor min-h-[200px] rounded-md flex flex-col "
    >
      <div
        {...attributes}
        {...listeners}
        className="bg-mainBackgroundColor text-md h-[60px] cursor-grab rounded-md rounded-b-none p-3 font-bold border-columnBackgroundColor border-4 flex items-center justify-between "
      >
        <div className="flex gap-2">
          <div className="   flex text-[#ffff]   justify-center   items-center   bg-columnBackgroundColor   px-2   py-1   text-sm   rounded-full">
            0
          </div>
          {!ContentEditable && (
            <div onClick={() => setContentEditable(!ContentEditable)}>
              {" "}
              {column.title}
            </div>
          )}
          {ContentEditable && (
            <input
              className="bg-[#000000] bg focus:border-blue-500 border rounded outline-none px-2"
              value={column.title}
              onChange={e => updateColumn(column.id, e.target.value)}
              autoFocus
              onBlur={() => {
                setContentEditable(false);
              }}
              onKeyDown={e => {
                if (e.key !== "Enter") return;
                setContentEditable(false);
              }}
            />
          )}
        </div>
        <button
          onClick={() => deleteColumn(column.id)}
          className=" stroke-gray-500 hover:stroke-white hover:bg-columnBackgroundColor rounded px-1 py-2 "
        >
          <DeleteIcon />
        </button>
      </div>{" "}
      {/* Column task container */}
      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        {tasks?.map(task => (
          <TaskCard
            updateTask={updateTask}
            deleteTask={deleteTask}
            task={task}
            key={task.id}
          ></TaskCard>
        ))}
      </div>
      {/* Column footer */}
      <button
        onClick={() => createTask(column.id)}
        className="flex gap-2 items-center border-columnBackgroundColor border-2 rounded-md p-4 border-x-columnBackgroundColor hover:bg-mainBackgroundColor hover:text-blue-500 active:bg-black"
      >
        <PlusIcons />
        Add task
      </button>
    </div>
  );
};

export default ColumnContainer;

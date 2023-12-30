import { useMemo, useState } from "react";
import PlusIcons from "../assets/Icons/PlusIcons";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./ColumnContainer";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { SortableContext, arrayMove } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
function KanbanBoard() {
  const [columns, setColumns] = useState<Column[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);

  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);
  const [ActiveColumn, setActiveColumn] = useState<Column | null>(null);
  const generatID = () => {
    return Math.floor(Math.random() * 1001);
  };

  const handleCreateColumn = () => {
    const columnToAdd: Column = {
      id: generatID(),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  };

  const deleteColumn = (id: Id) => {
    const filteredColumns = columns.filter(col => col.id !== id);
    setColumns(filteredColumns);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      },
    })
  );

  const updateColumn = (id: Id, title: string) => {
    console.log(id, title);
    const newColumns = columns.map(col => {
      if (col.id !== id) return col;
      return { ...col, title };
    });
    setColumns(newColumns);
  };

  const createTask = (columnId: Id) => {
    const newTask: Task = {
      id: generatID(),
      columnId,
      content: `Task ${tasks.length + 1}`,
    };
    setTasks([...tasks, newTask]);
  };
  const deleteTask = (id: Id) => {
    const newTasks = tasks.filter(task => task.id !== id);
    setTasks(newTasks);
  };

  return (
    <div className="m-auto text-[#ffff] bg-mainBackgroundColor   min-h-screen   w-full   items-center   overflow-x-auto   overflow-y-hidden   px-[40px]">
      <button
        onClick={() => handleCreateColumn()}
        className="flex text-white my-10 mx-auto select-none items-center gap-2 font-medium h-[60px] w-[350px] min-w-[350px] cursor-pointer  rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4  ring-blue-500 hover:ring-2"
      >
        <PlusIcons /> Add Column
      </button>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="relative mx-auto max-w-[1440px]">
          <SortableContext items={columnsId}>
            <ResponsiveMasonry
              columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
            >
              <Masonry gutter={"20px"}>
                {columns.map(col => (
                  <ColumnContainer
                    createTask={createTask}
                    updateTask={updateTask}
                    updateColumn={updateColumn}
                    deleteColumn={deleteColumn}
                    column={col}
                    deleteTask={deleteTask}
                    tasks={tasks.filter(task => task.columnId === col.id)}
                    key={col.id}
                  ></ColumnContainer>
                ))}
              </Masonry>
            </ResponsiveMasonry>
          </SortableContext>
        </div>

        {createPortal(
          <DragOverlay>
            {ActiveColumn && (
              <ColumnContainer
                createTask={createTask}
                updateTask={updateTask}
                updateColumn={updateColumn}
                column={ActiveColumn}
                deleteColumn={deleteColumn}
                deleteTask={deleteTask}
                tasks={tasks.filter(task => task.columnId === ActiveColumn.id)}
              ></ColumnContainer>
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );
  function updateTask(id: Id, content: string) {
    const newTasks = tasks.map(task => {
      if (task.id !== id) return task;
      return { ...task, content };
    });

    setTasks(newTasks);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event?.active?.data?.current?.column);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { over } = event;

    if (!over) return;

    const activeColumnId = ActiveColumn?.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns(columns => {
      const activeColumnIndex = columns.findIndex(
        col => col.id === activeColumnId
      );

      const overColumnIndex = columns.findIndex(col => col.id === overColumnId);
      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }
}

export default KanbanBoard;

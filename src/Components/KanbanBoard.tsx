import { useMemo, useState } from "react";
import PlusIcons from "../assets/Icons/PlusIcons";
import { Column, Id } from "../types";
import ColumnContainer from "./ColumnContainer";
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
  const columnsId = useMemo(() => columns.map(col => col.id), [columns]);
  const [ActiveColumn, setActiveColumn] = useState<Column | null>(null);

  const handleCreateColumn = () => {
    const generatID = () => {
      return Math.floor(Math.random() * 1001);
    };

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

  return (
    <div className="m-auto  flex   min-h-screen   w-full   items-center   overflow-x-auto   overflow-y-hidden   px-[40px]">
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="m-auto flex gap-4">
          <div className="flex flex-wrap gap-4">
            <SortableContext items={columnsId}>
              {columns.map(col => (
                <ColumnContainer
                  updateColumn={updateColumn}
                  deleteColumn={deleteColumn}
                  column={col}
                  key={col.id}
                ></ColumnContainer>
              ))}
            </SortableContext>
          </div>

          <button
            onClick={() => handleCreateColumn()}
            className="flex select-none items-center gap-2 font-medium h-[60px] w-[350px] min-w-[350px] cursor-pointer  rounded-lg bg-mainBackgroundColor border-2 border-columnBackgroundColor p-4  ring-rose-500 hover:ring-2"
          >
            <PlusIcons /> Add Column
          </button>
        </div>

        {createPortal(
          <DragOverlay>
            {ActiveColumn && (
              <ColumnContainer
                updateColumn={updateColumn}
                column={ActiveColumn}
                deleteColumn={deleteColumn}
              ></ColumnContainer>
            )}
          </DragOverlay>,
          document.body
        )}
      </DndContext>
    </div>
  );

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current?.column);
    }
  }

  function onDragEnd(event: DragEndEvent) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { active, over } = event;

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

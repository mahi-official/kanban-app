import DroppableBoard from "../components/Board";
import { DragDropContext } from 'react-beautiful-dnd';
import { useState } from "react";
import data from './../data/DummyData';
import { Stack } from "@mui/material";

const HandleDragEnd = (_result: any) => {
  console.log("Still in progress");
}

export default function Homepage() {

  const [initData, setInitData] = useState(data);

  return (
    <DragDropContext
      onDragEnd={HandleDragEnd}>
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
      >
        {initData.columnOrder.map((boardID: string) => {
          const board = initData.boards[boardID];
          const tasks = board.taskIds.map((taskID: string | number) => {
            const task = initData.tasks[taskID];
            return task
          })
          console.log(tasks);
          return <DroppableBoard board={board} tasks={tasks} />
        })}
      </Stack>
    </DragDropContext>
  )
}
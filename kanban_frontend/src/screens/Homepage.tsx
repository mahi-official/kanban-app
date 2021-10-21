import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { useState } from "react";
import data from './../data/DummyData';
import { Container, Stack } from "@mui/material";
import Board from "../components/Board";
import SearchAppBar from '../components/AppBar';
import { Box } from '@mui/system';

export default function Homepage() {

    const [initData, setInitData] = useState(data);

    const HandleDragEnd = (result: any) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }
        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (type === 'Board') {
            let newOrder = Array.from(initData.columnOrder);
            newOrder.splice(source.index, 1);
            newOrder.splice(destination.index, 0, draggableId);

            setInitData({
                ...initData,
                columnOrder: newOrder
            });
            return;
        }

        if (destination.droppableId !== source.droppableId) {

            const srcBoard = initData.boards[source.droppableId];
            const dstBoard = initData.boards[destination.droppableId];

            let oldTaskList = Array.from(srcBoard.taskIds);
            let newTaskList = Array.from(dstBoard.taskIds);

            oldTaskList.splice(source.index, 1);
            newTaskList.splice(destination.index, 0, draggableId);

            setInitData({
                ...initData,
                boards: {
                    ...initData.boards,
                    [srcBoard.id]: { ...srcBoard, taskIds: oldTaskList },
                    [dstBoard.id]: { ...dstBoard, taskIds: newTaskList }
                }
            });
            return;

        }
        if (destination.droppableId === source.droppableId) {
            const board = initData.boards[destination.droppableId];
            let taskList = Array.from(board.taskIds);
            taskList.splice(source.index, 1);
            taskList.splice(destination.index, 0, draggableId);

            setInitData({
                ...initData,
                boards: {
                    ...initData.boards,
                    [board.id]: { ...board, taskIds: taskList }
                }
            });
            return;
        }
        console.log("No Action Found");
    }

    return (
        <Box>
            <SearchAppBar />
            <DragDropContext
                onDragEnd={HandleDragEnd}>
                <Droppable direction="horizontal" droppableId="parent-board" type="Board">
                    {(provided) => (
                        <Stack
                            direction="row"
                            justifyContent="flex-start"
                            alignItems="flex-start"
                            spacing={2}
                            {...provided.droppableProps}
                            ref={provided.innerRef}
                        >
                            {initData.columnOrder.map((boardId: string, index: number) => {
                                const board = initData.boards[boardId];
                                const tasks = board.taskIds.map((taskID: string | number) => {
                                    const task = initData.tasks[taskID];
                                    return task
                                })
                                return <Board board={board} tasks={tasks} key={board.id} index={index} />
                            })}

                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </DragDropContext>
        </Box>
    )
}
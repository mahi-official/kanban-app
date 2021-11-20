import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import React, { useEffect, useState } from "react";
import { Button, Grid, Stack } from "@mui/material";
import Board from "../features/boards/Board";
import SearchAppBar from '../components/AppBar';
import { Box } from '@mui/system';
import { Add } from '@mui/icons-material';
import BoardInstance, {  getBoards } from '../apis/BoardAPI';
import TaskInstance, { getTasks, moveTask } from '../apis/TaskAPI';
import BoardDialog from '../features/boards/BoardDialog';


export default function Homepage() {

    const [boards, setBoards] = useState<BoardInstance[]>([]);
    const [error, setError] = useState<string>('');
    const [openDialog, setOpenDialog] = React.useState<boolean>(false);

    const getData = () => {
        getTasks()
            .then((notes: TaskInstance[] | undefined) => {
                getBoards()
                    .then((res: BoardInstance[] | undefined) => {
                        const columns = res!.map((board: BoardInstance, index: number) => {
                            let tasks = notes!.filter((item: TaskInstance) => item.board === board.id)
                            board.tasks = tasks
                            return board
                        })
                        setBoards(columns)
                    })
                    .catch((err: any) => setError(err))
            })
            .catch((err: any) => setError(err))
    }


    const HandleDragEnd = (result: any) => {
        const { destination, source, draggableId, type } = result;

        if (!destination) {
            return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
            return;
        }

        if (type === 'Board') {
            let board: BoardInstance = boards.find((b) => b.id === draggableId)!
            let newBoardOrder = Array.from(boards);
            newBoardOrder.splice(source.index, 1)
            newBoardOrder.splice(destination.index, 0, board)
            setBoards(newBoardOrder)
            return;
        }

        if (type === 'Note') {
            if (destination.droppableId !== source.droppableId) {
                const srcBoard: number = boards.findIndex((b) => b.id === source.droppableId)!
                const dstBoard: number = boards.findIndex((b) => b.id === destination.droppableId)!
                const task: TaskInstance = boards[srcBoard].tasks!.find((t) => t.id === draggableId)!

                let oldTaskList = Array.from(boards[srcBoard].tasks!);
                let newTaskList = Array.from(boards[dstBoard].tasks!);
                let newBoard = Array.from(boards);

                moveTask(task.id, newBoard[dstBoard].id)

                oldTaskList.splice(source.index, 1);
                newTaskList.splice(destination.index, 0, task);

                newBoard[srcBoard].tasks = oldTaskList;
                newBoard[dstBoard].tasks = newTaskList;
                
                setBoards(newBoard)
                
                return;
            }

            else {
                
                const idx: number = boards.findIndex((b) => b.id === destination.droppableId)!
                const task: TaskInstance = boards[idx].tasks!.find((t) => t.id === draggableId)!
                let newBoards:BoardInstance[] = Array.from(boards);
                let taskList: TaskInstance[] = Array.from(boards[idx].tasks!)

                taskList.splice(source.index, 1);
                taskList.splice(destination.index, 0, task);

                newBoards[idx].tasks = taskList;
                setBoards(newBoards);

                return;
            }
        }

        console.log("No Action Found");
    }

    const handleAddNewBoard = () => {
        setOpenDialog(true);
    }
    const handleNewBoardClose = () => {
        setOpenDialog(false);
    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <Box>
            <SearchAppBar />
            <Stack
                direction="row"
                justifyContent="flex-start"
                alignItems="flex-start"
                spacing={2}
            >
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
                                {
                                    boards.map((board: BoardInstance, index: number) => {
                                        // return <Board board={board} tasks={board.tasks} key={board.id} index={index} />
                                    })}
                                {provided.placeholder}
                            </Stack>
                        )}
                    </Droppable>
                </DragDropContext>
                <Grid container alignItems="center">
                    <Grid item xs={12}>
                        <Box
                            sx={{
                                flexGrow: 1,
                                backgroundColor: 'whitesmoke',
                                padding: '0 0.5em',
                                width: '300px',
                            }}
                        >
                            <Button
                                id='new-board'
                                size='medium'
                                onClick={handleAddNewBoard}
                                sx={{ fontSize: 12, fontWeight: 500, color: 'gray', margin: 2 }}
                                startIcon={
                                    <Add style={{ fill: "gray", fontSize: 12 }} />
                                }
                            >
                                Add another Board
                            </Button>
                            {/* <BoardDialog open={openDialog} onClose={handleNewBoardClose} onSave={getData}/> */}
                        </Box>
                    </Grid>
                </Grid>
            </Stack>
            {error}
        </Box>
    )
}
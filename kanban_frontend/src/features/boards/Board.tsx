import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Add, BackupTable, MoreHoriz } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { useState } from 'react';
import TaskInstance from '../../apis/TaskAPI';
import { Task } from '../tasks/Task';
import TaskDialog from '../tasks/TaskDialog';
import BoardInstance from '../../apis/BoardAPI';

type BoardProps = {
    board: BoardInstance
    tasks: TaskInstance[] | null
    key:string
    index:number
    onEdit: (item: BoardInstance) => void
}

export default function Board(props: BoardProps) {

    const [openDialog, setOpenDialog] = useState<boolean>(false)
    const [task, setTask] = useState<TaskInstance | null>(null)

    const handleTaskClose = () => {
        setTask(null)
        setOpenDialog(false)
    }

    const handleEditTask = (item: TaskInstance) => {
        setTask(item)
        setOpenDialog(true)
    }

    const taskDialog = <TaskDialog task={task} board={props.board.id} open={openDialog} onClose={handleTaskClose} />

    return (
        <Draggable draggableId={props.board.id} index={props.index} >
            {(provided) => (
                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: 'whitesmoke',
                        padding: '0 0.5em',
                        width: '300px'
                    }}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Grid container alignItems="center">
                        <Grid item xs={10} {...provided.dragHandleProps}>
                            <Stack direction="row" justifyContent="flex-start" alignItems="center">
                                <Typography sx={{ color: 'skyblue', fontWeight: 600, pl: 1 }}>{props.board.title}</Typography>
                                <IconButton component="div" aria-label="Edit Title" onClick={() => props.onEdit(props.board)}>
                                    <EditIcon style={{ fill: "lightgray" }} fontSize="small" />
                                </IconButton>
                            </Stack>
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: 'end' }}>
                            <IconButton component="div" color="primary" aria-label="More Options">
                                <MoreHoriz style={{ fill: "gray" }} />
                            </IconButton>
                        </Grid>
                        <Grid item sx={{ width: '100%', p: 1 }}>
                            <Droppable droppableId={props.board.id} type="Note">
                                {(provided) => (
                                    <Stack spacing={1} {...provided.droppableProps} ref={provided.innerRef} component="div">
                                        {props.tasks && props.tasks.length > 0 ?
                                            props.tasks.map((task: TaskInstance, index: number) => (
                                                <Task index={index} task={task} key={task.id} onEdit={handleEditTask} />
                                            ))
                                            :
                                            <Box component="div" sx={{ p: 2, border: '1px dashed lightgrey' }}>
                                                <Typography component="div" sx={{ textAlign: "center", color: "gray", fontSize: "12px" }}>Drop Cards Here or Add a new Card</Typography>
                                            </Box>
                                        }
                                        {provided.placeholder}
                                    </Stack>
                                )}
                            </Droppable>
                        </Grid>
                        <Grid item xs={10}>
                            <Button
                                id='new-board'
                                size='medium'
                                onClick={() => setOpenDialog(true)}
                                sx={{ fontSize: 12, fontWeight: 400, color: 'gray', margin: 1 }}
                                startIcon={
                                    <Add style={{ fill: "gray", fontSize: 12 }} />
                                }
                            >
                                Add a card
                            </Button>
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: 'end' }}>
                            <IconButton color="primary" aria-label="Card Options" component="div">
                                <BackupTable style={{ fill: "gray", fontSize: "18" }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    {taskDialog}
                </Box >
            )}
        </Draggable>
    );
}
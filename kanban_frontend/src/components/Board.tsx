import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Add, BackupTable, MoreHoriz } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Task } from './Task';
import BoardInstance from '../apis/BoardAPI';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { showTaskDialog } from '../features/tasks/TasksSlice';
import { showBoardDialog } from '../features/boards/BoardsSlice';
import { TASK } from '../config/constants';
import { getTaskOrder } from '../features/order/orderSlice';

type BoardProps = {
    board: BoardInstance
    key:string
    index:number
}

export default function Board(props: BoardProps) {

    const dispatch = useAppDispatch()
    const taskOrder = useAppSelector(state => getTaskOrder(state, props.board.id))
    const tasks = useAppSelector(state => state.tasksState.tasks)


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
                                <IconButton component="div" aria-label="Edit Title" onClick={() => dispatch(showBoardDialog(props.board))} >
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
                            <Droppable droppableId={props.board.id} type={TASK}>
                                {(provided) => (
                                    <Stack spacing={1} {...provided.droppableProps} ref={provided.innerRef} component="div">
                                        {taskOrder.length > 0 ?
                                            taskOrder.map((taskId: string, idx:number) => (
                                                <Task index={idx} task={tasks[taskId]} key={tasks[taskId].id} />    
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
                                onClick={() => dispatch(showTaskDialog({board: props.board.id, task: null}))}
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
                </Box >
            )}
        </Draggable>
    );
}
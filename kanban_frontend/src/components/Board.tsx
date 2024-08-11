import { Button, Grid, IconButton, ListItemIcon, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Add, BackupTable, Delete, ExpandLess, ExpandMore, MoreHoriz, WarningAmber } from '@mui/icons-material';
import EditIcon from '@mui/icons-material/Edit';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import { Task } from './Task';
import BoardInstance from '../apis/BoardAPI';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { showTaskDialog } from '../features/tasks/TasksSlice';
import { showBoardDialog } from '../features/boards/BoardsSlice';
import { TASK } from '../config/constants';
import { getTaskOrder } from '../features/order/orderSlice';
import { useState } from 'react';

type BoardProps = {
  board: BoardInstance
  key: string
  index: number
}

export default function Board(props: BoardProps) {

  const dispatch = useAppDispatch()
  const taskOrder = useAppSelector(state => getTaskOrder(state, props.board.id))
  const tasks = useAppSelector(state => state.tasksState.tasks)

  const limit = 5
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const [expanded, setExpanded] = useState(true)

  const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const menu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={props.board + 'more_options'}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={open}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => dispatch(showBoardDialog(props.board))}>
        <ListItemIcon>
          <EditIcon fontSize="small" />
        </ListItemIcon>
        Edit
      </MenuItem>
      <MenuItem onClick={() => console.log("delete item")}>
        <ListItemIcon>
          <Delete fontSize="small" />
        </ListItemIcon>
        Delete
      </MenuItem>

    </Menu>
  )

  return (
    <Draggable draggableId={props.board.id} index={props.index} >
      {(provided) => (
        expanded === true ?
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
              <Grid item xs={10} {...provided.dragHandleProps} >
                <Stack direction="row" justifyContent="flex-start" alignItems="center" >
                  <Typography sx={{ color: 'skyblue', fontWeight: 600, pl: 1 }}>{props.board.title}</Typography>
                  {
                    taskOrder.length > limit ?
                      <Tooltip title="Adding more tasks to the list might reduce work efficiency">
                        <span>
                          <IconButton disabled>
                            <WarningAmber style={{ fill: "orange" }} fontSize="small" />
                          </IconButton>
                        </span>
                      </Tooltip>
                      :
                      null
                  }
                  <IconButton component="div" aria-label="Edit Title" onClick={() => setExpanded(false)} >
                    <ExpandLess style={{ fill: "lightgray" }} fontSize="small" />
                  </IconButton>

                </Stack>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'end' }}>
                <IconButton component="div" color="primary" aria-label="More Options" onClick={handleMenuClick}>
                  <MoreHoriz style={{ fill: "gray" }} />
                </IconButton>
              </Grid>
              <Grid item sx={{ width: '100%', p: 1 }}>
                <Droppable droppableId={props.board.id} type={TASK}>
                  {(provided) => (
                    <Stack spacing={1} {...provided.droppableProps} ref={provided.innerRef} component="div">
                      {taskOrder.length > 0 ?
                        taskOrder.map((taskId: string, idx: number) => (
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
                  onClick={() => dispatch(showTaskDialog({ board: props.board.id, task: null }))}
                  sx={{ fontSize: 12, fontWeight: 400, color: 'gray', margin: 1 }}
                  startIcon={
                    <Add style={{ fill: "gray", fontSize: 12 }} />
                  }
                >
                  Add a card
                </Button>
              </Grid>
              <Grid item xs={2} sx={{ textAlign: 'end' }}>
                <IconButton disabled color="primary" aria-label="Card Options" component="div">
                  <BackupTable style={{ fill: "gray", fontSize: "18" }} />
                </IconButton>
              </Grid>
            </Grid>
            {menu}
          </Box >
          :
          <Box
            sx={{
              backgroundColor: 'whitesmoke',
              padding: '0 0.5em',
            }}
            {...provided.draggableProps}
            ref={provided.innerRef}
          >
            <Stack {...provided.dragHandleProps}
              direction="column"
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
              mt={2}
            >
              <Typography
                sx={{
                  writingMode: 'vertical-rl',
                  color: 'skyblue',
                  fontWeight: 600,
                }}>
                {props.board.title}
              </Typography>
              {
                taskOrder.length > 0 ?
                  <Typography
                    sx={{
                      writingMode: 'vertical-rl',
                      color: 'skyblue',
                      fontSize: 'small',
                      border: '1px solid lightgray',
                      borderRadius: '33%',
                      padding: '8px 2px'
                    }}>
                    {taskOrder.length}
                  </Typography>
                  :
                  null
              }
              <IconButton component="div" aria-label="Edit Title" onClick={() => setExpanded(true)} >
                <ExpandMore style={{ fill: "lightgray" }} fontSize="small" />
              </IconButton>

            </Stack>
          </Box>
      )}
    </Draggable>
  );
}
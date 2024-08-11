import { Add } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import BoardInstance, { getBoards } from '../apis/BoardAPI'
import TaskInstance, { getTasks, moveTask } from '../apis/TaskAPI'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import SearchAppBar from '../components/AppBar'
import Board from '../components/Board'
import BoardDialog from '../components/BoardDialog'
import { setTasks } from '../features/tasks/TasksSlice'
import { setBoards, showBoardDialog } from '../features/boards/BoardsSlice'
import TaskDialog from '../components/TaskDialog'
import { BOARD, TASK } from '../config/constants'
import { setBoardsOrder } from '../features/order/orderSlice'
import GroupTasks from '../app/utils'
import { disableDrag } from '../features/app/appSlice'

export default function HomePage() {

  const dispatch = useAppDispatch()
  const boards = useAppSelector(state => state.boardsState.boards)
  const order = useAppSelector(state => state.orderState.order)
  const dark = useAppSelector(state => state.appState.darkMode)


  useEffect(() => {
    getTasks()
      .then((notes: TaskInstance[] | undefined) => {
        if (notes) {
          dispatch(setTasks(notes))
          getBoards()
            .then((brds: BoardInstance[] | undefined) => {
              if (brds) {
                dispatch(setBoards(brds))
                dispatch(setBoardsOrder(GroupTasks({ boards: brds, tasks: notes })))
              }
            })
            .catch((err: any) => console.log(err))
        }
      })
      .catch((err: any) => console.log(err))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  const handleDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && destination.index === source.index) {
      return;
    }

    if (type === BOARD) {

      let newBoardOrder = Array.from(order)
      let moved = newBoardOrder.find((b) => Object.keys(b).includes(draggableId))!
      newBoardOrder.splice(source.index, 1)
      newBoardOrder.splice(destination.index, 0, moved)
      dispatch(setBoardsOrder(newBoardOrder))
      return
    }

    if (type === TASK) {
      if (destination.droppableId !== source.droppableId) {

        dispatch(disableDrag(true))

        let newBoardOrder = Array.from(order)
        let frmIdx = newBoardOrder.findIndex((b) => Object.keys(b).includes(source.droppableId))!
        let toIdx = newBoardOrder.findIndex((b) => Object.keys(b).includes(destination.droppableId))!

        let fromBoard: { [key: string]: string[] } = newBoardOrder[frmIdx]
        let toBoard: { [key: string]: string[] } = newBoardOrder[toIdx]

        let newFromTaskList: string[] = Array.from(fromBoard[source.droppableId])
        let newToTaskList: string[] = Array.from(toBoard[destination.droppableId])

        newFromTaskList.splice(source.index, 1)
        newToTaskList.splice(destination.index, 0, draggableId)

        fromBoard = { ...fromBoard, [source.droppableId]: newFromTaskList }
        toBoard = { ...toBoard, [destination.droppableId]: newToTaskList }

        newBoardOrder[frmIdx] = fromBoard
        newBoardOrder[toIdx] = toBoard

        dispatch(setBoardsOrder(newBoardOrder))

        moveTask(draggableId, destination.droppableId)
          .then((res) => {
            if (res) {
              dispatch(disableDrag(false))
            }
          })
          .catch(err => {
            console.log(err)
            dispatch(setBoardsOrder(order))
            dispatch(disableDrag(false))
          })

        return

      } else {

        let newBoardOrder: { [key: string]: string[] }[] = Array.from(order)
        let idx: number = newBoardOrder.findIndex((b) => Object.keys(b).includes(source.droppableId))!
        let edited: { [key: string]: string[] } = newBoardOrder[idx]
        let newTaskList: string[] = Array.from(edited[source.droppableId])

        newTaskList.splice(source.index, 1)
        newTaskList.splice(destination.index, 0, draggableId)

        edited = { ...edited, [source.droppableId]: newTaskList }
        newBoardOrder[idx] = edited

        dispatch(setBoardsOrder(newBoardOrder))

        return
      }
    }

    console.log("No Action Found");
  }


  return (
    <Box sx={{
      height: '100vh',
      backgroundColor: dark ? 'gray' : 'white',
    }}>
      <SearchAppBar />
      <Stack
        direction="row"
        justifyContent="flex-start"
        alignItems="flex-start"
        spacing={2}
        paddingLeft={2}
        paddingRight={2}
      >
        <DragDropContext
          onDragEnd={handleDragEnd}>
          <Droppable direction="horizontal" droppableId="parent-board" type={BOARD}>
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
                  order.map((boardObj, index: number) => {
                    let brdId = Object.keys(boardObj)[0]
                    const board = boards[brdId]
                    return <Board board={board} key={board.id} index={index} />
                  })}
                {provided.placeholder}
              </Stack>
            )}
          </Droppable>
        </DragDropContext>
        <Box
          sx={{
            backgroundColor: 'whitesmoke',
            padding: '0 0.5em',
            width: 'fit-content',
          }}
        >
          <Button
            id='new-board'
            size='medium'
            onClick={() => dispatch(showBoardDialog(null))}
            sx={{ fontSize: 12, fontWeight: 500, color: 'gray', margin: 2 }}
            startIcon={
              <Add style={{ fill: "gray", fontSize: 12 }} />
            }
          >
            Add another Board
          </Button>
        </Box>
      </Stack>
      <BoardDialog />
      <TaskDialog />
    </Box>
  )
}

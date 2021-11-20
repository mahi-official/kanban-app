import { Add } from '@mui/icons-material'
import { Button, Stack } from '@mui/material'
import { Box } from '@mui/system'
import { useEffect, useState } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'
import BoardInstance, { getBoards } from '../../apis/BoardAPI'
import TaskInstance, { getTasks } from '../../apis/TaskAPI'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import SearchAppBar from '../../components/AppBar'
import Board from './Board'
import BoardDialog from './BoardDialog'
import { setTasks } from '../tasks/TasksSlice'
import { setBoards } from './BoardsSlice'

export default function BoardsList() {

  const dispatch = useAppDispatch()
  const boards = useAppSelector(state => state.boardsState.boards)

  const [openDialog, setOpenDialog] = useState<boolean>(false)
  const [boardInst, setBoardInst] = useState<BoardInstance | null>(null)

  useEffect(() => {
    getTasks()
      .then((notes: TaskInstance[] | undefined) => {
        dispatch(setTasks(notes))
        getBoards()
          .then((brds: BoardInstance[] | undefined) => {
            const columns = brds!.map((board: BoardInstance, index: number) => {
              let tasks = notes!.filter((item: TaskInstance) => item.board === board.id)
              board.tasks = tasks
              return board
            })
            dispatch(setBoards(columns))
          })
          .catch((err: any) => console.log(err))
      })
      .catch((err: any) => console.log(err))
  }, [dispatch])


  const handleBoardClose = () => {
    setBoardInst(null)
    setOpenDialog(false)
  }

  const handleEditBoard = (item:BoardInstance) => {
    setBoardInst(item)
    setOpenDialog(true)
  }

  const boardDialog = <BoardDialog board={boardInst} open={openDialog} onClose={handleBoardClose} />
  
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
          onDragEnd={() => console.log("drag end")}>
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
                    return <Board board={board} tasks={board.tasks} key={board.id} index={index} onEdit={handleEditBoard} />
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
            onClick={() => { setOpenDialog(true) }}
            sx={{ fontSize: 12, fontWeight: 500, color: 'gray', margin: 2 }}
            startIcon={
              <Add style={{ fill: "gray", fontSize: 12 }} />
            }
          >
            Add another Board
          </Button>
        </Box>
      </Stack>
      {boardDialog}
    </Box>
  )
}
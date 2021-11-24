import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import React, { useEffect } from "react"
import BoardInstance, { createBoard, updateBoard } from "../apis/BoardAPI"
import { useAppDispatch, useAppSelector } from "../app/hooks"
import { addBoardToOrder } from "../features/order/orderSlice"
import { addBoard, hideBoardDialog, modifyBoard } from "../features/boards/BoardsSlice"


export default function BoardDialog() {

  const dispatch = useAppDispatch()
  const board = useAppSelector(state => state.boardsState.board)
  const open = useAppSelector(state => state.boardsState.showDialog)

  const [value, setValue] = React.useState<string>('')

  useEffect(() => {
    if (board) {
      setValue(board.title)
    }
  }, [board])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const handleBoardSave = () => {
    if (board) {
      updateBoard(board.id, value)
        .then((res: BoardInstance | undefined) => {
          if (res) {
            dispatch(modifyBoard(res))
          }
        })
    } else {
      createBoard(value)
        .then((res: BoardInstance | undefined) => {
          if (res) {
            dispatch(addBoard(res))
            dispatch(addBoardToOrder(res.id))
          }
        })
    }
    handleBoardClose()
  }

  const handleBoardClose = () => {
    setValue('')
    dispatch(hideBoardDialog())
  }

  return (
    <Dialog open={open} onClose={handleBoardClose} fullWidth>
      <DialogTitle>Board</DialogTitle>
      <DialogContent>
        <TextField
          id="new-note"
          autoFocus
          fullWidth
          multiline
          minRows={1}
          value={value}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleBoardClose}>Cancel</Button>
        <Button onClick={handleBoardSave}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
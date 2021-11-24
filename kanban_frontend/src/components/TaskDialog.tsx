import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import React, { useEffect } from "react";
import TaskInstance, { createTask, updateTask } from "../apis/TaskAPI";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { addTaskToOrder } from "../features/order/orderSlice";
import { addTask, hideTaskDialog, modifyTask } from "../features/tasks/TasksSlice";


export default function TaskDialog() {

  const dispatch = useAppDispatch()
  const board = useAppSelector(state => state.tasksState.board)
  const task = useAppSelector(state => state.tasksState.task)
  const open = useAppSelector(state => state.tasksState.showDialog)

  const [value, setValue] = React.useState<string>('')

  useEffect(() => {
    if (task) {
      setValue(task.content)
    }
  }, [task])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleTaskSave = () => {
    if (task) {
      updateTask(task.id, value)
        .then((res: TaskInstance | undefined) => {
          if (res) {
            dispatch(modifyTask(res))
          }
        })
    } else {
      createTask(board!, value)
        .then((res: TaskInstance | undefined) => {
          if (res) {
            dispatch(addTask(res))
            dispatch(addTaskToOrder({ bid: res.board, tid: res.id }))
          }
        })
    }
    handleTaskClose()
  }

  const handleTaskClose = () => {
    setValue('')
    dispatch(hideTaskDialog())
  }


  return (
    <Dialog open={open} onClose={handleTaskClose} fullWidth>
      <DialogTitle>Task</DialogTitle>
      <DialogContent>
        <TextField
          id="new-note"
          autoFocus
          fullWidth
          multiline
          minRows={8}
          value={value}
          onChange={handleChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleTaskClose}>Cancel</Button>
        <Button onClick={handleTaskSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
}
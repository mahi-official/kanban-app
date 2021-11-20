import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import React, { useEffect } from "react";
import TaskInstance, { createTask, updateTask } from "../../apis/TaskAPI";
import { useAppDispatch } from "../../app/hooks";
import { addTask, modifyTask, setStatus } from "./TasksSlice";

type TaskDialogProps = {
    task: TaskInstance | null
    board: string
    open: boolean
    onClose: () => void
}

export default function TaskDialog(props: TaskDialogProps) {

    const [value, setValue] = React.useState<string>('');
    const dispatch = useAppDispatch()

    useEffect(() => {
        if (props.task){
            setValue(props.task.content)
        }
    }, [props.task])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleTaskSave = () => {
        dispatch(setStatus("loading"))
        if (!props.task) {
            createTask(props.board, value)
            .then((res: TaskInstance | undefined) => {
                dispatch(addTask(res))
                dispatch(setStatus("success"))
            })
        } else {
            updateTask(props.task.id, value)
            .then((res: TaskInstance | undefined) => {
                dispatch(modifyTask(res))
                dispatch(setStatus("success"))
            })
        }
        dispatch(setStatus("idle"))
        props.onClose()
    }


    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth>
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
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={handleTaskSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
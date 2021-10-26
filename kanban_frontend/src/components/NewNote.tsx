import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import React, { useEffect } from "react";
import { createTask, updateTask } from "../apis/TaskAPI";

export default function NewNoteDialog(props: any) {
    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleNewNoteSave = () => {
        props.content ? updateTask(props.task, value) : createTask(props.board, value)
        props.onSave()
        props.onClose()
    }
     useEffect(() => {
        setValue(props.content ?? '');
     }, [props.content])

    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth>
            <DialogTitle>Add New Task</DialogTitle>
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
                <Button onClick={handleNewNoteSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
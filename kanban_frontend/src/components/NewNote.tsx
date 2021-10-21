import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import React from "react";

export default function NewNoteDialog(props: any) {
    const [value, setValue] = React.useState('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleNewNoteSave = (event: any) => {
        console.log(`saving New Note on ${props.id}`)
    }
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
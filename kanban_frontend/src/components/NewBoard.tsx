import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import React from "react";
import { createBoard } from "../apis/BoardAPI";

export default function NewBoardDialog(props: any) {
    const [value, setValue] = React.useState<string>('');

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    const handleNewBoardSave = () => {
        createBoard(value)
        .then(res => {
            setValue('')
            props.onSave();
            props.onClose();
        })
    }
    
    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth>
            <DialogTitle>Add New Board</DialogTitle>
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
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={handleNewBoardSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
}
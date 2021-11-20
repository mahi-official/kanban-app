import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import React, { useEffect } from "react"
import BoardInstance, { createBoard, updateBoard } from "../../apis/BoardAPI"
import { useAppDispatch } from "../../app/hooks"
import { addBoard, modifyBoard, setStatus } from "./BoardsSlice"

type BoardDialogProps = {
    board: BoardInstance | null
    open: boolean
    onClose: () => void
}

export default function BoardDialog(props: BoardDialogProps) {
    const [value, setValue] = React.useState<string>('')
    const dispatch = useAppDispatch()
    
    useEffect(() => {
        if (props.board){
            setValue(props.board.title ?? '')
        }
    }, [props.board])

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value)
    }

    const handleBoardSave = () => {
        dispatch(setStatus("loading"))
        if (!props.board) {
            createBoard(value).then((res: BoardInstance | undefined) => {
                dispatch(addBoard(res))
                dispatch(setStatus("success"))
            })
        }else {
            updateBoard(props.board.id, value)
            .then((res: BoardInstance | undefined) => {
                dispatch(modifyBoard(res))
                dispatch(setStatus("success"))
            })
        }
        dispatch(setStatus("idle"))
        props.onClose()
    }

    return (
        <Dialog open={props.open} onClose={props.onClose} fullWidth>
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
                <Button onClick={props.onClose}>Cancel</Button>
                <Button onClick={handleBoardSave}>Save</Button>
            </DialogActions>
        </Dialog>
    )
}
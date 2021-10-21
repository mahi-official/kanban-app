import { Paper, Typography } from "@mui/material";
import { Draggable } from "react-beautiful-dnd";

export default function Note(props: any) {
    return (
        <Draggable draggableId={props.task.id} index={props.index}>
            {(provided) => (
                <Paper sx={{ p: 2 }} component="div" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                    <Typography component="div" sx={{ textAlign: "left", color: "gray", fontSize: "12px" }}>{props.task.content}</Typography>
                </Paper>
            )}
        </Draggable >
    )
}
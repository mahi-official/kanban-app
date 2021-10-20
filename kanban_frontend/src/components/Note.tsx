import { Paper, Typography } from "@mui/material";


export default function DraggableNote(props: any) {
    return (
        <Paper sx={{p:2}}>
            <Typography component="div" sx={{ textAlign: "center", color: "gray", fontSize: "12px" }}>{props.content}</Typography>
        </Paper>
    )
}
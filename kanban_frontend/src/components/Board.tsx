import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Add, BackupTable, MoreHoriz } from '@mui/icons-material';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import Note from './Note';
import React from 'react';
import NewNoteDialog from './NewNote';
import TaskInstance from '../apis/TaskAPI';

export default function Board(props: any) {

    const [openDialog, setOpenDialog] = React.useState<boolean>(false);
    const [boardId, setBoardId] = React.useState<string>('');

    const handleAddNoteClose = () => {
        setOpenDialog(false);
    }
    const handleNewNoteDialog = (event: any) => {
        setBoardId(event.target.id);
        setOpenDialog(true);
    }

    return (
        <Draggable draggableId={props.board.id} index={props.index} isDragDisabled={openDialog}>
            {(provided) => (
                <Box
                    sx={{
                        flexGrow: 1,
                        backgroundColor: 'whitesmoke',
                        padding: '0 0.5em',
                        width: '300px'
                    }}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                >
                    <Grid container alignItems="center">
                        <Grid item xs={10} {...provided.dragHandleProps}>
                            <Typography sx={{ color: 'skyblue', fontWeight: 600, pl: 1 }}>{props.board.title}</Typography>
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: 'end' }}>
                            <IconButton component="div" color="primary" aria-label="More Options">
                                <MoreHoriz style={{ fill: "gray" }} />
                            </IconButton>
                        </Grid>
                        <Grid item sx={{ width: '100%', p: 1 }}>
                            <Droppable droppableId={props.board.id} type="Note">
                                {(provided) => (
                                    <Stack spacing={1} {...provided.droppableProps} ref={provided.innerRef} component="div">
                                        {props.tasks.length > 0 ?
                                            props.tasks.map((task: TaskInstance, index: number) => (
                                                <Note index={index} task={task} key={task.id} />
                                            ))
                                            :
                                            <Box component="div" sx={{ p: 2, border: '1px dashed lightgrey' }}>
                                                <Typography component="div" sx={{ textAlign: "center", color: "gray", fontSize: "12px" }}>Drop Cards Here or Add a new Card</Typography>
                                            </Box>
                                        }
                                        {provided.placeholder}
                                    </Stack>
                                )}
                            </Droppable>
                        </Grid>
                        <Grid item xs={10}>
                            <Button
                                id='new-board'
                                size='medium'
                                onClick={(event) => handleNewNoteDialog(event)}
                                sx={{ fontSize: 12, fontWeight: 400, color: 'gray', margin: 1 }}
                                startIcon={
                                    <Add style={{ fill: "gray", fontSize: 12 }} />
                                }
                            >
                                Add a card
                            </Button>
                        </Grid>
                        <Grid item xs={2} sx={{ textAlign: 'end' }}>
                            <IconButton color="primary" aria-label="Card Options" component="div">
                                <BackupTable style={{ fill: "gray", fontSize: "18" }} />
                            </IconButton>
                        </Grid>
                    </Grid>
                    <NewNoteDialog board={boardId} open={openDialog} onClose={handleAddNoteClose} />
                </Box >
            )}
        </Draggable>
    );
}
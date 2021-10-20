import { Button, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { Add, BackupTable, MoreHoriz } from '@mui/icons-material';
import DraggableNote from './Note';

export default function DroppableBoard(props: any) {

    return (
        <Box
            sx={{
                flexGrow: 1,
                backgroundColor: 'whitesmoke',
                padding: '0 0.5em',
                width: 'auto',
                maxWidth: '25%'
            }}
        >
            <Grid container alignItems="center">
                <Grid item xs={10}>
                    <Typography sx={{ color: 'skyblue', fontWeight: 600, pl: 1}}>{props.board.title}</Typography>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'end' }}>
                    <IconButton component="div" color="primary" aria-label="More Options">
                        <MoreHoriz style={{ fill: "gray" }} />
                    </IconButton>
                </Grid>
                <Grid item sx={{ width: '100%', p: 1 }}>
                    {props.tasks.length > 0 ?
                        <Stack spacing={1}>
                            {props.tasks.map((task: any) => (
                                <DraggableNote content={task.content} />
                            ))}
                        </Stack>
                        :
                        <Box component="div" sx={{ p: 2, border: '1px dashed lightgrey' }}>
                            <Typography component="div" sx={{ textAlign: "center", color: "gray", fontSize: "12px" }}>Drop Cards Here or Add a new Card</Typography>
                        </Box>
                    }
                </Grid>
                <Grid item xs={10}>
                    <Button startIcon={<Add style={{ fill: "gray" }} />} size="small" sx={{ fontWeight: 600, color: 'gray' }}>
                        Add a card
                    </Button>
                </Grid>
                <Grid item xs={2} sx={{ textAlign: 'end' }}>
                    <IconButton color="primary" aria-label="Card Options" component="div">
                        <BackupTable style={{ fill: "gray", fontSize:"18" }} />
                    </IconButton>
                </Grid>
            </Grid>
        </Box >
    );
}
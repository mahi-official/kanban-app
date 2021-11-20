import { Draggable } from 'react-beautiful-dnd';
import { Grid, IconButton, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import EditIcon from '@mui/icons-material/Edit';


export function Task(props: any) {
  return (
      <Draggable draggableId={props.task.id} index={props.index}>
          {(provided) => (
              <Paper sx={{ p: 1 }} component="div" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                  <Grid container alignItems="center">
                      <Grid item xs={10}>
                          <Box >
                              <Typography component="div" sx={{ textAlign: "left", color: "gray", fontSize: "12px" }}>{props.task.content}</Typography>
                          </Box>
                      </Grid>
                      <Grid item xs={2} sx={{ textAlign: 'end' }}>
                          <IconButton color="primary" aria-label="Card Options" component="div" onClick={() => props.onEdit(props.task)} >
                            <EditIcon style={{ fill: "gray", fontSize: "18" }} />
                          </IconButton>
                      </Grid>
                  </Grid>
              </Paper>
          )}
      </Draggable >
  )
}

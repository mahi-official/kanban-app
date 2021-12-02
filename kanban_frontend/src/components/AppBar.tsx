import * as React from 'react';
import { styled, alpha, useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { Button} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { enableDarkMode } from '../features/app/appSlice';
import { Brightness4, Brightness7 } from '@mui/icons-material';


const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.10),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.20),
  },
  margin: '0 2rem'
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
  },
}));


export default function SearchAppBar() {

  const dispatch = useAppDispatch()
  const checked = useAppSelector(state => state.appState.darkMode)

  const theme = useTheme()
  theme.palette.mode = checked ? 'dark' : 'light'

  const handleChange = () => {
    dispatch(enableDarkMode(!checked))
  }

  return (
      <Box mb={4}>
        <AppBar position="static" elevation={2} >
          <Toolbar >
            <Typography
              variant="h6"
              sx={{ flexGrow: 1 }}
            >
              Kanban Board
            </Typography>
            <Search>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ 'aria-label': 'search' }}
              />
            </Search>
            <Button color="inherit" size='small' onClick={handleChange} startIcon={theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}>
              {theme.palette.mode} Mode
            </Button>
          </Toolbar>
        </AppBar>
      </Box>
  );
}
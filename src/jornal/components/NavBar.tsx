import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import { AppBar, Toolbar, IconButton, Grid, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/auth';

interface Props {
  drawerWidth: number;
}

export const NavBar = ({ drawerWidth }: Props) => {
  const dispatch = useDispatch();
  
  const onLogout = () => {
    dispatch(startLogout({}));
  };

  return (
    <AppBar
      position='fixed'
      sx={{
        width: { sm: `calc(100% - ${drawerWidth}px)` },
        ml: { sm: `${drawerWidth}px` },
      }}
    >
      <Toolbar>
        <IconButton
          color='inherit'
          sx={{
            mr: 2,
            display: { sm: 'none' },
          }}
        >
          <MenuOutlined />
        </IconButton>
        <Grid
          container
          direction='row'
          justifyContent='space-between'
          alignItems='center'
        >
          <Typography variant='h6' noWrap component='div'>
            {' '}
            JornalApp
          </Typography>
          <IconButton color='info' onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

import { Box, Divider, Drawer, List, Toolbar, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { Note } from '../../interfaces';
import { SideBarItem } from './SideBarItem';
import { RootState } from '../../store';

interface Props {
  drawerWidth: number;
}
export const SideBar = ({ drawerWidth = 240 }: Props) => {
  const { displayName } = useSelector((state: RootState) => state.auth);
  const { notes } = useSelector((state: RootState) => state.journal);
  return (
    <Box
      component='nav'
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant='permanent' //temporary
        open
        sx={{
          display: { xs: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
        }}
      >
        <Toolbar>
          <Typography variant='h6' noWrap component='div'>
            {displayName}
          </Typography>
          <Divider />
        </Toolbar>
        <List>
          {notes.map((note: Note) => (
            <SideBarItem key={note.id} {...note} />
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

import { TurnedInNot } from '@mui/icons-material';
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  Grid,
  ListItemText,
} from '@mui/material';
import { Note } from '../../interfaces';
import { useMemo } from 'react';
import { setActiveNote } from '../../store/jornal';
import { useDispatch } from 'react-redux';

export const SideBarItem = ({ title, body, id, date, imageUrls }: Note) => {
  const dispatch = useDispatch();
  const newTitle = useMemo(() => {
    return title.length > 17 ? title.substring(0, 17) + '...' : title;
  }, [title]);

  const onActiveNote = () => {
    dispatch(setActiveNote({ title, body, id, date, imageUrls }));
  };
  return (
    <ListItem disablePadding>
      <ListItemButton onClick={onActiveNote}>
        <ListItemIcon>
          <TurnedInNot />
        </ListItemIcon>
        <Grid container>
          <ListItemText primary={newTitle} />
          <ListItemText secondary={body} />
        </Grid>
      </ListItemButton>
    </ListItem>
  );
};

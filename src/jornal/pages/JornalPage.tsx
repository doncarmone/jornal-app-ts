import { AddOutlined } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { JournalLayout } from '../layout/JournalLayout';
import { NoteView } from '../views/NoteView';
import { NothingSelectedView } from '../views';
import { useDispatch, useSelector } from 'react-redux';
import { startNewNote } from '../../store/jornal';
import { RootState } from '../../store/store';

export const JornalPage = () => {
  const dispatch = useDispatch();

  const { isSaving, active } = useSelector((state: RootState) => state.journal);

  const onClickNewNote = () => {
    dispatch(startNewNote());
  };
  return (
    <JournalLayout>
      {!!active ? <NoteView /> : <NothingSelectedView />}

      <IconButton
        disabled={isSaving}
        onClick={onClickNewNote}
        size='large'
        sx={{
          color: 'white',
          backgroundColor: 'error.main',
          ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
          position: 'fixed',
          right: 50,
          bottom: 50,
        }}
      >
        <AddOutlined sx={{ fontSize: 30 }} />
      </IconButton>
    </JournalLayout>
  );
};

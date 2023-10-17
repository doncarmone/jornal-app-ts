import {
  DeleteOutline,
  SaveOutlined,
  UploadOutlined,
} from '@mui/icons-material';
import { Grid, Typography, Button, TextField, IconButton } from '@mui/material';
import { ImageGallery } from '../components/ImageGallery';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store';
import { NoteValidations, Note } from '../../interfaces';
import { useForm } from '../../hooks';
import { useEffect, useMemo, useRef } from 'react';
import {
  setActiveNote,
  startDeletingNote,
  startSaveNote,
  startUploadingFiles,
} from '../../store/jornal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

const formValidations: NoteValidations = {
  body: [
    (value: string) => value.length > 0,
    'El password debe de tener mas de 6 letras',
  ],
  title: [(value: string) => value.length > 0, 'El nombre es obligatorio'],
};

export const NoteView = () => {
  const dispatch = useDispatch();
  const {
    active: note,
    messageSaved,
    isSaving,
  } = useSelector((state: RootState) => state.journal);

  const { body, title, date, onChange, formData } = useForm(
    note,
    formValidations
  );

  const dateString = useMemo(() => {
    const newDate = new Date(date);
    return newDate.toUTCString();
  }, [date]);

  const fileInputRef = useRef();

  // useEffect(() => {
  //   dispatch(setActiveNote(formData));
  // }, [formData]);

  useEffect(() => {
    if (messageSaved.length > 0) {
      Swal.fire('Nota actualizada', messageSaved, 'success');
    }
  }, [messageSaved]);

  const onSaveNote = () => {
    dispatch(setActiveNote(formData));
    dispatch(startSaveNote());
  };

  const onFileInputChange = ({ target }) => {
    if (target.files === 0) return;
    dispatch(startUploadingFiles(target.files));
    console.log(target.files);
  };

  const onDelete = () => {
    dispatch(startDeletingNote());
  };

  return (
    <Grid
      className='animate__animated animate__fadeIn animate__faster'
      container
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      sx={{ mb: 1 }}
    >
      <Grid item>
        <Typography fontSize={39} fontWeight='ligth'>
          {dateString}
        </Typography>
      </Grid>
      <Grid item>
        <input
          ref={fileInputRef}
          type='file'
          multiple
          onChange={onFileInputChange}
          style={{ display: 'none' }}
        />
        <IconButton
          color='primary'
          disabled={isSaving}
          onClick={() => fileInputRef.current.click()}
        >
          <UploadOutlined />
        </IconButton>
        <Button
          disabled={isSaving}
          color='primary'
          sx={{ padding: 2 }}
          onClick={onSaveNote}
        >
          <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
          Guardar
        </Button>
      </Grid>
      <Grid container>
        <TextField
          type='text'
          variant='filled'
          fullWidth
          placeholder='Ingrese un titulo'
          label='Titulo'
          sx={{ border: 'none', mb: 1 }}
          name='title'
          value={title}
          onChange={onChange}
        />
        <TextField
          type='text'
          variant='filled'
          fullWidth
          multiline
          placeholder='Que sucedio hoy?'
          minRows={5}
          label='Body'
          sx={{ border: 'none', mb: 1 }}
          name='body'
          value={body}
          onChange={onChange}
        >
          {body}
        </TextField>
      </Grid>

      <Grid container justifyContent='end'>
        <Button onClick={onDelete} sx={{ mt: 2 }} color='error'>
          <DeleteOutline />
          Borrar
        </Button>
      </Grid>
      {
        note?.imageUrls ? 
        <ImageGallery images={note?.imageUrls} />
        : ''
      }
      
    </Grid>
  );
};

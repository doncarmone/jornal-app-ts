import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit'
import { Note, JornalState } from '../../interfaces';


const initialState: JornalState =
{
    isSaving: false,
    messageSaved: '',
    notes: [],
    active: null
}
export const jornalSlice = createSlice({
    name: 'jornal',
    initialState,
    reducers: {
        savingNewNote: (state) => {
            state.isSaving = true
            state.messageSaved = '';
        },
        addNewEmptyNote: (state, action: PayloadAction<any>) => {
            state.notes.push(action.payload);
            state.isSaving = false;
        },
        setActiveNote: (state, action: PayloadAction<Note>) => {
            state.active = action.payload
            state.messageSaved = '';
        },
        setNotes: (state, action: PayloadAction<Array<Note>>) => {
            state.notes = action.payload
        },
        setSaving: (state, action) => {
            state.isSaving = true
            //TODO: Mensaje de Error...
        },
        updateNote: (state, action: PayloadAction<any>) => {
            state.isSaving = false;
            const index = state.notes.findIndex(
                (note) => note.id === action.payload.id
            );
            if (index !== -1) state.notes.splice(index, 1, action.payload);
            state.messageSaved = `${action.payload.title}, actualizada correctamente`
        },
        setPhotosToActiveNote: (state, action: PayloadAction<any>) => {
            state.active.imageUrls = [...state.active.imageUrls, ...action.payload]
            state.isSaving = false;
        },
        clearNotesLogout: (state) => {
            state.isSaving = false;
            state.messageSaved = '';
            state.notes = [];
            state.active = null;
        },
        deleteNotebyId: (state, action) => {
            state.isSaving = false;
            state.notes = state.notes.filter(
                (note) => note.id != action.payload
            );
            state.active = null;
        }

    },
});
// Action creators are generated for each case reducer function
export const
    { addNewEmptyNote, setActiveNote, setNotes, setSaving, updateNote, deleteNotebyId, savingNewNote, setPhotosToActiveNote, clearNotesLogout }
        = jornalSlice.actions;
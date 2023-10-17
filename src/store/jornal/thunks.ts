import { Dispatch } from "@reduxjs/toolkit"
import { collection, deleteDoc, doc, documentId, setDoc } from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
import { addNewEmptyNote, setActiveNote, savingNewNote, setNotes, setSaving, updateNote, setPhotosToActiveNote, deleteNotebyId } from ".";
import { Note } from "../../interfaces";
import { RootState } from "../store";
import { fileUpload, loadNotes } from "../../helpers";


export const startNewNote = () => {
    return async (dispatch: Dispatch, getState: RootState) => {
        //uid

        const { uid } = getState().auth;
        dispatch(savingNewNote());

        const newNote: Note = {
            title: '',
            body: "",
            date: new Date().getTime(),
        }

        const newDoc = doc(collection(FirebaseDB, `${uid}/jornal/notes`));
        const res = await setDoc(newDoc, newNote);
        console.log(res);
        console.log(newDoc);

        newNote.id = newDoc.id;

        dispatch(addNewEmptyNote(newNote));
        dispatch(setActiveNote(newNote));


        //! dispatch
        //dispatch(newNote)
        //dispatch(activarNote)
    }
}

export const startLoadingNotes = () => {

    return async (dispatch: Dispatch, getState: RootState) => {
        const { uid } = getState().auth;
        if (!uid) throw new Error('El id del usuario no existe');

        const notes = await loadNotes(uid);

        dispatch(setNotes(notes))
    }
}


export const startSaveNote = () => {
    return async (dispatch: Dispatch, getState: RootState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        dispatch(setSaving());

        const noteToFireStore: Note = { ...note };
        delete noteToFireStore.id;
        if (noteToFireStore.imageUrls?.length <= 0) noteToFireStore.imageUrls = []

        const docRef = doc(FirebaseDB, `${uid}/jornal/notes/${note.id}`);
        await setDoc(docRef, noteToFireStore, { merge: true })

        dispatch(updateNote(note))
    }
}

export const startUploadingFiles = (files = []) => {
    return async (dispatch: Dispatch, getState: RootState) => {
        dispatch(setSaving());
        // await fileUpload(files[0]);
        const fileUploadPromises = [];
        for (const file of files) {
            fileUploadPromises.push(fileUpload(file))
        }

        const photosUrl = await Promise.all(fileUploadPromises);

        dispatch(setPhotosToActiveNote(photosUrl));
    }
}

export const startDeletingNote = () => {
    return async (dispatch: Dispatch, getState: RootState) => {
        const { uid } = getState().auth;
        const { active: note } = getState().journal;

        const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
        await deleteDoc(docRef);

        dispatch(deleteNotebyId(note.id))
        
    }
}
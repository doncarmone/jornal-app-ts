import { collection, getDocs } from 'firebase/firestore/lite';
import { FirebaseDB } from '../firebase/config';
import { Note } from '../interfaces';

export const loadNotes = async (uid: string = '') => {
    if (!uid) throw new Error('El id del usuario no existe');
    const collectionRef = collection(FirebaseDB, `${uid}/jornal/notes`);
    const docs = await getDocs(collectionRef);

    const notes: Array<Note> = [];
    docs.forEach(doc => {
        notes.push({ id: doc.id, ...doc.data() });
    })

    return notes;
}
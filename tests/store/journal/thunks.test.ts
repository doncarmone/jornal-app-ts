import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore/lite';
import { addNewEmptyNote, savingNewNote, setActiveNote } from '../../../src/store/jornal';
import { startNewNote } from '../../../src/store/jornal/thunks';
import { FirebaseDB } from '../../../src/firebase/config';
describe('Test over journal thunks', () => {
    const dispatch = jest.fn();

    const getState = jest.fn();


    beforeEach(() => jest.clearAllMocks());

    test('should create a new blank note ', async () => {

        const uid = "TEST-UID"
        getState.mockReturnValue({ auth: { uid: uid } })

        await startNewNote()(dispatch, getState)
        expect(dispatch).toHaveBeenCalledWith(savingNewNote());
        expect(dispatch).toHaveBeenCalledWith(addNewEmptyNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number)
        }))
        expect(dispatch).toHaveBeenCalledWith(setActiveNote({
            body: '',
            title: '',
            id: expect.any(String),
            date: expect.any(Number)
        }))

        const collectionRef = collection(FirebaseDB, `${uid}/jornal/notes`);
        const docs = await getDocs(collectionRef);
        const deletePromises = [];
        docs.forEach(doc => deletePromises.push(deleteDoc(doc.ref)));
        await Promise.all(deletePromises);
    })
})
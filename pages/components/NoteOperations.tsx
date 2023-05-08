import styles from '../../styles/Evernote.module.scss'
import { useState, useEffect } from 'react';
import { app, database } from '../../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import dynamic from 'next/dynamic';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';


const dbInstance = collection(database, 'notes');
export default function NoteOperations({ getSingleNote } : {getSingleNote:any}) {

    const [isInputVisible, setInputVisible] = useState<any>(false);
    const [noteTitle, setNoteTitle] = useState<any>('');
    const [noteDesc, setNoteDesc] = useState<any>('');
    const [notesArray, setNotesArray] = useState<any>([]);
    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }

    const addDesc = (value : any) => {
        setNoteDesc(value)
    }

    const saveNote = () => {
        addDoc(dbInstance, {
            noteTitle: noteTitle,
            noteDesc: noteDesc
        })
            .then(() => {
                setNoteTitle('')
                setNoteDesc('')
                getNotes();
            })
    }

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setNotesArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }));
            })
    }

    useEffect(() => {
        getNotes();
    }, [])
    return (
        <div >
            <div>
                <button
                    onClick={inputToggle}
                    className={styles.button}>
                    Add a New Poem
                </button>
            </div>

            {isInputVisible ? (
                <div>
         <div className={styles.inputContainer}>
                    <input
                     
                        placeholder='Enter the Title..'
                        onChange={(e) => setNoteTitle(e.target.value)}
                        value={noteTitle}
                    />
                    </div>
              
             <div className={styles.ReactQuill_Container}>
                    <div className={styles.ReactQuill}>
                        <ReactQuill
                            onChange={addDesc}
                            value={noteDesc}
                        />
                    </div>
                    
                    </div>
                    <button
                        onClick={saveNote}
                        className={styles.saveBtn}>
                        Save Poem
                    </button>
                </div>
            ) : (
                <></>
            )}

            <div className={styles.notesDisplay}>
                {notesArray.map((note : any) => {
                    return (
                        <div
                            className={styles.notesInner}
                            onClick={() => getSingleNote(note.id)}>
                            <h4>{note.noteTitle}</h4>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}
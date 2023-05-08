import styles from '../../styles/Evernote.module.scss'
import { useState, useEffect } from 'react'
import { app, database } from '../../firebaseConfig';
import {
    doc,
    getDoc,
    getDocs,
    collection,
    updateDoc,
    deleteDoc
} from 'firebase/firestore'
import dynamic from 'next/dynamic';
const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;
import 'react-quill/dist/quill.snow.css';
const dbInstance = collection(database, 'notes');

export default function NoteDetails({ ID } : {ID : any}) {
    const [isInputVisible, setInputVisible] = useState<any>(false);
    const [singleNote, setSingleNote] = useState<any>({})
    const [isEdit, setIsEdit] = useState<any>(false);
    const [noteTitle, setNoteTitle] = useState<any>('');
    const [noteDesc, setNoteDesc] = useState<any>('');
    const [EditClose, SetEditClose] = useState<string>('')

    const getSingleNote = async () => {
        if (ID) {
            const singleNote = doc(database, 'notes', ID)
            const data = await getDoc(singleNote)
            setSingleNote({ ...data.data(), id: data.id })
        }
    }

    const getNotes = () => {
        getDocs(dbInstance)
            .then((data) => {
                setSingleNote(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                })[0]);
            })
    }

    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }

    const getEditData = () => {
        setIsEdit(true);
        setNoteTitle(singleNote.noteTitle);
        setNoteDesc(singleNote.noteDesc)
    }

    useEffect(() => {
        getNotes();
    }, [])

    useEffect(() => {
        getSingleNote();
    }, [ID])

    const editNote = (id :any) => {
        const collectionById = doc(database, 'notes', id)

        updateDoc(collectionById, {
            noteTitle: noteTitle,
            noteDesc: noteDesc,
        })
            .then(() => {
                window.location.reload()
            })
    }

    const deleteNote = (id :any) => {
        const collectionById = doc(database, 'notes', id)

        deleteDoc(collectionById)
            .then(() => {
                window.location.reload()
            })
    }
    useEffect(() => {
        if (isInputVisible == false) {
            SetEditClose('Edit')
        } else { SetEditClose('Close')}
      
    }, [isInputVisible])
    
   

  
    return (
        
            <div className={styles.CREATE_LIST_AREA }>
                <div className={styles.Edit_Delete_Button_Container }>
               
                <button
                    className={styles.Edit_Delete_Button}
                    onClick={() => {getEditData(), inputToggle()}}
                    
                > {EditClose}
                </button>
                <button
                    className={styles.Edit_Delete_Button}
                    onClick={() => deleteNote(singleNote.id)}
                >Delete
                </button>

                </div>
            {isEdit && isInputVisible ? (
                <>
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
                            onChange={setNoteDesc}
                            value={noteDesc}
                        />
                        
                    </div>
                    
            
         
               </div>
               <button
                        onClick={() => editNote(singleNote.id)}
                        className={styles.saveBtn}>
                        Update Poem
                    </button>
                </>
            ) : (
                <></>
            )}
            <section className={styles.POEM_SELECTED_Container}>
                <div className={styles.POEM_SELECTED_Text}>
            <h2>{singleNote.noteTitle}</h2>
            <div dangerouslySetInnerHTML={{ __html: singleNote.noteDesc }}></div>
            </div>
            </section>
            
        </div>
    )
}
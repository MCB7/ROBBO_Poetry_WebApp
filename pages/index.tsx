import Head from 'next/head'
import styles from '../styles/Evernote.module.scss'
import NoteOperations from './components/NoteOperations';
import NoteDetails from './components/NoteDetails';
import { useState } from 'react';
import {auth} from '../firebaseConfig'
import { useRouter } from "next/router";

import LogoutButton from './components/LogoutButton';
export default function Home() {
  const [ID, setID] = useState(null);
  const getSingleNote = (id : any) => {
    setID(id)
  }

  const router = useRouter();

  if (auth.currentUser != null) {
  return (
    <section className={styles.POETRY_CRUD_GRID}>

      <Head>
        <title>Create a Poem</title>
        <meta name="description" content="Write a Poem to Firestore Database" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    
      <div className={styles.CREATE_LIST_AREA}>
            <NoteDetails ID={ID} />
            <LogoutButton/>
   
          </div>
         <div className={styles.EDIT_DELETE_AREA }>
 
            <NoteOperations getSingleNote={getSingleNote} />
        
          </div>

       


    </section>
  )
 
} else {router.push("/");} 
}
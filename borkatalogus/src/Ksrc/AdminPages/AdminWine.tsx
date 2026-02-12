import AdminNav from './AdminNav'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './Admin.module.css'
import { useState } from 'react';

const AdminWine = () => {

  const [openDelete, setDelete] = useState(false);
  const [openPatch, setPatch] = useState(false);
  const [openPost, setPost] = useState(false);

  const Toggle = (type:string) =>{
    switch (type) {
      case "Delete":
        setDelete(!openDelete)    
        break;
      case "Post":
        setPost(!openPost)
        break;
      case "Patch":
        setPatch(!openPatch)
        break;
      default:
        break;
    }
  }


  return (
    <div>
      <div  className={styles.WineMain}>
    <h1 className={styles.AdminTitles}>Wines</h1>
        <div className={`${styles.ButtonHeader} ${styles.PostHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {Toggle("Post")}}>Post ⤵️</button>
        </div>
            {openPost && 
            <div className={`${styles.WinePost} ${styles.WinePostContainer}`}>
              <form action="post">
                <div className={styles.WinePostContainer}>
                <div className={styles.WinePost1}>
                  <span> <h1>Name:</h1><input type="text" /></span>
                  <input type="file" />
                </div>

                <div className={styles.WinePost2}>
                  <span> <h1>Type:<input type="text" /></h1></span>
                  <span> <h1>Taste:<input type="text" /></h1></span>
                  <span> <h1>Price:<input type="text" /> </h1></span>
                  <span> <h1>Year:<input type="text" /></h1></span>
                  <span> <h1>Alcohol (%):<input type="text" /></h1></span>
                </div>

                <div  className={styles.WinePost3}>
                  <h1>Description:</h1>
                  <textarea name="" id=""></textarea>
                  <h1>WineryId: </h1>
                  <select name="" id="">
                    <option value="1"></option>
                    <option value="2"></option>
                    <option value="3"></option>
                  </select>
                   <h1>GrapesId: </h1>
                  <select name="" id="">
                    <option value="1"></option>
                    <option value="2"></option>
                    <option value="3"></option>
                  </select>

                </div>
                </div>
              </form>
            </div>}

        <div className={`${styles.ButtonHeader} ${styles.PatchHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {Toggle("Patch")}}>Patch ⤵️</button>
        </div>
            {openPatch && 
            <div className={styles.WinePost}>
              
            </div>}

        <div className={`${styles.ButtonHeader} ${styles.DeleteHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {Toggle("Delete")}}>Delete ⤵️</button>
        </div>
            {openDelete && 
            <div className={styles.WinePost}>
              
            </div>}        
      </div>
    </div>
  )
}

export default AdminWine
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './Admin.module.css'
import {  useEffect, useState } from 'react'
import { GetDbData } from './AdminFetch';
import { PostGrape } from './AdminFetch';
import type { GrapPostType } from './AdminFetch';
import { AdminDelete } from './AdminFetch';
import { ConfirmDialog } from 'primereact/confirmdialog'; 
import { confirmDialog } from 'primereact/confirmdialog';

const AdminGrape = () => {

  type Grape = {
    id:number,
    name :string,
    color: string
  }

  const [UpdateDb, setUptadeDb]= useState(false)

   function accept(path:string, id:number){
       console.log("Accepted!")
       AdminDelete(path, id)
       setUptadeDb(!UpdateDb)
    }

    const reject = () => {
        console.log("Declined")
    }



    const showTemplate = (Ipath:string, Iid:number) => {

    confirmDialog({
            group: 'Template',
            message: (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                    <span>Please confirm to proceed moving forward.</span>
                </div>
            ),
            accept: () => accept(Ipath, Iid),
            reject
        });
    };

  useEffect(()=>{
    const fetchGrapes = async () => {
      try {
        const data = await GetDbData("/api/grape")
        if (Array.isArray(data)) {
          setGrapes(data as Grape[])
        } else if (data && Array.isArray((data as any).result)) {
          setGrapes((data as any).result as Grape[])
        } else {
          console.warn('Unexpected grape data format:', data)
        }
      } catch (err) {
        console.error('Failed to fetch grapes', err)
      }
    }

    fetchGrapes()

  },[UpdateDb])
  const [grapes, setGrapes] = useState<Grape[]>([
  ])

  function PostGrapes(e:any) {
     // Prevent the browser from reloading the page
    e.preventDefault();

    // Read the form data
    const form = e.target;
    const formData = new FormData(form);


    // Or you can work with it as a plain object:
    const formJson = Object.fromEntries(formData.entries());
    PostGrape(formJson as GrapPostType)
    setUptadeDb(!UpdateDb)
  }

  const [openDelete, setDelete] = useState(false);
  const [openPost, setPost] = useState(false);
  return (
    <div>

     <div  className={styles.WineMain}>
      <h1 className={styles.AdminTitles}>Grapes</h1>
      <div className={`${styles.ButtonHeader} ${styles.PostHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {setPost(!openPost)}}>Post ⤵️</button>
        </div>
            {openPost && 
            <div className={styles.WinePost}>
            <form className={styles.Post} method='post' onSubmit={PostGrapes}>
                   <label>
                      Name: <input type='text' name='name'/>
                   </label>
    
                    <label>
                      Color: <input type='text' name='color'/> 
                    </label>
                    <div>
                        <button type="submit" className={styles.Add}>Add Grape</button>   
                    </div>
            </form>
            </div>}
      

      <div className={`${styles.ButtonHeader} ${styles.DeleteHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {setDelete(!openDelete)}}>Delete ⤵️</button>
        </div>
            {openDelete && 
            <div className={styles.DeleteDiv}>

            <TableContainer sx={{ maxHeight: '60vh' }}>
          <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }} >
            <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Color</TableCell>
                  <TableCell>ID</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {grapes.map((row) =>(
                    <TableRow>
                      <TableCell>{row.name}</TableCell>
                      <TableCell>{row.color}</TableCell>
                      <TableCell>{row.id}</TableCell>
                      <TableCell>
                         <button onClick={() => showTemplate("/api/grape", row.id)} className={styles.DeleteDbBtn}>Delete</button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
          </Table>
        </TableContainer>

        <ConfirmDialog group='Template' className={styles.ConfirmBox}  />

            </div>}    
  </div>

    </div>
  )
}

export default AdminGrape
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './Admin.module.css'
import AdminNav from './AdminNav'
import { useEffect, useState } from 'react'
import { GetDbData } from './AdminFetch';

const AdminGrape = () => {

  type Grape = {
    id:number,
    name :string,
    color: string
  }

  useEffect(()=>{
    const fetchGrapes = async () => {
      try {
        const data = await GetDbData("https://48ph6jzb-7072.euw.devtunnels.ms/api/grape")
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

  },[])
  const [grapes, setGrapes] = useState<Grape[]>([
  ])

  return (
    <div>
      <AdminNav></AdminNav>

      <div className={styles.Post}>
        <div>
            <h1>Post:</h1>        
          </div>
        <div className={styles.PostVertical}>
          <h1>Name:</h1>
          <input type="text" />
        </div>
         <div>
          <h1>Color:</h1>
          <input type="text" />
        </div>   
        <div>
            <button className={styles.Add}>Add Grape</button>   
        </div>
      </div>
    <TableContainer>
       <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                  <TableCell><button>❌</button></TableCell>
                </TableRow>
              ))}
          </TableBody>
       </Table>
    </TableContainer>

    </div>
  )
}

export default AdminGrape
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import styles from './Admin.module.css'
import AdminGrape from './AdminGrape';
import AdminWine from './AdminWine';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { GetDbData,AdminDeleteAccount } from './AdminFetch';
import AdminWinery from './AdminWinery';




const AdminAccounts = () => {

  type Account  = {
    id:string,
    firstName:string,
    lastName:string,
    email:string,
  }
    const [openDelete, setDelete] = useState(false);
    
  const [accounts, setAccounts] = useState<Account[]>([]);
  useEffect(() => {
      const AccountsFetch = async () =>{
        try {
          const AccountData = await GetDbData("/api/admin/users")
          setAccounts(AccountData)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
      AccountsFetch()
    }, [])

   const accept = (id:string) => {
       AdminDeleteAccount(id)
    }



      const showTemplate = (Iid:string) => {
        
        confirmDialog({
            group: 'Template',
            message: (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                    <span>Please confirm to proceed moving forward.</span>
                </div>
            ),
            accept:  () => accept(Iid)
            
        });
    };

  return (

    <div style={{overflow : "hidden"}}>
    
   <div  className={styles.WineMain}>
        <h1 className={styles.AdminTitles}>Accounts</h1>
     <div className={`${styles.ButtonHeader} ${styles.DeleteHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {setDelete(!openDelete)}}>Delete ⤵️</button>
        </div>
            {openDelete && 
            <div className={styles.DeleteDiv}>
        <TableContainer sx={{ maxHeight: '40vh' }}>
       <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }} >
          <TableHead>
            <TableRow>
              <TableCell>firstName</TableCell>
              <TableCell>lastName</TableCell>
              <TableCell>email</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

              {accounts.map((row) =>(
                <TableRow>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                         <button onClick={() => showTemplate(row.id)} className={styles.DeleteDbBtn}>Delete</button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

              
      <ConfirmDialog group='Template' className={styles.ConfirmBox}  />
              </div>}
            

            
      <AdminGrape></AdminGrape>
      <AdminWine></AdminWine>
      <AdminWinery></AdminWinery>


    </div>
      
     

    </div>
  )
}

export default AdminAccounts
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useState } from 'react';
import styles from './Admin.module.css'
import AdminGrape from './AdminGrape';
import AdminWine from './AdminWine';
import { ConfirmDialog } from 'primereact/confirmdialog'; 
import { confirmDialog } from 'primereact/confirmdialog';



const AdminAccounts = () => {

  type Account  = {
    id:string,
    firstName:string,
    lastName:string,
    email:string,
  }

   const accept = () => {
       console.log("Accepted!")
    }

    const reject = () => {
        console.log("Declined")
    }
  const [openDelete, setDelete] = useState(false);


  const [accounts, setAccounts] = useState<Account[]>([
    { id : "asd-01", firstName: "John", lastName: "Doe", email: "john@example.com"},
    { id : "asd-02", firstName: "Jane", lastName: "Smith", email: "jane@example.com"},
    { id : "asd-01", firstName: "John", lastName: "Doe", email: "john@example.com"},
    { id : "asd-02", firstName: "Jane", lastName: "Smith", email: "jane@example.com"},
    { id : "asd-01", firstName: "John", lastName: "Doe", email: "john@example.com"},
    { id : "asd-02", firstName: "Jane", lastName: "Smith", email: "jane@example.com"},
    { id : "asd-01", firstName: "John", lastName: "Doe", email: "john@example.com"},
    { id : "asd-02", firstName: "Jane", lastName: "Smith", email: "jane@example.com"},
    { id : "asd-01", firstName: "John", lastName: "Doe", email: "john@example.com"},
    { id : "asd-02", firstName: "Jane", lastName: "Smith", email: "jane@example.com"},
    { id : "asd-01", firstName: "John", lastName: "Doe", email: "john@example.com"},
    { id : "asd-02", firstName: "Jane", lastName: "Smith", email: "jane@example.com"}
  ]);
      const showTemplate = () => {

        confirmDialog({
            group: 'Template',
            message: (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                    <span>Please confirm to proceed moving forward.</span>
                </div>
            ),
            accept,
            reject
        });
    };

  return (

    <div>
    
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
                         <button onClick={() => showTemplate()} className={styles.DeleteDbBtn}>Delete</button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
              </div>}

              <ConfirmDialog group='Template' className={styles.ConfirmBox}  />
            
      <AdminGrape></AdminGrape>
      <AdminWine></AdminWine>


    </div>
      
     

    </div>
  )
}

export default AdminAccounts
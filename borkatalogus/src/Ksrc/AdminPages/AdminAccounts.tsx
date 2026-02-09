import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AdminNav from './AdminNav'
import { useState } from 'react';
const AdminAccounts = () => {

  type Account  = {
    firstName:string,
    lastName:string,
    email:string,
  }

  const [accounts, setAccounts] = useState<Account[]>([
    { firstName: "John", lastName: "Doe", email: "john@example.com"},
    { firstName: "Jane", lastName: "Smith", email: "jane@example.com"}
  ]);

  return (
    <div>
      <AdminNav></AdminNav>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
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
                  <TableCell><button>❌</button></TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
     

    </div>
  )
}

export default AdminAccounts
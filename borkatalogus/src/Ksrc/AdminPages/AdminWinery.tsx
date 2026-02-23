import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect, useState } from 'react';
import styles from './Admin.module.css'
import type { WineryGetType, WineryPostType } from './AdminFetch';
import {GetDbData , AdminDelete, PostDbWinery, handleNumberKeyDown, PatchDbWinery} from './AdminFetch';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';



const AdminWinery = () => {

  const [openDelete, setDelete] = useState(false);
  const [openPost, setPost] = useState(false);
  const [openPatch, setPatch] = useState(false);

  const [Winerys, setWinerys] = useState<WineryGetType[]>([]);

  const [SelectedWinery, setSelectedWinery] = useState()

  
    useEffect(() => {
        const AccountsFetch = async () =>{
          try {
            const WineryData = await GetDbData("/api/winery")
            setWinerys(WineryData)
          } catch (error) {
            console.error("Error fetching data:", error)
          }
        }
        AccountsFetch()
      }, [])

       const accept = (id:number) => {
           AdminDelete("/api/winery", id)
        }
    
        const reject = () => {
            console.log("Declined")
        }
    
          const showTemplate = (Iid:number) => {
    
            confirmDialog({
                group: 'Template',
                message: (
                    <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                        <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                        <span>Please confirm to proceed moving forward.</span>
                    </div>
                ),
                accept:  () => accept(Iid),
                reject
            });
        };
      function PostWinery(e:any) {
         // Prevent the browser from reloading the page
        e.preventDefault();
    
        // Read the form data
        const form = e.target;
        const formData = new FormData(form);
    
    
        // Or you can work with it as a plain object:
        const formJson = Object.fromEntries(formData.entries());
        PostDbWinery({
          name: formJson.name as string,
          region: formJson.region as string,
          country: formJson.country as string,
          establishedYear: parseInt(formJson.establishedYear as string),
        } as WineryPostType)
      }

      const SelectPatch =  (id:number) =>{

        setSelectedWinery(undefined)

      const FetchSelectedWinery = async () =>{
        try {
          const SelectedWineData = await GetDbData(`/api/winery/${id}`)
          setSelectedWinery(SelectedWineData)
          console.log(SelectedWineData)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
      FetchSelectedWinery()

    }

    const PatchWinery = (e:any) =>{

      e.preventDefault();
    
      // Read the form data
      const form = e.target;
      const formData = new FormData(form);
  
  
      // Or you can work with it as a plain object:
      const formJson = Object.fromEntries(formData.entries());

      if (!SelectedWinery) {
        console.error("No wine selected for patching");
        return;
      }

      PatchDbWinery({
        name: formJson.name as string,
        region: formJson.region as string,
        country: formJson.country as string,
        establishedYear: parseInt(formJson.establishedYear as string),
      } as WineryPostType, SelectedWinery["id"])
    }
      
  return (
      <div>

     <div  className={styles.WineMain}>
      <h1 className={styles.AdminTitles}>Winerys</h1>

      <div className={`${styles.ButtonHeader} ${styles.PostHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {setPost(!openPost)}}>Post ⤵️</button>
        </div>
            {openPost && 
            <div className={styles.WinePost}>
            <form className={styles.Post} method='post' onSubmit={PostWinery}>
                   <label>
                      Name: <input type='text' name='name'/>
                   </label>
                    <label>
                      Region: <input type='text' name='region'/> 
                    </label>
                    <label>
                      Country: <input type='text' name='country'/>
                   </label>
                   <label>
                      Established: <input onKeyDown={handleNumberKeyDown} type='number' name='establishedYear'/>
                   </label>
                    <div>
                        <button type="submit" className={styles.Add}>Add Winery</button>   
                    </div>
            </form>
            </div>}
      

      <div className={`${styles.ButtonHeader} ${styles.DeleteHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {setDelete(!openDelete)}}>Delete ⤵️</button>
        </div>
            {openDelete && 
            <div className={styles.DeleteDiv}>
               <TableContainer sx={{ maxHeight: '40vh' }}>
       <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }} >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Region</TableCell>
              <TableCell>Country</TableCell>
              <TableCell>Established</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

              {Winerys.map((row) =>(
                <TableRow>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.region}</TableCell>
                  <TableCell>{row.country}</TableCell>
                  <TableCell>{row.established}</TableCell>
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

        <div className={`${styles.ButtonHeader} ${styles.PatchHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {setPatch(!openPatch)}}>Patch ⤵️</button>
        </div>
            {openPatch && 
            <div style={{width: "80%", height: "80vh", display: "flex", flexDirection : "column"}} className={styles.PatchDiv}>
           
               <div style={{display:"flex", justifyContent:"center", marginBottom:"20px", flexDirection:"column", alignItems:"center"}}>
                  <h1 className={styles.PatchTitle}>Select Winery to Patch:</h1>
                  <br />
                  <select onChange={(e) => SelectPatch(parseInt(e.target.value))} name="id" id="">
                      {Winerys.map((row) => <option value={row.id}>{row.name}</option>)}
                </select>
                </div>
                {SelectedWinery &&
                <div style={{width: "100%", display: "flex", justifyContent: "center"}}> 
                 <form className={styles.Patch} method='post' onSubmit={PatchWinery}>
                  <label>
                    Name: <input type='text' name='name' defaultValue={`${SelectedWinery["name"]}`} />
                  </label>
                  <label>
                    Region: <input type='text' name='region' defaultValue={`${SelectedWinery["region"]}`} />
                  </label>
                  <label>
                    Country: <input type='text' name='country' defaultValue={`${SelectedWinery["country"]}`} />
                  </label>
                  <label>
                    Established: <input onKeyDown={handleNumberKeyDown} type='number' name='establishedYear' defaultValue={`${SelectedWinery["establishedYear"]}`} />
                  </label>

                  <div style={{display:"flex", justifyContent:"center"}}>
                  <button type="submit" className={styles.Add}>Update Winery</button>   
                </div>
                </form></div>}

            </div>}
  </div>

    </div>
  )
}

export default AdminWinery
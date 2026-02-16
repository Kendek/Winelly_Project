
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './Admin.module.css'
import { useEffect, useState } from 'react';
import { GetDbData } from './AdminFetch';
import type { WinePostType, WineGetType, WineryGetType, GrapeGet,WinePatchImgType, WinePatchType } from './AdminFetch';
import Select from 'react-select'
import { ConfirmDialog } from 'primereact/confirmdialog'; 
import { confirmDialog } from 'primereact/confirmdialog';
import { AdminDelete } from './AdminFetch';
import { PostDbWine , PatchWineIMG, PatchDbWine } from './AdminFetch';
const AdminWine = () => {

  type GrapeOptionsType = {
    value:number
    label :string
  }

  const [openDelete, setDelete] = useState(false);
  const [openIMGPatch, setIMGPatch] = useState(false);
  const [openPatch, setPatch] = useState(false);
  const [openPost, setPost] = useState(false);

  const [Winerys, setWinerys] = useState<WineryGetType[]>([])
  const [Wines, setWines] = useState<WineGetType[]>([])
  const [Grapes, setGrapes] = useState<GrapeGet[]>([])
  const [SelectedWine, setSelectedWine] = useState()

  const [GrapeOptions, setGrapesOptions] = useState<GrapeOptionsType[]>([])
  const [selectedGrapes, setSelectedGrapes] = useState<GrapeOptionsType[]>([])
  const [selectedPatchGrapes, setSelectedPatchGrapes] = useState<GrapeOptionsType[]>([])

  const [postIMG, setPostIMG] = useState(null)
  const [PatchIMG, setPatchIMG] = useState(null)

  function PostWine(e:any) {
       // Prevent the browser from reloading the page
      e.preventDefault();
    
      // Read the form data
      const form = e.target;
      const formData = new FormData(form);
  
  
      // Or you can work with it as a plain object:
      const formJson = Object.fromEntries(formData.entries());


      PostDbWine({
        name: formJson.Name as string,
        type: formJson.type as string,
        description: formJson.description as string,
        taste: formJson.taste as string,
        year: parseInt(formJson.year as string),
        price: parseFloat(formJson.price as string),
        alcoholContent: parseFloat(formJson.alcoholContent as string),
        file: formJson.File as File,
        wineryId: parseInt(formJson.winery as string),
        grapeId: selectedGrapes.map(g => g.value)
      } as WinePostType)
    }

       function accept(path:string, id:number){
           console.log("Accepted!")
           AdminDelete(path, id)
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


    useEffect(() => {
      const FetchWinesAndWinerys = async () =>{
        try {
          const WineData = await GetDbData("/api/wine")
          const WineryData = await GetDbData("/api/winery")
          const GrapeData = await GetDbData("/api/grape")
          setWines(WineData)
          setWinerys(WineryData)
          setGrapes(GrapeData)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
      FetchWinesAndWinerys()
    }, [])



    useEffect(() => {
      if (Grapes.length > 0) {
        const options = Grapes.map((row) => ({
          value: row.id,
          label: row.name
        }))
        setGrapesOptions(options)
      }
    }, [Grapes])


    const UpdateWineIMG = (e:any) =>{
        // Prevent the browser from reloading the page
      e.preventDefault();
    
      // Read the form data
      const form = e.target;
      const formData = new FormData(form);
  
  
      // Or you can work with it as a plain object:
      const formJson = Object.fromEntries(formData.entries());
      PatchWineIMG({
          id : parseInt(formJson.id as string),
          image: formJson.image as File
      } as WinePatchImgType)}


    const SelectPatch =  (id:number) =>{
      const FetchSelectedWine = async () =>{
        try {
          const SelectedWineData = await GetDbData(`/api/wine/${id}`)
          setSelectedWine(SelectedWineData)
          console.log(SelectedWineData)
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      }
      FetchSelectedWine()

    }

    const PatchWine = (e:any) =>{

      e.preventDefault();
    
      // Read the form data
      const form = e.target;
      const formData = new FormData(form);
  
  
      // Or you can work with it as a plain object:
      const formJson = Object.fromEntries(formData.entries());


      PatchDbWine({
        name: formJson.Name as string,
        type: formJson.type as string,
        description: formJson.description as string,
        taste: formJson.taste as string,
        year: parseInt(formJson.year as string),
        price: parseFloat(formJson.price as string),
        alcoholContent: parseFloat(formJson.alcoholContent as string),
        wineryId: parseInt(formJson.winery as string),
        grapeId: selectedPatchGrapes.map(g => g.value)
      } as WinePatchType)
    }

   const handleNumberKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if(e.which > 57 || e.which < 48){
        e.preventDefault()
      }
   }

  const PostIMGChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setPostIMG(e.target.files[0]);
    }
  }
    const PatchIMGChange = (e: any) => {
    if (e.target.files && e.target.files[0]) {
      setPatchIMG(e.target.files[0]); 
    }
  }
  const DisplayCurrentWineIMGPatch = (id:number) => {
    //setPatchIMG(Wines[id].fileId)
  }

    
  return (
    <div>
      <div  className={styles.WineMain}>
    <h1 className={styles.AdminTitles}>Wines</h1>
        <div className={`${styles.ButtonHeader} ${styles.PostHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {setPost(!openPost)}}>Post ⤵️</button>
        </div>
            {openPost && 
            <div className={`${styles.WinePost} ${styles.WinePostContainer}`}>
              <form action="post" onSubmit={PostWine}>
                <div className={styles.WinePostContainer}>
                <div className={styles.WinePost1}>
                  <span> <h1>Name:</h1><input name='Name' type="text" /></span> 
                  <input type="file" name='File' onChange={PostIMGChange} />
                  {postIMG && <img src={URL.createObjectURL(postIMG)} alt="preview" className={styles.previewImage} />}
                </div>

                <div className={styles.WinePost2}>
                  <span> <h1>Type:<input name='type' type="text" /></h1></span>
                  <span> <h1>Taste:<input name='taste' type="text" /></h1></span>
                  <span> <h1>Price:<input onKeyDown={handleNumberKeyDown} name='price' type="number"  /> </h1></span>
                  <span> <h1>Year:<input onKeyDown={handleNumberKeyDown} name='year' type="number"  /> </h1></span>
                  <span> <h1>Alcohol (%):<input onKeyDown={handleNumberKeyDown} name='alcoholContent' type="number"  /></h1></span>
                </div>

                <div  className={styles.WinePost3}>
                  <h1>Description:</h1>
                  <textarea style={{resize: 'none'}}  name="description" id=""></textarea>
                  <h1>Winery: </h1>
                  <select name="winery" id="">
                  {Winerys.map((row) =>(
                      <option value={row.id}>{row.name}</option>
                  ))}
                  </select>
                   <h1>GrapesId: </h1>
                  <Select
                    id=""
                    isMulti
                    options={GrapeOptions}
                    name='grapes'
                    onChange={(value) => setSelectedGrapes(value as GrapeOptionsType[])}
                  />

                </div>
                </div>
                <div style={{display:"flex", justifyContent:"center"}}>
                    <button type="submit" className={styles.Add}>Add wine</button>   
                </div>
              </form>
            </div>}

        <div className={`${styles.ButtonHeader} ${styles.PatchHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {setIMGPatch(!openIMGPatch)}}>Patch IMG ⤵️</button>
        </div>
            {openIMGPatch && 
            <div className={styles.WinePost}>
                <form className={styles.Post} method='post' onSubmit={UpdateWineIMG}>
                   <label>
                      <select onChange={(e) => DisplayCurrentWineIMGPatch(parseInt(e.target.value))} name="id" id="">
                        {Wines.map((row) => <option value={row.id}>{row.name}</option>)}
                      </select>
                   </label>
                   <hr />
                    <label>
                      File:  <input  type="file" name='image' onChange={PatchIMGChange} />
                      {PatchIMG && <img src={URL.createObjectURL(PatchIMG)} alt="preview" className={styles.previewImage} />}
                    </label>
                    <div>
                        <button type="submit" className={styles.Add}>Update Image</button>   
                    </div>
            </form>
            </div>}

        <div className={`${styles.ButtonHeader} ${styles.DeleteHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {setDelete(!openDelete)}}>Delete ⤵️</button>
        </div>
            {openDelete && 
            <div className={styles.WinePost}>
               <TableContainer sx={{ maxHeight: '40vh' }}>
       <Table stickyHeader aria-label="sticky table" sx={{ minWidth: 650 }} >
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>

              {Wines.map((row) =>(
                <TableRow>
                  <TableCell>{row.name}</TableCell>
                  <TableCell>{row.price}</TableCell>
                  <TableCell>{row.type}</TableCell>
                  <TableCell>
                         <button onClick={() => showTemplate("/api/wine" , row.id)} className={styles.DeleteDbBtn}>Delete</button>
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
            <div className={styles.WinePost}>
              <form action="post" onSubmit={PatchWine}>
                <div style={{display:"flex", justifyContent:"center"}}>
                  <h1 className={styles.PatchTitle}>Select Wine to Patch:</h1>
                  <br />
                  <select onChange={(e) => SelectPatch(parseInt(e.target.value))} name="id" id="">
                      {Wines.map((row) => <option value={row.id}>{row.name}</option>)}
                </select>
                </div>
                {SelectedWine && 
                <div className={styles.WinePostContainer}>
                <div className={styles.WinePost1}>
                  <span> <h1>Name:</h1><input name='Name' type="text" value={`${SelectedWine["name"]}`} /></span> 
                </div>

                <div className={styles.WinePost2}>  
                  <span> <h1>Type:<input name='type' value={`${SelectedWine["type"]}`} type="text" /></h1></span>
                  <span> <h1>Taste:<input name='taste' value={`${SelectedWine["taste"]}`} type="text" /></h1></span>
                  <span> <h1>Price:<input name='price' value={`${SelectedWine["price"]}`} type="number" onKeyDown={handleNumberKeyDown} /> </h1></span>
                  <span> <h1>Year:<input name='year'value={`${SelectedWine["year"]}`} type="number" onKeyDown={handleNumberKeyDown} /></h1></span>
                  <span> <h1>Alcohol (%):<input name='alcoholContent' value={`${SelectedWine["alcoholContent"]}`} type="number" onKeyDown={handleNumberKeyDown}/></h1></span>
                </div>

                <div  className={styles.WinePost3}>
                  <h1>Description:</h1>
                  <textarea  name="description" value={`${SelectedWine["description"]}`} id=""></textarea>
                  <h1>Winery: </h1>
                  <select value={`${SelectedWine["WineryId"]}`} name="winery" id="">
                  {Winerys.map((row) =>(
                      <option value={row.id}>{row.name}</option>
                  ))}
                  </select>
                   <h1>GrapesId: </h1>
                  <Select
                    id=""
                    isMulti
                    options={GrapeOptions}
                    name='grapes'
                    onChange={(value) => setSelectedPatchGrapes(value as GrapeOptionsType[])}
                  />
                  

                </div>
                </div>}
                <div style={{display:"flex", justifyContent:"center"}}>
                  <button type="submit" className={styles.Add}>Update wine</button>   
                </div>

              </form>
            </div>}
        
      </div>
    </div>
  )
}

export default AdminWine
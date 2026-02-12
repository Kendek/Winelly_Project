import AdminNav from './AdminNav'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styles from './Admin.module.css'
import { useEffect, useState } from 'react';
import { GetDbData } from './AdminFetch';
import { b, option } from 'motion/react-client';
import type { WinePostType, WineGetType, WineryGetType, WineryPostType,GrapeGet } from './AdminFetch';
import Select from 'react-select'
import { map } from '@amcharts/amcharts5/.internal/core/util/Array';

const AdminWine = () => {

  type GrapeOptionsType = {
    value:number
    label :string
  }

  const [openDelete, setDelete] = useState(false);
  const [openPatch, setPatch] = useState(false);
  const [openPost, setPost] = useState(false);

  const [Winerys, setWinerys] = useState<WineryGetType[]>([])
  const [Wines, setWines] = useState<WineGetType[]>([])
  const [Grapes, setGrapes] = useState<GrapeGet[]>([])

  function PostWine(e:any) {
       // Prevent the browser from reloading the page
      e.preventDefault();
    
      // Read the form data
      const form = e.target;
      const formData = new FormData(form);
  
  
      // Or you can work with it as a plain object:
      const formJson = Object.fromEntries(formData.entries());
      console.log(formJson)
      console.log({
        name: formJson.Name as string,
        type: formJson.type as string,
        description: formJson.description as string,
        taste: formJson.taste as string,
        year: parseInt(formJson.year as string),
        price: parseFloat(formJson.price as string),
        alcoholcontent: parseFloat(formJson.alcoholContent as string),
        file: formJson.File as File,
        wineryId: parseInt(formJson.winery as string),
        grapeid: selectedGrapes.map(g => g.value)
      } as WinePostType)
    }

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

    const [GrapeOptions, setGrapesOptions] = useState<GrapeOptionsType[]>([])
    const [selectedGrapes, setSelectedGrapes] = useState<GrapeOptionsType[]>([])

    useEffect(() => {
      if (Grapes.length > 0) {
        const options = Grapes.map((row) => ({
          value: row.id,
          label: row.name
        }))
        setGrapesOptions(options)
      }
    }, [Grapes])


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
                  <input type="file" name='File' />
                </div>

                <div className={styles.WinePost2}>
                  <span> <h1>Type:<input name='type' type="text" /></h1></span>
                  <span> <h1>Taste:<input name='taste' type="text" /></h1></span>
                  <span> <h1>Price:<input name='price' type="number" /> </h1></span>
                  <span> <h1>Year:<input name='year' type="number" /></h1></span>
                  <span> <h1>Alcohol (%):<input name='alcoholContent' type="number" /></h1></span>
                </div>

                <div  className={styles.WinePost3}>
                  <h1>Description:</h1>
                  <textarea  name="description" id=""></textarea>
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
                 <button type="submit" className={styles.Add}>Add wine</button>   
              </form>
            </div>}

        <div className={`${styles.ButtonHeader} ${styles.PatchHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {setPatch(!openPatch)}}>Patch ⤵️</button>
        </div>
            {openPatch && 
            <div className={styles.WinePost}>
              
            </div>}

        <div className={`${styles.ButtonHeader} ${styles.DeleteHeader}`}>
        <button className={`${styles.ToggleButton}`} onClick={() => {setDelete(!openDelete)}}>Delete ⤵️</button>
        </div>
            {openDelete && 
            <div className={styles.WinePost}>
              
            </div>}        
      </div>
    </div>
  )
}

export default AdminWine
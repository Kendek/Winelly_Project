import { Link} from 'react-router-dom'
import styles from './Admin.module.css'

const AdminNav = () => {
  return (
    <div  className={styles.Options}>
          <Link className={location.pathname === "/adminAccounts" ? styles.Active : styles.Option}  to="/adminAccounts">Accounts</Link>
          <Link className={location.pathname === "/adminGrape" ? styles.Active : styles.Option} to="/adminGrape">Grape</Link>
          <Link className={location.pathname === "/adminWine" ? styles.Active : styles.Option} to="/adminWine">Wine</Link>
          <Link className={location.pathname === "/adminWinery" ? styles.Active : styles.Option} to="/adminWinery">Winery</Link>
        </div>
  )
}

export default AdminNav
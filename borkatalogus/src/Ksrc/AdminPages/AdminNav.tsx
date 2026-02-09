import { Link} from 'react-router-dom'
import styles from './Admin.module.css'

const AdminNav = () => {
  return (
    <div  className={styles.Options}>
          <Link to="/adminAccounts">Accounts</Link>
          <Link to="/adminGrape">Grape</Link>
          <Link to="/adminWine">Wine</Link>
          <Link to="/adminWinery">Winery</Link>
        </div>
  )
}

export default AdminNav
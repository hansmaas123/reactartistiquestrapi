import styles from './Header.module.css';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className={styles.header__wrapper}>
        <Link to="/" className={styles.title__link}>
            <h1 className={styles.title}>REACT ARTISTIQUE</h1>
        </Link>
        </div>
    )
}

export default Header;
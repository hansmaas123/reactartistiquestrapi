import '../styles/style.css';
import { Link } from 'react-router-dom'

const Header = () => {
    return (
        <div className='header__wrapper'>
            <div className="link__wrapper">
                <Link to="/" className="header__title--wrapper">
                    <h1 className="title">REACT ARTISTIQUE</h1>
                </Link>
            </div>
        </div>
    )
}

export default Header;
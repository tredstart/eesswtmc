import './ContentScreen.css'

// COMPONENTS
import Sidebar from "../components/Sidebar";
import { Link, Outlet } from 'react-router-dom';

const ContentScreen = () => {
  return (
    <div className='contentscreen'>
        <Sidebar />
        <div className='contentscreen__container'>
            <div className='contentscreen__button'>
                <Link to="/" > {"< Назад"} </Link>
            </div>
            
            <div className='contentscreen__content'>
                <Outlet />
            </div>
        </div>
    </div>
  )
}

export default ContentScreen
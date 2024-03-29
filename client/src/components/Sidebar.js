import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import './Sidebar.css'

// ACTIONS
import { getUser, removeUser } from '../redux/actions/userActions'
import { useNavigate } from 'react-router-dom'



const Sidebar = () => {
    let history = useNavigate()
    const dispatch = useDispatch()

    const user = useSelector(state => state.user)
    const {loading, userItem, error, isAuth} = user

    useEffect(() => {
        dispatch(getUser())
    }, [dispatch]);

    const logoutHandler = () => {
        dispatch(removeUser())
        history("/login")
    }


    return (
        <div className='sidebar'>

            {
                loading ? <span>Loading...</span> : 
                error ? <span>{error}</span> : 
                <div className='sidebar__info'>
                    <div className='info__img'></div>
                    <div className='info__description'>
                        <h2 className='info__description-title'>Ім'я Прізвище</h2>
                        <p className='info__description-subtitle'>{userItem.role}</p>
                    </div>
                </div>
            }

            {isAuth ? (
                <button onClick={logoutHandler} className="sidebar__button">
                    <div className='sidebar__button-square'></div>
                    Вийти
                </button>
            ) : null}

        </div>
    )
}

export default Sidebar
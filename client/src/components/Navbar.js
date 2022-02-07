import {useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import "./Navbar.css";

import {removeUser} from '../redux/actions/userActions'

const Navbar = () => {
  let history = useNavigate()
  const dispatch = useDispatch()

  const user = useSelector(state => state.user) 
  const {isAuth} = user

  const logoutHandler = () => {
    dispatch(removeUser())
    history("/login")
  }

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h2>React Login Demo</h2>
      </div>
      {isAuth ? (
        <button onClick={logoutHandler} className="navbar__button">Logout</button>
      ) : null}
    </nav>
  );
};

export default Navbar;

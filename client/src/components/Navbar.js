import {useSelector} from 'react-redux'

import "./Navbar.css";


const Navbar = () => {
  const user = useSelector(state => state.user)
  const {isAuth} = user

  return (
    <nav className="navbar" style={isAuth ? {paddingLeft: '25%'} : null}>
      <div className="navbar__logo">
        <h2>EasyChamp</h2>
      </div>
    </nav>
  );
};

export default Navbar;

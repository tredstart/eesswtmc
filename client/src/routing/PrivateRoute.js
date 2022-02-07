import Cookies from 'js-cookie'
import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoute = () => {
    console.log(Cookies.get("authToken"))
    return Cookies.get("authToken") ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
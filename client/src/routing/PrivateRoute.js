import Cookies from 'js-cookie'
import {Navigate, Outlet} from 'react-router-dom'

const PrivateRoute = () => {
    return Cookies.get("authToken") ? <Outlet /> : <Navigate to="/login" />
}

export default PrivateRoute
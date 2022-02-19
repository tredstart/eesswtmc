import { Link } from 'react-router-dom'
import './ErrorScreen.css'

const ErrorScreen = () => {
  return (
    <div className='errorscreen'>
        <h2>This page not found :(</h2>
        <Link to="/">Back to previous page</Link>
    </div>
  )
}

export default ErrorScreen
import { useEffect, useState } from 'react';
import axios from 'axios'
import {Link, useNavigate} from 'react-router-dom'

import './LoginScreen.css'
import Cookies from 'js-cookie';

const LoginScreen = () => {
  let history = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  useEffect(() => {
    if(Cookies.get("authToken")) {
      history("/")
    }
  }, [history])
  
  const loginHandler = async (e) => {
    e.preventDefault()
    const config = {
      header: {
        "Content-Type": "application/json"
      }
    }

    try {
      const {data} = await axios.post('/api/auth/login', {email, password}, config)

      Cookies.set("authToken", data.token)

      history("/")
    } catch (error) {
      console.log(error.response)
      setError(error.response.data.Invalid)
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

  return (
      <div className='loginscreen'>
        <form onSubmit={loginHandler} className='loginscreen__form'>
          <h3 className='loginscreen__title'>Login</h3>
          {error && <span className='form__error'>{error}</span>}

          <div className='form__group'>
            <label htmlFor='email'>Email:</label>
            <input type="text" required id='email' placeholder='Введіть ваш email' value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>

          <div className='form__group'>
            <label htmlFor='password'>Password:</label>
            <input type="password" required id='password' placeholder='Введіть ваш пароль' value={password} onChange={(e) => setPassword(e.target.value)} />
          </div>

          <button type="submit" className="form__button">Login</button>

          <span className='form__span'>Don't have an account? <Link to="/register">Register</Link></span>

        </form>
      </div>
  );
};

export default LoginScreen;

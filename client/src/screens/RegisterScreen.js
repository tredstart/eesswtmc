import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";

import "./RegisterScreen.css";

// ACTIONS
import { getSports } from "../redux/actions/sportsAction"
import { getClubs, resetClubs } from "../redux/actions/clubsActions";


const RegisterScreen = () => {
  const dispatch = useDispatch()
  const ref = useRef()
  let history = useNavigate();


  // STATE
  const sportsAction = useSelector((state) => state.sports)
  const clubsAction = useSelector((state) => state.clubs)


  // MAIN INFORMATION
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")

  // ROLE
  const [role, setRole] = useState("")

  // SPORT
  const [sport, setSport] = useState("")

  // CLUBS
  const [club, setClub] = useState("")
  const [clubName, setClubName] = useState("")


  useEffect(() => {

    if (Cookies.get("authToken")) {
      history("/");
    }

    dispatch(getSports())

    if(sport) {
      dispatch(getClubs(sport))
    } else {
      dispatch(resetClubs())
    }

    if(ref.current !== role) {
      setSport("")
      setClub("")
      setClubName("")
    }

    ref.current = role

  }, [history, dispatch, sport, role]);

  const registerHandler = async (e) => {
    e.preventDefault()

    if(password !== confirmPassword) {
      setPassword("")
      setConfirmPassword("")
      setTimeout(() => {
        setError("")
      }, 5000)

      return setError("Not the same passwords entered")
    }

    try {

      const config = {
        header: {
          "Content-Type": "application/json"
        }
      }

      const {data} = await axios.post('/api/auth/register',{email, password1: password, password2: confirmPassword, first_name: firstName, last_name: lastName}, config)
      console.log('Register SUCCESS')

      Cookies.set("authToken", data.token)

      await axios.post('/api/roles', {role}, config)
      console.log('Pick role SUCCESS')

      await axios.post('/api/sports/', {sport}, config)
      console.log('Pick sport SUCCESS')

      if(role === 'SP') {
        await axios.post('/api/pick-club', {id: club}, config)
        console.log('Pick club SUCCESS')
      }

      if(role === 'CH') {
        await axios.post('/api/create-club', {sport, name: clubName}, config)
        console.log('Create club SUCCESS')
      }


      history("/")
    } catch (error) {
      console.log(error.response)
      setError(error.response.data.detail)
      setTimeout(() => {
        setError("")
      }, 5000)
    }
  }

  return (
    <div className="registerscreen">
      <form onSubmit={registerHandler} className="registerscreen__form">
        <h3 className="registerscreen__title">Register</h3>
        {error && <span className='form__error'>{error}</span>}

        <div className="form__group">
            <label htmlFor='firstname'>First name:</label>
            <input type="text" required id='firstname' placeholder="Введіть ваше ім'я" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
        </div>

        <div className="form__group">
            <label htmlFor='lastname'>Last name:</label>
            <input type="text" required id='lastname' placeholder="Введіть ваше прізвище" value={lastName} onChange={(e) => setLastName(e.target.value)} />
        </div>

        <div className="form__group">
            <label htmlFor='email'>Email:</label>
            <input type="email" required id='email' placeholder='Введіть ваш email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>

        <div className="form__group form__group-radio">

          <div>
            <input required type="radio" name="radiorole" id="SP" value="SP" onChange={(e) => setRole(e.target.value)} />
            <label htmlFor="SP">Sportsman</label>
          </div>

          <div>
            <input required type="radio" name="radiorole" id="CH" value="CH" onChange={(e) => setRole(e.target.value)} />
            <label htmlFor="CH">Coach</label>
          </div>

          <div>
            <input required type="radio" name="radiorole" id="OG" value="OG" onChange={(e) => setRole(e.target.value)} />
            <label htmlFor="OG">Organization</label>
          </div>

          <div>
            <input required type="radio" name="radiorole" id="JG" value="JG" onChange={(e) => setRole(e.target.value)} />
            <label htmlFor="JG">Judge</label>
          </div>

        </div>
        
        <div className="form__block">
          {role === 'SP' && <SportsmanView 
            sport = {sport}
            setSport={setSport} 
            club={club}
            setClub={setClub}
            setError={setError} 
            sportsAction={sportsAction}
            clubsAction={clubsAction}
          />}
          {role === 'CH' && <CoachView 
            sport = {sport}
            setSport = {setSport}
            setError = {setError} 
            clubName = {clubName}
            setClubName = {setClubName}
            sportsAction={sportsAction}
          />}
          {role === 'OG' && <OrganizerView 
            sport = {sport}
            setSport = {setSport}
            setError = {setError} 
            sportsAction={sportsAction}
          />}
          {role === 'JG' && <JudgeView 
            sport = {sport}
            setSport = {setSport}
            setError = {setError} 
            sportsAction={sportsAction}
          />}
        </div>

        <div className="form__group">
            <label htmlFor='password'>Password:</label>
            <input type="password" required id='password' placeholder="Введіть пароль" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>

        <div className="form__group">
            <label htmlFor='confirmPassword'>Confirm password:</label>
            <input type="password" required id='confirmPassword' placeholder="Введіть пароль ще раз" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        </div>

        <button type="submit" className="form__button">Register</button>

        <span className='form__span'>Do have an account? <Link to="/login">Login</Link></span>

      </form>
    </div>
  );
};

const SportsmanView = ({
  sport, 
  setSport, 
  club,
  setClub,
  setError,
  sportsAction: {loading, sportsItem, error},
  clubsAction: {clubsLoading, clubsItem, clubsError}
}) => {
  return (
    <>
      <div className="form__group">
        <label htmlFor='sport'>Sport:</label>
        <select required className="form__select" value={sport} name="sportType" onChange={(e) => setSport(e.target.value)}>
          <option value="">Choose sport...</option>
          {loading ? null : error ? setError(error) : sportsItem.map(sport => (
            <option key={sport.id} value={sport.name}>{sport.name}</option>
          ))}
        </select>
      </div>

      <div className="form__group">
        <label htmlFor='club'>Club:</label>
        <select required className="form__select" value={club} name="club" onChange={(e) => setClub(e.target.value)}>
          <option value="">Choose club...</option>
          {clubsLoading ? null : clubsError ? setError(clubsError) : clubsItem.map(club => (
            <option key={club.id} value={club.id}>{club.name}</option>
          ))}
        </select>
      </div>
    </>
  )
}

const CoachView = ({
  sport,
  setSport, 
  setError,
  clubName,
  setClubName,
  sportsAction: {loading, sportsItem, error}
}) => {
  return (
    <>
      <div className="form__group">
        <label htmlFor='sport'>Sport:</label>
        <select required className="form__select" value={sport} name="sportType" onChange={(e) => setSport(e.target.value)}>
          <option value="">Choose sport...</option>
          {loading ? null : error ? setError(error) : sportsItem.map(sport => (
            <option key={sport.id} value={sport.name}>{sport.name}</option>
          ))}
        </select>
      </div>

      <div className="form__group">
        <label htmlFor='clubName'>Club name:</label>
        <input type="text" required id='clubName' placeholder="Введіть назву клубу" value={clubName} onChange={(e) => setClubName(e.target.value)} />
      </div>
    </>
  )
}

const OrganizerView = ({
  sport,
  setSport, 
  setError,
  sportsAction: {loading, sportsItem, error}
}) => {
  return (
    <>
      <div className="form__group">
        <label htmlFor='sport'>Sport:</label>
        <select required className="form__select" value={sport} name="sportType" onChange={(e) => setSport(e.target.value)}>
          <option value="">Choose sport...</option>
          {loading ? null : error ? setError(error) : sportsItem.map(sport => (
            <option key={sport.id} value={sport.name}>{sport.name}</option>
          ))}
        </select>
      </div>
    </>
  )
}

const JudgeView = ({
  sport,
  setSport, 
  setError,
  sportsAction: {loading, sportsItem, error}
}) => {
  return (
    <>
      <div className="form__group">
        <label htmlFor='sport'>Sport:</label>
        <select required className="form__select" value={sport} name="sportType" onChange={(e) => setSport(e.target.value)}>
          <option value="">Choose sport...</option>
          {loading ? null : error ? setError(error) : sportsItem.map(sport => (
            <option key={sport.id} value={sport.name}>{sport.name}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default RegisterScreen;
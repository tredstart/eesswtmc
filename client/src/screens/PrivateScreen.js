import { useEffect } from "react";
import {useDispatch, useSelector} from "react-redux"

import {getUser} from '../redux/actions/userActions'

const PrivateScreen = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)
  const {loading, userItem, error} = user

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch]);

  return (
    loading ? <span>Loading...</span> : error ? <span>{error}</span> : <>
      <h1>Email: {userItem.email}</h1>
      <p>Id: {userItem.id}</p>
      <p>Role: {userItem.role}</p>
      <p>Username: {userItem.username}</p>
    </>
  )
};

export default PrivateScreen;
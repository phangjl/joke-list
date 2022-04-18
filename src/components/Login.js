import React from 'react'
import { Link } from 'react-router-dom'

export const Login = ({ username, setUserName }) => {
    return (
        <div className='loginDiv'>
            <input className='btn' type='text' value={username} onChange={(e) => setUserName(e.target.value)} />
            <Link className='btn' role='button' to='/jokes'>SIGN IN</Link>
        </div>
    )
}

export default Login
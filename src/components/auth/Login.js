import React, { useState, useRef } from "react"
import { useHistory } from 'react-router-dom'
import { getExistingUserEmail } from '../../repositories/usersRepository'
import { Link } from "react-router-dom"
import hero from '../img/login.png'
import './Login.css'

function Login() {

    const [email, setEmail] = useState("")
    const existDialog = useRef()
    const history = useHistory()

    const registeredUserCheck = () => {
        return getExistingUserEmail(email)
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()
        registeredUserCheck()
            .then(exists => {
                if (exists) {
                    localStorage.setItem('communityCare_user', exists.id)
                    history.push("/AfterRegistration")
                } else {
                    existDialog.current.showModal()
                }
            })
    }

    return (
        <>
            <main className='container--login'>
                
                <dialog className='dialog dialog--auth' ref={existDialog}>
                    <div>User does not exist</div>
                    <button className="btn btn--close" onClick={e => existDialog.current.close()}>Close</button>
                </dialog>

                <section>
                    <img src={hero} className="hero--login" alt="login" />
                    
                    <form className='form--login' onSubmit={handleLogin}>
                        <h1 className='center title--login' >Welcome Back, Friend!</h1>
                        <h2 className='center subtitle--login' >Please login</h2>
                        <fieldset>
                            <label htmlFor="inputEmail">Please enter your email address: &nbsp;</label>
                            <input type="email"
                                onChange={e => setEmail(e.target.value)}
                                className="form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </fieldset>

                        <div className='buttton--login'>
                            <button className="btn--login" type="submit"><span>Log in</span></button>
                        </div>
                        <div className="link--register">
                            <h3>Haven't registered yet? <Link className='link--registerHere' to="/Register">Register here</Link></h3>
                        </div>
                    </form>
                </section>

            </main>
        </>
    )
}

export default Login
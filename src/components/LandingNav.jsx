import React from 'react'
import logo from '../assets/images/logo.png';
import LoginRegister from '../Login';
import { Link } from 'react-router-dom';




const LandingNav = () => {
    function Login(){
        return <LoginRegister />
    }
    return (
        <>
            <nav className='navLanding'>
                <div className="logo">
                    <img src={logo} alt="" />
                </div>
                {/* <ul className="nav-items">
                    <li><a href="#">ABOUT</a></li>
                    <li><a href="#">HOW</a></li>
                    <li><a href="#">DASHBOARDS</a></li>
                    <li><a href="#">AI&nbsp;FEATURES</a></li>
                    <li><a href="#">CONTACT&nbsp;US</a></li>
                </ul> */}
                <div className="cta-nav">
                   <Link to='/login'> <button className="login-cta" onClick={Login}><i className="fa-solid fa-arrow-right-to-bracket"></i>&nbsp;Login</button></Link>
                    
                </div>
            </nav>
        </>
    )
}

export default LandingNav

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../Service/ApiAuthEndpoints';

export default function Navbar({ isLoggedIn, setIsLoggedIn, showLogin, setShowLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();
    const [isopen , setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isopen);
    };

    const handleCloseLogin = () => {
        setShowLogin(false);
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const request = await post('/blog/auth/login', { email, password });
            const response = request.data;
            if (request.status === 200) {
                setIsLoggedIn(true);
                setUsername(response.user.username);
                // Store login state and username in localStorage
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('username', response.user.username);
                
                // Close the login box
                handleCloseLogin();
                
                if (response.user.role === 'admin') {
                    navigate('/blogadmin');
                } else if (response.user.role === 'user') {
                    navigate('/');
                }
            }
        } catch (error) {
            console.log(error);
        }
    };

    const handlelogout = async () => {
        try {
          const response = await post('/blog/auth/logout');
          if (response.status === 200) {
            console.log('Logged out successfully', response.data.message);
            setIsLoggedIn(false);
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            navigate('/');
          }
        } catch (error) {
          console.error('Error logging out:', error);
        }
      };

    useEffect(() => {
        const storedLoginState = localStorage.getItem('isLoggedIn');
        const storedUsername = localStorage.getItem('username');
        if (storedLoginState === 'true') {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }
    }, [setIsLoggedIn]);

    return (
        <>
            <div className="fixed w-full z-50 bg-white shadow-md">
                <nav className=" hidden lg:flex container mx-auto justify-center py-4 space-x-14 text-2xl">
                    <Link to="/" className="text-black font-thin hover:text-gray-600">Home</Link>
                    <a href="https://drive.google.com/file/d/19wBrTUrNSddmwF-_f1qSOTY4u33p5ND7/view?usp=sharing" className="text-black font-thin hover:text-gray-600">About</a>
                    <a href="https://www.linkedin.com/in/naman-gupta-914a6822a/" className="text-black font-thin hover:text-gray-600">Contact</a>
                    {isLoggedIn ? (
                        <span className="text-black font-thin">Welcome, {username}</span>
                    ) : (
                        <Link to="/" onClick={() => setShowLogin(true)} className="text-black font-thin hover:text-gray-600">LogIn</Link>
                    )}
                    <a href="" onClick={handlelogout}  className="text-black font-thin hover:text-gray-600"> Logout </a>
                    {isLoggedIn ? (
                        <Link to="/profile" href=""  className="text-black font-thin hover:text-gray-600"> 
                        <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                        </svg>
                        </Link>
                    ):(
                        <Link to="/" href=""  className="text-black font-thin hover:text-gray-600"> 
                    <svg xmlns="http://www.w3.org/2000/svg" height="40" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                    </svg>
                    </Link>
                    )}
                </nav>
            </div>

            <div className='lg:hidden fixed top-4 right-4 z-50'>
                <button onClick={toggleMenu} className="text-gray-800 focus:outline-none p-2 bg-white rounded-md shadow-md">
                    <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                        {isopen ? (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                        ) : (
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                        )}
                    </svg>
                </button>
            </div>

            {isopen && (
                <div className='lg:hidden fixed inset-0 bg-white z-40 flex flex-col'>
                    <div className="flex justify-end p-4">
                        <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div className="flex flex-col items-center space-y-6 mt-16">
                        <Link to="/" className="text-black text-xl font-thin hover:text-gray-600" onClick={toggleMenu}>Home</Link>
                        <a href="#" className="text-black text-xl font-thin hover:text-gray-600" onClick={toggleMenu}>About</a>
                        <a href="#" className="text-black text-xl font-thin hover:text-gray-600" onClick={toggleMenu}>Contact</a>
                        {isLoggedIn ? (
                            <span className="text-black text-xl font-thin">Welcome, {username}</span>
                        ) : (
                            <Link to="/" onClick={() => {setShowLogin(true); toggleMenu();}} className="text-black text-xl font-thin hover:text-gray-600">LogIn</Link>
                        )}
                        <a href="" onClick={() => {handlelogout(); toggleMenu();}} className="text-black text-xl font-thin hover:text-gray-600">Logout</a>
                        {isLoggedIn && (
                            <Link to="/profile" onClick={toggleMenu} className="text-black text-xl font-thin hover:text-gray-600">
                                Profile
                            </Link>
                        )}
                    </div>
                </div>
            )}

            {showLogin && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
                    <div className="mx-auto w-96 shadow-2xl p-6 bg-white rounded-lg relative">
                        <button
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 focus:outline-none"
                            onClick={handleCloseLogin}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="flex flex-col space-y-4">
                                <label className="text-lg" htmlFor="email">Email</label>
                                <input
                                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-500"
                                    type="email"
                                    id="email"
                                    name="email"
                                    placeholder="Enter your email"
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <label className="text-lg" htmlFor="password">Password</label>
                                <input
                                    className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:border-blue-500 placeholder-gray-500"
                                    type="password"
                                    id="password"
                                    name="password"
                                    placeholder="Enter your password"
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                                <button type="submit" className="bg-blue-600 text-white rounded-lg px-4 py-2 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                    Login
                                </button>
                                <p className="text-center">
                                    Don't have an account?{" "}
                                    <Link to="/register" className="text-blue-400 underline">Register here</Link>
                                </p>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
}
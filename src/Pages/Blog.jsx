import React, { useState, useEffect } from 'react';
import { post } from '../Service/ApiBlogEndpoint';
import { get } from '../Service/ApiAuthEndpoints';
import { useNavigate } from 'react-router-dom';

export default function Blog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState('');
  const [username, setUsername] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    // Check if user is logged in
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);
    if (!loggedIn) {
      navigate('/'); // Redirect to home if not logged in
    } else {
      fetchUsername();
    }
  }, [navigate]);

  const fetchUsername = async () => {
    try {
      const request = await get('/blog/auth/username');
      const response = request.data;
      setUsername(response.username);
    } catch (error) {
      console.error('Error fetching username:', error);
      // If there's an error fetching username, user might not be authenticated
      setIsLoggedIn(false);
      localStorage.removeItem('isLoggedIn');
      navigate('/');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert('You must be logged in to publish a blog.');
      navigate('/');
      return;
    }
    try {
      const request = await post('/blog/newBlog', { title, content, type, username });
      const response = request.data;
      if (request.status === 200) {
        console.log('Blog published');
        console.log(response.user.username);
        // Maybe redirect to the newly created blog or a success page
        navigate('/');
      }
      console.log(response);
    } catch (error) {
      console.log(error);
      if (error.response && error.response.status === 401) {
        // Unauthorized, user might have been logged out
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        navigate('/');
      }
    }
  };

  if (!isLoggedIn) {
    return <div>Please log in to publish a blog.</div>;
  }
  return (
    <>
      <div className='bg-blue-600 min-h-screen'>
        <div className='space-y-16 pt-20'>
          <div className='text-center text-3xl font-semibold text-white'>
            Write a New Blog
          </div>
          <div className="flex items-center justify-center">
            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 bg-teal-400 p-6 rounded-lg shadow-md">
              <label htmlFor="title" className="text-lg font-semibold">
                Title of the Blog
              </label>
              <input
                type="text"
                id="title"
                className="border-blue-300 border-2 px-4 py-2 rounded-lg w-80"
                onChange={(e) => setTitle(e.target.value)}
              />
              <label htmlFor="content" className="text-lg font-semibold">
                Content of the Blog
              </label>
              <textarea
                id="content"
                className="border-blue-300 border-2 px-4 py-2 rounded-lg w-[600px] h-40 resize-none"
                onChange={(e) => setContent(e.target.value)}
              />
              <label htmlFor="type" className="text-lg font-semibold">
                Type of Blog
              </label>
              <select
                id="type"
                className="border-blue-300 border-2 px-4 py-2 rounded-lg w-80"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="music">Select</option>
                <option value="music">Music</option>
                <option value="movies">Movies</option>
                <option value="sports">Sports</option>
                <option value="tech">Tech</option>
                <option value="fashion">Fashion</option>
              </select>
              <button type='submit' className='bg-red-600 w-32 h-10 rounded-xl text-yellow-100 shadow-2xl shadow-orange-600 hover:bg-amber-200 hover:text-blue-900 font-semibold'>
                Publish
              </button>
              <div className="text-lg font-semibold">
                User: {username}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

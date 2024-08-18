import React, { useEffect, useState } from 'react';
import { get } from '../Service/ApiBlogEndpoint.js';
import img2 from '../assets/pics.jpeg';
import img3 from '../assets/blogPic.avif';
import { useNavigate } from "react-router-dom";

export default function Home({ isLoggedIn, handleShowLogin }) {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const getBlogs = async () => {
      try {
        const response = await get('/blog/allblogs');
        if (response.status === 200) {
          setBlogs(response.data.blogs);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getBlogs();
  }, []);

  const handleCreateBlog = () => {
    if (isLoggedIn) {
      navigate('/newblog');
    } else {
      handleShowLogin();
    }
  };

  return (
    <div className="pt-16"> {/* Add padding-top to account for fixed navbar */}
      <div className="relative bg-gray-100 ">
        <div className="flex justify-center">
          <img src={img2} alt="" className="h-[300px] w-full sm:w-1/2 lg:w-1/4 object-cover" />
          <img src={img2} alt="" className="hidden sm:block h-[300px] w-full sm:w-1/2 lg:w-1/4  object-cover" />
          <img src={img2} alt="" className="hidden lg:block h-[300px] w-full lg:w-1/4 object-cover" />
          <img src={img2} alt="" className="hidden lg:block h-[300px] w-full lg:w-1/4 object-cover" />
          <div className="absolute inset-0 flex items-center justify-center lg:text-center">
            <p className="text-white text-5xl sm:text-4xl text-center font-bold px-4 py-2 rounded ">BLOGS</p>
          </div>
        </div>
      </div>
      <div className="container mx-auto flex mt-12">
        <div className="w-1/4">
          <div className="mb-5">
            <button 
              onClick={handleCreateBlog}
              className="bg-blue-500 text-white font-semibold py-2 px-4 rounded w-full"
            >
              CREATE BLOG
            </button>
          </div>
          <div className="bg-white shadow-md rounded-lg overflow-hidden ">
            <ul className="divide-y divide-gray-200">
              <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">All Categories</li>
              <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">Music</li>
              <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">Movies</li>
              <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">Sports</li>
              <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">Tech</li>
              <li className="px-4 py-3 hover:bg-gray-50 cursor-pointer">Fashion</li>
            </ul>
          </div>
        </div>
        <div className="flex-1 pl-8 ">
          <h2 className="text-center font-semibold text-3xl mb-8">BLOGS PUBLISHED</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {blogs && blogs.map((elem, index) => (
              <div key={index} className="bg-white shadow-xl p-4 border-b border-gray-200 rounded-lg ">
                <img src={img3} className="h-[200px] w-full object-cover mb-4 rounded" alt="Blog" />
                <h3 className="text-lg font-bold">{elem.title}</h3>
                <p className="mt-2 break-words">{elem.content}</p>
                <p className="text-gray-500 mt-2">{elem.type}</p>
                <p className="text-gray-500 mt-2">{elem.username}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
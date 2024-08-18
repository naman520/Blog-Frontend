import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { get, put } from '../Service/ApiAuthEndpoints.js'


export default function UpdateBlog() {
    const [blog, setBlog] = useState({title: '', content :''})
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        if(id){
            fetchBlog()
        }
    }, [id])

    const fetchBlog = async() =>{
        try {
            const response = await get(`/blog/updateBlog/${id}`)
            setBlog(response.data)
            setLoading(false)
        } catch (error) {
            console.error('Error fetching blog:', error);
            setError('Failed to fetch blog. Please try again.');
            setLoading(false);
        }
    }

    const handleInputChange = (e) => {
        const {name , value} = e.target
        setBlog(prevBlog => ({
            ...prevBlog,
            [name] :value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await put(`/blog/updateBlog/${id}`,blog)
            navigate('/');
        } catch (error) {
            console.error('Error updating blog:', error);
            setError('Failed to update blog. Please try again.');
        }
    }

  return (
    <>
        <div className=''>
        <h2 className=' pt-20 text-center text-4xl '>UPDATE Your Blog</h2>
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
             <div className="mb-6">
                <label htmlFor="title" className="block text-xl font-semibold mb-2 text-gray-700">Title:</label>
                <input
                type="text"
                id="title"
                name="title"
                value={blog.title}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                />
            </div>
            <div className="mb-6">
                <label htmlFor="content" className="block text-xl font-semibold mb-2 text-gray-700">Content:</label>
                <textarea
                id="content"
                name="content"
                value={blog.content}
                onChange={handleInputChange}
                required
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500 h-64 resize-none"
                />
            </div>
            <button 
                type="submit"
                className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
            >
                Update Blog
            </button>
            </form>
        </div>
    </>
  )
}

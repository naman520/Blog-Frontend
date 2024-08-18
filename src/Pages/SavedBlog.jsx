import React, { useEffect, useState } from 'react'
import { get } from '../Service/ApiBlogEndpoint';

export default function SavedBlog() {

    const [saved , setSaved] = useState([])

    useEffect(()=>{
        fetchSavedBlogs();
    },[])

    const fetchSavedBlogs = async() =>{
        try {
            const response = await get('/blog/saved')
            if(response.status === 200){
                setSaved(response.data)
            }
        } catch (error) {
            console.error('Error fetching saved blogs:', error);
        }
    }

  return (
    <>
      <div className=' max-w-4xl mx-auto mt-8'>
        <h1 className='text-3xl font-bold mb-6'>Saved Blogs</h1>
            {saved.map(blog=>(
                <div key={blog.id} className='mb-4 p-4 border rounded-lg'>
                    <h2 className='text-xl font-semibold'>{blog.title}</h2>
                    <p className="text-gray-600">{blog.excerpt}</p>
                    <a href={`/blog/${blog.id}`} className=' text-blue-500 hover:underline'>Read More</a>
                </div>
            ))}
      </div>
    </>
  )
}

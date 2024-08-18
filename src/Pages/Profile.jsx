import React, { useState, useEffect } from 'react';
import { get } from '../Service/ApiAuthEndpoints';
import { useNavigate } from 'react-router-dom';
import SavedBlog from './SavedBlog';
import { deleteBlog } from '../Service/ApiBlogEndpoint';


function MyBlogs() {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('Blog');
    const [updateBlog, setUpdateBlog] = useState('');

    useEffect(() => {
        fetchUserBlogs();
    }, []);

    const fetchUserBlogs = async () => {
        try {
            const response = await get('/blog/auth/profile');
            setBlogs(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching user blogs:', error);
            setError('Failed to fetch blogs. Please try again.');
            setLoading(false);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem('isLoggedIn');
                localStorage.removeItem('username');
                navigate('/');
            }
        }
    };
    
    const handleDelete = async (id) => {
        try {
            const response = await deleteBlog(`/blog/deleteBlog/${id}`);
            if (response.status === 200) {
                console.log(response.data);
                // Optionally remove the blog from the state after deletion
                setBlogs(blogs.filter(blog => blog._id !== id));
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            if (error.response) {
                setError(error.response.data.message);
            }
        }
    }

    const handleTabClick = (tabName) => {
        setActiveTab(tabName);
    };

    if (loading) return <div className="text-white text-center p-4">Loading...</div>;
    if (error) return <div className="text-red-500 text-center p-4">{error}</div>;

    return (
        <div className="bg-gray-900 min-h-screen p-4">
            <div className="max-w-4xl mt-40 mx-auto">
                <div className="flex justify-center mb-8">
                    {['Blog', 'Saved'].map(tab => (
                        <button
                            key={tab}
                            className={`px-6 py-2 text-lg ${
                                activeTab === tab ? 'text-yellow-400 border-b-2 border-yellow-400' : 'text-gray-400'
                            }`}
                            onClick={() => handleTabClick(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="bg-green-900 rounded-lg overflow-hidden">
                    <div className="grid grid-cols-2 bg-green-800 p-4">
                        <div className="font-bold text-white">Title</div>
                        <div className="font-bold text-white text-right">Content</div>
                    </div>
                    
                    {activeTab === 'Blog' ? (
                        blogs.length === 0 ? (
                            <p className="text-white text-center p-4">You haven't published any blogs yet.</p>
                        ) : (
                            blogs.map((blog, index) => (
                                <div 
                                    key={blog._id} 
                                    className={`grid grid-cols-2 p-4 ${index % 2 === 0 ? 'bg-green-700' : 'bg-green-800'} relative group`}
                                >
                                    <div className="text-white">{blog.title}</div>
                                    <div className="text-white text-right">{blog.content.substring(0, 50)}...</div>
                                    <div className="absolute inset-0 space-x-3  bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                        <button 
                                            className="bg-blue-500 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => navigate(`/updateBlog/${blog._id}`)}
                                        >
                                            Edit
                                        </button>
                                        <button 
                                            className="bg-red-500 hover:bg-red-600 gap-x-7 text-white font-bold py-2 px-4 rounded"
                                            onClick={() => handleDelete(blog._id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )): (
                            <p className="text-white text-center p-4"> <SavedBlog/> </p>
                        )}
                </div>
            </div>
            <div className='mt-48 text-center'>
                {activeTab === 'Blog'}
                {activeTab === 'Saved'}
            </div>
        </div>
    );
}

export default MyBlogs;

import React from 'react'
import { useNavigate } from 'react-router-dom'
import '../css/Signup.css'
import '../css/BlogListPage.css'
import PostList from '../Components/PostList.jsx'

function BlogListPage() {

    const navigate = useNavigate();

    return (
        <>
            <header className="header">

                <div className="header-left">
                    <img src="../src/assets/image-1.jpeg" alt="Blog image" className="logo" />
                </div>


                <div className="header-center">
                    <img src="../src/assets/Blogs-center.jpg" alt="Blog center" className="website-name" />
                </div>


                <nav className="nav-links">
                    <button className="active" onClick={() => navigate('/')}>Home</button>
                    <button className="signup" onClick={() => navigate('/Login')}>Login</button>
                    <button className="signup" onClick={() => navigate('/Signup')}>Sign up</button>
                    <button className="signup" onClick={() => navigate('/BlogCreation')}>Create Blog</button>
                    <button className="signup" onClick={() => navigate('/EditBlog')}>Edit Blogs</button>
                </nav>
            </header>
            <PostList />
        </>
    )
}

export default BlogListPage

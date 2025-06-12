/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import './PostList.css';
import { useNavigate } from 'react-router-dom';
import { useSelectedBlogId } from '../Context/SelectedBlog';

import image1 from '../assets/images/image-1.avif';
import image2 from '../assets/images/image-2.avif';
import image3 from '../assets/images/image-3.avif';
import image4 from '../assets/images/image-4.avif';
import image5 from '../assets/images/image-5.avif';
import image6 from '../assets/images/image-6.avif';
import image7 from '../assets/images/image-7.avif';

const fallbackImages = [image1, image2, image3, image4, image5, image6, image7];

const PostList = () => {
    const navigate = useNavigate();
    const { setSelectedBlogId } = useSelectedBlogId();

    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);

    const postsPerPage = 7;
    const paginatedPosts = posts.slice((page - 1) * postsPerPage, page * postsPerPage);
    const totalPages = Math.ceil(posts.length / postsPerPage);

    const selectBlog = (id) => {
        setSelectedBlogId(id);
        navigate(`/SingleBlog`);
    };

    const fetchBlogs = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch("https://blogprojectbackend-production.up.railway.app/api/blogs/", {
            });

            if (!response.ok) {
                console.error("Network response not ok:", response.statusText);
                return;
            }

            const data = await response.json();

            if (data.success) {
                setPosts(data.posts);
            } else {
                console.error("Failed to load posts", data);
            }
        } catch (error) {
            console.error("Error fetching blog posts:", error);
        }
    };

    useEffect(() => {
        fetchBlogs();
    }, []);

    const handlePageClick = (pageNumber) => {
        setPage(pageNumber);
    };

    return (
        <div className="container">
            <div className="categories__grid__post">
                <div className="row">
                    {paginatedPosts.map((post, index) => (
                        <div className="categories__list__post__item" key={post.id || index}>
                            <div className="row">
                                <div className="col-lg-6 col-md-6">
                                    <div
                                        className="categories__post__item__pic set-bg"
                                        style={{
                                            backgroundImage: `url(${post.image || fallbackImages[index % fallbackImages.length]})`,
                                        }}
                                    >
                                        <div className="post__meta">
                                            <h4>{new Date(post.created_at).getDate()}</h4>
                                            <span>
                                                {new Date(post.created_at).toLocaleString('default', {
                                                    month: 'short',
                                                })}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <div className="categories__post__item__text">
                                        <span className="post__label">Blog</span>
                                        <h3 className="title">
                                            <button onClick={() => selectBlog(post.id)}>
                                                {post.title || 'Untitled Post'}
                                            </button>
                                        </h3>
                                        <ul className="post__widget">
                                            <li>By <span>{post.author?.username || 'Unknown'}</span></li>
                                            <li>{post.comments || 0} Comments</li>
                                        </ul>
                                        <p className="truncate-description">{post.content}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Pagination */}
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="categories__pagination">
                                {[...Array(totalPages).keys()].map((_, i) => (
                                    <a
                                        key={i}
                                        onClick={() => handlePageClick(i + 1)}
                                        className={`page-button ${page === i + 1 ? 'active' : ''}`}
                                    >
                                        {i + 1}
                                    </a>
                                ))}
                                {page < totalPages && (
                                    <a onClick={() => handlePageClick(page + 1)} className="page-button">
                                        Next
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostList;

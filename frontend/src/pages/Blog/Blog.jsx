import React, { useEffect, useState } from 'react';
import './blog.css';
import BlogPost from './BlogPost/BlogPost';
import placeholder from '../../images/placeholders/410x230.png';
import axiosInstance from '../../axios';


const Blog = () => {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        axiosInstance
            .get('blog/')
            .then((res) => {
                setPosts(res.data);
                setLoading(false);
            })
            .catch((err) => {
                setLoading(false);
            });

    }, []);

    if (loading) {
        return <div className="blog--base base"></div>
    }

    return (
        <>
            <div className="blog--base base">
                <div className="container blog--container fade-in">
                    <div className="row blog--header-row">
                        <div className="col-4 blog--header-title-cont">
                            <h1 className="blog--header-title">
                                Blog
                            </h1>
                        </div>
                    </div>

                    <div className="blog--post-container">
                    {
                        posts.map((post, index) => {
                            return <BlogPost 
                                title={post.title}
                                author={post.added_by}
                                dateCreated={post.date_created}
                                excerpt={post.excerpt}
                                thumbnail={post.thumbnail}
                                slug={post.slug}
                            />
                        })
                    }
                    </div>
                </div>
            </div>
        </>
    )

};

export default Blog;
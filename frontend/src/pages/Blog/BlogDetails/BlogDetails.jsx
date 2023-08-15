import React, { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import './blogDetails.css';
import axiosInstance from '../../../axios';

const BlogDetails = ({ loggedIn }) => {
    const { slug } = useParams();
    const [ post, setPost ] = useState({});

    useEffect(() => {
        axiosInstance
            .get('/blog/' + slug + '/')
            .then((res) => {
                setPost(res.data);
            })
            .catch((err) => {
                
            })
    }, []);

    return (
        <>
            <div className="blog-details--base base">
                <div className="blog-details--container fade-in">
                    <div className="row blog-details--header-row">
                        <div className="col-4 blog-details--header-title-cont">
                            <h1 className="blog-details--header-title">
                                {post.title}
                            </h1>
                        </div>
                    </div>

                    <div className="blog-details--details-container">
                        <h3 className="blog-details--content-header-row">{post.added_by} | {post.date_created}</h3>
                        <hr />

                        <div className="blog-details--content" dangerouslySetInnerHTML={{ __html: post.content}} />
                    </div>
                </div>
            </div>
        </>
    )
}

export default BlogDetails;
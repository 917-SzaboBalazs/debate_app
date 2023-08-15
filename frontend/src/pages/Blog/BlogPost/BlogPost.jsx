import React from "react";
import './blogPost.css';
import { Link } from 'react-router-dom';

const BlogPost = (props) => {
    const title = props.title;
    const thumbnail = props.thumbnail;
    const author = props.author;
    const dateCreated = props.dateCreated;
    const excerpt = props.excerpt;
    const slug = props.slug;

    return (
        <>
            <div className="blogpost--container">
                <h3 className="blogpost--author">{author}</h3>
                <h2 className="blogpost--title">
                    <Link to={slug} className="blogpost--title-link">{title}</Link>
                    </h2>
                <h3 className="blogpost--date-created">{dateCreated}</h3>
                <img src={thumbnail} alt="thumbnail" className="blogpost--thumbnail" />
                <hr className="blogpost--excerpt-separator" />
                <p className="blogpost--excerpt">{excerpt}</p>

                <Link to={slug} className="blogpost--read-more">Continue reading</Link>
            </div>
        </>
    )
}

export default BlogPost;
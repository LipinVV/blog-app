import React, {useContext, useEffect, useState} from 'react';
import {useParams} from "react-router";
import {StoreContext} from "../../store";
import {ACTION} from "../../actions";
import {Post} from "../Post";
import './user.scss';

export const User = () => {
    const {id} = useParams();
    const {state, dispatch} = useContext(StoreContext);
    const currentUser = state.users.find(user => user.id === Number(id));

    const fetchUserPost = async () => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
                .then((response) => response.json())
                .then((data) => dispatch({action: ACTION.LOAD_USER_POST, data: data}));
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        currentUser && fetchUserPost();
    }, [currentUser]);

    const [numberOfPosts, setNumberOfPosts] = useState(3);

    const posts = state.posts.slice(0, numberOfPosts);

    if (!currentUser) return <div>Loading user....</div>

    return (
        <div className='user'>
            <div className='user__personal-information'>
                <div>{currentUser.id}</div>
                <span>{currentUser.name}</span>
                <span>{currentUser.email}</span>
                <span>{currentUser.phone}</span>
                <span>{currentUser.website}</span>
                <span>{currentUser.company.name}</span>
                <span>{currentUser.company.bs}</span>
            </div>
            <div className='user__posts'>
                {posts.map(post => {
                    return <Post
                        userName={currentUser.username}
                        id={Number(id)} title={post.title}
                        body={post.body}
                        postId={post.id}
                        key={post.id}/>
                })}
            </div>
            {numberOfPosts === 3 ?
                <button type='button' onClick={() => setNumberOfPosts(state.posts.length)}>show all</button>
                :
                <button type='button' onClick={() => setNumberOfPosts(3)}>hide all</button>
            }
        </div>
    )
}
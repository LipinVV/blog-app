import {useContext, useEffect, useState} from 'react';
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
    console.log(posts)
    if (!currentUser) return <div>Loading user....</div>

    return (
        <div className='user'>
            <table className='user__personal-information'>
                <tbody>
                <tr>
                    <td className='user__personal-empty-cell'></td>
                    <td className='user__personal-information-name' colSpan={5}>{currentUser.name}</td>
                    <td className='user__personal-empty-cell'></td>
                </tr>
                <tr>
                    <td className='user__personal-empty-cell'></td>
                    <td className='user__personal-information-cell'>{currentUser.email}</td>
                    <td className='user__personal-information-cell'>{currentUser.phone}</td>
                    <td className='user__personal-information-cell'>{currentUser.website}</td>
                    <td className='user__personal-information-cell'>{currentUser.company.name}</td>
                    <td className='user__personal-information-cell'>{currentUser.company.bs}</td>
                    <td className='user__personal-empty-cell'></td>
                </tr>
                </tbody>
            </table>
            <div className='user__posts'>
                <h4 className='user__posts-header'>Posts</h4>
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
                <button className='user__button-show-all' type='button' onClick={() => setNumberOfPosts(state.posts.length)}>Show all</button>
                :
                <button className='user__button-hide-all' type='button' onClick={() => setNumberOfPosts(3)}>Hide all</button>
            }
        </div>
    )
}
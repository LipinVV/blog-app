import {useEffect, useState} from 'react';
import {useParams} from "react-router";
import {Post} from "../Post";
import {PostType, StateType, UserType} from "../../types";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch} from "../../store";
import {fetchUserPost} from "../../reducers/usersSlice";
import './user.scss';

export const User = () => {
    const {id} = useParams();
    const dispatch = useDispatch<AppDispatch>();

    const userList = useSelector((state: StateType) => {
        return state.users;
    });

    const postLists = useSelector((state: StateType) => {
        return state.posts;
    });

    const currentUser = userList.find((user: UserType) => user.id === Number(id));

    useEffect(() => {
        currentUser && dispatch(fetchUserPost(Number(id)));
    }, [currentUser, dispatch, id]);

    const [numberOfPosts, setNumberOfPosts] = useState(3);

    const posts = postLists.slice(0, numberOfPosts);
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
                {posts.map((post: PostType) => {
                    return <Post
                        userName={currentUser.username}
                        id={Number(id)} title={post.title}
                        body={post.body}
                        postId={post.id}
                        key={post.id}/>
                })}
            </div>
            {numberOfPosts === 3 ?
                <button className='user__button-show-all' type='button' onClick={() => setNumberOfPosts(postLists.length)}>Show all</button>
                :
                <button className='user__button-hide-all' type='button' onClick={() => setNumberOfPosts(3)}>Hide all</button>
            }
        </div>
    )
}
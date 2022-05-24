import React from "react";
import './comment.scss';
import {CommentType} from "../../types";

export const Comment = ({id, body, email, name}: CommentType) => {

    return (
        <div className='comment'>
            <span>id: {id}</span>
            <span>name: {name}</span>
            <span>text: {body}</span>
            <span>email: {email}</span>
        </div>
    )
}
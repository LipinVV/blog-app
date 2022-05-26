import { StateType } from '../types';

export const getUsers = (store: StateType) => store.users;
export const getLoading = (store: StateType) => store.isLoading;
export const getComments = (store: StateType) => store.comments;
export const getPosts = (store: StateType) => store.posts;

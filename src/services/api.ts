import api from '../api/client';
import { Comment, Post, User } from '../types';


export const getPosts = () => api.get<Post[]>('/posts');
export const getPost = (id: number) => api.get<Post>(`/posts/${id}`);
export const getComments = (postId: number) => api.get<Comment[]>(`/posts/${postId}/comments`);
export const getUser = (userId: number) => api.get<User>(`/users/${userId}`);
export const getUsers = () => api.get<User[]>('/users');
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Comment } from "../../types/DataTypes";
import { commentActions } from "../slices/commentSlice"
import { URL } from "../../constants";

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.get<Comment[]>(`${URL}/comments?taskId=${id}`)            
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    } 
) 

export const addComment = createAsyncThunk('comments/addComment',
    async (comment: Comment, thunkAPI) => {
        try {
            const response = await axios.post(`${URL}/comments`, comment)
            thunkAPI.dispatch(commentActions.addComment(response.data))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Error')
        }
    } 
)

export const deleteComment = createAsyncThunk('comments/deleteComment',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.delete(`${URL}/comments/${id}`)
            thunkAPI.dispatch(commentActions.deleteComment(id))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Error')
        }
    } 
) 
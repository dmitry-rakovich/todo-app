import { createSlice } from "@reduxjs/toolkit";
import { Comment } from '../../types/DataTypes'
import { fetchComments, addComment, deleteComment } from "../actions/commentsActions";

type CommentState = {
    comments: Comment[],
    isLoading: boolean,
    error: string
}

const initialState: CommentState = {
    comments: [],
    isLoading: false,
    error: ''
}
export const commentSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        addComment(state, action) {
            state.comments.push(action.payload)
        },
        deleteComment(state, action) {
            state.comments = state.comments.filter(comment => comment.id !== action.payload)
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchComments.pending, state => {
            state.isLoading = true
        })
        builder.addCase(fetchComments.fulfilled, (state, action) => {            
            state.isLoading = false
            state.error = ''
            state.comments = action.payload
        })
        builder.addCase(fetchComments.rejected, (state, action) => {
            state.isLoading = false
            state.comments = []            
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
        builder.addCase(addComment.rejected, (state, action) => {
            state.isLoading = false
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
        builder.addCase(deleteComment.rejected, (state, action) => {
            state.isLoading = false
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
    },
})

export const { actions: commentActions, reducer: commentReducer } = commentSlice
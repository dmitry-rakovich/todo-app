import { createSlice } from "@reduxjs/toolkit";
import { Subtask } from '../../types/DataTypes'
import { addSubTask, deleteSubTask, fetchSubTasks, toggleSubTask } from "../actions/subtaskActions";

type subTaskState = {
    subtasks: Subtask[],
    isLoading: boolean,
    error: string
}

const initialState: subTaskState = {
    subtasks: [],
    isLoading: false,
    error: ''
}
export const subtaskSlice = createSlice({
    name: 'subtasks',
    initialState,
    reducers: {
        addSubTask(state, action) {
            state.subtasks.push(action.payload)
        },
        deleteSubTask(state, action) {
            state.subtasks = state.subtasks.filter(subtask => subtask.id !== action.payload)
        },
        toggleSubTask(state, action) {
            const subtask = state.subtasks.find(subtask => subtask.id === action.payload.id)!
            subtask.checked = action.payload.checked
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchSubTasks.pending, state => {
            state.isLoading = true
        })
        builder.addCase(fetchSubTasks.fulfilled, (state, action) => {            
            state.isLoading = false
            state.error = ''
            state.subtasks = action.payload
        })
        builder.addCase(fetchSubTasks.rejected, (state, action) => {
            state.isLoading = false
            state.subtasks = []
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
        builder.addCase(addSubTask.rejected, (state, action) => {
            state.isLoading = false
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
        builder.addCase(deleteSubTask.rejected, (state, action) => {
            state.isLoading = false
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
        builder.addCase(toggleSubTask.rejected, (state, action) => {
            state.isLoading = false
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
    },
})

export const { actions: subtaskActions, reducer: subtaskReducer } = subtaskSlice
import { createSlice } from "@reduxjs/toolkit";
import { SubTask } from '../../types/DataTypes'
import { addSubTask, fetchSubTasks, toggleSubTask } from "../actions/subTaskActions"

type SubTaskState = {
    subtasks: SubTask[],
    isLoading: boolean,
    error: string
}

const initialState: SubTaskState = {
    subtasks: [],
    isLoading: false,
    error: ''
}
export const subTaskSlice = createSlice({
    name: 'subtasks',
    initialState,
    reducers: {
        addSubTask(state, action) {
            state.subtasks.push(action.payload)
        },
        deleteSubTask(state, action) {
            state.subtasks = state.subtasks.filter(subtask => subtask.id !== action.payload)
        },
        editStatus(state, action) {
            state.subtasks = state.subtasks.map(subtask => {
                if (subtask.id === action.payload.id) {
                    subtask.checked = action.payload.checked
                }
                return subtask
            })
        }
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
            if (action?.error.message) {
                state.error = action.error.message
            }
        })
        builder.addCase(addSubTask.rejected, (state, action) => {
            state.isLoading = false
            if (action?.error.message) {
                state.error = action.error.message
            }
        })
        builder.addCase(toggleSubTask.rejected, (state, action) => {
            state.isLoading = false
            if (action?.error.message) {
                state.error = action.error.message
            }
        })
    },
})

export const { actions: subTaskActions, reducer: subTaskReducer } = subTaskSlice
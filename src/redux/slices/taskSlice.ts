import { createSlice } from "@reduxjs/toolkit";
import { Status, Task } from '../../types/DataTypes'
import {  addTask, deleteTask, fetchTasks } from "../actions/taskActions";

type TaskState = {
    tasks: Task[],
    isLoading: boolean,
    error: string
}

const initialState: TaskState = {
    tasks: [],
    isLoading: false,
    error: ''
}
export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask(state, action) {
            state.tasks.push(action.payload)
        },
        deleteTask(state, action) {
            state.tasks = state.tasks.filter(task => task.id !== action.payload)
        },
        editStatus(state, action) {
            state.tasks = state.tasks.map(task => {
                if(task.id === action.payload.id) {
                    if(action.payload.status === Status.DONE) {
                        task.time.finish = new Date().toString()
                    }
                    if(task.status === Status.DONE) {
                        task.time.finish = ''
                    }
                    task.status = action.payload.status
                }
                return task
            })
        },
        editDescription(state, action) {            
            state.tasks = state.tasks.map(task => {
                if(task.id === action.payload.id) {
                    task.description = action.payload.description
                }
                return task
            })
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchTasks.pending, state => {
            state.isLoading = true
        })
        builder.addCase(fetchTasks.fulfilled, (state, action) => {            
            state.isLoading = false
            state.error = ''
            state.tasks = action.payload
        })
        builder.addCase(fetchTasks.rejected, (state, action) => {
            state.isLoading = false
            state.tasks = []
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
        builder.addCase(addTask.rejected, (state, action) => {
            state.isLoading = false
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
        builder.addCase(deleteTask.rejected, (state, action) => {
            state.isLoading = false
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
    },
})

export const { actions: taskActions, reducer: taskReducer } = taskSlice
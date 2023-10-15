import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Column, Task } from "../../types/DataTypes";
import { taskActions } from "../slices/taskSlice"

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.get<Task[]>(`https://test-server-54ok.onrender.com/tasks?projectId=${id}`)
            return response.data
        } catch (error) {            
            return thunkAPI.rejectWithValue(error)
        }
    } 
) 

export const addTask = createAsyncThunk('tasks/addTask',
    async (task: Task, thunkAPI) => {
        try {
            const response = await axios.post<Task[]>('https://test-server-54ok.onrender.com/tasks', task)
            thunkAPI.dispatch(taskActions.addTask(response.data))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Error')
        }
    } 
)

export const deleteTask = createAsyncThunk('tasks/deleteTask',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.delete<Task[]>(`https://test-server-54ok.onrender.com/tasks/${id}`)
            thunkAPI.dispatch(taskActions.deleteTask(id))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Error')
        }
    } 
) 

export const editStatus = createAsyncThunk('tasks/editTask',
    async ({id, column}: {id: string, column: Column}, thunkAPI) => {
        try {
            const response = await axios.patch<Task[]>(`https://test-server-54ok.onrender.com/tasks/${id}`, {
                column 
            })
            thunkAPI.dispatch(taskActions.editStatus({id, column}))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Error')
        }
    } 
)

export const editDescription = createAsyncThunk('tasks/editDescription',
    async ({id, description}: {id: string, description: string}, thunkAPI) => {
        try {
            const response = await axios.patch<Task[]>(`https://test-server-54ok.onrender.com/tasks/${id}`, {
                description 
            })
            thunkAPI.dispatch(taskActions.editDescription({id, description}))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Error')
        }
    } 
) 
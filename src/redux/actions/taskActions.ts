import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Status, Task } from "../../types/DataTypes";
import { taskActions } from "../slices/taskSlice"
import { URL } from "../../constants";

type Data = {
    id: string,
    status?: Status,
    description?: string
}

export const fetchTasks = createAsyncThunk(
    'tasks/fetchTasks',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.get<Task[]>(`${URL}/tasks?projectId=${id}`)
            return response.data
        } catch (error) {            
            return thunkAPI.rejectWithValue(error)
        }
    } 
) 

export const addTask = createAsyncThunk('tasks/addTask',
    async (task: Task, thunkAPI) => {
        try {
            const response = await axios.post<Task[]>(`${URL}/tasks`, task)
            thunkAPI.dispatch(taskActions.addTask(response.data))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    } 
)

export const deleteTask = createAsyncThunk('tasks/deleteTask',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.delete<Task[]>(`${URL}/tasks/${id}`)
            thunkAPI.dispatch(taskActions.deleteTask(id))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    } 
) 

export const editTask = createAsyncThunk('tasks/editTask',
    async ({id, status, description}: Data, thunkAPI) => {        
        const data: Data = {
            id
        }
        if(description !== undefined) {            
           data.description = description
        }
        if(status) {
           data.status = status
        }
        try {
            const response = await axios.patch<Task[]>(`${URL}/tasks/${id}`, data)
            description !== undefined ?
            thunkAPI.dispatch(taskActions.editDescription({id, description}))
            : thunkAPI.dispatch(taskActions.editStatus({id, status}))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    } 
)
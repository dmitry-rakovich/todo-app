import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Subtask } from "../../types/DataTypes";
import { URL } from "../../constants";
import { subtaskActions } from "../slices/subtaskSlice";


export const fetchSubTasks = createAsyncThunk(
    'subtasks/fetchSubTasks',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.get<Subtask[]>(`${URL}/subtasks?taskId=${id}`)
            return response.data
        } catch (error) {            
            return thunkAPI.rejectWithValue(error)
        }
    } 
) 

export const addSubTask = createAsyncThunk(
    'subtasks/addSubTask',
    async (subtask: Subtask, thunkAPI) => {
        try {
            const response = await axios.post(`${URL}/subtasks`, subtask)
            thunkAPI.dispatch(subtaskActions.addSubTask(response.data))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    } 
)

export const deleteSubTask = createAsyncThunk(
    'subtasks/deleteSubTask',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.delete(`${URL}/subtasks/${id}`)
            thunkAPI.dispatch(subtaskActions.deleteSubTask(id))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    } 
) 

export const toggleSubTask = createAsyncThunk(
    'subtasks/toggleSubTask',
    async ({id, checked}: {id: string, checked: boolean}, thunkAPI) => {
        try {
            const response = await axios.patch(`${URL}/subtasks/${id}`, {
                checked
            })
            thunkAPI.dispatch(subtaskActions.toggleSubTask({checked}))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    } 
)
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { SubTask } from "../../types/DataTypes";
import { subTaskActions } from "../slices/subTaskSlice"
import { URL } from "../../constants";

export const fetchSubTasks = createAsyncThunk(
    'subtasks/fetchSubTasks',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.get<SubTask[]>(`${URL}/subtasks?taskId=${id}`)
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const addSubTask = createAsyncThunk('subtasks/addSubTask',
    async (subtask: SubTask, thunkAPI) => {
        try {
            const response = await axios.post(`${URL}/subtasks`, subtask)
            thunkAPI.dispatch(subTaskActions.addSubTask(response.data))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const toggleSubTask = createAsyncThunk('subtasks/toggleSubTask',
    async ({ id, checked }: { id: string, checked: boolean }, thunkAPI) => {
        try {
            const response = await axios.patch(`${URL}/subtasks/${id}`, {
                checked
            })
            thunkAPI.dispatch(subTaskActions.editStatus({ id, checked }))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)

export const deleteSubTask = createAsyncThunk('subtasks/deleteSubTask',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.delete(`${URL}/subtasks/${id}`)
            thunkAPI.dispatch(subTaskActions.deleteSubTask(id))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    }
)
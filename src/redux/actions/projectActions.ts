import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Project } from "../../types/DataTypes";
import { projectActions } from "../slices/projectSlice"

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<Project[]>('https://test-server-54ok.onrender.com/projects')            
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue(error)
        }
    } 
) 

export const addProject = createAsyncThunk('projects/addProject',
    async (project: Project, thunkAPI) => {
        try {
            const response = await axios.post<Project[]>('https://test-server-54ok.onrender.com/projects', project)
            thunkAPI.dispatch(projectActions.addProject(response.data))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Error')
        }
    } 
)

export const deleteProject = createAsyncThunk('projects/deleteProject',
    async (id: string, thunkAPI) => {
        try {
            const response = await axios.delete<Project[]>(`https://test-server-54ok.onrender.com/projects/${id}`)
            thunkAPI.dispatch(projectActions.deleteProject(id))
            return response.data
        } catch (error) {
            return thunkAPI.rejectWithValue('Error')
        }
    } 
) 
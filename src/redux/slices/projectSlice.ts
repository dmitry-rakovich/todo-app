import { createSlice } from "@reduxjs/toolkit";
import { Project } from '../../types/DataTypes'
import { addProject, deleteProject, fetchProjects } from "../actions/projectActions";

type ProjectState = {
    projects: Project[],
    isLoading: boolean,
    error: string
}

const initialState: ProjectState = {
    projects: [],
    isLoading: false,
    error: ''
}
export const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject(state, action) {
            state.projects.push(action.payload)
        },
        deleteProject(state, action) {
            state.projects = state.projects.filter(project => project.id !== action.payload)
        }
    },
    extraReducers(builder) {
        builder.addCase(fetchProjects.pending, state => {
            state.isLoading = true
        })
        builder.addCase(fetchProjects.fulfilled, (state, action) => {            
            state.isLoading = false
            state.error = ''
            state.projects = action.payload
        })
        builder.addCase(fetchProjects.rejected, (state, action) => {
            state.isLoading = false
            state.projects = []            
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
        builder.addCase(addProject.rejected, (state, action) => {
            state.isLoading = false
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
        builder.addCase(deleteProject.rejected, (state, action) => {
            state.isLoading = false
            if(action?.error.message) {
                state.error = action.error.message
            }
        })
    },
})

export const { actions: projectActions, reducer: projectReducer } = projectSlice
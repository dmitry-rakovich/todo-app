import { InitialState } from "../types"


const addProject = (state: InitialState, action) => {
    const newState = {...state, projects: [...state.projects, action.payload]}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const addTask = (state: InitialState, action) => {
    const newState = {...state, tasks: [...state.tasks, action.payload]}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const deleteTask = (state: InitialState, action) => {
    const newState = {...state, tasks: state.tasks.filter(task => task.id !== action.payload)}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const saveTask = (state: InitialState, action) => {
    return state.tasks.map(task => {
        if(task.id === action.payload.id) {
            task.title = action.payload.title
            return task
        }
        return task
    })
}

const addSubTask = (state: InitialState, action) => {
    const newState = {...state, subtasks: [...state.subtasks, action.payload]}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const deleteSubTask = (state: InitialState, action) => {   
    const newState = {...state, subtasks: state.subtasks.filter(subtask => subtask.id !== action.payload)}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

export {addProject, addTask, deleteTask, saveTask, addSubTask, deleteSubTask}
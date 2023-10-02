import { InitialState } from "../types"

const addProject = (state: InitialState, action) => {
    const newState = {...state, projects: [...state.projects, action.payload]}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const deleteProject = (state: InitialState, action) => {
    const newState = {...state, projects: state.projects.filter(project => project.id !== action.payload)}
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

const addTaskDescription = (state: InitialState, action) => {
    const newState = {...state, tasks: state.tasks.map(task => {
        if(task.id === action.payload.id) {
            task.description = action.payload.description
        }
        return task
    })}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
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

const refreshTasks = (state: InitialState, action) => {
    const {currentList, currentIndex, targetList, targetIndex} = action.payload

    const currentColumn = state.tasks.filter(task => task.column === currentList)
    const targetColumn = state.tasks.filter(task => task.column === targetList)
    const otherColumn = state.tasks.filter(task => task.column !== targetList && task.column !== currentList)
    
    const currentTask = currentColumn[currentIndex]
    currentTask.column = targetList    

    let newState:InitialState
    if(currentList !== targetList) {
        currentColumn.splice(currentIndex, 1)
        targetColumn.splice(targetIndex, 0, currentTask)
        newState = {...state, tasks: [...currentColumn, ...targetColumn, ...otherColumn]}
    } else {
        currentColumn.splice(currentIndex, 1)
        currentColumn.splice(targetIndex, 0, currentTask)
        newState = {...state, tasks: [...currentColumn, ...otherColumn]}
    }
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

export {addProject, deleteProject, addTask, deleteTask, saveTask, addSubTask, deleteSubTask, addTaskDescription, refreshTasks}
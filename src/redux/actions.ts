import { InitialState } from "../types"

const addProject = (state: InitialState, action) => {
    const newState = {...state, projects: [...state.projects, action.payload]}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const deleteProject = (state: InitialState, action) => {
    const newState = {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        tasks: state.tasks.filter(task => task.projectId !== action.payload),
        subtasks: state.subtasks.filter(subtask => subtask.projectId !== action.payload)
    }
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

const saveTaskTitle = (state: InitialState, action) => {
    const task = state.tasks.find(task => task.id === action.payload.id)!
    task.title = action.payload.title
    localStorage.setItem('todo-app', JSON.stringify(state))
    return state
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

const checkSubTask = (state: InitialState, action) => {   
    const subtask = state.subtasks.find(subtask => subtask.id === action.payload.id)
    subtask.checked = action.payload.checked
    localStorage.setItem('todo-app', JSON.stringify(state))
    return state
}

const addFile = (state: InitialState, action) => {
    const task = state.tasks.find(task => task.id === action.payload.taskId)
    task?.files.push({
        id: action.payload.id,
        taskId: action.payload.taskId,
        path: action.payload.path,
        name: action.payload.name
    })
    localStorage.setItem('todo-app', JSON.stringify(state))
    return state
}
const refreshTasks = (state: InitialState, action) => {
    const {currentList, currentIndex, targetList, targetIndex} = action.payload

    const currentColumn = state.tasks.filter(task => task.column === currentList)
    const targetColumn = state.tasks.filter(task => task.column === targetList)
    const otherColumn = state.tasks.filter(task => task.column !== targetList && task.column !== currentList)
    
    const currentTask = currentColumn[currentIndex]
    if(currentTask.column === 'Done') {
        currentTask.time.finish = ''
    }
    currentTask.column = targetList
    if(currentTask.column === 'Done') {
        currentTask.time.finish = new Date().toDateString()
    }

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

export {
    addProject,
    deleteProject,
    addTask,
    deleteTask,
    saveTaskTitle,
    addSubTask,
    deleteSubTask,
    checkSubTask,
    addTaskDescription,
    refreshTasks,
    addFile
}
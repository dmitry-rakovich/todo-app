import { Column, InitialState, Project, SubTask, Task } from "../types"
const addProject = (state: InitialState, action: {payload: Project}) => {
    const newState = {...state, projects: [...state.projects, action.payload]}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const deleteProject = (state: InitialState, action: {payload: string}) => {
    const newState = {
        ...state,
        projects: state.projects.filter(project => project.id !== action.payload),
        tasks: state.tasks.filter(task => task.projectId !== action.payload),
    }
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const addTask = (state: InitialState, action: {payload: Task}) => {
    const newState = {...state, tasks: [...state.tasks, action.payload]}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const deleteTask = (state: InitialState, action: {payload: string}) => {
    const newState = {...state, tasks: state.tasks.filter(task => task.id !== action.payload)}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const saveTaskTitle = (state: InitialState, action: {payload: {id: string,title: string}}) => {
    const newState = {...state, tasks: state.tasks.map(task => {
        if(task.id === action.payload.id) {
            task.title = action.payload.title
        }
        return task
    })}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const addTaskDescription = (state: InitialState, action: {payload: {id: string, description: string}}) => {
    const newState = {...state, tasks: state.tasks.map(task => {
        if(task.id === action.payload.id) {
            task.description = action.payload.description
        }
        return task
    })}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const addSubTask = (state: InitialState, action: {payload: {taskId: string, subtask: SubTask}}) => {
    const newState = {...state, tasks: state.tasks.map(task => {
        if(task.id === action.payload.taskId) {
            task.subtasks = [...task.subtasks, action.payload.subtask]
        }
        return task
    })}
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const deleteSubTask = (state: InitialState, action: {payload: {taskId: string, subtaskId: string}}) => {
    const task = state.tasks.find(task => task.id === action.payload.taskId)!
    const index = task.subtasks.findIndex(subtask => subtask.id === action.payload.subtaskId)
    
    const newState = {...state, tasks: state.tasks.map(task => {        
        task.subtasks.splice(index, 1)
        return task
    })}    
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const checkSubTask = (state: InitialState, action: {payload: {taskId: string, subtaskId: string, checked: boolean}}) => {
    const newState = {...state, tasks: state.tasks.map(task => {        
        if(task.id === action.payload.taskId) {
            task.subtasks.map(subtask => {
                if(subtask.id === action.payload.subtaskId){
                    subtask.checked = action.payload.checked
                }
                return subtask
            })
        }
        return task
    })} 
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}

const addFile = (state: InitialState, action: {payload: {id: string, taskId: string, name: string, path: string,}}) => {
    const newState = {...state, tasks: state.tasks.map(task => {        
        if(task.id === action.payload.taskId) {
            task.files = [...task.files, {id: action.payload.id, name: action.payload.name, path: action.payload.path, taskId: action.payload.taskId}]
        }
        return task
    })} 
    localStorage.setItem('todo-app', JSON.stringify(newState))
    return newState
}
const refreshTasks = (state: InitialState, action:{ payload: {
    currentList: Column,
    currentIndex: number,
    targetList: Column,
    targetIndex: number,
  }}) => {
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
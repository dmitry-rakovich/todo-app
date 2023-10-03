import { InitialState } from "../types"
import {
    addProject,
    deleteProject,
    addTask,
    deleteTask,
    addTaskDescription,
    saveTaskTitle,
    addSubTask,
    deleteSubTask,
    checkSubTask,
    refreshTasks,
    addFile
} from "./actions"

const initialState: InitialState = JSON.parse(localStorage.getItem('todo-app')!) || {projects:[], tasks:[], subtasks: [], comments:[]}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PROJECT': return addProject(state, action)

        case 'DELETE_PROJECT': return deleteProject(state, action)

        case 'ADD_TASK': return addTask(state, action)

        case 'DELETE_TASK': return deleteTask(state, action)

        case 'SAVE_TASK_TITLE': return saveTaskTitle(state, action)

        case 'ADD_TASK_DESCRIPTION': return addTaskDescription(state, action)

        case 'ADD_SUBTASK': return addSubTask(state, action)

        case 'DELETE_SUBTASK': return deleteSubTask(state, action)

        case 'CHECK_SUBTASK': return checkSubTask(state, action)

        case 'REFRESH_TASKS': return refreshTasks(state, action)

        case 'ADD_FILE': return addFile(state, action)
        
        default: {
            return state
        }
    }
    
}

export default reducer
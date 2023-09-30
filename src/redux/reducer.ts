import { InitialState } from "../types"
import { addProject, addTask, deleteTask, saveTask, addSubTask, deleteSubTask } from "./actions"

const initialState: InitialState = JSON.parse(localStorage.getItem('todo-app')!) || {projects:[], tasks:[], subtasks: [], comments:[]}


const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_PROJECT': return addProject(state, action)

        case 'ADD_TASK': return addTask(state, action)

        case 'DELETE_TASK': return deleteTask(state, action)

        case 'SAVE_TASK': return saveTask(state, action)

        case 'ADD_SUBTASK': return addSubTask(state, action)

        case 'DELETE_SUBTASK': return deleteSubTask(state, action)
        
        default: {
            return state
        }
    }
    
}

export default reducer
import { State } from "../types/DataTypes"
import { Actions, ActionTypes } from "../types/ActionsTypes"

const initialState: State = JSON.parse(localStorage.getItem('todo-app')!) || { projects: [], tasks: [] }

const reducer = (state = initialState, action: Actions): State => {
    switch (action.type) {
        case ActionTypes.ADD_PROJECT: {
            const newState = { ...state, projects: [...state.projects, action.payload] }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        case ActionTypes.DELETE_PROJECT: {
            const newState = {
                ...state,
                projects: state.projects.filter(project => project.id !== action.payload),
                tasks: state.tasks.filter(task => task.projectId !== action.payload),
            }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        case ActionTypes.ADD_TASK: {
            const newState = { ...state, tasks: [...state.tasks, action.payload] }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        case ActionTypes.DELETE_TASK: {
            const newState = { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        case ActionTypes.SAVE_TASK_TITLE: {
            const newState = {
                ...state, tasks: state.tasks.map(task => {
                    if (task.id === action.payload.id) {
                        task.title = action.payload.title
                    }
                    return task
                })
            }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        case ActionTypes.ADD_TASK_DESCRIPTION: {
            const newState = {
                ...state, tasks: state.tasks.map(task => {
                    if (task.id === action.payload.id) {
                        task.description = action.payload.description
                    }
                    return task
                })
            }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        case ActionTypes.ADD_SUBTASK: {
            const newState = {
                ...state, tasks: state.tasks.map(task => {
                    if (task.id === action.payload.taskId) {
                        task.subtasks = [...task.subtasks, action.payload.subtask]
                    }
                    return task
                })
            }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        case ActionTypes.DELETE_SUBTASK: {
            const task = state.tasks.find(task => task.id === action.payload.taskId)!
            const index = task.subtasks.findIndex(subtask => subtask.id === action.payload.subtaskId)
            const newState = {
                ...state, tasks: state.tasks.map(task => {
                    task.subtasks.splice(index, 1)
                    return task
                })
            }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        case ActionTypes.CHECK_SUBTASK: {
            const newState = {
                ...state, tasks: state.tasks.map(task => {
                    if (task.id === action.payload.taskId) {
                        task.subtasks.map(subtask => {
                            if (subtask.id === action.payload.subtaskId) {
                                subtask.checked = action.payload.checked
                            }
                            return subtask
                        })
                    }
                    return task
                })
            }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        case ActionTypes.ADD_FILE: {
            const newState = {
                ...state, tasks: state.tasks.map(task => {
                    if (task.id === action.payload.taskId) {
                        task.files = [...task.files, { id: action.payload.id, name: action.payload.name, path: action.payload.path, taskId: action.payload.taskId }]
                    }
                    return task
                })
            }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        case ActionTypes.REFRESH_TASKS: {
            const { currentList, currentIndex, targetList, targetIndex } = action.payload

            const currentColumn = state.tasks.filter(task => task.column === currentList)
            const targetColumn = state.tasks.filter(task => task.column === targetList)
            const otherColumn = state.tasks.filter(task => task.column !== targetList && task.column !== currentList)

            const currentTask = currentColumn[currentIndex]
            if (currentTask.column === 'Done') {
                currentTask.time.finish = ''
            }
            currentTask.column = targetList
            if (currentTask.column === 'Done') {
                currentTask.time.finish = new Date().toDateString()
            }

            let newState: State
            if (currentList !== targetList) {
                currentColumn.splice(currentIndex, 1)
                targetColumn.splice(targetIndex, 0, currentTask)
                newState = { ...state, tasks: [...currentColumn, ...targetColumn, ...otherColumn] }
            } else {
                currentColumn.splice(currentIndex, 1)
                currentColumn.splice(targetIndex, 0, currentTask)
                newState = { ...state, tasks: [...currentColumn, ...otherColumn] }
            }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        case ActionTypes.ADD_COMMENT: {

            const newState = {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.id === action.payload.taskId) {
                        if (action.payload.comment.parentId) {
                            task.comments = [...task.comments.map(comment => {
                                if (comment.id === action.payload.comment.parentId) {
                                    comment.children = [...comment.children, action.payload.comment]
                                    return comment
                                }
                                return comment
                            }), action.payload.comment]
                        } else {
                            task.comments = [...task.comments, action.payload.comment]
                        }
                    }
                    return task
                })
            }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        case ActionTypes.DELETE_COMMENT: {            
            const newState = {
                ...state,
                tasks: state.tasks.map(task => {
                    if(task.id === action.payload.taskId) {
                        task.comments = task.comments
                            .filter(comment => comment.id !== action.payload.commentId)
                            .map(comment => {
                                if(comment.children.length) {
                                    comment.children = comment.children.filter(childComment => childComment.id !== action.payload.commentId)
                                }
                            return comment
                        })
                    }
                    return task
                })
            }
            localStorage.setItem('todo-app', JSON.stringify(newState))
            return newState
        }

        default: {
            return state
        }
    }

}

export default reducer
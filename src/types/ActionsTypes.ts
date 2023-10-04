import { Column, Project, SubTask, Task } from "./DataTypes"

export enum ActionTypes {
    ADD_PROJECT = 'ADD_PROJECT',
    DELETE_PROJECT = 'DELETE_PROJECT',
    ADD_TASK = 'ADD_TASK',
    DELETE_TASK = 'DELETE_TASK',
    SAVE_TASK_TITLE = 'SAVE_TASK_TITLE',
    ADD_TASK_DESCRIPTION = 'ADD_TASK_DESCRIPTION',
    ADD_SUBTASK = 'ADD_SUBTASK',
    DELETE_SUBTASK = 'DELETE_SUBTASK',
    CHECK_SUBTASK = 'CHECK_SUBTASK',
    REFRESH_TASKS = 'REFRESH_TASKS',
    ADD_FILE = 'ADD_FILE'
}

type addProjectAction = {
    type: ActionTypes.ADD_PROJECT,
    payload: Project
}   

type deleteProjectAction = {
    type: ActionTypes.DELETE_PROJECT,
    payload: string
}
type addTaskAction = {
    type: ActionTypes.ADD_TASK,
    payload: Task
}
type deleteTaskAction = {
    type: ActionTypes.DELETE_TASK,
    payload: string
}
type saveTaskTitleAction = {
    type: ActionTypes.SAVE_TASK_TITLE,
    payload: {
        id: string,
        title: string
    }
}
type addTaskDescriptionAction = {
    type: ActionTypes.ADD_TASK_DESCRIPTION,
    payload: {
        id: string,
        description: string
    }
}
type addSubtaskAction = {
    type: ActionTypes.ADD_SUBTASK,
    payload: {
        taskId: string,
        subtask: SubTask
    }
}
type deleteSubtaskAction = {
    type: ActionTypes.DELETE_SUBTASK,
    payload: {
        taskId: string,
        subtaskId: string
    }
}
type checkSubtaskAction = {
    type: ActionTypes.CHECK_SUBTASK,
    payload: {
        taskId: string,
        subtaskId: string,
        checked: boolean
    }
}
type addFileAction = {
    type: ActionTypes.ADD_FILE,
    payload: {
        id: string,
        taskId: string,
        name: string,
        path: string
    }
}
type refreshTasksAction = {
    type: ActionTypes.REFRESH_TASKS,
    payload: {
        currentList: Column,
        currentIndex: number,
        targetList: Column,
        targetIndex: number,
      }
}

export type Actions = addProjectAction
| deleteProjectAction
| addTaskAction
| deleteTaskAction
| saveTaskTitleAction
| addTaskDescriptionAction
| addSubtaskAction
| deleteSubtaskAction
| checkSubtaskAction
| refreshTasksAction
| addFileAction
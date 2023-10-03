export type InitialState = {
    projects: Project[],
    tasks: Task[],
    subtasks: SubTask[],
    comments: []
}

export type Project = {
    id: string,
    title: string
}

export type Task = {
    id: string,
    projectId: string,
    title: string,
    description: string,
    column: 'Queue' | 'Development' | 'Done',
    subtasks: SubTask[],
    files: File[],
    time: Time,
    priopity: 'Low' | 'Medium' | 'High' 
}

export type Time = {
    create: string,
    finish: string
}

export type SubTask = {
    id: string,
    taskId: string,
    projectId: string,
    title: string,
    checked: boolean
}

export type File = {
    id: string,
    taskId: string,
    name: string,
    path: string
}
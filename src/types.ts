export type InitialState = {
    projects: Project[],
    tasks: Task[]
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
    column: Column,
    subtasks: SubTask[],
    files: File[],
    time: Time,
    comments: Comment[]
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

export type Comment = {
    id: string,
    text: string,
    comments?: Comment[]
}

export type Column = 'Queue' | 'Development' | 'Done'
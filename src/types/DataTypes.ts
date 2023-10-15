export type State = {
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
    time: Time,
}

export type Time = {
    create: string,
    finish: string
}

export type SubTask = {
    id: string,
    taskId: string,
    title: string,
    checked: boolean
}

export type Comment = {
    id: string,
    taskId: string,
    text: string,
    date: string
}

export type Column = 'Queue' | 'Development' | 'Done'
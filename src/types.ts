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
    column: 'Queue' | 'Development' | 'Done',
    subtasks: SubTask[]
}

export type SubTask = {
    id: string,
    taskId: string,
    title: string
}
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Task } from '../../types'
import TaskItem from '../TaskItem/TaskItem'

type Props = {
    projectId: string,
    title: string,
    tasks: Task[]
}

const Column = ({ projectId, title, tasks }: Props) => {

    const dispatch = useDispatch()

    const [value, setValue] = useState('')
    const addNewTask = () => {

        const newTask:Task = {
            column: title,
            id: window.crypto.randomUUID(),
            projectId,
            subtasks: [],
            files: [],
            title: value,
            time: {
                create: new Date().toDateString(),
                length: '',
                finish: ''
            }
        }
        dispatch({
            type: "ADD_TASK",
            payload: newTask
        })
        setValue('')
    }

    
    return (
        <div className={`column ${title.toLowerCase()}`}>
            <h2>{title}</h2>
            {
                !!tasks.length &&
                <>
                    {
                        tasks.map((task, index) => <TaskItem key={task.id} index={index} task={task}/>
                        )
                    }
                </>
            }
            <input autoFocus value={value} onChange={(e) => setValue(e.target.value)} placeholder='Add new task' />
            <button disabled={!value.trim()} onClick={addNewTask}>Add</button>
        </div>
    )
}

export default Column
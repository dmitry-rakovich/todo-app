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

        const newTask = {
            column: title,
            id: window.crypto.randomUUID(),
            projectId,
            subtasks: [],
            title: value
        }
        dispatch({
            type: "ADD_TASK",
            payload: newTask
        })
        setValue('')
    }

    
    return (
        <div className={`column ${title.toLowerCase()}`}>
            <h1>{title}</h1>
            {
                !!tasks.length &&
                <>
                    {
                        tasks.map(task => <TaskItem key={task.id} {...task}/>
                        )
                    }
                </>
            }
            <input autoFocus value={value} onChange={(e) => setValue(e.target.value)} placeholder='Add new task' />
            <button onClick={addNewTask}>Add</button>
        </div>
    )
}

export default Column
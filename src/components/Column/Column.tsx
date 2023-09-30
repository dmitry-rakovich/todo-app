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
    const [isOpenForm, setIsOpenForm] = useState(false)
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
        setIsOpenForm(false)
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
            {
                isOpenForm &&
                <div>
                    <input value={value} onChange={(e) => setValue(e.target.value)} />
                    <button
                        onClick={addNewTask}
                    >
                        Add
                    </button>
                    <button
                        onClick={() => setIsOpenForm(false)}
                    >
                        Close
                    </button>
                </div>
            }
            {
                !isOpenForm &&
                <button
                    onClick={() => setIsOpenForm(true)}
                    className="add-task"
                >
                    Add new task
                </button>
            }
        </div>
    )
}

export default Column
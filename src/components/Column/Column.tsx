import { useState } from 'react'
import { Status as TypeStatus, Task, Status } from '../../types/DataTypes'
import TaskItem from '../TaskItem/TaskItem'
import { useAppDispatch } from '../../hooks/hooks'
import { addTask } from '../../redux/actions/taskActions'
import styles from "./Column.module.css"
type Props = {
    projectId: string,
    title: TypeStatus,
    tasks: Task[]
}

const Column = ({ projectId, title, tasks }: Props) => {

    const dispatch = useAppDispatch()

    const [value, setValue] = useState('')
    const addNewTask = () => {
        dispatch(addTask({
            status: title,
            id: window.crypto.randomUUID(),
            projectId,
            title: value,
            time: {
                create: new Date().toDateString(),
                finish: title === Status.DONE ? new Date().toDateString() : ''
            },
            description: '',
        }))
        setValue('')
    }


    return (
        <div className={styles.column} style={{
            borderColor:
            title === Status.QUEUE ? "#d3d3d3"
            : title === Status.DEVELOPMENT ? "#f9d900"
            : "#6bc950"
        }
        } onKeyUp={(e) => {
            if(e.key === 'Enter' && value.trim()) addNewTask()
        }}>
            <h2>{title}</h2>
            {
                !!tasks.length
                && tasks.map((task) => <TaskItem key={task.id} task={task} />)
            }
            <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='Add new task' />
            <button disabled={!value.trim()} onClick={addNewTask}>Add</button>
        </div>
    )
}

export default Column
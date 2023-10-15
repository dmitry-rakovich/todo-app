import { useState } from 'react'
import { Column as TypeColumn, Task } from '../../types/DataTypes'
import TaskItem from '../TaskItem/TaskItem'
import { useAppDispatch } from '../../hooks/hooks'
import { addTask } from '../../redux/actions/taskActions'

type Props = {
    projectId: string,
    title: TypeColumn,
    tasks: Task[]
}

const Column = ({ projectId, title, tasks, }: Props) => {

    const dispatch = useAppDispatch()

    const [value, setValue] = useState('')
    const addNewTask = () => {
        dispatch(addTask({
            column: title,
            id: window.crypto.randomUUID(),
            projectId,
            title: value,
            time: {
                create: new Date().toDateString(),
                finish: title === 'Done' ? new Date().toDateString() : ''
            },
            description: '',
        }))
        setValue('')
    }


    return (
        <div className={`column ${title.toLowerCase()}`} onKeyUp={(e) => {
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
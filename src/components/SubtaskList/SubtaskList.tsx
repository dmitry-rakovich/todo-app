import { Subtask } from "../../types/DataTypes"
import SubtaskItem from "../SubtaskItem/SubtaskItem"
import styles from "./Subtasklist.module.css"
import { useAppDispatch } from "../../hooks/hooks"
import { addSubTask } from "../../redux/actions/subtaskActions"
import { useRef, useState } from "react"
type Props = {
    subtasks : Subtask[],
    taskId: string
}
const SubtaskList = ({  subtasks, taskId}: Props) => {
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)
    const [subTaskTitle, setSubTaskTitle] = useState('')
    const addNewSubTask = () => {
        dispatch(addSubTask({
            id: window.crypto.randomUUID(),
            checked: false,
            taskId,
            title: subTaskTitle
        }))
        setSubTaskTitle('')
        inputRef.current?.focus()
    }

    return (
        <div className={styles.list}>

            <h3>Subtasks</h3>
            {
                subtasks.map(subtask => <SubtaskItem key={subtask.id} subtask={subtask} />)
            }
            <div className={styles.form} onKeyUp={(e) => {
                if (e.key === 'Enter' && subTaskTitle.trim()) addNewSubTask()
            }}>
                <input ref={inputRef} type="text" value={subTaskTitle} onChange={(e) => setSubTaskTitle(e.target.value)} placeholder="Add subtask" />
                <button disabled={!subTaskTitle.trim()} onClick={addNewSubTask}>Add</button>
            </div>
        </div>
    )
}

export default SubtaskList
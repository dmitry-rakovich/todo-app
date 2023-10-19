import { useRef, useState } from "react"
import { useAppDispatch } from "../../hooks/hooks"
import { Subtask } from "../../types/DataTypes"
import { addSubTask } from "../../redux/actions/subtaskActions"
import SubtaskItem from "../SubtaskItem/SubtaskItem"
import styles from "./SubtaskList.module.css"

type Props = {
    subtasks: Subtask[],
    taskId: string
}
const SubtaskList = ({subtasks, taskId}: Props) => {
    const dispatch = useAppDispatch()
    const inputRef = useRef<HTMLInputElement>(null)
    const [title, setTitle] = useState('')
    const addNewItem = () => {
        dispatch(addSubTask({
            id: window.crypto.randomUUID(),
            checked: false,
            title,
            taskId
        }))
        setTitle('')
        inputRef.current?.focus()
    }
  return (
    <div className={styles.list}>
        <h3>Subtasks</h3>
        {
            subtasks.map(subtask => <SubtaskItem key={subtask.id} subtask={subtask}/>)
        }
        <div
            className={styles.form}
            onKeyUp={(e) => {
                if(e.key === 'Enter' && title.trim()) addNewItem()
            }}
        >
            <input ref={inputRef} type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Add new subtask" />
            <button onClick={addNewItem} disabled={!title.trim()} title="Add subtask">Add</button>
        </div>

    </div>
  )
}

export default SubtaskList
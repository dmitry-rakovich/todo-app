import { useState } from "react"
import { useAppDispatch } from "../../hooks/hooks"
import { deleteSubTask, toggleSubTask } from "../../redux/actions/subtaskActions"
import { Subtask } from "../../types/DataTypes"
import styles from "./SubtaskItem.module.css"

type Props = {
    subtask: Subtask
}
const SubtaskItem = ({subtask: {id, checked, title}}: Props) => {
    const dispatch = useAppDispatch()
    const [isChecked, setIsChecked] = useState(checked)
    const handleChange = () => {
        setIsChecked(!isChecked)
        dispatch(toggleSubTask({
            id,
            checked: !isChecked,
            
        }))
    }
    const handleRemove = () => {
        dispatch(deleteSubTask(id))
    }
  return (
    <div className={styles.subtask}>
        <input type="checkbox"
            checked={isChecked}
            onChange={handleChange}
        />
        <span className={styles.title} style={{textDecoration: isChecked ? "line-through" : ""}}>{title}</span>
        <button
            className="delete"
            onClick={handleRemove}
            title="Delete subtask"
        >
            🗑
        </button>
    </div>
  )
}

export default SubtaskItem
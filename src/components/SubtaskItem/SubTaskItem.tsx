import { SubTask } from "../../types/DataTypes"
import { useState } from "react"
import { useAppDispatch } from "../../hooks/hooks"
import styles from "./SubTaskItem.module.css"
import { deleteSubTask, toggleSubTask } from "../../redux/actions/subtaskActions"

type Props = {
  subtask: SubTask
}
const SubTaskItem = ({ subtask: {id, checked, title} }: Props) => {
  const dispatch = useAppDispatch()
  const [isChecked, setIsChecked] = useState(checked)
  const removeSubTask = (id: string) => {
    dispatch(deleteSubTask(id))
  }

  const handleCheckSubTask = () => {
    setIsChecked(!isChecked)
    dispatch(toggleSubTask({
      id,
      checked: !isChecked
    }))
  }

  return (
    <div key={id} className={styles.subtask}>
      <input type="checkbox" checked={isChecked} onChange={handleCheckSubTask} className="subtask-checkbox" />
      <span className={styles.title} style={{textDecoration: checked ? "line-through" : ""}}>{title}</span>
      <button className="delete" onClick={() => removeSubTask(id)} title="Delete subtask">🗑</button>
    </div>
  )
}

export default SubTaskItem
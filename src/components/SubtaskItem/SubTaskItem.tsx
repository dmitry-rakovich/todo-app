import { SubTask } from "../../types/DataTypes"
import { useState } from "react"
import { useAppDispatch } from "../../hooks/hooks"
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
    <div key={id} className="subtask">
      <input type="checkbox" checked={isChecked} onChange={handleCheckSubTask} className="subtask-checkbox" />
      <span className="subtask-title">{title}</span>
      <button onClick={() => removeSubTask(id)}>Delete</button>
    </div>
  )
}

export default SubTaskItem
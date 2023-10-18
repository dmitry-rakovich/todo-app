import { useState } from "react"
import { useAppDispatch } from "../../hooks/hooks"
import { deleteSubTask, toggleSubTask } from "../../redux/actions/subtaskActions"
import { Subtask } from "../../types/DataTypes"

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
    <div>
        <input type="checkbox"
            checked={checked}
            onChange={handleChange}
        />
        <span style={{textDecoration: checked ? "line-through" : ""}}>{title}</span>
        <button
            onClick={handleRemove}
            title="Delete subtask"
        >
            🗑
        </button>
    </div>
  )
}

export default SubtaskItem
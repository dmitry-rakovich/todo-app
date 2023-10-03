import { useDispatch } from "react-redux"
import { SubTask } from "../../types"
import { useState } from "react"

type Props = {
  taskId: string,
  subtask: SubTask
}
const SubTaskItem = ({ subtask: {id, checked, title}, taskId }: Props) => {
  const dispatch = useDispatch()
  const [isChecked, setIsChecked] = useState(checked)
  const deleteSubTask = (subTaskId: string) => {
    dispatch({
      type: "DELETE_SUBTASK",
      payload: {
        taskId,
        subTaskId
      }
    })
  }

  const handleCheckSubTask = () => {
    setIsChecked(!isChecked)
    dispatch({
      type: "CHECK_SUBTASK",
      payload: {
        taskId,
        subtaskId: id,
        checked: !isChecked
      }
    })
  }

  return (
    <div key={id} className="subtask">
      <input type="checkbox" checked={isChecked} onChange={handleCheckSubTask} className="subtask-checkbox" />
      <span className="subtask-title">{title}</span>
      <button onClick={() => deleteSubTask(id)}>Delete</button>
    </div>
  )
}

export default SubTaskItem
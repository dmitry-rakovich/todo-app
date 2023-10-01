import { useDispatch } from "react-redux"
import { SubTask } from "../../types"

const SubTaskItem = ({id, title}: SubTask) => {
    const dispatch = useDispatch()
    const deleteSubTask = (subTaskId: string) => {
    dispatch({
            type: "DELETE_SUBTASK",
            payload: subTaskId
        })
    }
    
  return (
    <div key={id} className="subtask">
        <input type="checkbox" className="subtask-checkbox" />
        <span className="subtask-title">{title}</span>
        <button onClick={() => deleteSubTask(id)}>Delete</button>
    </div>
  )
}

export default SubTaskItem
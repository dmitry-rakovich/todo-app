import { useDispatch, useSelector } from "react-redux"
import { InitialState, SubTask, Task } from "../../types"
import { useState } from "react"

const TaskItem = ({title, id}: Task) => {

  const dispatch = useDispatch()

  const subTasks = useSelector<InitialState, SubTask[]>((state) => state.subtasks)  
  
  const [isShowTask, setIsShowTask] = useState(false)

  const [isAddSubTask, setIsAddSubTask] = useState(false)
  const [subTaskTitle, setSubTaskTitle] = useState('')

  const deleteTask = (id: string) => {
    dispatch({
        type: "DELETE_TASK",
        payload: id
    })
}

const toggleTask = () => {
    setIsShowTask(!isShowTask)
}
const addSubTask = () => {
  dispatch({
    type: "ADD_SUBTASK",
    payload: {
      id: window.crypto.randomUUID(),
      taskId: id,
      title: subTaskTitle
    }
  })
  setIsAddSubTask(false)
  setSubTaskTitle('')
}

const deleteSubTask = (subTaskId: string) => {
  
  dispatch({
    type: "DELETE_SUBTASK",
    payload: subTaskId
  })
}
  return (
    <>
      {
        isShowTask &&
        <div className="modal-task">
          <div className="modal-task-wrapper">
            <button onClick={toggleTask}>x</button>
            <div className="subtasks-wrapper">
              {
                subTasks.map(subtask => 
                  <div key={subtask.id} className="subtask">
                    <input type="checkbox" className="subtask-checkbox"/>
                    <span>{subtask.title}</span>
                    <button onClick={() => deleteSubTask(subtask.id)}>x</button>
                  </div>
                )
              }
              {
                isAddSubTask && 
                <form onClick={(e) => e.preventDefault()}>
                  <input type="text" value={subTaskTitle} onChange={(e) => setSubTaskTitle(e.target.value)}/>
                  <button onClick={addSubTask}>add</button>
                </form>
              }
              {
                !isAddSubTask && 
                <button onClick={() => setIsAddSubTask(true)}>add subtask</button>
              }
            </div>
          </div>
        </div>
      }
      <div className='task' onClick={toggleTask}>
          <h2 className='task-title'>{title}</h2>
          <button onClick={() => deleteTask(id)}>x</button>
      </div>
    </>
  )
}

export default TaskItem
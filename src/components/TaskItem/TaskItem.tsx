import { useDispatch } from "react-redux"
import { useState } from "react"
import { Task } from "../../types"
import ModalTask from "../ModalTask/ModalTask"

const TaskItem = (task: Task) => {

  const dispatch = useDispatch()
  
  const [isShowTask, setIsShowTask] = useState(false)
  const deleteTask = (id: string) => {
    dispatch({
      type: "DELETE_TASK",
      payload: id
    })
  }

  const toggleTask = () => {
    setIsShowTask(!isShowTask)
  }
  
  return (
    <>
      {isShowTask && <ModalTask task={task} toggleTask={toggleTask} />}
      <div className='task' onClick={toggleTask}>
        <h2 className='task-title'>{task.title}</h2>
        <button onClick={() => deleteTask(task.id)}>x</button>
      </div>
    </>
  )
}

export default TaskItem
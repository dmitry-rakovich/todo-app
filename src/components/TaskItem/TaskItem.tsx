import { useState } from "react"
import { Task } from "../../types/DataTypes"
import ModalTask from "../ModalTask/ModalTask"
import { useAppDispatch } from "../../hooks/hooks"
import { deleteTask } from "../../redux/actions/taskActions"
import styles from "./TaskItem.module.css" 

type Props = {
  task: Task
}
const TaskItem = ({ task }: Props) => {

  const dispatch = useAppDispatch()

  const [isShowTask, setIsShowTask] = useState(false)
  const removeTask = (id: string) => {
    dispatch(deleteTask(id))
  }

  const toggleTask = () => {
    setIsShowTask(!isShowTask)
  }

  return (
    <>
      {isShowTask && <ModalTask task={task} toggleTask={toggleTask} />}
      <div className={styles.item} >
        <h2 onClick={toggleTask} title="Click to open task">{task.title}</h2>
        <button onClick={() => removeTask(task.id)}>Delete</button>
      </div>
    </>
  )
}

export default TaskItem
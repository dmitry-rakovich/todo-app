import { useState } from "react"
import { Task } from "../../types/DataTypes"
import ModalTask from "../ModalTask/ModalTask"
import styles from "./TaskItem.module.css" 

type Props = {
  task: Task
}
const TaskItem = ({ task }: Props) => {

  const [isShowTask, setIsShowTask] = useState(false)

  const toggleTask = () => {
    setIsShowTask(!isShowTask)
  }

  return (
    <>
      {isShowTask && <ModalTask task={task} toggleTask={toggleTask} />}
      <div className={styles.item} >
        <h2 onClick={toggleTask} title="Click to open task">{task.title}</h2>
        <span className={styles.edit}>✏</span>
      </div>
    </>
  )
}

export default TaskItem
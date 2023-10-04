import { useDispatch } from "react-redux"
import { useState } from "react"
import { Task } from "../../types/DataTypes"
import ModalTask from "../ModalTask/ModalTask"
import { Draggable } from "react-beautiful-dnd"
type Props = {
  task: Task,
  index: number
}
const TaskItem = ({task, index}: Props) => {

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
      <Draggable draggableId={task.id} index={index} key={task.id}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div className='task-item' onClick={toggleTask} title="Click to open task">
              <h2>{task.title}</h2>
              <button onClick={() => deleteTask(task.id)}>Delete</button>
            </div>
          </div>
        )}
      </Draggable>
    </>
  )
}

export default TaskItem
import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { InitialState, SubTask, Task } from "../../types"
import SubTaskItem from "../SubtaskItem/SubTaskItem"
type Props = {
    task: Task,
    toggleTask: React.MouseEventHandler<HTMLButtonElement>
}
const ModalTask = ({task: {description, id}, toggleTask}: Props) => {

    console.log();
    
    const dispatch = useDispatch()
    const inputRef = useRef<HTMLInputElement>(null)

    const subTasks = useSelector<InitialState, SubTask[]>((state) => state.subtasks)


    const [subTaskTitle, setSubTaskTitle] = useState('')
    const [subtaskDescription, setSubTaskDescription] = useState(description)


    const addSubTask = () => {
        dispatch({
            type: "ADD_SUBTASK",
            payload: {
                id: window.crypto.randomUUID(),
                taskId: id,
                title: subTaskTitle
            }
        })
        setSubTaskTitle('')
        inputRef.current?.focus()
    }

    const addDescription = () => {
        dispatch({
            type: "ADD_SUBTASK_DESCRIPTION",
            payload: {
                id,
                description: subtaskDescription
            }
        })
    }

    return (
        <div className="modal-task">
            <div className="modal-task-wrapper">
                <button className="close-modal-task" onClick={toggleTask}>x</button>
                <div className="subtasks-wrapper">
                    <h3>Description</h3>
                    {
                        description
                            ? <p>{subtaskDescription}</p>
                            : <div className="subtask-description-form">
                                <input
                                    type="text"
                                    value={subtaskDescription}
                                    onChange={(e) =>
                                        setSubTaskDescription(e.target.value)}
                                    autoFocus
                                    placeholder="Add description"
                                />
                                <button onClick={addDescription}>Add description</button>
                            </div>
                    }

                    <h3>Subtasks</h3>
                    {
                        subTasks.map(subtask => <SubTaskItem key={subtask.id} {...subtask} />)
                    }
                    <div className="subtask-form">
                        <input ref={inputRef} type="text" value={subTaskTitle} onChange={(e) => setSubTaskTitle(e.target.value)} placeholder="add subtask" />
                        <button onClick={addSubTask}>add</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalTask
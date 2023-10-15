import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Column, Task } from "../../types/DataTypes"
import { getDateDiff } from "../../utils"
import { editStatus, editDescription } from "../../redux/actions/taskActions"
import { useAppDispatch } from "../../hooks/hooks"
// import SubTaskItem from "../SubtaskItem/SubTaskItem"
// import Comments from "../Comments/Comments"

type Props = {
    task: Task,
    toggleTask: React.MouseEventHandler<HTMLButtonElement>
}
const ModalTask = ({ task: { description, id, title, time, column }, toggleTask }: Props) => {

    const dispatch = useDispatch()

    const newDispatch = useAppDispatch()

    const inputRef = useRef<HTMLInputElement>(null)
    
    const [isEditDescription, setIsEditDescription] = useState(false);
    const [subTaskTitle, setSubTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState(description || 'No description')
    const [taskColumn, setTaskColumn] = useState<Column>(column)
    
    const addSubTask = () => {
        dispatch({
            type: "ADD_SUBTASK",
            payload: {
                taskId: id,
                subtask: {
                    id: window.crypto.randomUUID(),
                    title: subTaskTitle,
                    checked: false
                }
            }
        })
        setSubTaskTitle('')
        inputRef.current?.focus()
    }

    const changeColumn = () => {
        newDispatch(editStatus({id, column: taskColumn}))
    }
    const changeDescription = () => {
        newDispatch(editDescription({id, description: taskDescription}))
        setIsEditDescription(false)
    }

    return (
        <div className="modal">
            <div className="task">
                <div className="task-header">
                    <h2 className="task-title">Task: {title}</h2>
                    <button className="close-modal" onClick={toggleTask}>x</button>
                </div>
                <div className="task-wrapper">
                    <div className="task-time">
                        <p><b>Created:</b> {time.create}</p>
                        <p><b>In Progress:</b> {getDateDiff(time.finish || new Date(), time.create)}</p>
                        {time.finish && <p><b>Completed:</b> {time.finish}</p>}
                    </div>
                    <div className="task-status">
                        <select name="" id="" value={taskColumn} onChange={(e) => setTaskColumn(e.target.value as Column)}>
                            <option value="Queue">Queue</option>
                            <option value="Development">Development</option>
                            <option value="Done">Done</option>
                        </select>
                        <button onClick={changeColumn} disabled={column === taskColumn}>Change status</button>
                    </div>
                    <div className="task-description">

                    <h3>Description</h3>
                    {
                        isEditDescription
                        ? <>
                        <textarea rows={5} onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} placeholder="Add description"></textarea>
                            {/* <input onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} placeholder="Add description"/> */}
                                <div className="buttons">
                                    <button onClick={changeDescription} disabled={!taskDescription.trim()}>Save description</button>
                                    <button onClick={() => {
                                        setTaskDescription(description || "No description")
                                        setIsEditDescription(false)
                                    }} >Close Editor</button>
                                </div>
                            </>
                            : <p
                            className="task-description"
                            title="Click to edit description"
                            onClick={() => setIsEditDescription(true)}
                            >{taskDescription}</p>
                        }
                        </div>

<div>

                    <h3>Subtasks</h3>
                    {/* {
                        subtasks.map(subtask => <SubTaskItem key={subtask.id} taskId={id} subtask={subtask} />)
                    } */}
                    <div className="subtask-form">
                        <input ref={inputRef} type="text" value={subTaskTitle} onChange={(e) => setSubTaskTitle(e.target.value)} placeholder="Add subtask" />
                        <button disabled={!subTaskTitle.trim()} onClick={addSubTask}>Add</button>
                    </div>
                    {/* <Comments comments={comments} taskId={id}/> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalTask
import { useRef, useState } from "react"
import { useDispatch } from "react-redux"
import { Task } from "../../types/DataTypes"
import { getDateDiff } from "../../utils"
import SubTaskItem from "../SubtaskItem/SubTaskItem"
import Comments from "../Comments/Comments"

type Props = {
    task: Task,
    toggleTask: React.MouseEventHandler<HTMLButtonElement>
}
const ModalTask = ({ task: { description, id, title, time, subtasks, comments }, toggleTask }: Props) => {

    const dispatch = useDispatch()

    const inputRef = useRef<HTMLInputElement>(null)
    
    const [isEditDescription, setIsEditDescription] = useState(false);
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [subTaskTitle, setSubTaskTitle] = useState('')
    const [taskTitle, setTaskTitle] = useState(title)
    const [taskDescription, setTaskDescription] = useState(description || 'No description')
    
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

    const saveDescription = () => {
        dispatch({
            type: "ADD_TASK_DESCRIPTION",
            payload: {
                id,
                description: taskDescription
            }
        })            
        setIsEditDescription(false)
        }

    const saveTitle = () => {
        dispatch({
            type: "SAVE_TASK_TITLE",
            payload: {
                id,
                title: taskTitle
            }
        })
        setIsEditTitle(false)
    }

    return (
        <div className="modal">
            <div className="task">
                <div className="task-header">
                    <div className="task-title" title="Click to edit title">
                        {
                            isEditTitle
                            ? <>
                                <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task Title"/>
                                <button onClick={saveTitle} disabled={!taskTitle.trim()}>Save</button>
                                <button onClick={() => setIsEditTitle(false)}>Close</button>
                            </>
                            : <h2 onClick={() => setIsEditTitle(true)}>Task: {title}</h2>
                        }
                    </div>
                    <button className="close-modal" onClick={toggleTask}>x</button>
                </div>
                <div className="subtasks-wrapper">
                    <div>
                        <p>Сreated: {time.create}</p>
                        <p>In Progress: {getDateDiff(time.finish || new Date(), time.create)}</p>
                        {time.finish && <p>Completed: {time.finish}</p>}
                    </div>
                    <h3>Description</h3>
                    {
                        isEditDescription
                            ? <>
                            <input onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} placeholder="Add description"/>
                                <div className="buttons">
                                    <button onClick={saveDescription} disabled={!taskDescription.trim()}>Save description</button>
                                    <button onClick={() => setIsEditDescription(false)} >Close Editor</button>
                                </div>
                            </>
                            : <div
                                className="task-description"
                                title="Click to edit description"
                                onClick={() => setIsEditDescription(true)}
                            >{taskDescription}</div>
                    }

                    <h3>Subtasks</h3>
                    {
                        subtasks.map(subtask => <SubTaskItem key={subtask.id} taskId={id} subtask={subtask} />)
                    }
                    <div className="subtask-form">
                        <input ref={inputRef} type="text" value={subTaskTitle} onChange={(e) => setSubTaskTitle(e.target.value)} placeholder="Add subtask" />
                        <button disabled={!subTaskTitle.trim()} onClick={addSubTask}>Add</button>
                    </div>
                    <Comments comments={comments} taskId={id}/>
                </div>
            </div>
        </div>
    )
}

export default ModalTask
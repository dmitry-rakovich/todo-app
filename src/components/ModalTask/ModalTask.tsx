import { useEffect, useRef, useState } from "react"
import { Column, Task } from "../../types/DataTypes"
import { getDateDiff } from "../../utils"
import { editStatus, editDescription } from "../../redux/actions/taskActions"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { fetchSubTasks, addSubTask } from "../../redux/actions/subtaskActions"
import SubTaskItem from "../SubtaskItem/SubTaskItem"
// import Comments from "../Comments/Comments"

type Props = {
    task: Task,
    toggleTask: React.MouseEventHandler<HTMLButtonElement>
}

const ModalTask = ({ task: { description, id, title, time, column }, toggleTask }: Props) => {

    const dispatch = useAppDispatch()
    const { subtasks } = useAppSelector(state => state.subtasks)

    const inputRef = useRef<HTMLInputElement>(null)

    const [isEditDescription, setIsEditDescription] = useState(false);
    const [subTaskTitle, setSubTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState(description || 'No description')
    const [taskColumn, setTaskColumn] = useState<Column>(column)

    const addNewSubTask = () => {
        dispatch(addSubTask({
            id: window.crypto.randomUUID(),
            checked: false,
            taskId: id,
            title: subTaskTitle
        }))
        setSubTaskTitle('')
        inputRef.current?.focus()
    }

    const changeColumn = () => {
        dispatch(editStatus({ id, column: taskColumn }))
    }
    const changeDescription = () => {
        dispatch(editDescription({ id, description: taskDescription }))
        setIsEditDescription(false)
    }

    useEffect(() => {
        dispatch(fetchSubTasks(id))
    }, [])


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

                    <div className="subtask-list">

                        <h3>Subtasks</h3>
                        {
                            subtasks.map(subtask => <SubTaskItem key={subtask.id} subtask={subtask} />)
                        }
                        <div className="subtask-form" onKeyUp={(e) => {
                            if (e.key === 'Enter' && subTaskTitle.trim()) addNewSubTask()
                        }}>
                            <input ref={inputRef} type="text" value={subTaskTitle} onChange={(e) => setSubTaskTitle(e.target.value)} placeholder="Add subtask" />
                            <button disabled={!subTaskTitle.trim()} onClick={addNewSubTask}>Add</button>
                        </div>
                        {/* <Comments comments={comments} taskId={id}/> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalTask
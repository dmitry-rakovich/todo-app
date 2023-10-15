import { useEffect, useRef, useState } from "react"
import { Status, Task } from "../../types/DataTypes"
import { getDateDiff } from "../../utils"
import { editTask } from "../../redux/actions/taskActions"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { fetchSubTasks, addSubTask } from "../../redux/actions/subtaskActions"
import SubTaskItem from "../SubTaskItem/SubTaskItem"
import Comments from "../Comments/Comments"
import { fetchComments } from "../../redux/actions/commentsActions"
import styles from "./ModalTask.module.css"

type Props = {
    task: Task,
    toggleTask: React.MouseEventHandler<HTMLButtonElement>
}

const ModalTask = ({ task: { description, id, title, time, status }, toggleTask }: Props) => {

    const dispatch = useAppDispatch()
    const { subtasks } = useAppSelector(state => state.subtasks)
    const { comments } = useAppSelector(state => state.comments)

    const inputRef = useRef<HTMLInputElement>(null)

    const [isEditDescription, setIsEditDescription] = useState(false);
    const [subTaskTitle, setSubTaskTitle] = useState('')
    const [taskDescription, setTaskDescription] = useState(description || 'No description')
    const [taskStatus, setTaskStatus] = useState<Status>(status)

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

    const changeStatus = () => {
        dispatch(editTask({ id, status: taskStatus }))
    }
    const changeDescription = () => {
        dispatch(editTask({ id, description: taskDescription }))
        setIsEditDescription(false)
    }

    useEffect(() => {
        dispatch(fetchSubTasks(id))
        dispatch(fetchComments(id))
    }, [])


    return (
        <div className={styles.modal}>
            <div className={styles.task}>
                <div className={styles.header}>
                    <h2>Task: {title}</h2>
                    <button className={styles.close} onClick={toggleTask}>&#10006;</button>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.time}>
                        <p><b>Created:</b> {time.create}</p>
                        <p><b>In Progress:</b> {getDateDiff(time.finish || new Date(), time.create)}</p>
                        {time.finish && <p><b>Completed:</b> {time.finish}</p>}
                    </div>
                    <div className={styles.status}>
                        <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value as Status)}>
                            <option value={Status.QUEUE}>{Status.QUEUE}</option>
                            <option value={Status.DEVELOPMENT}>{Status.DEVELOPMENT}</option>
                            <option value={Status.DONE}>{Status.DONE}</option>
                        </select>
                        <button onClick={changeStatus} disabled={status === taskStatus}>Change status</button>
                    </div>
                    <div className={styles.description}>

                        <h3>Description</h3>
                        {
                            isEditDescription
                                ? <>
                                    <textarea rows={5} onChange={(e) => setTaskDescription(e.target.value)} value={taskDescription} placeholder="Add description"></textarea>
                                    <div className={styles.buttons}>
                                        <button onClick={changeDescription} disabled={!taskDescription.trim()}>Save description</button>
                                        <button onClick={() => {
                                            setTaskDescription(description || "No description")
                                            setIsEditDescription(false)
                                        }} >Close Editor</button>
                                    </div>
                                </>
                                : <p
                                    className={styles.description}
                                    title="Click to edit description"
                                    onClick={() => setIsEditDescription(true)}
                                >{taskDescription}</p>
                        }
                    </div>

                    <div className={styles.list}>

                        <h3>Subtasks</h3>
                        {
                            subtasks.map(subtask => <SubTaskItem key={subtask.id} subtask={subtask} />)
                        }
                        <div className={styles.form} onKeyUp={(e) => {
                            if (e.key === 'Enter' && subTaskTitle.trim()) addNewSubTask()
                        }}>
                            <input ref={inputRef} type="text" value={subTaskTitle} onChange={(e) => setSubTaskTitle(e.target.value)} placeholder="Add subtask" />
                            <button disabled={!subTaskTitle.trim()} onClick={addNewSubTask}>Add</button>
                        </div>
                        <Comments comments={comments} taskId={id}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalTask
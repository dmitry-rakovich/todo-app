import { useEffect, useState } from "react"
import { Status, Task } from "../../types/DataTypes"
import { getDateDiff } from "../../utils"
import { deleteTask, editTask } from "../../redux/actions/taskActions"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { fetchComments } from "../../redux/actions/commentsActions"
import Comments from "../Comments/Comments"
import styles from "./ModalTask.module.css"
import SubtaskList from "../SubtaskList/SubtaskList"
import { fetchSubTasks } from "../../redux/actions/subtaskActions"

type Props = {
    task: Task,
    toggleTask: React.MouseEventHandler<HTMLButtonElement>
}

const ModalTask = ({ task: { description, id, title, time, status }, toggleTask }: Props) => {

    const dispatch = useAppDispatch()
    const { comments } = useAppSelector(state => state.comments)
    const { subtasks } = useAppSelector(state => state.subtasks)

    const [isEditDescription, setIsEditDescription] = useState(false);
    const [taskDescription, setTaskDescription] = useState(description)
    const [taskStatus, setTaskStatus] = useState<Status>(status)



    const changeStatus = () => {
        dispatch(editTask({ id, status: taskStatus }))
    }
    const changeDescription = () => {
        dispatch(editTask({ id, description: taskDescription }))
        setIsEditDescription(false)
    }
    const removeTask = (id: string) => {
        dispatch(deleteTask(id))
    }

    useEffect(() => {
        dispatch(fetchComments(id))
        dispatch(fetchSubTasks(id))
    }, [])


    return (
        <div className={styles.modal}>
            <div className={styles.task}>
                <div className={styles.header}>
                    <div>
                        <h2>Task: {title}</h2>
                        <button className="delete" onClick={() => removeTask(id)} title="Delete task">🗑</button>
                    </div>
                    <button className={styles.close} onClick={toggleTask}>&#10006;</button>
                </div>
                <div className={styles.wrapper}>
                    <div className={styles.time}>
                        <p><b>Created:</b> {new Date(time.create).toLocaleString()}</p>
                        <p><b>In Progress:</b> {getDateDiff(time.finish || new Date().toString(), time.create)}</p>
                        {time.finish && <p><b>Completed:</b> {new Date(time.finish).toLocaleString()}</p>}
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
                                        <button onClick={changeDescription}>Save description</button>
                                        <button onClick={() => {
                                            setTaskDescription(description)
                                            setIsEditDescription(false)
                                        }} >Close Editor</button>
                                    </div>
                                </>
                                : <p
                                    className={styles.description}
                                    title="Click to edit description"
                                    onClick={() => setIsEditDescription(true)}
                                >{taskDescription || "No description"}</p>
                        }
                    </div>
                    <SubtaskList subtasks={subtasks} taskId={id}/>
                    <Comments comments={comments} taskId={id} />
                </div>
            </div>
        </div>
    )
}

export default ModalTask
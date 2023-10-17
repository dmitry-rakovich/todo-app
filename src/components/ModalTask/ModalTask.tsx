import { useEffect, useState } from "react"
import { Status, Task } from "../../types/DataTypes"
import { getDateDiff } from "../../utils"
import { editTask } from "../../redux/actions/taskActions"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { fetchSubTasks } from "../../redux/actions/subtaskActions"
import { fetchComments } from "../../redux/actions/commentsActions"
import dayjs from "dayjs"
import Comments from "../Comments/Comments"
import SubtaskList from "../SubtaskList/SubtaskList"
import styles from "./ModalTask.module.css"

type Props = {
    task: Task,
    toggleTask: React.MouseEventHandler<HTMLButtonElement>
}

const ModalTask = ({ task: { description, id, title, time, status }, toggleTask }: Props) => {

    const dispatch = useAppDispatch()
    const { subtasks } = useAppSelector(state => state.subtasks)
    const { comments } = useAppSelector(state => state.comments)

    const [isEditDescription, setIsEditDescription] = useState(false);
    const [taskDescription, setTaskDescription] = useState(description || 'No description')
    const [taskStatus, setTaskStatus] = useState<Status>(status)



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
                        <p><b>Created:</b> {dayjs(time.create).format('DD/MM/YYYY, HH:mm:ss')}</p>
                        <p><b>In Progress:</b> {getDateDiff(time.finish || new Date().toString(), time.create)}</p>
                        {time.finish && <p><b>Completed:</b> {dayjs(time.finish).format('DD/MM/YYYY, HH:mm:ss')}</p>}
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
                    <SubtaskList subtasks={subtasks} taskId={id} />
                    <Comments comments={comments} taskId={id} />
                </div>
            </div>
        </div>
    )
}

export default ModalTask
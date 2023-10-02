import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { InitialState, SubTask, Task } from "../../types"
import SubTaskItem from "../SubtaskItem/SubTaskItem"
import { Editor } from '@tinymce/tinymce-react'
type Props = {
    task: Task,
    toggleTask: React.MouseEventHandler<HTMLButtonElement>
}
const ModalTask = ({ task: { description, id, title }, toggleTask }: Props) => {

    const dispatch = useDispatch()

    const editorRef = useRef(null);
    const inputRef = useRef<HTMLInputElement>(null)

    const subTasks = useSelector<InitialState, SubTask[]>((state) => state.subtasks)

    const [dirty, setDirty] = useState(false);
    const [isEditDescription, setIsEditDescription] = useState(false);
    const [isEditTitle, setIsEditTitle] = useState(false);
    const [subTaskTitle, setSubTaskTitle] = useState('')
    const [taskTitle, setTaskTitle] = useState(title)
    
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

    const saveDescription = () => {
        if (editorRef.current) {            
            const content = editorRef.current.getContent();
            setDirty(false);
            setIsEditDescription(false)
            editorRef.current.setDirty(false);
            dispatch({
                type: "ADD_TASK_DESCRIPTION",
                payload: {
                    id,
                    description: content
                }
            })
        }
    };

    const saveTitle = () => {
        dispatch({
            type: "SAVE_TASK_TITLE",
            payload: {
                id,
                title: taskTitle
            }
        })
    }

    return (
        <div className="modal-task">
            <div className="modal-task-wrapper">
                <div className="modal-task-header">
                    <div className="modal-task-title" title="Click to edit title">
                        {
                            isEditTitle
                            ? <>
                                <input type="text" value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task Title"/>
                                <button onClick={saveTitle}>Save</button>
                                <button onClick={() => setIsEditTitle(false)}>Close</button>
                            </>
                            : <h2 onClick={() => setIsEditTitle(true)}>Task: {title}</h2>
                        }
                    </div>
                    <button className="close-modal-task" onClick={toggleTask}>x</button>
                </div>
                <div className="subtasks-wrapper">
                    <h3>Description</h3>
                    {
                        isEditDescription
                            ? <>
                                <Editor
                                    apiKey="fa6f7nl0i6n48irja1r7k22b6adlgwzng7venrfuaf2vazmq"
                                    initialValue={description || 'No discription'}
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    onDirty={() => setDirty(true)}
                                />
                                <div className="buttons">
                                    <button onClick={saveDescription} disabled={!dirty}>Save description</button>
                                    <button onClick={() => setIsEditDescription(false)} >Close Editor</button>
                                </div>
                            </>
                            : <div
                                className="task-description"
                                title="Click to edit description"
                                onClick={() => setIsEditDescription(true)}
                                dangerouslySetInnerHTML={{__html: editorRef?.current ? editorRef.current.getContent() : description || 'No description'}}
                            />
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
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
    const [isEdit, setIsEdit] = useState(false);
    const [subTaskTitle, setSubTaskTitle] = useState('')
    
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

    const save = () => {
        if (editorRef.current) {            
            const content = editorRef.current.getContent();
            setDirty(false);
            setIsEdit(false)
            editorRef.current.setDirty(false);
            dispatch({
                type: "ADD_SUBTASK_DESCRIPTION",
                payload: {
                    id,
                    description: content
                }
            })
            console.log(content);
        }
    };

    return (
        <div className="modal-task">
            <div className="modal-task-wrapper">
                <div className="modal-task-header">
                    <h2>Task: {title}</h2>
                    <button className="close-modal-task" onClick={toggleTask}>x</button>
                </div>
                <div className="subtasks-wrapper">
                    <h3>Description</h3>
                    {
                        isEdit
                            ? <>
                                <Editor
                                    apiKey="fa6f7nl0i6n48irja1r7k22b6adlgwzng7venrfuaf2vazmq"
                                    initialValue={description || 'No discription'}
                                    onInit={(evt, editor) => editorRef.current = editor}
                                    onDirty={() => setDirty(true)}
                                />
                                <div className="buttons">
                                    <button onClick={save} disabled={!dirty}>Save description</button>
                                    <button onClick={() => setIsEdit(false)} >Close Editor</button>
                                </div>
                            </>
                            : <div
                                className="task-description"
                                title="Click to edit description"
                                onClick={() => setIsEdit(true)}
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
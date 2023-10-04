import { useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { State, Project} from "../../types/DataTypes"

const Projects = () => {

    const ref = useRef<HTMLInputElement>(null)
    const projects = useSelector<State, Project[]>(state => state.projects)

    const dispatch = useDispatch()

    const [isOpenForm, setIsOpenForm] = useState(false)
    const [value, setValue] = useState('')

    const addNewProject = () => {
        if(value.trim()) {
            dispatch({
                type: "ADD_PROJECT",
                payload: {
                    title: value,
                    id: window.crypto.randomUUID()
                }
            })
            setValue('')
            setIsOpenForm(false)
        } else {
            setValue('')
            ref?.current?.setCustomValidity('Поле не может быть пустым')
            ref?.current?.reportValidity()
            return
        }
    }            
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e?.target?.value.trim()) {
            ref.current?.setCustomValidity('')
            setValue(e?.target?.value)
        } else {
            ref.current?.setCustomValidity('Поле не может быть пустым')
            setValue('')
            return
        }
    }
    const closeForm = () => {
        setValue('')
        setIsOpenForm(false)
    }
    return (
        <div className="projects">
            {
                projects.map((project: Project) => (
                    <div className="project" key={project.id}>
                        <Link to={`/project/${project.id}`}>
                            <h1>{project.title}</h1>
                        </Link>
                    </div>
                )
                )
            }
            <div className="project">
                {
                    !isOpenForm
                    ? <button onClick={() => setIsOpenForm(true)}>Add new project</button>
                    : <>
                        <input type="text" ref={ref} value={value} onChange={handleChange} autoFocus/>
                        <div className="buttons">
                            <button onClick={addNewProject}>add</button>
                            <button onClick={closeForm}>close</button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Projects
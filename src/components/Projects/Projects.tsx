import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { State, Project} from "../../types/DataTypes"

const Projects = () => {

    const projects = useSelector<State, Project[]>(state => state.projects)

    const dispatch = useDispatch()

    const [isOpenForm, setIsOpenForm] = useState(false)
    const [value, setValue] = useState('')

    const addNewProject = () => {
        dispatch({
            type: "ADD_PROJECT",
            payload: {
                title: value,
                id: window.crypto.randomUUID()
            }
        })
        setValue('')
        setIsOpenForm(false)
    }            

    const closeForm = () => {
        setValue('')
        setIsOpenForm(false)
    }

    useEffect(() => {
        document.title = 'Projects Page | ToDo App'
    }, [])
    

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
                        <input type="text" value={value} onChange={(e) => setValue(e.target.value)} autoFocus placeholder="Add project title"/>
                        <div className="buttons">
                            <button onClick={addNewProject} disabled={!value.trim()}>Add</button>
                            <button onClick={closeForm}>Close</button>
                        </div>
                    </>
                }
            </div>
        </div>
    )
}

export default Projects
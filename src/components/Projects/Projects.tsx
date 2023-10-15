import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Project } from "../../types/DataTypes"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { fetchProjects, addProject} from "../../redux/actions/projectActions"
import styles from "./Projects.module.css"

const Projects = () => {

    const dispatch = useAppDispatch()
    const { error, isLoading, projects: newProjects } = useAppSelector(state => state.projects)

    const [isOpenForm, setIsOpenForm] = useState(false)
    const [value, setValue] = useState('')

    const addNewProject = () => {        
        dispatch(addProject({
            title: value,
            id: window.crypto.randomUUID()
        }))
        setValue('')
        setIsOpenForm(false)
    }

    const closeForm = () => {
        setValue('')
        setIsOpenForm(false)
    }

    useEffect(() => {
        document.title = 'Projects Page | ToDo App'
        dispatch(fetchProjects())
    }, [])


    return (
        <div className={styles.projects}>
            {isLoading ? <h1>Loading...</h1> : error ? <h1>{error}</h1> : <>
            {
                newProjects.map((project: Project) => (
                    <div className={styles.project} key={project.id}>
                        <Link to={`/project/${project.id}`}>
                            <h1>{project.title}</h1>
                        </Link>
                    </div>
                )
                )
            }
            <div className={styles.project} onKeyUp={(e) => {
                if(e.key === 'Enter' && value.trim()) addNewProject()
            }}>
                {
                    !isOpenForm
                        ? <button onClick={() => setIsOpenForm(true)}>Add new project</button>
                        : <>
                            <input type="text" value={value} onChange={(e) => setValue(e.target.value)} autoFocus placeholder="Add project title" />
                            <div className={styles.buttons}>
                                <button onClick={addNewProject} disabled={!value.trim()}>Add</button>
                                <button onClick={closeForm}>Close</button>
                            </div>
                        </>
                }
            </div>
            </>}
        </div>
    )
}

export default Projects
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteProject as deleteAction } from "../../redux/actions/projectActions"
import Column from "../../components/Column/Column"
import Search from "../../components/Search/Search"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { fetchTasks } from "../../redux/actions/taskActions"
import { Status } from "../../types/DataTypes"
import styles from "./Columns.module.css"

const Columns = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { id } = useParams() as { id: string }
  const { projects } = useAppSelector(state => state.projects)
  const { tasks } = useAppSelector(state => state.tasks)

  const [searchText, setSearchText] = useState('')

  const project = projects.find(project => project.id === id)
  const filteredTtasks = tasks.filter(task => task.projectId === id).filter(task => {
    if (searchText) {
      return task.title.includes(searchText)
    } else return task
  })

  useEffect(() => {
    if (!project) navigate('/')
    document.title = `Project ${project?.title} | ToDo App`
    dispatch(fetchTasks(id))
  }, [])

  const deleteProject = () => {
    dispatch(deleteAction(id))
    navigate('/')
  }

  return (
    <>
      <button className={styles.back} onClick={() => navigate('/')}>Back to all projects</button>
      <div className={styles.header}>
        <h2>Project: {project?.title}</h2>
        <button onClick={deleteProject}>Delete project</button>
        <Search setSearchText={setSearchText} />
      </div>
      <div className={styles.tasks}>
        <Column projectId={id} title={Status.QUEUE} tasks={filteredTtasks.filter(task => task.status === Status.QUEUE)} />
        <Column projectId={id} title={Status.DEVELOPMENT} tasks={filteredTtasks.filter(task => task.status === Status.DEVELOPMENT)} />
        <Column projectId={id} title={Status.DONE} tasks={filteredTtasks.filter(task => task.status === Status.DONE)} />
      </div>
    </>
  )
}

export default Columns
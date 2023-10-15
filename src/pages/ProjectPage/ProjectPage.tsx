import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { deleteProject as deleteAction } from "../../redux/actions/projectActions"
import Column from "../../components/Column/Column"
import Search from "../../components/Search/Search"
import { useAppDispatch, useAppSelector } from "../../hooks/hooks"
import { fetchTasks } from "../../redux/actions/taskActions"

const ProjectPage = () => {

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
      <button className="back-to-projects" onClick={() => navigate('/')}>Back to all projects</button>
      <div className="project-header">
        <h2>Project: {project?.title}</h2>
        <button onClick={deleteProject}>Delete project</button>
        <Search setSearchText={setSearchText} />
      </div>
      <div className="tasks">
        <Column projectId={id} title={'Queue'} tasks={filteredTtasks.filter(task => task.column === 'Queue')} />
        <Column projectId={id} title={'Development'} tasks={filteredTtasks.filter(task => task.column === 'Development')} />
        <Column projectId={id} title={'Done'} tasks={filteredTtasks.filter(task => task.column === 'Done')} />
      </div>
    </>
  )
}

export default ProjectPage
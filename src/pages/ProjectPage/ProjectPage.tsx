import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { InitialState, Project, Task } from "../../types"
import Column from "../../components/Column/Column"
import { useEffect } from "react"



const ProjectPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams() as {id: string}
  const project = useSelector<InitialState, Project|undefined>((state) => state.projects.find(project => project.id === id))
  const alltasks = useSelector<InitialState, Task[]>((state) => state.tasks)     
  const tasks = alltasks.filter(task => task.projectId === id)

  useEffect(() => {
    if(!project) navigate('/')

  }, [id])
  
  const deleteProject = () => {
    dispatch({
      type: "DELETE_PROJECT",
      payload: id
    })
    navigate('/')
  }
  return (
    <>
      <button className="back-to-projects" onClick={() => navigate('/')}>Back to all projects</button>
      <div className="project-header">
        <h1>Project: {project?.title}</h1>
        <button onClick={deleteProject}>Delete project</button>
      </div>
      <div className="tasks">
        <Column projectId={id} title={'Queue'} tasks={tasks.filter(task => task.column === 'Queue')}/>
        <Column projectId={id} title={'Development'} tasks={tasks.filter(task => task.column === 'Development')}/>
        <Column projectId={id} title={'Done'} tasks={tasks.filter(task => task.column === 'Done')}/>
      </div>
    </>
  )
}

export default ProjectPage
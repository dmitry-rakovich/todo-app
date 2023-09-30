import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"
import { InitialState, Task } from "../../types"
import Column from "../../components/Column/Column"


const ProjectPage = () => {
  const { id }= useParams() as {id: string}
  const alltasks = useSelector<InitialState, Task[]>((state) => state.tasks)     
  const tasks = alltasks.filter(task => task.projectId === id)


  return (
    <div className="tasks">
      <Column projectId={id} title={'Queue'} tasks={tasks.filter(task => task.column === 'Queue')}/>
      <Column projectId={id} title={'Development'} tasks={tasks.filter(task => task.column === 'Development')}/>
      <Column projectId={id} title={'Done'} tasks={tasks.filter(task => task.column === 'Done')}/>
    </div>
  )
}

export default ProjectPage
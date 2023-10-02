import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext, Droppable } from "react-beautiful-dnd"
import { InitialState, Project, Task } from "../../types"
import Column from "../../components/Column/Column"



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

  const onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }
    if (destination.droppableId === source.droppableId) {
      if (destination.index === source.index) {
        return;
      } else {
        dispatch({
          type: "REFRESH_TASKS",
          payload: {
            currentList: source.droppableId,
            currentIndex: source.index,
            targetList: source.droppableId,
            targetIndex: destination.index,
          },
        });
      }
    } else {
      dispatch({
        type: "REFRESH_TASKS",
        payload: {
          currentList: source.droppableId,
          currentIndex: source.index,
          targetList: destination.droppableId,
          targetIndex: destination.index,
        },
      });
    }
  };

  return (
    <>
      <button className="back-to-projects" onClick={() => navigate('/')}>Back to all projects</button>
      <div className="project-header">
        <h1>Project: {project?.title}</h1>
        <button onClick={deleteProject}>Delete project</button>
      </div>
      <div className="tasks">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="Queue">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Column projectId={id} title={'Queue'} tasks={tasks.filter(task => task.column === 'Queue')}/>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Development">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Column projectId={id} title={'Development'} tasks={tasks.filter(task => task.column === 'Development')}/>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Done">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Column projectId={id} title={'Done'} tasks={tasks.filter(task => task.column === 'Done')}/>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </>
  )
}

export default ProjectPage
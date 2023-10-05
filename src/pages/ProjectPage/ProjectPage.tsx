import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { DragDropContext, DragUpdate, Droppable } from "react-beautiful-dnd"
import { State, Project, Task } from "../../types/DataTypes"
import Column from "../../components/Column/Column"
import Search from "../../components/Search/Search"

const ProjectPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { id } = useParams() as { id: string }
  const [searchText, setSearchText] = useState('')
  const project = useSelector<State, Project | undefined>((state) => state.projects.find(project => project.id === id))
  const allTasks = useSelector<State, Task[]>((state) => state.tasks)
  const filteredTtasks = allTasks.filter(task => task.projectId === id).filter(task => {
    if (searchText) {
      return task.title.includes(searchText)
    } else return task
  })

  useEffect(() => {
    if (!project) navigate('/')
  }, [])

  const deleteProject = () => {
    dispatch({
      type: "DELETE_PROJECT",
      payload: id
    })
    navigate('/')
  }

  const onDragEnd = ({ source, destination }: DragUpdate) => {
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
        <h2>Project: {project?.title}</h2>
        <Search setSearchText={setSearchText} />
        <button onClick={deleteProject}>Delete project</button>
      </div>
      <div className="tasks">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="Queue">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Column projectId={id} title={'Queue'} tasks={filteredTtasks.filter(task => task.column === 'Queue')} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Development">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Column projectId={id} title={'Development'} tasks={filteredTtasks.filter(task => task.column === 'Development')} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="Done">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <Column projectId={id} title={'Done'} tasks={filteredTtasks.filter(task => task.column === 'Done')} />
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
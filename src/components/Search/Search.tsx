import { Task } from "../../types"

type Props = {
  setFilteredTasks: React.Dispatch<React.SetStateAction<Task[]>>,
  allTasks: Task[]
}
const Search = ({setFilteredTasks, allTasks}: Props) => {
    const handleSearch = (e) => {
      const filteredTasks = allTasks.filter(task => task.title.includes(e.target.value))
      setFilteredTasks(filteredTasks)
    }
  return (
    <div>
        <input type="search" onChange={handleSearch} placeholder="Search for tasks by title"/>
    </div>
  )
}

export default Search
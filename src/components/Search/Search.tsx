type Props = {
  setSearchText: React.Dispatch<React.SetStateAction<string>>
}

const Search = ({ setSearchText }: Props) => {
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <div>
      <input type="search" onChange={handleSearch} placeholder="Search for tasks by title" />
    </div>
  )
}

export default Search
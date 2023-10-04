
import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
type Props = {
  taskId: string,
  handleClose: React.Dispatch<React.SetStateAction<boolean>>
}
function FileUpload({taskId, handleClose}: Props) {

  const dispatch = useDispatch()

  const [file, setFile] = useState<File>();

  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', file!);
    axios.post('https://todo-app-lyart-eta-55.vercel.app/upload', formData).then(res => {
      dispatch({
        type: "ADD_FILE",
        payload: {
          id: window.crypto.randomUUID(),
          taskId,
          name: res.data.name,
          path: 'https://todo-app-lyart-eta-55.vercel.app/' + res.data.path
        }
      })
      handleClose(false)
    }).catch(err => console.log(err))
  }

  return (
    <div className="file-upload">
      <input type="file" onChange={(e) => {
        const file = e.target.files![0];
        setFile(file);
      }} />
      <button
        onClick={uploadFile}
        className="upbutton"
        disabled={!file}
        >
          Upload
      </button>
      <button onClick={() => handleClose(false)}>Close</button>
    </div>
  );
}

export default FileUpload;
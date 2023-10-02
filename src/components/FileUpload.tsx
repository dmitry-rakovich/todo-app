
import { useState } from 'react';
import axios from 'axios';

function FileUpload() {

  const [file, setFile] = useState('');

  const [data, getFile] = useState({ name: "", path: "" });


  const handleChange = (e) => {
    const file = e.target.files[0];
    setFile(file);
  }

  const uploadFile = () => {
    const formData = new FormData();
    formData.append('file', file);
    axios.post('http://localhost:4500/upload', formData).then(res => {
      getFile({
        name: res.data.name,
        path: 'http://localhost:5173' + res.data.path
      })
    }).catch(err => console.log(err))
  }

  return (
    <div className="file-upload">
      <input type="file" onChange={handleChange} />
      <button
        onClick={uploadFile}
        className="upbutton"
        disabled={!file}
        >
          Upload
      </button>
      {data.path ? <a href={data.path} download>{data.name}</a> : ''}
    </div>
  );
}

export default FileUpload;
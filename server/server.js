import express, { static as Static } from 'express';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const app = express();

// middleware
app.use(Static('public')); // для доступа к файлам в папке public
app.use(cors());
app.use(fileUpload());

// API для загрузки файлов
app.post('/upload', (req, res) => {
  if (!req.files) {
    return res.status(500).send({ msg: "file is not found" })
  }
   
  const myFile = req.files.file;
 
  // метод mv() помещает файл в папку public
  myFile.mv(`../public/${myFile.name}`,
    function (err) {
      if (err) {
        console.log(err)
        return res.status(500).send({ msg: "Error occurred" });
      }
      // возвращаем ответ с именем файла и его расположением
      return res.send({name: myFile.name, path: `/${myFile.name}`});
  });
})


app.listen(4500, () => {
  console.log('server is running at port 4500');
})
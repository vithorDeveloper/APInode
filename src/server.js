require("express-async-errors");

const migrationsRun = require("./database/sqlite/migrations");
const AppError = require("./utils/AppError");
const uploadConfig = require("./config/upload");

const cors = require("cors")
const express = require("express"); //importing express to the project
const routes = require("./routes");

migrationsRun();

const app = express(); //initializing the project

app.use(cors());
app.use(express.json());

app.use("/files", express.static(uploadConfig.UPLOADS_FOLDER))
app.use(routes);

app.use((error, request, response, next) => {
  if(error instanceof AppError){
    return response.status(error.statusCode).json({
      message: error.message,
      status: 'error'
    });
  }

  console.log(error)

  return response.status(500).json({
    message: 'internal server error',
    status: 'error'
    });
})

//identifies the port for and sends the msg to it
const PORT = 3333;
app.listen(PORT, () => console.log(`I'm at the door ${PORT}`));
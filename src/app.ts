import express from 'express'
import morgan from 'morgan' 
import cors from 'cors' //Una libreria para permitir conexiones con el front-end  desde otro segmento de red
import usuarioRoutes from './routes/usuario.routes'
import tareaRoutes from './routes/tarea.routes'

const app = express() 

app.use(morgan('dev'))
app.use(cors())
app.use(express.json()) //Parseo del body de las peticiones, para que el back-end entienda

app.use("/", usuarioRoutes );
app.use("/", tareaRoutes)

export default app;
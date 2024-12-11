import { DataSource } from "typeorm";
import { Usuario } from "../entities/usuario.entity";
import { Tarea } from "../entities/tarea.entity";

export const AppDataSource = new DataSource ({
    type: 'postgres',
    host: 'localhost', 
    username: 'postgres', 
    password: '123456789', 
    port: 5432,
    database: 'tareas', 
    entities: [Usuario, Tarea], 
    logging: true, //Muestra el detalle de las consultas en la terminal 
    synchronize: true //Cada cambio en las entidades actualiza en la base de datos
})
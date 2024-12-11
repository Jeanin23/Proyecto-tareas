import {
  Column, //Cada columna de la base de datos
  Entity, //Tabla de la base de datos
  PrimaryGeneratedColumn, //ID auntoincrementable
  BaseEntity, // Para que la clase usuario funcione como entidad
  OneToMany, //Definir una relacion de uno a muchos 
} from "typeorm";
import { Tarea } from "./tarea.entity";
@Entity("usuario")
export class Usuario extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column()
  apellido: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @OneToMany(() => Tarea, (tarea) => tarea.usuario)
  tareas: Tarea[];
}

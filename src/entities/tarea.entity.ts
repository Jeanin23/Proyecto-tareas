import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm"; //Propiedades de typeorm 
import { Usuario } from './usuario.entity';

@Entity("tarea")

export class Tarea extends BaseEntity {
  @PrimaryGeneratedColumn() 
  id: number;
  @Column()
  nombre: string;
  @Column()
  descripcion: string;
  @Column()
  fecha: Date;
  @Column({
    default: false
  })
  estado: boolean

  @Column()
  dificultad: string
  
  @ManyToOne(() => Usuario, (usuario) => usuario.tareas, {onDelete: 'CASCADE'}) //onDelete: una propiedad que elimina las tareas asignadas al usuario cuando se elimiina el usuario
  @JoinColumn({name:"idUsuario"}) //Para definir el nombre de la relacion 
  usuario: Usuario
}

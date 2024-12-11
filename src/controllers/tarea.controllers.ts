import { Request, Response } from "express";
import { Tarea } from "../entities/tarea.entity";
import { TareaBody } from "../interface/tareaBody.interface";
import { Usuario } from "../entities/usuario.entity";

export const getAllTareas = async (req: Request, res: Response) => {
  try {
    const tareas = await Tarea.find();
    res.json(tareas);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getTarea = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: "ID inválido" });
      return;
    }

    const tarea = await Tarea.findOneBy({ id: parseInt(id) });

    if (!tarea) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }
    res.json(tarea);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const createTarea = async (req: Request<TareaBody>, res: Response) => {
  try {
    const { nombre, descripcion, fecha } = req.body;
    const { usuarioId } = req.params;

    if (!nombre || !descripcion || !fecha) {
      res.status(400).json({ message: "Faltan campos obligatorios" });
      return;
    }

    const idNumber = parseInt(usuarioId);
    if (isNaN(idNumber)) {
      res.status(400).json({ message: "El ID de usuario no es válido." });
      return;
    }

    const usuario = await Usuario.findOne({ where: { id: idNumber } });
    if (!usuario) {
      res.status(404).json({ message: "No se encontró el usuario." });
      return;
    }

    const tarea = new Tarea();
    tarea.nombre = nombre;
    tarea.descripcion = descripcion;
    tarea.fecha = fecha;
    tarea.usuario = usuario;
    await tarea.save();
    res.status(201).json(tarea);
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateTarea = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const tarea = await Tarea.findOneBy({ id: parseInt(id) });
    if (!tarea) {
      res.status(404).json({ message: "No se pudo encontrar la tarea" });
    }

    await Tarea.update({ id: parseInt(id) }, req.body);
    res.status(200).json({ message: `Se edito la tarea de ID ${id}` });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteTarea = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: "ID invalido" });
    }
    const result = await Tarea.delete({ id: parseInt(id) });
    if (result.affected === 0) {
      res.status(404).json({ message: "Tarea no encontrada" });
      return;
    }
    res.status(200).json({ message: `Se elimino la tarea de ID ${id}` });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

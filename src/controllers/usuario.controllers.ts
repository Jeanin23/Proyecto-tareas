import { Request, Response } from "express";
import { Usuario } from "../entities/usuario.entity";
import { UsuarioBody } from "../interface/usuarioBody.interface"; //Tipado de datos
import { Tarea } from "../entities/tarea.entity";

export const getAllUsuarios = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.find({relations: ["tareas"]});
    res.json(usuario);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).json({ message: error.message });
    }
  }
};

// export const getUsuario = async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;

//     const usuario = await Usuario.findOneBy({ id: parseInt(id) });
//     if (!usuario) {
//     res.status(404).json({message: 'El usuario no existe'});
//       return;
//     }

//     const tareasNoCompletadas = await Tarea.createQueryBuilder("tarea")
//     .where("tarea.usuario = :usuarioId", {usuarioId: parseInt(id)})
//     .andWhere("tarea.estado = false")
//     .getCount();

//     res.json({
//       usuario, 
//       tareasNoCompletadas
//     });
   
//   } catch (error) {
//     if (error instanceof Error) {
//       res.status(500).json({ message: error.message });
//     }
//   }
// };

export const getUsuario = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findOne({ where: {id: parseInt(id)}, relations: ["tareas"] });
    if (!usuario) {
    res.status(404).json({message: 'El usuario no existe'});
      return;
    }

    const tareasNoCompletadas = usuario.tareas.filter(x => x.estado === false).length;
    const {nombre, apellido} = usuario;
    res.json({
      usuario: {
        nombre,
        apellido
      }, 
      tareasNoCompletadas
    });
   
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const createUsuario = async (
  req: Request<UsuarioBody>,
  res: Response
) => {
  try {
    const { nombre, apellido, email, password } = req.body;

    if (!nombre || !apellido || !email || !password) {
      res.status(400).json({message: 'Faltan campos obligatorios '});
      return;
    }

    const usuario = new Usuario();
    usuario.nombre = nombre;
    usuario.apellido = apellido;
    usuario.email = email;
    usuario.password = password;
    await usuario.save();
    res.status(200).json(usuario);

  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const updateUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const usuario = await Usuario.findOneBy({ id: parseInt(id) });
    if (!usuario) {
      res.status(404).json({ message: "No se encontro el usuario" });
      return;
    }
    await Usuario.update({ id: parseInt(id) }, req.body);
    res.status(200).json({ message: `Se edito el usuario con el id ${id}` });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params; //Recibo el parametro enviado en la URL 

  try {
    if (!id || isNaN(Number(id))) {
      res.status(400).json({ message: "No es valido el ID" });
    }
    const result = await Usuario.delete({ id: parseInt(id) });
    if (result.affected === 0) {
      res.status(404).json({ message: "usuario no encontrado" });
      return;
    }
    res.status(200).json({ message: `Se elimino el usuario con el ID ${id}` });
  } catch (error) {
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    }
  }
};

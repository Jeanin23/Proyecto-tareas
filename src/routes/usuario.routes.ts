import { Router } from "express";
import { getAllUsuarios ,getUsuario, createUsuario, updateUsuario, deleteUsuario} from '../controllers/usuario.controllers';
const router = Router(); //Propiedad de express para manejar las rutas 
router.get('/usuarios', getAllUsuarios);
router.get('/usuario/:id', getUsuario);
router.post('/usuario', createUsuario)
router.put('/usuario/:id', updateUsuario); 
router.delete('/usuario/:id', deleteUsuario)
export default router;
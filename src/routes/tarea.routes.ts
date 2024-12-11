import { Router } from "express";
import { getAllTareas, getTarea, createTarea, updateTarea, deleteTarea } from '../controllers/tarea.controllers'; //Metodos del controlador 
const router = Router();
router.get('/tareas', getAllTareas);
router.get('/tarea/:id', getTarea);
router.post('/tarea/:usuarioId', createTarea );
router.put('/tarea/:id', updateTarea )
router.delete('/tarea/:id', deleteTarea)
export default router;
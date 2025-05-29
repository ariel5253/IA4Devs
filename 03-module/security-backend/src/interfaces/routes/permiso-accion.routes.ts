import { Router } from 'express';
import { PermisoAccionController } from '../controllers/permiso-accion.controller';

const router = Router();
const controller = new PermisoAccionController();

/**
 * @swagger
 * /api/permiso-acciones:
 *   post:
 *     summary: Crear un nuevo permiso de acción
 *     tags: [Permisos de Acción]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - rolId
 *               - accionVistaId
 *               - permitido
 *             properties:
 *               rolId:
 *                 type: integer
 *               accionVistaId:
 *                 type: integer
 *               permitido:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Permiso de acción creado exitosamente
 *       400:
 *         description: Datos inválidos
 */
router.post('/', (req, res) => controller.create(req, res));

/**
 * @swagger
 * /api/permiso-acciones:
 *   get:
 *     summary: Obtener todos los permisos de acción
 *     tags: [Permisos de Acción]
 *     responses:
 *       200:
 *         description: Lista de permisos de acción
 */
router.get('/', (req, res) => controller.findAll(req, res));

/**
 * @swagger
 * /api/permiso-acciones/{id}:
 *   get:
 *     summary: Obtener un permiso de acción por ID
 *     tags: [Permisos de Acción]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Permiso de acción encontrado
 *       404:
 *         description: Permiso de acción no encontrado
 */
router.get('/:id', (req, res) => controller.findById(req, res));

/**
 * @swagger
 * /api/permiso-acciones/rol/{rolId}:
 *   get:
 *     summary: Obtener todos los permisos de un rol
 *     tags: [Permisos de Acción]
 *     parameters:
 *       - in: path
 *         name: rolId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de permisos del rol
 */
router.get('/rol/:rolId', (req, res) => controller.findByRolId(req, res));

/**
 * @swagger
 * /api/permiso-acciones/accion-vista/{accionVistaId}:
 *   get:
 *     summary: Obtener todos los permisos de una acción de vista
 *     tags: [Permisos de Acción]
 *     parameters:
 *       - in: path
 *         name: accionVistaId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de permisos de la acción de vista
 */
router.get('/accion-vista/:accionVistaId', (req, res) => controller.findByAccionVistaId(req, res));

/**
 * @swagger
 * /api/permiso-acciones/{id}:
 *   put:
 *     summary: Actualizar un permiso de acción
 *     tags: [Permisos de Acción]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rolId:
 *                 type: integer
 *               accionVistaId:
 *                 type: integer
 *               permitido:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Permiso de acción actualizado exitosamente
 *       404:
 *         description: Permiso de acción no encontrado
 */
router.put('/:id', (req, res) => controller.update(req, res));

/**
 * @swagger
 * /api/permiso-acciones/{id}:
 *   delete:
 *     summary: Eliminar un permiso de acción
 *     tags: [Permisos de Acción]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Permiso de acción eliminado exitosamente
 *       404:
 *         description: Permiso de acción no encontrado
 */
router.delete('/:id', (req, res) => controller.delete(req, res));

export default router; 
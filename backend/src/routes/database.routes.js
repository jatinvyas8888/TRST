// backend/src/routes/database.routes.js
import { Router } from 'express';
import {
    createDatabase,
    // getAllDatabases,
    // getDatabase,
    // updateDatabase,
    // deleteDatabase,
} from '../controllers/databases.controller.js';

const router = Router();

// Route to create a new database
router.post('/create', createDatabase);

// // Route to get all databases
// router.get('/', getAllDatabases);

// // Route to get a single database by ID
// router.get('/:id', getDatabase);

// // Route to update a database by ID
// router.patch('/:id', updateDatabase);

// // Route to delete a database by ID
// router.delete('/:id', deleteDatabase);

export default router;
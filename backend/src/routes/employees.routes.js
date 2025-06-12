import { Router } from 'express';
import { 
    createEmployee, 
    getEmployee, 
    getAllEmployees, 
    updateEmployee, 
    deleteEmployee 
} from '../controllers/employees.controller.js';

const router = Router();

// Create new employee
router.route("/create").post(createEmployee);

// Get all employees without JWT verification
router.route("/all").get(getAllEmployees);

// Handle operations on specific employee by ID without JWT verification
router.route("/:id")
    .get(getEmployee)      // Get single employee
    .patch(updateEmployee) // Update employee
    .delete(deleteEmployee); // Delete employee

export default router;
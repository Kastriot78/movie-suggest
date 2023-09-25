import express from 'express';
import { getAllContacts, createContact } from '../controllers/contactController.js';
import { isAdmin, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.get('/', protect, isAdmin, getAllContacts);
router.post('/', createContact);

export default router;
import express from 'express';
import { getMovies, getMovie, getMovieByCategory, createMovie, deleteMovie } from '../controllers/movieController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', getMovies);
router.get('/:id', getMovie);
router.get('/by-category/:category', getMovieByCategory);
router.post('/', protect, isAdmin, createMovie);
router.delete('/:id', protect, isAdmin, deleteMovie);

export default router;
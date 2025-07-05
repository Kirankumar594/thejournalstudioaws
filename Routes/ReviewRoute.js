import express from 'express';
import {
  createReview,
  getAllReviews,
  getReviewsByBook,
  updateReview,
  deleteReview
} from '../Controllers/ReviewController.js';

const router = express.Router();

router.post('/', createReview);          
router.get('/', getAllReviews);             
router.get('/:bookName', getReviewsByBook); 
router.put('/:id', updateReview);           
router.delete('/:id', deleteReview);        

export default router;

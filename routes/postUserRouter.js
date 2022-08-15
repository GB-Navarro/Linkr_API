import { Router } from 'express';
import { authValidator } from '../middlewares/authValidator.js';

import { newGetTimelineList } from '../controllers/repostController.js';
import { userPageValidation } from '../middlewares/userValidator.js';

const postUserRouter = Router()

postUserRouter.get('/user/:id', authValidator, userPageValidation, newGetTimelineList)

export default postUserRouter
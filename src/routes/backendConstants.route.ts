import express from 'express';
const router = express.Router();

router.route('/get-backend-constants').get();

export default router;

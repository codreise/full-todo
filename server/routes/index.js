const Router = require('express');
const userRouter = require('./user');
const taskRouter = require('./task');
const router = Router();

router.use('/users', userRouter);
router.use('/tasks', taskRouter);


module.exports = router;
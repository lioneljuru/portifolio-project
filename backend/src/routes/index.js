import { Router } from 'express';

const router = Router();

router.get('/', (req, res) => {
  console.log("landing page");
  return res.status(200).send("welcome to scheduly");
})

export {router};
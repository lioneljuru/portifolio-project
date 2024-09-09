import { Router } from 'express';

const route = Router();

route.get('/', (req, res) => {
  console.log("landing page");
  return res.status(200).send("welcome to scheduly");
})

export {route}
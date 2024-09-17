import { createApp } from './appbuild.js';
import mongoose from 'mongoose';


const PORT = process.env.PORT || 3003;
const HOST = process.env.HOST || 'localhost';
const DBName = process.env.DBName || 'Scheduly';

mongoose
	.connect(`mongodb://${HOST}/${DBName}`)
	.then(() => console.log("Connected to Database"))
	.catch((err) => console.log(`Error: ${err}`));

const app = createApp();

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
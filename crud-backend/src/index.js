import express from 'express';
import cors from 'cors';
import clientRoutes from './routes/clientRoute.js';

const app = express();
const port = 3000;

app.use(cors()); // Enable CORS
app.use(express.json()); // Middleware to parse JSON

// app.get('/', (req, res) => {
//     res.send('<h1>Hello backend</h1>');
// });
app.use('/api', clientRoutes);

app.listen(port, () => {
    console.log("listening on port " + port);
});

// Note: Use Nodemon for automatic server restarts in development
// npm install --save-dev nodemon
// The to run: nodemon injex.js

// Create folders: src, controllers*, routes*, services* - * folders to put inside src
// So...CRUD pass/goes 1st from SERVICES to CONTROLLER to ROUTE to index.js
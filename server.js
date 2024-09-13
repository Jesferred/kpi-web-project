import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from './routes/auth.js';
import dashboardRoutes from './routes/dashboard.js';
import db from './db.js';

const app = express();
const port = 3000;

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended: false}));
app.use(express.static("public"));

app.use('/', authRoutes);
app.use('/', dashboardRoutes);

db.sync({ force: false }).then(() => {
    app.listen(port, console.log(`Server is running on port: ${port}`))
})

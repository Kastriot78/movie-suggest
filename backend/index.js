import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

// routes
import userRoutes from './routes/userRoutes.js';
import moviesRoutes from './routes/movieRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

const port = process.env.PORT || 5000;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

const corsOptions = {
    origin: process.env.CORS_DOMAINS,
    credentials:true
};
app.use(cors(corsOptions));
app.use(cookieParser());

app.use('/api/users', userRoutes);
app.use('/api/movies', moviesRoutes);
app.use('/api/contacts', contactRoutes);

mongoose.connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('DB Connection Successfull')
}).catch(err => {
    console.log('Error connecting DB: ', err.message);
});

app.use("/images", express.static("images"));

app.get('/', (req, res) => {
    res.send('Welcome to Movie APP.');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Export the Express API
export default app;
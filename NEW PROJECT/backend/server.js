import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import productRoutes from './routes/productRoutes.js';
import sql from './config/db.js';
dotenv.config();
const app = express();

app.use(express.json()); // For parsing JSON request bodies
app.use(cors()); // Enable CORS for all routes
app.use(helmet());// For security headers
app.use(morgan('dev')); // For logging HTTP requests log the request method, URL, status code, and response time
//API Application Programming Interface
app.use('/api/products', productRoutes);
async function initDB() {
    try {
        // Attempt to connect to the database
        await sql`
        CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  image VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
); 
        `;
        console.log('Database connection successful');
    } catch (error) {
        console.error('Database connection failed:', error);
        process.exit(1); // Exit the application if the database connection fails
    }
}
initDB().then(() => {
    const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})}).catch((error) => {
    console.error('Failed to initialize the database:', error);
    process.exit(1); // Exit the application if initialization fails
});


import path from 'path';
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'
dotenv.config();
import connectDB from './config/db.js';
import cookieParser from 'cookie-parser';
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import userRoutes from './routes/userRoutes.js';

const port = process.env.PORT || 8080;

connectDB();

const app = express();
// app.use(cors({ origin: 'http://localhost:3000' }));
// Allow requests from any origin
// app.use(cors());

app.use((req, res, next) => {
  // Set the allowed origin(s)
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your client's domain

  // Set other necessary headers
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true'); // Allow credentials (cookies)

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    return res.status(200).json({});
  }

  next();
});


app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use('/api/users', userRoutes);


if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve();
  app.use(express.static(path.join(__dirname, '/frontend/dist')));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('API is running....');
  });
}



app.post('/api/signin', (req, res) => {
  const { username, password } = req.body;
  // Perform validation and user authentication here
  // ...

  // If authenticated, generate JWT token
  const token = jwt.sign({ username }, secretKey);

  // Set HttpOnly cookie
  res.cookie('jwtToken', token, { httpOnly: true });

  // Send token in response
  res.json({ token });
});

app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));


process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  process.exit(0);
});





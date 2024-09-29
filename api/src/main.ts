import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Load ENV
dotenv.config({
	path: `.env.${process.env.NODE_ENV}`,
});

// Configure express
const app = express();

app.use(
	cors({
		origin: process.env.API_URL as string,
	}),
);
app.use(helmet());
app.use(compression());
app.use(
	rateLimit({
		windowMs: 1 * 60 * 1000, // 1 Minute
		limit: 20,
	}),
);

// Serve static content
app.use(express.static(process.env.STATIC_DIR as string));

app.get('/', (_, res) => {
	res.redirect('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
});

app.listen(process.env.API_PORT, () => {
	console.log(`API running on ${process.env.API_PORT} in ${process.env.NODE_ENV} mode`);
});

export default app;
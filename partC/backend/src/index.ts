import express from 'express';
import cors from 'cors';
import diagnoses from './routes/diagnosesRouter';
import patients from './routes/patientsRouter';

const app = express();

app.use(cors());

app.use(express.json());

app.use('/api/diagnoses', diagnoses);
app.use('/api/patients', patients);

const PORT = 3001;

app.get('/api/ping', (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
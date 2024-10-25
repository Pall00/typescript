import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();  
app.use(express.json());
const PORT = process.env.PORT || 3000;


app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
    }); 

app.get('/bmi', (req, res) => {
        const heightParam = req.query.height;
        const weightParam = req.query.weight;
      
        
    if (!heightParam || !weightParam) {
          res.status(400).json({ error: 'malformatted parameters' });
          return;
        }
      
        
        if (Array.isArray(heightParam) || Array.isArray(weightParam)) {
          res.status(400).json({ error: 'malformatted parameters' });
          return;
        }
      
       
        const height = Number(heightParam);
        const weight = Number(weightParam);
      
       
        if (isNaN(height) || isNaN(weight)) {
          res.status(400).json({ error: 'malformatted parameters' });
          return;
        }
      
       
        const bmi = calculateBmi(height, weight);
      
        
        res.json({
          weight,
          height,
          bmi,
        });
      });

      
app.post('/exercises', (req, res) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const { daily_exercises, target } = req.body;
      
        
        if (!daily_exercises || !target) {
          res.status(400).json({ error: 'parameters missing' });
          return;
        }
      
        
        if (!Array.isArray(daily_exercises) || typeof target !== 'number') {
          res.status(400).json({ error: 'malformatted parameters' });
          return;
        }
      
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if (daily_exercises.some((hour: any) => isNaN(Number(hour))) || isNaN(target)) {
          res.status(400).json({ error: 'malformatted parameters' });
          return;
        }
      
        
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const dailyHours: number[] = daily_exercises.map((hour: any) => Number(hour));
      
        
        const result = calculateExercises(dailyHours, target);
      
        
        res.json(result);
      });

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });


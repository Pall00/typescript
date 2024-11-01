import express from 'express';
import diagnosesService from '../services/diagnosesService';

const router = express.Router();

router.get('/', (_req, res) => {

  const diagnoses = diagnosesService.getAllDiagnoses();
  res.json(diagnoses);
  
});

export default router;

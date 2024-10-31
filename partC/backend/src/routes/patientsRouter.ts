import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils/utils';
import { z } from 'zod';
import { Patient } from '../types/types';

const router = express.Router();

router.get('/', (_req: Request, res: Response) => {
    const patients = patientService.getPublicPatients();
    res.json(patients);
});

router.post('/', (req: Request, res: Response) => {
    try {
        const newPatient = toNewPatient(req.body);
        const addedPatient = patientService.addPatient(newPatient);
        res.json(addedPatient);
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).send({ error: error.issues });
        } else {
            console.error(error);
            res.status(400).send({ error: 'Unknown error' });
        }
    }
});

router.get('/:id', (req: Request, res: Response): void => {
    try {
    
      const id = req.params.id;  
      const idSchema = z.string();
      const parseResult = idSchema.safeParse(id);
  
      if (!parseResult.success) {
        res.status(400).send({ error: 'Invalid patient ID format' });
        return;
      }
  
      const patient: Patient | undefined = patientService.getPatientById(req.params.id);
  
      if (patient) {
        res.json(patient);
      } else {
        res.status(404).send({ error: 'Patient not found' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'An unexpected error occurred' });
    }
  });
  
  

export default router;

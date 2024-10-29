
import express, { Request, Response } from 'express';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils/utils';
import { z } from 'zod';

const router = express.Router();

router.get('/', (_req, res) => {
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
            res.status(400).send({ error: 'Unknown error' });
        }
    }
});

export default router;

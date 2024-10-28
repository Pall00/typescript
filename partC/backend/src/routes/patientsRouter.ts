// routes/patients.ts

import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

// GET /api/patients
router.get('/', (_req, res) => {
    const patients = patientService.getPublicPatients();
    res.json(patients);
});

export default router;

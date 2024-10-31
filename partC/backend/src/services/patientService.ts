import patients from '../../data/patients';
import { Patient, NewPatient } from '../types/types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patients;
};

const getPublicPatients = (): Omit<Patient, 'ssn' | 'entries'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (newPatient: NewPatient): Patient => {
    const patient: Patient = {
        id: uuid(),
        ...newPatient,
        entries: [], 
    };

    patients.push(patient);
    return patient;
};


const getPatientById = (id: string): Patient | undefined => {
    return patients.find((patient) => patient.id === id);
};

export default {
    getPatients,
    getPublicPatients,
    addPatient,
    getPatientById, 
};

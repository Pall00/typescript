import patients from '../../data/patients';
import { Patient, NewPatient } from '../types/types';
import { v1 as uuid } from 'uuid';

const getPatients = (): Patient[] => {
    return patients;
};

const getPublicPatients = (): Omit<Patient, 'ssn'>[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

const addPatient = (newPatient: NewPatient): Patient => {
    const patient = {
        id: uuid(),
        ...newPatient
    };

    patients.push(patient);
    return patient;
};

export default {
    getPatients,
    getPublicPatients,
    addPatient
};

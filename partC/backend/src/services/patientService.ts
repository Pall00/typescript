import patients from '../../data/patients';
import { Patient, PublicPatient } from '../types/types';

const getPatients = (): Patient[] => {
    return patients;
};

const getPublicPatients = (): PublicPatient[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation,
    }));
};

export default {
    getPatients,
    getPublicPatients,
};

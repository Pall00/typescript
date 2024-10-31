import React from 'react';
import { Modal, Alert } from '@mui/material';
import AddPatientForm from './AddPatientForm';
import { PatientFormValues } from '../../types';

interface Props {
  modalOpen: boolean;
  onClose: () => void;
  onSubmit: (values: PatientFormValues) => void;
  error?: string;
}

const AddPatientModal = ({ modalOpen, onClose, onSubmit, error }: Props) => (
  <Modal open={modalOpen} onClose={onClose}>
    <div style={{ padding: '1em', backgroundColor: 'white' }}>
      <h2>Add a new patient</h2>
      {error && <Alert severity="error">{`Error: ${error}`}</Alert>}
      <AddPatientForm onSubmit={onSubmit} onCancel={onClose} />
    </div>
  </Modal>
);

export default AddPatientModal;

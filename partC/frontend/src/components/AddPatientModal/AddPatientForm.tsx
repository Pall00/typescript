// AddPatientForm.tsx

import { TextField, Button } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { PatientFormValues, Gender } from '../../types';

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const AddPatientForm = ({ onSubmit, onCancel }: Props) => {
  const { control, handleSubmit } = useForm<PatientFormValues>();

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="Name" fullWidth />}
      />
      <Controller
        name="dateOfBirth"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Date of Birth" fullWidth />
        )}
      />
      <Controller
        name="ssn"
        control={control}
        defaultValue=""
        render={({ field }) => <TextField {...field} label="SSN" fullWidth />}
      />
      <Controller
        name="occupation"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField {...field} label="Occupation" fullWidth />
        )}
      />
      <Controller
        name="gender"
        control={control}
        defaultValue={Gender.Other} // Use enum value here
        render={({ field }) => (
          <TextField {...field} label="Gender" fullWidth />
        )}
      />
      <Button type="button" onClick={onCancel}>
        Cancel
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Add
      </Button>
    </form>
  );
};

export default AddPatientForm;

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography, List, ListItem, ListItemText, Paper } from "@mui/material";
import { Male, Female, Transgender, Favorite, LocalHospital, Work } from "@mui/icons-material";

import { Patient, Gender, Diagnosis, Entry } from "../types";
import { apiBaseUrl } from "../constants";
import diagnosesService from "../services/diagnoses";

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPatientDetails = async () => {
      try {
        const { data: patientData } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        setPatient(patientData);
      } catch (e: unknown) {
        if (axios.isAxiosError(e)) {
          setError("Failed to fetch patient details");
        } else {
          setError("An unexpected error occurred");
        }
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const diagnosesData = await diagnosesService.getAll();
        setDiagnoses(diagnosesData);
      } catch (e: unknown) {
        console.error("Failed to fetch diagnoses", e);
      }
    };

    void fetchPatientDetails();
    void fetchDiagnoses();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

  const getEntryIcon = (type: Entry['type']) => {
    switch (type) {
      case "Hospital":
        return <LocalHospital />;
      case "OccupationalHealthcare":
        return <Work />;
      case "HealthCheck":
        return <Favorite />;
      default:
        return null;
    }
  };

  const getGenderIcon = (gender: Gender) => {
    switch (gender) {
      case Gender.Male:
        return <Male />;
      case Gender.Female:
        return <Female />;
      default:
        return <Transgender />;
    }
  };

  const getDiagnosisName = (code: string): string => {
    const diagnosis = diagnoses.find((d) => d.code === code);
    return diagnosis ? diagnosis.name : "";
  };

  return (
    <div>
      <Typography variant="h4" style={{ marginTop: "1em" }}>
        {patient.name} {getGenderIcon(patient.gender)}
      </Typography>
      <Typography variant="body1">SSN: {patient.ssn || "N/A"}</Typography>
      <Typography variant="body1">Occupation: {patient.occupation}</Typography>
      <Typography variant="body1">
        Date of Birth: {patient.dateOfBirth || "N/A"}
      </Typography>
      <Typography variant="h5" style={{ marginTop: "1em" }}>
        Entries
      </Typography>
      {patient.entries && patient.entries.length > 0 ? (
        patient.entries.map((entry) => (
          <Paper key={entry.id} style={{ padding: '1em', marginBottom: '1em' }}>
            <Typography variant="subtitle1">
              {entry.date} {getEntryIcon(entry.type)}
            </Typography>
            <Typography variant="body2">{entry.description}</Typography>
            {entry.diagnosisCodes && entry.diagnosisCodes.length > 0 && (
              <List>
                {entry.diagnosisCodes.map((code) => (
                  <ListItem key={code}>
                    <ListItemText>
                      {code} {getDiagnosisName(code)}
                    </ListItemText>
                  </ListItem>
                ))}
              </List>
            )}
            {}
            {entry.type === "Hospital" && entry.discharge && (
              <Typography variant="body2">
                Discharged on {entry.discharge.date}: {entry.discharge.criteria}
              </Typography>
            )}
            {entry.type === "OccupationalHealthcare" && entry.employerName && (
              <Typography variant="body2">
                Employer: {entry.employerName}
              </Typography>
            )}
            {entry.type === "HealthCheck" && (
              <Typography variant="body2">
                Health Check Rating: {entry.healthCheckRating}
              </Typography>
            )}
          </Paper>
        ))
      ) : (
        <Typography>No entries</Typography>
      )}
    </div>
  );
};

export default PatientDetailsPage;

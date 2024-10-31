import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Typography } from "@mui/material";
import { Male, Female, Transgender } from "@mui/icons-material";

import { Patient, Gender } from "../types";
import { apiBaseUrl } from "../constants";

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
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

    void fetchPatientDetails();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!patient) {
    return <div>Loading...</div>;
  }

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
        patient.entries.map((entry, index) => (
          <div key={index}>
            {/* Display entry details here */}
          </div>
        ))
      ) : (
        <Typography>No entries</Typography>
      )}
    </div>
  );
};

export default PatientDetailsPage;

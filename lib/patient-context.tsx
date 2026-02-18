import React, { createContext, useContext, useState, useCallback } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface ClinicalNote {
  id: string;
  date: string;
  content: string;
  toolUsed?: string;
  findings?: string;
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  age: number;
  gender: "M" | "F";
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  medicalHistory: string;
  allergies: string;
  currentMedications: string;
  notes: ClinicalNote[];
  createdAt: string;
  lastVisit?: string;
  status: "active" | "inactive" | "archived";
}

interface PatientContextType {
  patients: Patient[];
  addPatient: (patient: Omit<Patient, "id" | "createdAt" | "notes">) => Promise<void>;
  updatePatient: (id: string, patient: Partial<Patient>) => Promise<void>;
  deletePatient: (id: string) => Promise<void>;
  getPatient: (id: string) => Patient | undefined;
  addNote: (patientId: string, note: Omit<ClinicalNote, "id">) => Promise<void>;
  getPatientNotes: (patientId: string) => ClinicalNote[];
  searchPatients: (query: string) => Patient[];
  getActivePatients: () => Patient[];
  exportPatientData: (patientId: string) => Promise<string>;
}

const PatientContext = createContext<PatientContextType | undefined>(undefined);

export function PatientProvider({ children }: { children: React.ReactNode }) {
  const [patients, setPatients] = useState<Patient[]>([]);

  // Load patients from AsyncStorage on mount
  React.useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const stored = await AsyncStorage.getItem("patients");
      if (stored) {
        setPatients(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Failed to load patients:", error);
    }
  };

  const savePatients = async (updatedPatients: Patient[]) => {
    try {
      await AsyncStorage.setItem("patients", JSON.stringify(updatedPatients));
      setPatients(updatedPatients);
    } catch (error) {
      console.error("Failed to save patients:", error);
    }
  };

  const addPatient = useCallback(
    async (patientData: Omit<Patient, "id" | "createdAt" | "notes">) => {
      const newPatient: Patient = {
        ...patientData,
        id: `patient_${Date.now()}`,
        createdAt: new Date().toISOString(),
        notes: [],
      };
      await savePatients([...patients, newPatient]);
    },
    [patients]
  );

  const updatePatient = useCallback(
    async (id: string, updates: Partial<Patient>) => {
      const updated = patients.map((p) => (p.id === id ? { ...p, ...updates } : p));
      await savePatients(updated);
    },
    [patients]
  );

  const deletePatient = useCallback(
    async (id: string) => {
      const filtered = patients.filter((p) => p.id !== id);
      await savePatients(filtered);
    },
    [patients]
  );

  const getPatient = useCallback(
    (id: string) => {
      return patients.find((p) => p.id === id);
    },
    [patients]
  );

  const addNote = useCallback(
    async (patientId: string, noteData: Omit<ClinicalNote, "id">) => {
      const newNote: ClinicalNote = {
        ...noteData,
        id: `note_${Date.now()}`,
      };
      const updated = patients.map((p) =>
        p.id === patientId ? { ...p, notes: [...p.notes, newNote] } : p
      );
      await savePatients(updated);
    },
    [patients]
  );

  const getPatientNotes = useCallback(
    (patientId: string) => {
      const patient = patients.find((p) => p.id === patientId);
      return patient?.notes || [];
    },
    [patients]
  );

  const searchPatients = useCallback(
    (query: string) => {
      const lowerQuery = query.toLowerCase();
      return patients.filter(
        (p) =>
          p.name.toLowerCase().includes(lowerQuery) ||
          p.parentName.toLowerCase().includes(lowerQuery) ||
          p.parentEmail.toLowerCase().includes(lowerQuery)
      );
    },
    [patients]
  );

  const getActivePatients = useCallback(() => {
    return patients.filter((p) => p.status === "active");
  }, [patients]);

  const exportPatientData = useCallback(
    async (patientId: string) => {
      const patient = patients.find((p) => p.id === patientId);
      if (!patient) return "";

      const exportData = {
        patient: {
          name: patient.name,
          dateOfBirth: patient.dateOfBirth,
          age: patient.age,
          gender: patient.gender,
          parentName: patient.parentName,
          parentEmail: patient.parentEmail,
          parentPhone: patient.parentPhone,
          medicalHistory: patient.medicalHistory,
          allergies: patient.allergies,
          currentMedications: patient.currentMedications,
          createdAt: patient.createdAt,
          lastVisit: patient.lastVisit,
        },
        notes: patient.notes,
        exportedAt: new Date().toISOString(),
      };

      return JSON.stringify(exportData, null, 2);
    },
    [patients]
  );

  return (
    <PatientContext.Provider
      value={{
        patients,
        addPatient,
        updatePatient,
        deletePatient,
        getPatient,
        addNote,
        getPatientNotes,
        searchPatients,
        getActivePatients,
        exportPatientData,
      }}
    >
      {children}
    </PatientContext.Provider>
  );
}

export function usePatient() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error("usePatient must be used within PatientProvider");
  }
  return context;
}

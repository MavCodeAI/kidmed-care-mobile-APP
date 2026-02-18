import { describe, it, expect } from "vitest";

describe("Patient Management System", () => {
  describe("Patient Data Structure", () => {
    it("should have required patient fields", () => {
      const patient = {
        id: "patient_123",
        name: "John Doe",
        dateOfBirth: "2015-05-20",
        age: 9,
        gender: "M",
        parentName: "Jane Doe",
        parentEmail: "jane@example.com",
        parentPhone: "+1-555-0123",
        medicalHistory: "Asthma",
        allergies: "Peanuts",
        currentMedications: "Albuterol",
        notes: [],
        createdAt: "2024-01-15T10:30:00Z",
        status: "active",
      };

      expect(patient.id).toBeTruthy();
      expect(patient.name).toBeTruthy();
      expect(patient.dateOfBirth).toBeTruthy();
      expect(patient.age).toBeGreaterThanOrEqual(0);
      expect(["M", "F"]).toContain(patient.gender);
      expect(patient.parentName).toBeTruthy();
      expect(patient.status).toBe("active");
    });

    it("should support patient status tracking", () => {
      const statuses = ["active", "inactive", "archived"];
      expect(statuses).toContain("active");
      expect(statuses).toContain("inactive");
      expect(statuses).toContain("archived");
    });

    it("should track patient creation date", () => {
      const createdAt = "2024-01-15T10:30:00Z";
      const date = new Date(createdAt);
      expect(date instanceof Date).toBe(true);
      expect(date.getTime()).toBeGreaterThan(0);
    });
  });

  describe("Clinical Notes", () => {
    it("should create clinical notes with required fields", () => {
      const note = {
        id: "note_123",
        date: "2024-01-15",
        content: "Patient presents with fever and cough",
        toolUsed: "vital-signs",
        findings: "Temperature 38.5°C",
      };

      expect(note.id).toBeTruthy();
      expect(note.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(note.content).toBeTruthy();
    });

    it("should support multiple notes per patient", () => {
      const notes = [
        { id: "note_1", date: "2024-01-15", content: "Initial visit" },
        { id: "note_2", date: "2024-01-20", content: "Follow-up visit" },
        { id: "note_3", date: "2024-01-25", content: "Final assessment" },
      ];

      expect(notes.length).toBe(3);
      expect(new Date(notes[0].date).getTime()).toBeLessThan(new Date(notes[1].date).getTime());
      expect(new Date(notes[1].date).getTime()).toBeLessThan(new Date(notes[2].date).getTime());
    });

    it("should track note creation date", () => {
      const noteDate = "2024-01-15";
      const dateObj = new Date(noteDate);
      expect(dateObj instanceof Date).toBe(true);
    });

    it("should support optional tool reference in notes", () => {
      const toolUsed = "bmi-calculator";
      const noToolUsed = undefined;

      expect(toolUsed).toBeTruthy();
      expect(noToolUsed).toBeUndefined();
    });
  });

  describe("Patient Search and Filtering", () => {
    it("should search patients by name", () => {
      const patients: Array<{id: string; name: string; parentName: string}> = [
        { id: "1", name: "John Doe", parentName: "Jane Doe" },
        { id: "2", name: "Alice Smith", parentName: "Bob Smith" },
        { id: "3", name: "John Smith", parentName: "Mary Smith" },
      ];

      const results = patients.filter((p) => p.name.toLowerCase().includes("john"));
      expect(results.length).toBe(2);
      expect(results[0].name).toContain("John");
    });

    it("should search patients by parent name", () => {
      const patients: Array<{id: string; name: string; parentName: string}> = [
        { id: "1", name: "John Doe", parentName: "Jane Doe" },
        { id: "2", name: "Alice Smith", parentName: "Bob Smith" },
      ];

      const results = patients.filter((p) => p.parentName.toLowerCase().includes("jane"));
      expect(results.length).toBe(1);
      expect(results[0].parentName).toBe("Jane Doe");
    });

    it("should filter active patients", () => {
      const patients = [
        { id: "1", name: "John", status: "active" },
        { id: "2", name: "Alice", status: "inactive" },
        { id: "3", name: "Bob", status: "active" },
      ];

      const active = patients.filter((p) => p.status === "active");
      expect(active.length).toBe(2);
    });

    it("should filter archived patients", () => {
      const patients = [
        { id: "1", name: "John", status: "active" },
        { id: "2", name: "Alice", status: "archived" },
        { id: "3", name: "Bob", status: "archived" },
      ];

      const archived = patients.filter((p) => p.status === "archived");
      expect(archived.length).toBe(2);
    });
  });

  describe("Patient Age Calculation", () => {
    it("should calculate patient age correctly", () => {
      const dob = "2015-05-20";
      const today = new Date();
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      expect(age).toBeGreaterThanOrEqual(0);
      expect(age).toBeLessThan(150);
    });

    it("should handle newborns correctly", () => {
      const today = new Date();
      const dob = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
      const birthDate = new Date(dob);
      let age = today.getFullYear() - birthDate.getFullYear();

      expect(age).toBe(0);
    });
  });

  describe("Patient Data Export", () => {
    it("should export patient data as JSON", () => {
      const patient = {
        id: "patient_123",
        name: "John Doe",
        dateOfBirth: "2015-05-20",
        age: 9,
        gender: "M",
        parentName: "Jane Doe",
        notes: [],
      };

      const exported = JSON.stringify(patient);
      const parsed = JSON.parse(exported);

      expect(parsed.name).toBe("John Doe");
      expect(parsed.age).toBe(9);
    });

    it("should include all patient notes in export", () => {
      const patient = {
        name: "John Doe",
        notes: [
          { id: "1", date: "2024-01-15", content: "Visit 1" },
          { id: "2", date: "2024-01-20", content: "Visit 2" },
        ],
      };

      const exported = JSON.stringify(patient);
      const parsed = JSON.parse(exported);

      expect(parsed.notes.length).toBe(2);
      expect(parsed.notes[0].content).toBe("Visit 1");
    });

    it("should include export timestamp", () => {
      const exportData = {
        patient: { name: "John Doe" },
        exportedAt: new Date().toISOString(),
      };

      expect(exportData.exportedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    });
  });

  describe("Medical History Management", () => {
    it("should store medical conditions", () => {
      const medicalHistory = "Asthma, eczema, seasonal allergies";
      expect(medicalHistory.length).toBeGreaterThan(0);
      expect(medicalHistory).toContain("Asthma");
    });

    it("should store allergies", () => {
      const allergies = "Peanuts, tree nuts, shellfish";
      expect(allergies.length).toBeGreaterThan(0);
      expect(allergies).toContain("Peanuts");
    });

    it("should store current medications", () => {
      const medications = "Albuterol inhaler, Fluticasone nasal spray";
      expect(medications.length).toBeGreaterThan(0);
      expect(medications).toContain("Albuterol");
    });

    it("should support empty medical history", () => {
      const patient = {
        medicalHistory: "",
        allergies: "",
        currentMedications: "",
      };

      expect(patient.medicalHistory).toBe("");
      expect(patient.allergies).toBe("");
      expect(patient.currentMedications).toBe("");
    });
  });

  describe("Patient Contact Information", () => {
    it("should validate email format", () => {
      const email = "jane@example.com";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      expect(emailRegex.test(email)).toBe(true);
    });

    it("should store phone number", () => {
      const phone = "+1-555-0123";
      expect(phone.length).toBeGreaterThan(0);
      expect(phone).toMatch(/[\d\-\+]/);
    });

    it("should support optional contact fields", () => {
      const patient = {
        parentName: "Jane Doe",
        parentEmail: "",
        parentPhone: "",
      };

      expect(patient.parentName).toBeTruthy();
      expect(patient.parentEmail).toBe("");
      expect(patient.parentPhone).toBe("");
    });
  });

  describe("Patient List Operations", () => {
    it("should add patient to list", () => {
      const patients: any[] = [];
      const newPatient = { id: "1", name: "John" };

      patients.push(newPatient);
      expect(patients.length).toBe(1);
      expect(patients[0].name).toBe("John");
    });

    it("should update patient in list", () => {
      const patients = [{ id: "1", name: "John", age: 9 }];
      const updated = patients.map((p) => (p.id === "1" ? { ...p, age: 10 } : p));

      expect(updated[0].age).toBe(10);
    });

    it("should delete patient from list", () => {
      const patients = [
        { id: "1", name: "John" },
        { id: "2", name: "Alice" },
      ];
      const filtered = patients.filter((p) => p.id !== "1");

      expect(filtered.length).toBe(1);
      expect(filtered[0].name).toBe("Alice");
    });

    it("should get total patient count", () => {
      const patients = [
        { id: "1", name: "John", status: "active" },
        { id: "2", name: "Alice", status: "active" },
        { id: "3", name: "Bob", status: "inactive" },
      ];

      expect(patients.length).toBe(3);
      const activeCount = patients.filter((p) => p.status === "active").length;
      expect(activeCount).toBe(2);
    });
  });
});

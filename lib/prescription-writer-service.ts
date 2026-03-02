// AI Prescription Writer Service - Mock Implementation
export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  duration: string;
  instructions?: string;
}

export interface Prescription {
  id: string;
  diagnosis: string;
  patientName: string;
  patientAge: number;
  patientWeight: number;
  medications: Medication[];
  notes?: string;
  createdAt: Date;
  prescribedBy: string;
}

export class PrescriptionWriterService {
  private prescriptions: Prescription[] = [];
  private medicationDatabase: Record<string, Medication[]> = {
    'Acute Otitis Media': [
      { name: 'Amoxicillin', dosage: '400mg', frequency: 'TDS', duration: '7 days', instructions: 'After meals' },
      { name: 'Ibuprofen', dosage: '150mg', frequency: 'PRN q6-8h', duration: 'As needed', instructions: 'For fever/pain' },
      { name: 'Saline Nasal Drops', dosage: '2 drops', frequency: 'QDS', duration: '5 days', instructions: 'Both nostrils' },
    ],
    'Pneumonia': [
      { name: 'Amoxicillin-Clavulanate', dosage: '500mg', frequency: 'BID', duration: '10 days', instructions: 'With food' },
      { name: 'Paracetamol', dosage: '250mg', frequency: 'TDS', duration: '5 days', instructions: 'For fever' },
    ],
    'Gastroenteritis': [
      { name: 'Oral Rehydration Solution', dosage: 'Ad libitum', frequency: 'Frequent sips', duration: 'Until resolved', instructions: 'Small frequent amounts' },
      { name: 'Zinc Supplement', dosage: '10mg', frequency: 'OD', duration: '10 days', instructions: 'With food' },
    ],
    'Urinary Tract Infection': [
      { name: 'Cephalexin', dosage: '250mg', frequency: 'QID', duration: '7 days', instructions: 'With water' },
      { name: 'Paracetamol', dosage: '250mg', frequency: 'TDS', duration: '3 days', instructions: 'For pain' },
    ],
  };

  generatePrescription(
    diagnosis: string,
    patientName: string,
    patientAge: number,
    patientWeight: number,
    prescribedBy: string
  ): Prescription {
    const medications = this.medicationDatabase[diagnosis] || [
      { name: 'Supportive Care', dosage: 'As needed', frequency: 'Daily', duration: 'Until resolved' },
    ];

    const prescription: Prescription = {
      id: `RX-${Date.now()}`,
      diagnosis,
      patientName,
      patientAge,
      patientWeight,
      medications: this.adjustDosageByWeight(medications, patientWeight),
      createdAt: new Date(),
      prescribedBy,
    };

    this.prescriptions.push(prescription);
    return prescription;
  }

  private adjustDosageByWeight(medications: Medication[], weight: number): Medication[] {
    return medications.map(med => {
      // Simple weight-based adjustment logic
      if (med.dosage.includes('mg')) {
        const baseDosage = parseInt(med.dosage);
        const adjustedDosage = Math.round((baseDosage * weight) / 20); // Simple adjustment
        return {
          ...med,
          dosage: `${adjustedDosage}mg`,
        };
      }
      return med;
    });
  }

  getPrescriptionHistory(): Prescription[] {
    return [...this.prescriptions];
  }

  exportPrescriptionAsText(prescription: Prescription): string {
    let text = `℞ PRESCRIPTION\n`;
    text += `${'='.repeat(50)}\n\n`;
    text += `Patient: ${prescription.patientName}\n`;
    text += `Age: ${prescription.patientAge} years | Weight: ${prescription.patientWeight}kg\n`;
    text += `Diagnosis: ${prescription.diagnosis}\n`;
    text += `Date: ${prescription.createdAt.toLocaleDateString()}\n`;
    text += `Prescribed by: ${prescription.prescribedBy}\n\n`;
    text += `MEDICATIONS:\n`;
    text += `${'-'.repeat(50)}\n`;

    prescription.medications.forEach((med, index) => {
      text += `${index + 1}. ${med.name}\n`;
      text += `   Dosage: ${med.dosage}\n`;
      text += `   Frequency: ${med.frequency}\n`;
      text += `   Duration: ${med.duration}\n`;
      if (med.instructions) {
        text += `   Instructions: ${med.instructions}\n`;
      }
      text += `\n`;
    });

    text += `${'='.repeat(50)}\n`;
    text += `Disclaimer: This is a decision-support tool. All prescriptions must be reviewed by a clinician.\n`;

    return text;
  }

  checkDrugInteractions(medications: string[]): { safe: boolean; warnings: string[] } {
    const warnings: string[] = [];
    const interactions: Record<string, string[]> = {
      'Amoxicillin': ['Methotrexate', 'Warfarin'],
      'Ibuprofen': ['Aspirin', 'Warfarin', 'ACE Inhibitors'],
      'Paracetamol': ['Warfarin'],
    };

    for (let i = 0; i < medications.length; i++) {
      for (let j = i + 1; j < medications.length; j++) {
        const med1 = medications[i];
        const med2 = medications[j];

        if (interactions[med1]?.includes(med2)) {
          warnings.push(`⚠️ Potential interaction: ${med1} + ${med2}`);
        }
      }
    }

    return {
      safe: warnings.length === 0,
      warnings,
    };
  }
}

export const prescriptionWriterService = new PrescriptionWriterService();

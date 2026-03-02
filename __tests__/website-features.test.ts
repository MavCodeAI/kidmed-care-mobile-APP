import { describe, it, expect, beforeEach } from "vitest";
import { prescriptionWriterService } from "../../lib/prescription-writer-service";
import { decisionTreesService } from "../../lib/decision-trees-service";

describe("Website Features - Prescription Writer", () => {
  beforeEach(() => {
    // Reset state
  });

  it("should generate prescription with correct dosage", () => {
    const rx = prescriptionWriterService.generatePrescription(
      "Acute Otitis Media",
      "John Doe",
      5,
      20,
      "Dr. Smith"
    );

    expect(rx.diagnosis).toBe("Acute Otitis Media");
    expect(rx.patientName).toBe("John Doe");
    expect(rx.patientAge).toBe(5);
    expect(rx.patientWeight).toBe(20);
    expect(rx.medications.length).toBeGreaterThan(0);
  });

  it("should adjust dosage based on patient weight", () => {
    const rx1 = prescriptionWriterService.generatePrescription(
      "Pneumonia",
      "Patient A",
      3,
      15,
      "Dr. Smith"
    );

    const rx2 = prescriptionWriterService.generatePrescription(
      "Pneumonia",
      "Patient B",
      5,
      20,
      "Dr. Smith"
    );

    // Heavier patient should have higher dosage
    const dose1 = parseInt(rx1.medications[0].dosage);
    const dose2 = parseInt(rx2.medications[0].dosage);
    expect(dose2).toBeGreaterThan(dose1);
  });

  it("should export prescription as text", () => {
    const rx = prescriptionWriterService.generatePrescription(
      "Gastroenteritis",
      "Jane Doe",
      2,
      12,
      "Dr. Johnson"
    );

    const text = prescriptionWriterService.exportPrescriptionAsText(rx);

    expect(text).toContain("℞ PRESCRIPTION");
    expect(text).toContain("Jane Doe");
    expect(text).toContain("Gastroenteritis");
    expect(text).toContain("MEDICATIONS");
  });

  it("should check drug interactions", () => {
    const result = prescriptionWriterService.checkDrugInteractions([
      "Amoxicillin",
      "Methotrexate",
    ]);

    expect(result.safe).toBe(false);
    expect(result.warnings.length).toBeGreaterThan(0);
  });

  it("should not flag safe drug combinations", () => {
    const result = prescriptionWriterService.checkDrugInteractions([
      "Amoxicillin",
      "Paracetamol",
    ]);

    expect(result.safe).toBe(true);
    expect(result.warnings.length).toBe(0);
  });

  it("should maintain prescription history", () => {
    prescriptionWriterService.generatePrescription(
      "Otitis",
      "Patient 1",
      3,
      15,
      "Dr. A"
    );
    prescriptionWriterService.generatePrescription(
      "Pneumonia",
      "Patient 2",
      4,
      18,
      "Dr. B"
    );

    const history = prescriptionWriterService.getPrescriptionHistory();
    expect(history.length).toBeGreaterThanOrEqual(2);
  });
});

describe("Website Features - Clinical Decision Trees", () => {
  it("should load all decision trees", () => {
    const trees = decisionTreesService.getAllTrees();
    expect(trees.length).toBeGreaterThan(0);
  });

  it("should get specific tree by ID", () => {
    const tree = decisionTreesService.getTree("fever-tree");
    expect(tree).toBeDefined();
    expect(tree?.name).toContain("Fever");
  });

  it("should get tree nodes", () => {
    const node = decisionTreesService.getNode("fever-tree", "fever-1");
    expect(node).toBeDefined();
    expect(node?.question).toBeDefined();
  });

  it("should navigate through fever tree", () => {
    const startNode = decisionTreesService.getNode("fever-tree", "fever-1");
    expect(startNode?.nextSteps).toBeDefined();
    expect(startNode?.nextSteps?.length).toBeGreaterThan(0);
  });

  it("should identify emergency urgency", () => {
    const node = decisionTreesService.getNode("fever-tree", "fever-neonatal");
    expect(node?.urgency).toBe("emergency");
    expect(node?.redFlags).toBeDefined();
    expect(node?.redFlags?.length).toBeGreaterThan(0);
  });

  it("should provide recommendations for each node", () => {
    const node = decisionTreesService.getNode("fever-tree", "fever-child");
    expect(node?.recommendations).toBeDefined();
    expect(node?.recommendations?.length).toBeGreaterThan(0);
  });

  it("should get next nodes in tree", () => {
    const nextNodes = decisionTreesService.getNextNodes("fever-tree", "fever-1");
    expect(nextNodes.length).toBeGreaterThan(0);
  });

  it("should trace path through tree", () => {
    const path = decisionTreesService.getTreePath(
      "fever-tree",
      "fever-1",
      "fever-end"
    );
    expect(path.length).toBeGreaterThan(0);
    expect(path[0].id).toBe("fever-1");
  });

  it("should load cough decision tree", () => {
    const tree = decisionTreesService.getTree("cough-tree");
    expect(tree).toBeDefined();
    expect(tree?.name).toContain("Cough");
  });

  it("should handle acute cough assessment", () => {
    const node = decisionTreesService.getNode("cough-tree", "cough-acute");
    expect(node?.question).toBeDefined();
    expect(node?.recommendations).toBeDefined();
  });
});

describe("Website Features - Integration", () => {
  it("should generate prescription and check interactions", () => {
    const rx = prescriptionWriterService.generatePrescription(
      "Acute Otitis Media",
      "Test Patient",
      4,
      16,
      "Dr. Test"
    );

    const medicationNames = rx.medications.map((m) => m.name);
    const interactions = prescriptionWriterService.checkDrugInteractions(
      medicationNames
    );

    expect(interactions).toBeDefined();
    expect(interactions.warnings).toBeDefined();
  });

  it("should navigate fever tree and get recommendations", () => {
    const startNode = decisionTreesService.getNode("fever-tree", "fever-1");
    expect(startNode).toBeDefined();

    const nextNodes = decisionTreesService.getNextNodes(
      "fever-tree",
      "fever-1"
    );
    expect(nextNodes.length).toBeGreaterThan(0);

    const infantNode = nextNodes.find((n) => n.id === "fever-infant");
    expect(infantNode?.recommendations).toBeDefined();
  });
});

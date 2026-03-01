/**
 * AI Clinical Decision Trees
 * Advanced diagnostic and treatment recommendation engine
 */

export interface DecisionNode {
  id: string;
  question?: string;
  type: 'question' | 'diagnosis' | 'recommendation';
  answers?: {
    text: string;
    nextNodeId: string;
    confidence?: number;
  }[];
  diagnosis?: string;
  confidence?: number;
  recommendations?: string[];
  references?: string[];
}

export interface ClinicalDecisionTree {
  id: string;
  name: string;
  description: string;
  rootNodeId: string;
  nodes: DecisionNode[];
  version: string;
  lastUpdated: Date;
}

export interface DecisionResult {
  treeId: string;
  diagnosis: string;
  confidence: number;
  recommendations: string[];
  references: string[];
  riskFactors: string[];
  nextSteps: string[];
}

class ClinicalDecisionTreeService {
  private trees: Map<string, ClinicalDecisionTree> = new Map();
  private decisionHistory: DecisionResult[] = [];

  constructor() {
    this.initializeDefaultTrees();
  }

  /**
   * Initialize default clinical decision trees
   */
  private initializeDefaultTrees() {
    // Fever Decision Tree
    const feverTree: ClinicalDecisionTree = {
      id: 'fever-diagnosis',
      name: 'Pediatric Fever Diagnosis Tree',
      description: 'Diagnostic pathway for fever in children',
      rootNodeId: 'fever-1',
      version: '1.0',
      lastUpdated: new Date(),
      nodes: [
        {
          id: 'fever-1',
          question: 'What is the child\'s age?',
          type: 'question',
          answers: [
            { text: '0-3 months', nextNodeId: 'fever-infant', confidence: 0.9 },
            { text: '3-36 months', nextNodeId: 'fever-toddler', confidence: 0.9 },
            { text: '>3 years', nextNodeId: 'fever-older', confidence: 0.9 },
          ],
        },
        {
          id: 'fever-infant',
          question: 'Is the infant appearing well or toxic?',
          type: 'question',
          answers: [
            { text: 'Well-appearing', nextNodeId: 'fever-infant-well', confidence: 0.85 },
            { text: 'Toxic-appearing', nextNodeId: 'fever-infant-toxic', confidence: 0.85 },
          ],
        },
        {
          id: 'fever-infant-well',
          diagnosis: 'Possible Occult Bacteremia',
          confidence: 0.75,
          type: 'diagnosis',
          recommendations: [
            'Perform CBC with differential',
            'Obtain blood culture',
            'Consider urinalysis and urine culture',
            'Empiric antibiotic therapy if high-risk features',
          ],
          references: [
            'AAP Fever in Infants and Young Children Guidelines',
            'Rochester Criteria for Low-Risk Infants',
          ],
        },
        {
          id: 'fever-infant-toxic',
          diagnosis: 'Sepsis/Serious Bacterial Infection',
          confidence: 0.9,
          type: 'diagnosis',
          recommendations: [
            'URGENT: Full septic workup',
            'Blood culture, CBC, CMP, lactate',
            'Lumbar puncture (if indicated)',
            'Empiric broad-spectrum antibiotics',
            'IV fluid resuscitation',
          ],
          references: [
            'Surviving Sepsis Campaign Guidelines',
            'Pediatric Sepsis Protocol',
          ],
        },
        {
          id: 'fever-toddler',
          question: 'Are there localizing symptoms?',
          type: 'question',
          answers: [
            { text: 'Respiratory symptoms', nextNodeId: 'fever-respiratory', confidence: 0.8 },
            { text: 'Urinary symptoms', nextNodeId: 'fever-uti', confidence: 0.8 },
            { text: 'No localizing symptoms', nextNodeId: 'fever-fuo', confidence: 0.8 },
          ],
        },
        {
          id: 'fever-respiratory',
          diagnosis: 'Acute Respiratory Infection',
          confidence: 0.8,
          type: 'diagnosis',
          recommendations: [
            'Chest X-ray if pneumonia suspected',
            'Viral testing (RSV, influenza, COVID-19)',
            'Supportive care',
            'Antipyretics for comfort',
          ],
          references: ['AAP Pneumonia Guidelines'],
        },
        {
          id: 'fever-uti',
          diagnosis: 'Urinary Tract Infection',
          confidence: 0.85,
          type: 'diagnosis',
          recommendations: [
            'Urinalysis and urine culture',
            'Renal ultrasound',
            'Prophylactic antibiotics pending culture',
            'Follow-up imaging if recurrent UTI',
          ],
          references: ['AAP UTI Guidelines'],
        },
        {
          id: 'fever-fuo',
          diagnosis: 'Fever of Unknown Origin',
          confidence: 0.6,
          type: 'diagnosis',
          recommendations: [
            'CBC with differential',
            'Blood culture',
            'Urinalysis and urine culture',
            'Consider imaging based on clinical findings',
            'Follow-up in 24-48 hours',
          ],
          references: ['FUO Diagnostic Workup'],
        },
        {
          id: 'fever-older',
          question: 'Duration of fever?',
          type: 'question',
          answers: [
            { text: '<3 days', nextNodeId: 'fever-acute', confidence: 0.8 },
            { text: '3-7 days', nextNodeId: 'fever-subacute', confidence: 0.8 },
            { text: '>7 days', nextNodeId: 'fever-chronic', confidence: 0.8 },
          ],
        },
        {
          id: 'fever-acute',
          diagnosis: 'Acute Viral Illness',
          confidence: 0.75,
          type: 'diagnosis',
          recommendations: [
            'Supportive care',
            'Antipyretics',
            'Hydration',
            'Reassess if symptoms persist',
          ],
          references: ['AAP Acute Illness Guidelines'],
        },
        {
          id: 'fever-subacute',
          diagnosis: 'Subacute Infection',
          confidence: 0.7,
          type: 'diagnosis',
          recommendations: [
            'CBC with differential',
            'Blood culture',
            'Consider imaging',
          ],
          references: ['Subacute Infection Workup'],
        },
        {
          id: 'fever-chronic',
          diagnosis: 'Fever of Unknown Origin',
          confidence: 0.65,
          type: 'diagnosis',
          recommendations: [
            'Comprehensive metabolic panel',
            'Blood cultures',
            'Imaging studies',
            'Infectious disease consultation',
          ],
          references: ['Chronic FUO Guidelines'],
        },
      ],
    };

    this.trees.set('fever-diagnosis', feverTree);
  }

  /**
   * Get decision tree by ID
   */
  getTree(treeId: string): ClinicalDecisionTree | undefined {
    return this.trees.get(treeId);
  }

  /**
   * List all available decision trees
   */
  listTrees(): ClinicalDecisionTree[] {
    return Array.from(this.trees.values());
  }

  /**
   * Navigate through decision tree
   */
  navigateTree(treeId: string, nodeId: string): DecisionNode | undefined {
    const tree = this.trees.get(treeId);
    if (!tree) return undefined;
    return tree.nodes.find(n => n.id === nodeId);
  }

  /**
   * Get diagnosis from decision path
   */
  getDiagnosis(treeId: string, nodeId: string): DecisionResult | undefined {
    const tree = this.trees.get(treeId);
    if (!tree) return undefined;

    const node = tree.nodes.find(n => n.id === nodeId);
    if (!node || node.type !== 'diagnosis') return undefined;

    const result: DecisionResult = {
      treeId,
      diagnosis: node.diagnosis || 'Unknown',
      confidence: node.confidence || 0.5,
      recommendations: node.recommendations || [],
      references: node.references || [],
      riskFactors: [],
      nextSteps: [
        'Review recommendations with patient/family',
        'Document decision in patient record',
        'Schedule follow-up as indicated',
      ],
    };

    this.decisionHistory.push(result);
    return result;
  }

  /**
   * Get decision history
   */
  getDecisionHistory(limit: number = 50): DecisionResult[] {
    return this.decisionHistory.slice(-limit);
  }

  /**
   * Get statistics on decision tree usage
   */
  getUsageStatistics() {
    return {
      totalDecisions: this.decisionHistory.length,
      treeUsage: Array.from(this.trees.keys()).map(treeId => ({
        treeId,
        usageCount: this.decisionHistory.filter(d => d.treeId === treeId).length,
      })),
      averageConfidence: this.decisionHistory.length > 0
        ? this.decisionHistory.reduce((sum, d) => sum + d.confidence, 0) / this.decisionHistory.length
        : 0,
    };
  }
}

export const clinicalDecisionTreeService = new ClinicalDecisionTreeService();

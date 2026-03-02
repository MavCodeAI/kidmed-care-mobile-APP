// Clinical Decision Trees Service - Mock Implementation
export interface TreeNode {
  id: string;
  question: string;
  urgency: 'emergency' | 'urgent' | 'routine';
  redFlags?: string[];
  recommendations?: string[];
  nextSteps?: { answer: string; nodeId: string }[];
}

export interface DecisionTree {
  id: string;
  name: string;
  description: string;
  startNodeId: string;
  nodes: TreeNode[];
}

export class DecisionTreesService {
  private trees: DecisionTree[] = [];

  constructor() {
    this.initializeDefaultTrees();
  }

  private initializeDefaultTrees() {
    // Fever Decision Tree
    const feverTree: DecisionTree = {
      id: 'fever-tree',
      name: 'Fever Management',
      description: 'Interactive fever assessment and management pathway',
      startNodeId: 'fever-1',
      nodes: [
        {
          id: 'fever-1',
          question: "What is the child's age?",
          urgency: 'routine',
          nextSteps: [
            { answer: '< 3 months', nodeId: 'fever-neonatal' },
            { answer: '3-36 months', nodeId: 'fever-infant' },
            { answer: '> 36 months', nodeId: 'fever-child' },
          ],
        },
        {
          id: 'fever-neonatal',
          question: 'Fever in neonate (< 3 months)',
          urgency: 'emergency',
          redFlags: ['Any fever > 38°C', 'Lethargy', 'Poor feeding', 'Respiratory distress'],
          recommendations: [
            '🚨 EMERGENCY EVALUATION REQUIRED',
            'Full sepsis workup (blood culture, CBC, CRP, UA)',
            'Consider empiric antibiotics (Ampicillin + Gentamicin)',
            'Hospitalization recommended',
          ],
          nextSteps: [
            { answer: 'Proceed to workup', nodeId: 'fever-end' },
          ],
        },
        {
          id: 'fever-infant',
          question: 'Fever in infant (3-36 months)',
          urgency: 'urgent',
          redFlags: ['Temp > 39°C', 'Petechial rash', 'Altered mental status', 'Meningeal signs'],
          recommendations: [
            '⚠️ Urgent evaluation needed',
            'Check for focal infection signs',
            'Consider UTI screening (especially girls)',
            'Antipyretics: Paracetamol 15mg/kg or Ibuprofen 10mg/kg',
          ],
          nextSteps: [
            { answer: 'Focal signs present', nodeId: 'fever-focal' },
            { answer: 'No focal signs', nodeId: 'fever-occult' },
          ],
        },
        {
          id: 'fever-child',
          question: 'Fever in child (> 36 months)',
          urgency: 'routine',
          redFlags: ['Petechial rash', 'Meningeal signs', 'Altered consciousness'],
          recommendations: [
            'Most fevers are viral and self-limiting',
            'Supportive care: fluids, rest',
            'Antipyretics for comfort (not mandatory)',
            'Return precautions: rash, difficulty breathing, lethargy',
          ],
          nextSteps: [
            { answer: 'Red flag present', nodeId: 'fever-emergency' },
            { answer: 'No red flags', nodeId: 'fever-supportive' },
          ],
        },
        {
          id: 'fever-focal',
          question: 'Focal infection identified',
          urgency: 'urgent',
          recommendations: [
            'Treat identified condition (otitis, pharyngitis, etc)',
            'Appropriate antibiotic based on diagnosis',
            'Follow-up in 48 hours',
          ],
          nextSteps: [
            { answer: 'Continue', nodeId: 'fever-end' },
          ],
        },
        {
          id: 'fever-occult',
          question: 'No focal signs of infection',
          urgency: 'routine',
          recommendations: [
            'Likely viral fever',
            'Supportive care',
            'Close follow-up within 24 hours',
            'Return if worsening or new symptoms',
          ],
          nextSteps: [
            { answer: 'Continue', nodeId: 'fever-end' },
          ],
        },
        {
          id: 'fever-emergency',
          question: 'Red flag symptoms present',
          urgency: 'emergency',
          redFlags: ['Petechial rash', 'Meningeal signs', 'Altered mental status'],
          recommendations: [
            '🚨 EMERGENCY EVALUATION REQUIRED',
            'Possible meningitis or sepsis',
            'Full sepsis workup',
            'Empiric antibiotics after blood culture',
          ],
          nextSteps: [
            { answer: 'Proceed to ED', nodeId: 'fever-end' },
          ],
        },
        {
          id: 'fever-supportive',
          question: 'Supportive care pathway',
          urgency: 'routine',
          recommendations: [
            '✓ Fluids and rest',
            '✓ Antipyretics as needed',
            '✓ Monitor for complications',
            '✓ Follow-up if fever persists > 5 days',
          ],
          nextSteps: [
            { answer: 'End', nodeId: 'fever-end' },
          ],
        },
        {
          id: 'fever-end',
          question: 'Assessment Complete',
          urgency: 'routine',
          recommendations: ['See above recommendations'],
        },
      ],
    };

    // Cough Decision Tree
    const coughTree: DecisionTree = {
      id: 'cough-tree',
      name: 'Cough Assessment',
      description: 'Interactive cough evaluation and management',
      startNodeId: 'cough-1',
      nodes: [
        {
          id: 'cough-1',
          question: 'Duration of cough?',
          urgency: 'routine',
          nextSteps: [
            { answer: 'Acute (< 2 weeks)', nodeId: 'cough-acute' },
            { answer: 'Subacute (2-4 weeks)', nodeId: 'cough-subacute' },
            { answer: 'Chronic (> 4 weeks)', nodeId: 'cough-chronic' },
          ],
        },
        {
          id: 'cough-acute',
          question: 'Acute cough assessment',
          urgency: 'routine',
          recommendations: [
            'Most commonly viral URI',
            'Check for stridor (croup), wheeze (asthma), crackles (pneumonia)',
            'Supportive care: fluids, humidifier',
            'No routine antibiotics unless bacterial pneumonia suspected',
          ],
          nextSteps: [
            { answer: 'Continue', nodeId: 'cough-end' },
          ],
        },
        {
          id: 'cough-subacute',
          question: 'Subacute cough',
          urgency: 'routine',
          recommendations: [
            'Consider: post-viral cough, pertussis, asthma',
            'Check vaccination status for pertussis',
            'Consider CXR if persistent',
          ],
          nextSteps: [
            { answer: 'Continue', nodeId: 'cough-end' },
          ],
        },
        {
          id: 'cough-chronic',
          question: 'Chronic cough (> 4 weeks)',
          urgency: 'routine',
          recommendations: [
            'Common causes: asthma, GERD, allergies, habit cough',
            'Detailed history and examination needed',
            'Consider CXR and spirometry',
            'Refer to specialist if diagnosis unclear',
          ],
          nextSteps: [
            { answer: 'Continue', nodeId: 'cough-end' },
          ],
        },
        {
          id: 'cough-end',
          question: 'Assessment Complete',
          urgency: 'routine',
          recommendations: ['See above recommendations'],
        },
      ],
    };

    this.trees.push(feverTree, coughTree);
  }

  getTree(treeId: string): DecisionTree | undefined {
    return this.trees.find(t => t.id === treeId);
  }

  getAllTrees(): DecisionTree[] {
    return [...this.trees];
  }

  getNode(treeId: string, nodeId: string): TreeNode | undefined {
    const tree = this.getTree(treeId);
    return tree?.nodes.find(n => n.id === nodeId);
  }

  getNextNodes(treeId: string, currentNodeId: string): TreeNode[] {
    const tree = this.getTree(treeId);
    if (!tree) return [];

    const currentNode = tree.nodes.find(n => n.id === currentNodeId);
    if (!currentNode || !currentNode.nextSteps) return [];

    return currentNode.nextSteps
      .map(step => tree.nodes.find(n => n.id === step.nodeId))
      .filter((node): node is TreeNode => node !== undefined);
  }

  getTreePath(treeId: string, startNodeId: string, endNodeId: string): TreeNode[] {
    const tree = this.getTree(treeId);
    if (!tree) return [];

    const path: TreeNode[] = [];
    let currentId = startNodeId;

    while (currentId && path.length < 20) {
      const node = tree.nodes.find(n => n.id === currentId);
      if (!node) break;

      path.push(node);

      if (currentId === endNodeId) break;

      // Move to next node (simplified)
      if (node.nextSteps && node.nextSteps.length > 0) {
        currentId = node.nextSteps[0].nodeId;
      } else {
        break;
      }
    }

    return path;
  }
}

export const decisionTreesService = new DecisionTreesService();

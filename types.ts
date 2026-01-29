export type Page = 'dashboard' | 'documents' | 'compliance' | 'settings';

export interface ActionChip {
  label: string;
  action: string;
}

export interface DocumentAnalysis {
  summary: string[];
  tone_check: string;
  complexity_score: number;
}

export interface RiskMatrix {
  high_priority: string[];
  medium_priority: string[];
  low_priority: string[];
}

export interface GovernanceScore {
  rating: number;
  esg_notes: string;
}

export interface LexiGuardResponse {
  document_analysis: DocumentAnalysis;
  risk_matrix: RiskMatrix;
  action_chips: ActionChip[];
  governance_score: GovernanceScore;
}

export interface AnalysisState {
  status: 'idle' | 'analyzing' | 'complete' | 'error';
  data: LexiGuardResponse | null;
  error?: string;
}
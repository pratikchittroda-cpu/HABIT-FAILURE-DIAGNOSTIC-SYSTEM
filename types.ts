export interface DiagnosticResult {
  habitSummary: string;
  failureTriggers: string[];
  psychologicalCause: string;
  environmentalCause: string;
  structuralAdjustment: string;
}

export enum AnalysisStage {
  INIT = "INITIALIZING CORE",
  PATTERN = "ANALYZING BEHAVIORAL PATTERNS",
  ENV = "SCANNING ENVIRONMENTAL FACTORS",
  ROOT = "CALCULATING ROOT CAUSE",
  REPORT = "GENERATING DIAGNOSTIC REPORT"
}
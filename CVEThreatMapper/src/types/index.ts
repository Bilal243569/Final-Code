export interface TTPs {
  id: string;
  name: string;
  description: string;
  tactic: string;
}

export interface AIResponse {
  cveId?: string;
  description?: string;
  ttps: TTPs[];
  processingTime: number;
}
export interface TTP {
  predicted_ttps: string[];
}

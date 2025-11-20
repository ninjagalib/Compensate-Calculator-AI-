export interface UserProfile {
  currentRole: string;
  yearsExperience: number;
  location: string;
  currency: string;
  industry: string;
  
  // Detailed Compensation
  baseSalary: number;
  monthlyIncentive: number;
  monthlyProfitShare: number;
  annualOvertime: number;
  festivalBonus: number;
  providentFund: number;
  gratuity: number;
  benefits: string[];
}

export interface SalaryRange {
  min: number;
  median: number;
  max: number;
}

export interface NextRolePrediction {
  roleTitle: string;
  timeframeYears: string;
  probabilityScore: number;
  salaryRange: SalaryRange;
  requiredSkills: string[];
}

export interface MarketAnalysis {
  currentRoleMarketValue: SalaryRange;
  paymentStatus: 'Underpaid' | 'Fair' | 'Highly Competitive';
  percentile: number;
  gapAnalysis: string;
}

export interface CompensationInsights {
  marketAnalysis: MarketAnalysis;
  nextCareerMove: NextRolePrediction;
  negotiationTips: string[];
  verdictColor: string; // Hex code or tailwind class hint
}
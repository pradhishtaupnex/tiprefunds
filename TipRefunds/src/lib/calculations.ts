export interface CalculationInput {
  employees: string;
  monthlyTips: string;
  state: string;
}

export interface CalculationResult {
  estimatedCredit: number;
  annualCredit: number;
  threeYearTotal: number;
  breakdown: {
    perEmployee: number;
    ficaRate: number;
    tipExcess: number;
  };
}

export function calculateFICATipCredit(input: CalculationInput): CalculationResult {
  const employeeCount = getEmployeeCount(input.employees);
  const monthlyTipAmount = getTipAmount(input.monthlyTips);

  const annualTips = monthlyTipAmount * 12;
  const tipsPerEmployee = annualTips / employeeCount;

  const federalMinWage = 5.15;
  const hoursPerYear = 2080;
  const minWageThreshold = federalMinWage * hoursPerYear;

  const excessTipsPerEmployee = Math.max(0, tipsPerEmployee - minWageThreshold);

  const ficaRate = 0.0765;

  const creditPerEmployee = excessTipsPerEmployee * ficaRate;
  const annualCredit = creditPerEmployee * employeeCount;
  const threeYearTotal = annualCredit * 3;

  return {
    estimatedCredit: Math.round(annualCredit),
    annualCredit: Math.round(annualCredit),
    threeYearTotal: Math.round(threeYearTotal),
    breakdown: {
      perEmployee: Math.round(creditPerEmployee),
      ficaRate: ficaRate,
      tipExcess: Math.round(excessTipsPerEmployee),
    },
  };
}

function getEmployeeCount(range: string): number {
  const midpoints: { [key: string]: number } = {
    '5-10': 7.5,
    '11-20': 15.5,
    '21-50': 35.5,
    '51-100': 75.5,
    '100+': 125,
  };
  return midpoints[range] || 20;
}

function getTipAmount(range: string): number {
  const midpoints: { [key: string]: number } = {
    '5k-20k': 12500,
    '20k-50k': 35000,
    '50k-100k': 75000,
    '100k+': 125000,
  };
  return midpoints[range] || 35000;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

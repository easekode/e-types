enum InvestmentGoal {
  EDUCATION = 'EDUCATION',
  HOME = 'HOME',
  MARRIAGE = 'MARRIAGE',
  HEALTH = 'HEALTH',
  TRAVEL = 'TRAVEL',
  VEHICLE = 'VEHICLE',
  CAREER = 'CAREER',
  RETIREMENT = 'RETIREMENT',
  GADGET = 'GADGET',
  EMERGENCY_FUND = 'EMERGENCY_FUND',
  START_BUSINESS = 'START_BUSINESS',
  OTHER = 'OTHER',
}

export type InvestmentGoalDetail = {
  id: string;
  shortDesc: string;
  longDesc: string;
  label: string;
  position: number;
};

export const InvestmentGoalDetails: Record<
  InvestmentGoal,
  InvestmentGoalDetail
> = {
  [InvestmentGoal.EDUCATION]: {
    id: 'EDUCATION',
    shortDesc: 'Plan for quality education',
    longDesc: 'Plan for quality education',
    label: 'Education',
    position: 1,
  },
  [InvestmentGoal.HOME]: {
    id: 'HOME',
    shortDesc: 'Buy your dream home',
    longDesc: 'Buy your dream home',
    label: 'Home',
    position: 2,
  },
  [InvestmentGoal.MARRIAGE]: {
    id: 'MARRIAGE',
    shortDesc: 'Perfect wedding planning',
    longDesc: 'Perfect wedding planning',
    label: 'Marriage',
    position: 3,
  },
  [InvestmentGoal.HEALTH]: {
    id: 'HEALTH',
    shortDesc: 'Health care & wellness',
    longDesc: 'Health care & wellness',
    label: 'Health',
    position: 4,
  },
  [InvestmentGoal.TRAVEL]: {
    id: 'TRAVEL',
    shortDesc: 'Explore the world',
    longDesc: 'Explore the world',
    label: 'Travel',
    position: 5,
  },
  [InvestmentGoal.VEHICLE]: {
    id: 'VEHICLE',
    shortDesc: 'Get your dream car',
    longDesc: 'Get your dream car',
    label: 'Vehicle',
    position: 6,
  },
  [InvestmentGoal.CAREER]: {
    id: 'CAREER',
    shortDesc: 'Professional development',
    longDesc: 'Professional development',
    label: 'Career',
    position: 7,
  },
  [InvestmentGoal.RETIREMENT]: {
    id: 'RETIREMENT',
    shortDesc: 'Secure Retirement',
    longDesc: 'Secure Retirement',
    label: 'Retirement',
    position: 8,
  },
  [InvestmentGoal.GADGET]: {
    id: 'GADGET',
    shortDesc: 'Latest Technology',
    longDesc: 'Latest Technology',
    label: 'Gadget',
    position: 9,
  },
  [InvestmentGoal.EMERGENCY_FUND]: {
    id: 'EMERGENCY_FUND',
    shortDesc: 'Financial safety net',
    longDesc: 'Financial safety net',
    label: 'Emergency Fund',
    position: 10,
  },
  [InvestmentGoal.START_BUSINESS]: {
    id: 'START_BUSINESS',
    shortDesc: 'Entrepreneurial dreams',
    longDesc: 'Entrepreneurial dreams',
    label: 'Start Business',
    position: 11,
  },
  [InvestmentGoal.OTHER]: {
    id: 'OTHER',
    shortDesc: 'Custom investment goal',
    longDesc: 'Custom investment goal',
    label: 'Other',
    position: 12,
  },
};

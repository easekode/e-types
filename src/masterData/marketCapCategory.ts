import { NewMarketCapCategory } from '../marketCapCategory';
import { MarketCapCategoryEnum, RiskProfileEnum } from '../marketCaps';

export const marketCapCatId = {
  [MarketCapCategoryEnum.LARGE_CAP]: '100',
  [MarketCapCategoryEnum.MID_CAP]: '103',
  [MarketCapCategoryEnum.SMALL_CAP]: '104',
  [MarketCapCategoryEnum.FLEXI_CAP]: 'ckz1l1a1a000004q1a1a1a1a4',
  [MarketCapCategoryEnum.HYBRID]: 'ckz1l1a1a000005q1a1a1a1a5',
  [MarketCapCategoryEnum.ELSS]: 'ckz1l1a1a000006q1a1a1a1a6',
  [MarketCapCategoryEnum.INDEX]: 'ckz1l1a1a000007q1a1a1a1a7',
  [MarketCapCategoryEnum.SECTOR]: 'ckz1l1a1a000008q1a1a1a1a8',
  [MarketCapCategoryEnum.INTERNATIONAL]: 'ckz1l1a1a000009q1a1a1a1a9',
  [MarketCapCategoryEnum.OTHER]: 'ckz1l1a1a00000aq1a1a1a1aa',
  [MarketCapCategoryEnum.LARGE_MID_CAP]: '101',
  [MarketCapCategoryEnum.MICRO_CAP]: 'ckz1l1a1a00000cq1a1a1a1ac',
  [MarketCapCategoryEnum.NANO_CAP]: 'ckz1l1a1a00000dq1a1a1a1ad',
  [MarketCapCategoryEnum.MULTI_CAP]: 'ckz1l1a1a00000eq1a1a1a1ae',
};

export const marketCapCategoriesSeed: NewMarketCapCategory[] = [
  {
    id: marketCapCatId.LARGE_CAP,
    category: MarketCapCategoryEnum.LARGE_CAP,
    shortDescription: 'Stable large companies',
    longDescription:
      'Large cap companies are well-established, financially sound, and have a large market capitalization. They are considered stable investments.',
    riskProfile: RiskProfileEnum.LOW,
    returnRateRange: [6, 10],
    isActive: true,
    aliases: ['large', 'large-cap', 'largecap'],
  },
  {
    id: marketCapCatId.MID_CAP,
    category: MarketCapCategoryEnum.MID_CAP,
    shortDescription: 'Growing mid-sized companies',
    longDescription:
      'Mid cap companies are in the growth phase and offer a balance between risk and return, with moderate market capitalization.',
    riskProfile: RiskProfileEnum.MODERATE,
    returnRateRange: [8, 14],
    isActive: true,
    aliases: ['mid', 'mid-cap', 'midcap'],
  },
  {
    id: marketCapCatId.SMALL_CAP,
    category: MarketCapCategoryEnum.SMALL_CAP,
    shortDescription: 'High growth potential',
    longDescription:
      'Small cap companies have high growth potential but are riskier and more volatile compared to large and mid cap companies.',
    riskProfile: RiskProfileEnum.HIGH,
    returnRateRange: [10, 20],
    isActive: true,
    aliases: ['small', 'small-cap', 'smallcap'],
  },
  {
    id: marketCapCatId.LARGE_MID_CAP,
    category: MarketCapCategoryEnum.LARGE_MID_CAP,
    shortDescription: 'Blend of large and mid companies',
    longDescription:
      'Large & Mid cap funds invest in a mix of large and mid cap companies, providing a balance of stability and growth potential.',
    riskProfile: RiskProfileEnum.MODERATELY_HIGH,
    returnRateRange: [7, 16],
    isActive: true,
    aliases: [
      'large & mid',
      'large and mid',
      'large-mid',
      'large mid',
      'large/mid',
    ],
  },
  // {
  //   id: 'ckz1l1a1a000004q1a1a1a1a4',
  //   category: MarketCapCategoryEnum.FLEXI_CAP,
  //   shortDescription: 'Flexible allocation',
  //   longDescription:
  //     'Flexi cap funds can invest in companies of any market capitalization, allowing fund managers flexibility to optimize returns.',
  //   riskProfile: RiskProfileEnum.MODERATE,
  //   returnRateRange: [7, 16],
  //   isActive: true,
  //   aliases: ['flexi', 'flexi-cap', 'flexicap'],
  // },
  //   {
  //     id: 'ckz1l1a1a000005q1a1a1a1a5',
  //     category: MarketCapCategoryEnum.MICRO_CAP,
  //     shortDescription: 'Very small companies.',
  //     longDescription:
  //       'Micro cap companies are the smallest in terms of market capitalization and are highly speculative and volatile.',
  //     riskProfile: RiskProfileEnum.VERY_HIGH,
  //     returnRateRange: [12, 25],
  //   },
  //   {
  //     id: 'ckz1l1a1a000006q1a1a1a1a6',
  //     category: MarketCapCategoryEnum.NANO_CAP,
  //     shortDescription: 'Tiny, speculative companies.',
  //     longDescription:
  //       'Nano cap companies are extremely small and speculative, with the highest risk and potential for large returns or losses.',
  //     riskProfile: RiskProfileEnum.VERY_HIGH,
  //     returnRateRange: [15, 30],
  //   },
  //   {
  //     id: 'ckz1l1a1a000007q1a1a1a1a7',
  //     category: MarketCapCategoryEnum.MULTI_CAP,
  //     shortDescription: 'Invests across all caps.',
  //     longDescription:
  //       'Multi cap funds invest in a mix of large, mid, and small cap companies, providing diversification and balanced risk.',
  //     riskProfile: RiskProfileEnum.MODERATELY_HIGH,
  //     returnRateRange: [8, 18],
  //   },
];

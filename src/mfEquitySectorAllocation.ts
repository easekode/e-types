import { z } from 'zod';

export const mfEquityAllocationSchema = z.object({
  basicMaterialsNet: z.number(),
  communicationServicesNet: z.number(),
  consumerCyclicalNet: z.number(),
  consumerDefensiveNet: z.number(),
  energyNet: z.number(),
  financialServicesNet: z.number(),
  healthcareNet: z.number(),
  industrialsNet: z.number(),
  realEstateNet: z.number(),
  technologyNet: z.number(),
  utilitiesNet: z.number(),
});

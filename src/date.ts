import { z } from "zod";

export const DateObjOrString = z.preprocess((arg) => (typeof arg === 'string' ? new Date(arg) : arg), z.date())
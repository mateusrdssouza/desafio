import zod from "zod";

export const RedeemInvestmentSchema = zod.object({
  uuid: zod.string().uuid(),
});

export type RedeemInvestmentSchemaType = zod.infer<
  typeof RedeemInvestmentSchema
>;

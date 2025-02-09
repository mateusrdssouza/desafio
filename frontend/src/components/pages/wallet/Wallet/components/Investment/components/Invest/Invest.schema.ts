import zod from "zod";

export const CreateInvestmentSchema = zod
  .object({
    walletUuid: zod.string().uuid(),
    companyUuid: zod.string().uuid(),
    shares: zod
      .string({
        required_error: "Digite a quantidade de ações",
        invalid_type_error: "Digite uma quantidade válida",
      })
      .min(1, { message: "Digite a quantidade de ações" })
      .regex(/^[1-9]\d*$/, "Digite uma quantidade válida"),
  })
  .superRefine(({ shares }, ctx) => {
    const value = parseInt(shares);

    if (isNaN(value) || value < 1) {
      ctx.addIssue({
        path: ["shares"],
        code: "custom",
        message: "Digite uma quantidade válida",
      });
    }
  })
  .transform(fields => ({
    walletUuid: fields.walletUuid,
    companyUuid: fields.companyUuid,
    shares: parseInt(fields.shares),
  }));

export type CreateInvestmentSchemaType = zod.infer<
  typeof CreateInvestmentSchema
>;

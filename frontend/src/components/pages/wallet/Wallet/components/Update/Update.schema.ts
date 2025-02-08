import zod from "zod";

export const UpdateWalletSchema = zod.object({
  name: zod
    .string({
      required_error: "Digite um nome",
      invalid_type_error: "Digite um nome válido",
    })
    .min(1, { message: "Digite um nome" })
    .regex(/^\S.*$/, { message: "Digite um nome válido" }),
});

export type UpdateWalletSchemaType = zod.infer<typeof UpdateWalletSchema>;

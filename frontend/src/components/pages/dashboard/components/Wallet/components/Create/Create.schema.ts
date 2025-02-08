import zod from "zod";

export const CreateWalletSchema = zod.object({
  name: zod
    .string({
      required_error: "Digite um nome",
      invalid_type_error: "Digite um nome válido",
    })
    .min(1, { message: "Digite um nome" })
    .regex(/^\S.*$/, { message: "Digite um nome válido" }),
});

export type CreateWalletSchemaType = zod.infer<typeof CreateWalletSchema>;

import zod from "zod";

export const SigninSchema = zod.object({
  email: zod
    .string({
      required_error: "Informe um e-mail válido",
      invalid_type_error: "E-mail inválido",
    })
    .email({ message: "E-mail inválido" })
    .min(1, "Informe um e-mail"),

  password: zod
    .string({
      required_error: "Informe sua senha",
    })
    .min(6, "A senha deve conter no mínimo 6 caracteres"),
});

export type SigninSchemaType = zod.infer<typeof SigninSchema>;

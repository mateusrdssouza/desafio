import zod from "zod";

export const SignupSchema = zod.object({
  name: zod
    .string({
      required_error: "Informe seu nome",
      invalid_type_error: "Digite um nome válido",
    })
    .min(1, { message: "Informe seu nome" })
    .regex(/^\S.*$/, { message: "Digite um nome válido" }),

  email: zod
    .string({
      required_error: "Informe um e-mail válido",
      invalid_type_error: "E-mail inválido.",
    })
    .email({ message: "E-mail inválido." })
    .min(1, "Informe um e-mail."),

  password: zod
    .string({
      required_error: "Informe sua senha.",
    })
    .min(6, "A senha deve conter no mínimo 6 caracteres."),
});

export type SignupSchemaType = zod.infer<typeof SignupSchema>;

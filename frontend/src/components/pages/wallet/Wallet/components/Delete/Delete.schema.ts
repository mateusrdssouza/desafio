import zod from "zod";

export const DeleteWalletSchema = zod.object({
  uuid: zod.string().uuid(),
});

export type DeleteWalletSchemaType = zod.infer<typeof DeleteWalletSchema>;

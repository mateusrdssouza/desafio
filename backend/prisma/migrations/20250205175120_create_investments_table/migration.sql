-- CreateTable
CREATE TABLE "investments" (
    "id" SERIAL NOT NULL,
    "wallet_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "shares" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

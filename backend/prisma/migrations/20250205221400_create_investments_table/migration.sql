-- CreateTable
CREATE TABLE "investments" (
    "id" SERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "wallet_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "shares" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "investments_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "investments_uuid_key" ON "investments"("uuid");

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_wallet_id_fkey" FOREIGN KEY ("wallet_id") REFERENCES "wallets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "investments" ADD CONSTRAINT "investments_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "companies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

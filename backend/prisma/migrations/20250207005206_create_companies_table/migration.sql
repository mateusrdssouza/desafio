-- CreateEnum
CREATE TYPE "MarketRiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateTable
CREATE TABLE "companies" (
    "id" BIGSERIAL NOT NULL,
    "uuid" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "sector" TEXT NOT NULL,
    "ticker" TEXT NOT NULL,
    "stock_exchange" TEXT NOT NULL,
    "stock_price" BIGINT NOT NULL,
    "market_capitalization" BIGINT NOT NULL,
    "market_risk_level" "MarketRiskLevel" NOT NULL,
    "logo_url" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,
    "deleted_at" TIMESTAMP(3),

    CONSTRAINT "companies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "companies_uuid_key" ON "companies"("uuid");

-- CreateIndex
CREATE UNIQUE INDEX "companies_ticker_key" ON "companies"("ticker");

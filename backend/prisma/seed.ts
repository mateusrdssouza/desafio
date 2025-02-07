import { PrismaClient } from '@prisma/client';
import { randomUUID } from 'node:crypto';

const prisma = new PrismaClient();

async function main() {
  await prisma.company.createMany({
    data: [
      {
        uuid: randomUUID(),
        name: 'Apple Inc.',
        description:
          'Empresa de tecnologia, desenvolvedora do iPhone e outros dispositivos.',
        sector: 'Tecnologia',
        ticker: 'AAPL',
        stockExchange: 'NASDAQ',
        stockPrice: 14560,
        marketCapitalization: 2500000000000,
        marketRiskLevel: 'HIGH',
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg',
      },
      {
        uuid: randomUUID(),
        name: 'Microsoft Corp.',
        description:
          'Empresa de software, criadora do Windows, Office e outros produtos.',
        sector: 'Tecnologia',
        ticker: 'MSFT',
        stockExchange: 'NASDAQ',
        stockPrice: 30210,
        marketCapitalization: 2200000000000,
        marketRiskLevel: 'LOW',
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg',
      },
      {
        uuid: randomUUID(),
        name: 'Amazon.com Inc.',
        description: 'E-commerce e serviços de computação em nuvem.',
        sector: 'Varejo',
        ticker: 'AMZN',
        stockExchange: 'NASDAQ',
        stockPrice: 13320,
        marketCapitalization: 1700000000000,
        marketRiskLevel: 'MEDIUM',
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg',
      },
      {
        uuid: randomUUID(),
        name: 'Meta Platforms Inc.',
        description:
          'Empresa de mídia social, desenvolvedora do Facebook, Instagram e WhatsApp.',
        sector: 'Tecnologia',
        ticker: 'META',
        stockExchange: 'NASDAQ',
        stockPrice: 12050,
        marketCapitalization: 600000000000,
        marketRiskLevel: 'MEDIUM',
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg',
      },
      {
        uuid: randomUUID(),
        name: 'Netflix Inc.',
        description: 'Serviço de streaming de vídeos online.',
        sector: 'Entretenimento',
        ticker: 'NFLX',
        stockExchange: 'NASDAQ',
        stockPrice: 34030,
        marketCapitalization: 200000000000,
        marketRiskLevel: 'HIGH',
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/6/69/Netflix_logo.svg',
      },
      {
        uuid: randomUUID(),
        name: 'Nvidia Corp.',
        description:
          'Fabricante de processadores gráficos e soluções para inteligência artificial.',
        sector: 'Tecnologia',
        ticker: 'NVDA',
        stockExchange: 'NASDAQ',
        stockPrice: 48075,
        marketCapitalization: 900000000000,
        marketRiskLevel: 'LOW',
        logoUrl:
          'https://upload.wikimedia.org/wikipedia/commons/a/a4/NVIDIA_logo.svg',
      },
    ],
  });
}

async function run() {
  try {
    await main();
  } catch (e) {
    console.error(e);
  } finally {
    await prisma.$disconnect();
  }
}

run();

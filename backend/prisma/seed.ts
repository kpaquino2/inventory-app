import { faker } from '@faker-js/faker';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const categories = 15;
  const productsPerCategories = 20;
  for (let i = 0; i < categories; i++) {
    const data = Array.from({ length: productsPerCategories }).map(() => ({
      name: faker.commerce.productName(),
      desc: faker.commerce.productDescription(),
      price: +faker.commerce.price(),
    }));

    await prisma.category.create({
      data: {
        name: faker.commerce.department(),
        products: {
          create: data,
        },
      },
    });
  }
};

main()
  .then(() => {
    console.log('Database seeded!');
    return prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

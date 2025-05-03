import { faker } from '@faker-js/faker';
import { Position, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const main = async () => {
  const users = [
    {
      name: 'User User',
      position: Position.USER,
      username: 'useruser',
      password: '$2b$10$Q7LC7TC6PA7P6a94OiO7Hu.HZC5GFy4xW5McRo/qiZf8CzCmjfX9q',
    },
    {
      name: 'Auditor User',
      position: Position.AUDITOR,
      username: 'auditoruser',
      password: '$2b$10$azojxgOcj1eBr8u8/Xe7beifI/QwGA1691VBzsgnHhd8e3uh6dkNu',
    },
    {
      name: 'Admin User',
      position: Position.ADMIN,
      username: 'adminuser',
      password: '$2b$10$i7kTa455.N5aU9PYM0yB0eXkpCPtLajuywmxzW3.BLRteeIM390pO',
    },
  ];

  await prisma.user.createMany({ data: users });

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

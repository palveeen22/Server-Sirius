import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create users
  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      password: 'password1',
      role: 1,
      UserDetail: {
        create: {
          firstName: 'John',
          lastName: 'Doe',
          imageUrl: 'http://example.com/image1.jpg',
          balance: 100,
        },
      },
      Leason: {
        create: {
          title: 'Leason 1',
          date: new Date('2023-06-13T00:00:00Z'),
          startTime: new Date('2023-06-13T10:30:00Z'),
          endTime: new Date('2023-06-13T10:40:00Z'),
          Schedule: {
            create: {
              date: new Date('2023-06-13T00:00:00Z'),
            },
          },
        },
      },
    },
  });

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      password: 'password2',
      role: 2,
      UserDetail: {
        create: {
          firstName: 'Jane',
          lastName: 'Doe',
          imageUrl: 'http://example.com/image2.jpg',
          balance: 200,
        },
      },
      Leason: {
        create: {
          title: 'Leason 2',
          date: new Date('2023-06-14T00:00:00Z'),
          startTime: new Date('2023-06-14T11:00:00Z'),
          endTime: new Date('2023-06-14T11:30:00Z'),
          Schedule: {
            create: {
              date: new Date('2023-06-14T00:00:00Z'),
            },
          },
        },
      },
    },
  });

  console.log({ user1, user2 });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

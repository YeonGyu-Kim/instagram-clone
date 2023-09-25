import prisma from '@/app/libs/prismadb';

export default async function getCurrentUser(
  email: string,
  name: string,
  image: string
) {
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!email) {
      return null;
    }
    if (!currentUser) {
      await prisma.user.create({
        data: {
          email,
          name,
          image,
        },
      });
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

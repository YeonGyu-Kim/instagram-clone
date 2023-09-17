import prisma from '@/app/libs/prismadb';

export default async function getCurrentUser(email: string) {
  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (!currentUser) {
      return null;
    }
    return currentUser;
  } catch (error) {
    console.log(error);
    return null;
  }
}

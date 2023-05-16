import { client } from './sanity';

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  image?: string | null;
};

export async function addUser({ id, email, name, image }: OAuthUser) {
  const doc = {
    _id: id,
    _type: 'user',
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  };

  return client.createIfNotExists(doc).then((res) => {
    console.log('Bike was created (or was already present)');
  });
}

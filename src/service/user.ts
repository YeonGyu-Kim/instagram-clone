import { SearchUser } from '@/model/user';
import { client } from './sanity';

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({ id, email, name, username, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    email,
    name,
    username,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUserByUsername(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id":_id,
      following[]->{username,image},
      followers[]->{username,image},
      "bookmarks": bookmarks[]->_id
    }`
  );
}

export async function searchUser(keyword?: string) {
  const query = keyword
    ? `&& (name match "*${keyword}") || (username match "*${keyword}")`
    : '';
  return client
    .fetch(
      `*[_type == "user" ${query}]{
    ...,
    "following": count(following),
    "followers": count(followers),
  }`
    )
    .then((users) =>
      users.map((user: SearchUser) => ({
        ...user,
        following: user.following ?? 0,
        followers: user.followers ?? 0,
      }))
    );
}

export async function getUserForProfile(username: string) {
  return client
    .fetch(
      `*[_type == "user" && username == "${username}"][0]{
      ...,
      "id": _id,
      "following": count(following),
      "followers": count(followers),
      "posts": count(*[_type == "post" && author->username == "${username}"])
    }
    `
    )
    .then((user) => ({
      ...user,
      following: user?.following ?? 0,
      followers: user?.followers ?? 0,
      posts: user?.posts ?? 0,
    }));
}

export async function addBookmark(postId: string, token?: string) {
  if (token) {
    return client
      .patch(token)
      .setIfMissing({ bookmarks: [] })
      .append('bookmarks', [
        {
          _ref: postId,
          _type: 'reference',
        },
      ])
      .commit({ autoGenerateArrayKeys: true });
  } else {
    return;
  }
}

export async function removeBookmark(postId: string, token?: string) {
  if (!token) return;
  return client
    .patch(token)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}

export async function follow(targetId: string, myId?: string) {
  if (!myId) return;
  return client
    .transaction()
    .patch(myId, (user) =>
      user
        .setIfMissing({ following: [] })
        .append('following', [{ _ref: targetId, _type: 'reference' }])
    )
    .patch(targetId, (user) =>
      user
        .setIfMissing({ followers: [] })
        .append('followers', [{ _ref: myId, _type: 'reference' }])
    )
    .commit({ autoGenerateArrayKeys: true });
}

export async function unfollow(targetId: string, myId?: string) {
  if (!myId) return;
  return client
    .transaction()
    .patch(myId, (user) => user.unset([`following[_ref=="${targetId}"]`]))
    .patch(targetId, (user) => user.unset([`following[_ref=="${myId}"]`]))
    .commit({ autoGenerateArrayKeys: true });
}

export type Comment = {
  comment: string;
  username: string;
  image?: string;
};

export type SimplePost = Omit<FullPost, 'comments'> & {
  comments: number;
};

export type FullPost = {
  username: string;
  userImage: string;
  image: string;
  likes: string[];
  text: string;
  comments: Comment[];
  id: string;
  createdAt: string;
};

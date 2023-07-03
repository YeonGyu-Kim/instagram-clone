import { ProfileUser } from '@/model/user';
import Avatar from './Avatar';

type Props = {
  user: ProfileUser;
};

export default function UserProfile({ user }: Props) {
  const { image, username, name, followers, following, posts } = user;
  return (
    <section>
      <Avatar image={image} highlight />
    </section>
  );
}

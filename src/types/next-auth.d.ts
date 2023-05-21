import NextAuth from 'next-auth';
import { User } from '../../sanity-studio/model/user';

declare module 'next-auth' {
  interface Session {
    user: User;
  }
}

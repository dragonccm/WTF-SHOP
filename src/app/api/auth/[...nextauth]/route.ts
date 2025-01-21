import NextAuth, { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { checklogin } from "../../../../lib/actions/user.actions"; // Assuming checklogin has a proper type definition
import jwt from 'jsonwebtoken';

// Define the authentication options
export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials: any, req) {
        const user = await checklogin(credentials);
        if (user) {
          const accessToken = jwt.sign({ userId: user._id }, process.env.NEXTAUTH_SECRET, { expiresIn: '300h' });
          user.accessToken = accessToken;
          return user;
        }
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  callbacks: {
    async signIn({ user, account }: { user: AuthUser, account: Account }) {
      if (account?.provider === "credentials") {
        return true;
      }
      return null;
    },
    async session({ session, token }: { session: any, token: any }) {
      // Include _id and accessToken in the session object
      if (token.id) {
        session.user = {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken
        };
      }
      return session;
    },
    async jwt({ token, user }: { token: any, user: any }) {
      if (user) {
        token.id = user._id.toString(); // Ensure the id is a string
        token.accessToken = user.accessToken;
      }
      return token;
    }
  }
};

// Export the NextAuth handler
export default NextAuth(authOptions);
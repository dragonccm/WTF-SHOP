import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { checklogin } from "../../../../lib/actions/user.actions";
import jwt from "jsonwebtoken";

// Chỉ khai báo authOptions nhưng không export
const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<"username" | "password", string> | undefined) {
        if (!credentials) return null;
        const user = await checklogin(credentials);

        if (user) {
          const accessToken = jwt.sign(
            { userId: user._id },
            process.env.NEXTAUTH_SECRET!,
            { expiresIn: "300h" }
          );

          user.accessToken = accessToken;
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    newUser: "/register",
  },
  callbacks: {
    async signIn({ user, account }: { user: any; account: any }) {
      if (account?.provider === "credentials") {
        return true;
      }
      return false;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token.id) {
        session.user = {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken,
        };
      }
      return session;
    },
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.id = user._id.toString();
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
};

// Export handler trực tiếp từ NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

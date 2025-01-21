
import NextAuth, { Account, User as AuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { checklogin } from "../../../../lib/actions/user.actions";
import jwt from "jsonwebtoken";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const user = await checklogin(credentials);

        if (user) {
          // Tạo access token
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
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider === "credentials") {
        return true;
      }
      return false; // Trả về false nếu không hợp lệ
    },
    async session({ session, token }: { session: any; token: any }) {
      // Bao gồm _id và accessToken trong session
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
        token.id = user._id.toString(); // Chuyển id thành chuỗi
        token.accessToken = user.accessToken;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

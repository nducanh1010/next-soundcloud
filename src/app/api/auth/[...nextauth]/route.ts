import NextAuth, { AuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
  secret: process.env.NO_SECRET,
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    // ...add more providers here
  ],
  // gọi lại back end sau khi log in thành công
  callbacks: {
    // call back sex goij bawts cuws khi naof jwt duoc tao ra
    async jwt({ token, user, account, profile, isNewUser, trigger }) {
      if (trigger === "signIn" && account?.provider === "github") {
    //token đã được merge type từ type tự viết, login succes token sẽ lwuu dc dưới dạng cookie, sau đó nạp vào session
      }
      return token;
    },
    async session({ session, token, user }) {
        se
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

import { withAuth } from "next-auth/middleware";

export default withAuth({
  // Matches the pages config in `[...nextauth]`
  pages: {
    signIn: "/auth/signin",
  },
});
// neeus ng dungf chuwa ddawng nhaapj quay veef trang log in
export const config = { matcher: ["/playlist", "/track/upload","/like"] };

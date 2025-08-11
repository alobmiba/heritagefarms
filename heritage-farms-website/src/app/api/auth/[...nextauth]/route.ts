import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    isAdmin?: boolean;
  }
}

const allowed = (process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase());

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return false;
      return allowed.includes(user.email.toLowerCase());
    },
    async session({ session }) {
      // tag sessions as admin if email is whitelisted
      if (session?.user?.email && allowed.includes(session.user.email.toLowerCase())) {
        session.isAdmin = true;
      }
      return session;
    },
  },
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

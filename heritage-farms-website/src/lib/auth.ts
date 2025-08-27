import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Extend the built-in session types
declare module "next-auth" {
  interface Session {
    isAdmin?: boolean;
  }
  interface JWT {
    isAdmin?: boolean;
  }
}

const allowed = (process.env.ADMIN_EMAILS || "").split(",").map(s => s.trim().toLowerCase());

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  pages: {
    signIn: '/auth/signin',
    error: '/auth/error',
  },
  callbacks: {
    async signIn({ user }) {
      // Allow all users to sign in, but only grant admin access to whitelisted emails
      return !!user?.email;
    },
    async jwt({ token, user }) {
      // Add isAdmin to JWT token
      if (user?.email && allowed.includes(user.email.toLowerCase())) {
        token.isAdmin = true;
      } else if (token?.email && allowed.includes((token.email as string).toLowerCase())) {
        // Also check token.email for existing sessions
        token.isAdmin = true;
      }
      return token;
    },
    async session({ session, token }) {
      // Pass isAdmin from JWT to session
      if (token.isAdmin) {
        session.isAdmin = true;
      }
      return session;
    },
    async redirect({ url, baseUrl }) {
      // If redirecting to homepage, check if we should go to admin instead
      if (url === baseUrl || url === `${baseUrl}/`) {
        // Check if user is admin by looking at the session
        // For now, redirect to admin page
        return `${baseUrl}/admin`;
      }
      
      // Allow relative URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allow URLs from the same origin
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },
  },
  session: { 
    strategy: "jwt" 
  },
  secret: process.env.NEXTAUTH_SECRET,
};
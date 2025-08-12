import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";

// Extend the built-in session types
declare module "next-auth" {
  interface Session extends DefaultSession {
    isAdmin?: boolean;
  }
  interface JWT {
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
  pages: {
    signIn: '/api/auth/signin',
    error: '/api/auth/error',
  },
  callbacks: {
    async signIn({ user }) {
      // Allow all users to sign in, but only grant admin access to whitelisted emails
      console.log('SignIn callback - User email:', user?.email);
      console.log('Allowed emails:', allowed);
      console.log('Is admin?', user?.email && allowed.includes(user.email.toLowerCase()));
      return !!user?.email;
    },
    async jwt({ token, user }) {
      // Add isAdmin to JWT token
      if (user?.email && allowed.includes(user.email.toLowerCase())) {
        token.isAdmin = true;
        console.log('JWT callback - Admin access granted to token');
      } else if (token?.email && allowed.includes(token.email.toLowerCase())) {
        // Also check token.email for existing sessions
        token.isAdmin = true;
        console.log('JWT callback - Admin access granted to existing token');
      }
      console.log('JWT callback - Final token:', { email: token.email, isAdmin: token.isAdmin });
      return token;
    },
    async session({ session, token }) {
      // Pass isAdmin from JWT to session
      console.log('Session callback - User email:', session?.user?.email);
      console.log('Token isAdmin:', token.isAdmin);
      console.log('Allowed emails:', allowed);
      
      if (token.isAdmin) {
        session.isAdmin = true;
        console.log('Admin access granted to session');
      } else {
        console.log('Admin access denied to session');
      }
      console.log('Final session:', { email: session?.user?.email, isAdmin: session?.isAdmin });
      return session;
    },
    async redirect({ url, baseUrl }) {
      console.log('Redirect callback - url:', url, 'baseUrl:', baseUrl);
      
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
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };

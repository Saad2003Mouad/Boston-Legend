import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const { prisma } = await import("@/lib/prisma");
          
          // 1. Check Admin/Driver User table
          const user = await prisma.user.findUnique({
            where: { email: credentials.email.toLowerCase() },
          });

          if (user && user.active) {
            const isPasswordValid = await bcrypt.compare(
              credentials.password,
              user.passwordHash
            );

            if (isPasswordValid) {
              let parsedPermissions: string[] = [];
              try {
                parsedPermissions = typeof user.permissions === "string"
                  ? JSON.parse(user.permissions)
                  : (user.permissions as unknown as string[]);
              } catch {
                parsedPermissions = [];
              }

              return {
                id: user.id,
                email: user.email,
                name: user.name,
                role: user.role,
                permissions: parsedPermissions,
              } as any;
            }
          }

          // 2. If no admin found or password invalid, check Customer table
          const customer = await prisma.customer.findUnique({
            where: { email: credentials.email.toLowerCase() },
          });

          if (customer && customer.passwordHash) {
            const isCustomerPasswordValid = await bcrypt.compare(
              credentials.password,
              customer.passwordHash
            );

            if (isCustomerPasswordValid) {
              return {
                id: customer.id,
                email: customer.email,
                name: `${customer.firstName} ${customer.lastName}`,
                role: "CUSTOMER",
                permissions: [],
              } as any;
            }
          }

          return null;
        } catch (err) {
          console.warn("DB auth failed:", err);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.permissions = (user as any).permissions;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token && session.user) {
        (session.user as any).id = token.id;
        (session.user as any).role = token.role;
        (session.user as any).permissions = token.permissions;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, Prisma } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export const nextauthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate if credentials are provided
        if (!credentials?.password || !credentials?.email) {
          throw new Error("Invalid credentials provided");
        }

        // Fetch user from Prisma based on email
        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        // Handle case where user doesn't exist
        if (!user || !user.hashedPassword) {
          throw new Error("Invalid credentials provided");
        }

        // Compare hashed password
        const isCorrectPassword = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        // Handle incorrect password
        if (!isCorrectPassword) {
          throw new Error("Incorrect password provided");
        }

        // Return the user if everything is correct
        return {
          id: user.id,
          name: user.name,
          email: user.email,
          image: user.image,
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/", // Customize sign-in page
  },
  session: {
    strategy: "jwt", // Use JWT for session management
  },
  adapter: PrismaAdapter(prisma), // Attach Prisma adapter
  secret: process.env.NEXT_AUTH_SECRET, // Secret for JWT
};

export default NextAuth(nextauthOptions);

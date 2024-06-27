// import { nextauthOptions } from "@/pages/api/auth/[...nextauth]";
import { auth } from "@/auth";
import prisma from "@/prisma";

export default async function getCurrentUserSession() {
  try {
       const session = await auth();
       if(session?.user) {
        return session?.user;
       } else {
        return null
       }
    // return session;
  } catch (error) {
    return null;
  }
}

# DEVELOPMENT PROCESS OF ENVITAB BLOG SHOWCASING ARCJET.IO INFLUENCE

Welcome to the demonstration of Building a Secure Next.js Blog with Next-Auth, Fly.io and Arcjet - HackMD hackmd.io

## DEVELOPING OF NEXT AUTH

In providing the authentication, we are making use of Nextauth

### Developing of next auth api

**Api route:/api/[...nextauth]/route.js **

```json
import { handlers } from "@/auth";
export const { GET, POST } = handlers;

```

### auth file and middleware

So these files gives us access to the next-auth social providers such as google and github and they also retail the cookies for us which is used for authentication.
**/auth.jsx**

```json
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
});

```

**/middleware.jsx**

```json
export { auth as middleware } from "@/auth";

```

## DEVELOPING OF PRISMA SCHEMA AND NEXT API HANDLER FOR COMMENT SYSTEM

So we need to make use of prisma, which is an ORM tool for interacting with our data-base which is MONGO-DB. So the first steps, is installing the prisma packages

```json
npm i @next-auth/prisma-adapter primsa @prisma/client --legacy-peer-deps

```

### Developing of the prisma schema

After installing the prisma dependencies in our project, We move onto creating the prisma schema which models the structure of our comment system:

```json
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

model Comment {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  body      String?
  username  String?
  userimage String?
  postId  String?
  createdAt DateTime @default(now())
}

```

### Developing of next-api route handler

So since the prisma has been developed, we move onto the next action step which is basically creating route handlers for taking request and sending responses back to the client.

#### Setting up arcjet and post handler

So we set up the Arcjet config to rate limit the request comment send form the client section of the next app

```json
import { NextResponse } from "next/server";
import prisma from "@/prisma";
import { auth } from "@/auth";
import arcjet, { tokenBucket } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE", // will block requests. Use "DRY_RUN" to log only
      characteristics: ["userId"], // Rate limit based on the Clerk userId
      refillRate: 1, // refill 1 tokens per interval
      interval: 60, // refill every 60 seconds
      capacity: 1, // bucket maximum capacity of 1 tokens
    }),
  ],
});
```

So after stting up the arcjet config, We need to check out for the user session and also get the request body parameters sent form the client section of the next app. So we check to see first and essentially if the session exists. If it does not exist we send a nextresponse with the intended message. Then we set a condition demanding to see if the session exist if it do, we instantiate a variable called "useId". So the next step is to check of the session.user.id parameter exist cause most times nextauth do not give access to the user id it is only database that do that. So if it exists we set the userId to the session.use.id else we also cehck if the session contains an email. We then instantiate the userId to session.user?.email else if the session does not exist we send a nextresponse. Arcjet performs a decision for the user to see how many times the user has sent a request. if a bad decision is enciunterd to sends a nextreponse with the intended message. Aldo if no bad decision we create a comment for the usr taking the following parameters:

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `body`    | `string` | **Required**.User inputed comment |
| `postId`  | `string` | **Required**. post id             |

```json

    try {
       if (!session) {
         return NextResponse.json(
           { message: "You are not allowed to perform this action" },
           { status: 401 }
         );
       }

       if (session) {
         // console.log("User:", session.user);

         // If there is a user ID then use it, otherwise use the email
         let userId;
         if (session.user?.id) {
           userId = session.user.id;
         } else if (session.user?.email) {
           // A very simple hash to avoid sending PII to Arcjet. You may wish to add a
           // unique salt prefix to protect against reverse lookups.
           const email = session.user?.email;
           const emailHash = require("crypto")
             .createHash("sha256")
             .update(email)
             .digest("hex");

           userId = emailHash;
         } else {
           return Response.json({ message: "Unauthorized" }, { status: 401 });
         }

         // Deduct 5 tokens from the token bucket
         const decision = await aj.protect(req, { userId, requested: 1 });
         // console.log("Arcjet Decision:", decision);

         if (decision.isDenied()) {
           return Response.json(
             {
               message: "Too Many Requests",
               reason: decision.reason,
             },
             {
               status: 429,
             }
           );
         }
         // message creation handler

         const comment = await prisma.comment.create({
           data: {
             body,
             postId,
             username: session?.user?.name,
             userimage: session?.user?.image,
           },
         });

         return NextResponse.json(comment);
       }
     } catch (error) {
       return NextResponse.json(
         {
           message: error.response?.data?.message || error.message,
         },
         { status: error.response?.status || 500 }
       );
     }
```



// app/api/nsfw/route.js
import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@/auth";
import prisma from "@/prisma";
export async function POST(req) {
  const { body, postId } = await req.json();
  const session = await auth();
  if (!session) {
    return NextResponse.json(
      { message: "You are not allowed to perform this action" },
      { status: 401 }
    );
  }
  try {
    const comment = await prisma.comment.create({
      data: {
        body,
        postId,
        username: session?.user?.name,
        userimage: session?.user?.image,
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      {
        message: error.response?.data?.message || error.message,
      },
      { status: error.response?.status || 500 }
    );
  }
}

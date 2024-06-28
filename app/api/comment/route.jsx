// app/api/nsfw/route.js
import { NextResponse } from "next/server";
import axios from "axios";
import { auth } from "@/auth";
import prisma from "@/prisma";
export async function GET(req) {
  const { id } = params;
  try {
    const comment = await prisma.comment.findUnique({
      where: {
        postId: id,
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

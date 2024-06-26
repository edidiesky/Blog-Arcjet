// pages/api/protected.js
import arcjet, { detectBot, tokenBucket } from "@arcjet/next";
import { getSession } from "next-auth/client";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    detectBot({
      mode: "LIVE",
      block: ["AUTOMATED"],
    }),
    tokenBucket({
      mode: "LIVE",
      capacity: 10,
      interval: 60,
      refillRate: 10,
    }),
  ],
});

export default async function handler(req, res) {
  const decision = await aj.protect(req, { requested: 1 });

  if (decision.isDenied()) {
    if (decision.reason.isRateLimit()) {
      return res.status(429).json({
        error: "Rate limited. Try again later.",
      });
    } else if (decision.reason.isBot()) {
      return res.status(403).json({
        error: "Bot detected. Access denied.",
      });
    }
  }

  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  // Your protected logic here
  res.status(200).json({ message: "Protected content" });
}

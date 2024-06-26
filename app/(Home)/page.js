import Head from "next/head";
import HomeIndex from "./_components";
import getCurrentUserSession from "../actions/getCurrentUser";
export default async function Root() {
    const session = await getCurrentUserSession();
    console.log(session);
  return (
    <div className="relative">
      <HomeIndex/>
    </div>
  );
}

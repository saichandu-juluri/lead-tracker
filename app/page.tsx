import { redirect } from "next/navigation";
import QrScanner from "./components/QrScanner";
import { currentUser, auth } from '@clerk/nextjs/server'


export default async function Home() {
  const { userId } = await auth()

  if (!userId) {
    redirect("/login"); // Redirect unauthenticated users to login page
  }
  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    <div className="h-[100vh] w-[100vw]">
      {/* <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start"> */}

        <QrScanner />
      {/* </main> */}
     
    </div>
  );
}

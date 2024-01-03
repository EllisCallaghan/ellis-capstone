import { getPageSession } from "@/auth/lucia";
import { redirect } from "next/navigation";
import LoginForm from "@/components/LoginForm";

const Page = async () => {
  const session = await getPageSession();
  if (session) redirect("/");
  return (
    <main className="w-full max-w-md mx-auto p-6">
      <LoginForm />
    </main>
  );
};

export default Page;

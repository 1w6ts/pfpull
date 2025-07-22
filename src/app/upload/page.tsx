import { Separator } from "@/components/ui/separator";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function UploadPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    return (
      <main className="h-[calc(100vh-80px)] p-8">
        <div>
          <h1 className="text-3xl tracking-tighter font-semibold">Upload</h1>
          <p className="text-muted-foreground text-sm">
            Upload Discord assets.
          </p>
          <Separator className="mt-4" />
        </div>
      </main>
    );
  }

  redirect("/login");
}

import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function getUser() {
  "use cache";
  const session = await auth.api.getSession({
    headers: await headers(),
  });
}

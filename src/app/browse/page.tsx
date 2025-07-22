import { Separator } from "@/components/ui/separator";

export default function Browse() {
  return (
    <main className="h-[calc(100vh-80px)] p-8">
      <div>
        <h1 className="text-3xl tracking-tighter font-semibold">Browse</h1>
        <p className="text-muted-foreground text-sm">
          Find your perfect Discord assets.
        </p>
        <Separator className="mt-4" />
      </div>
    </main>
  );
}

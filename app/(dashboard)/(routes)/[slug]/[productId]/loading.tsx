import { Spinner } from "@/components/ui/spinner";

export default function Loading() {
  return (
    <div className="h-full flex items-center justify-center">
      <Spinner size={"lg"} />
    </div>
  );
}

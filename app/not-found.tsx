import Image from "next/image";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 h-full">
      <Image
        src="/404.svg"
        alt="not found"
        width={350}
        height={350}
        className="object-contain"
      />
      <h2 className="text-base text-muted-foreground">
        OOPS! NOTHING WAS FOUND
      </h2>
      <div className="w-[630px]">
        <p className="text-sm leading-6">
          The page you are looking for might have been
          removed had its name changed or is temporarily
          unavailable
          <Link
            href="/"
            className="ml-2.5 underline text-[#313131] font-semibold"
          >
            Return to homepage
          </Link>
        </p>
      </div>
    </div>
  );
}

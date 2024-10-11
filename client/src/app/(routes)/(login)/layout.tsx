import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 h-screen">
      <div className="flex items-center justify-center py-12 flex-col">
        {children}
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="h-5 w-5" /> Назад
        </Link>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="/images/auth-bg.webp"
          alt="Image"
          width="1024"
          height="1024"
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}

import Link from "next/link";
import { ModeToggle } from "../mode-toggle";
import { Button, buttonVariants } from "../ui/button";
import { ScanFace, Rocket } from "lucide-react";

export default function Header() {
  const user = false;
  return (
    <div className="w-full py-6 z-20">
      <nav className="flex justify-between items-center lg:flex lg:flex-row lg:gap-6 xl:gap-12 xl:text-lg w-[80%] m-auto">
        <div className="h-10 flex flex-1 items-center justify-between lg:justify-start select-none w-full lg:w-min gap-3 md:gap-6 lg:gap-8">
          <div className="flex items-center">
            <Button variant="ghost" size="icon" aria-label="Главная">
              <ScanFace className="size-5 fill-foreground" />
            </Button>
            <span className="text-lg font-medium leading-none">
              InterviewHub
            </span>
          </div>
        </div>
        <div className="hidden flex-col w-full mx-2 mt-5 gap-x-4 gap-y-4 lg:flex lg:flex-row lg:items-center lg:mx-0 lg:mt-0 justify-end">
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center">
              {user ? (
                <div className="flex items-center">
                  <Link
                    href="/dashboard"
                    className={buttonVariants({ size: "sm" })}
                  >
                    Личный кабинет
                  </Link>
                </div>
              ) : (
                <div className="flex items-center gap-x-4">
                  <Link
                    href="/sign-in"
                    className={buttonVariants({ size: "sm", variant: "ghost" })}
                  >
                    Войти
                  </Link>
                  <Link
                    href="/sign-up"
                    className={buttonVariants({ size: "sm" })}
                  >
                    Начать
                    <Rocket className="size-3.5 ml-1.5 text-orange-500 fill-orange-500" />
                  </Link>
                </div>
              )}
            </div>
            <ModeToggle />
          </div>
        </div>
      </nav>
    </div>
  );
}

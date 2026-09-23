import { MessageSquare, Sun } from "lucide-react";
import { BrandMark } from "./brand-mark";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/95 px-4 backdrop-blur md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <a
          className="flex items-center gap-2 text-lg font-semibold leading-none text-foreground md:text-base"
          href="#"
        >
          <BrandMark className="h-6 w-6" />
          <span>NexusLog</span>
        </a>
        <nav className="relative z-10 hidden max-w-max flex-1 items-center justify-center lg:flex">
          <ul className="group flex flex-1 list-none items-center justify-center space-x-1">
            <li>
              <a
                href="#"
                className="group inline-flex h-9 w-max items-center justify-center rounded-md bg-muted px-4 py-2 text-sm font-medium leading-none text-foreground transition-colors hover:bg-muted focus:bg-muted focus:outline-none"
              >
                Ao vivo
              </a>
            </li>
          </ul>
        </nav>
      </nav>

      <div className="flex gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="flex items-center space-x-4">
          <button className="inline-flex h-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background px-4 py-2 text-sm font-medium leading-none text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
            <MessageSquare className="mr-2 h-4 w-4" />
            Feedback
          </button>
        </div>
        <button className="inline-flex h-10 w-10 items-center justify-center whitespace-nowrap rounded-md border border-input bg-background text-sm font-medium text-foreground ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
          <Sun className="h-[1.2rem] w-[1.2rem]" />
        </button>
      </div>
    </header>
  );
}

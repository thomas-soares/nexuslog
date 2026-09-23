import { BrandMark } from "./brand-mark";

export function SiteFooter() {
  return (
    <footer className="mt-4 border-t bg-background py-6 sm:mt-6">
      <div className="page-container flex flex-col items-center justify-between gap-4 px-4 sm:flex-row sm:gap-0 md:px-6">
        <a
          className="flex items-center gap-2 text-lg font-semibold leading-none text-foreground"
          href="#"
        >
          <BrandMark className="h-6 w-6" />
          <span className="sr-only">NexusLog HUB</span>
        </a>
        <p className="text-balance text-center text-sm font-normal leading-loose text-muted-foreground md:text-left">
          © 2024 NexusLog HUB. Todos os direitos reservados.
        </p>
        <nav className="flex items-center gap-4 text-sm font-medium leading-5">
          <a
            className="text-muted-foreground transition-colors hover:text-foreground hover:underline"
            href="#"
          >
            Política de Privacidade
          </a>
          <a
            className="text-muted-foreground transition-colors hover:text-foreground hover:underline"
            href="#"
          >
            Termos de Serviço
          </a>
        </nav>
      </div>
    </footer>
  );
}

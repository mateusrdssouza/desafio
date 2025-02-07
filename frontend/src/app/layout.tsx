import "./globals.css";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <header>
          <h1>Meu Site</h1>
        </header>
        <main>{children}</main>
        <footer>
          <p>© 2025 Todos os direitos reservados.</p>
        </footer>
      </body>
    </html>
  );
}

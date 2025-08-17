import type { AppProps } from "next/app";
import "@/app/globals.css";
import QueryProvider from "@/providers/queryClientProvider";
import Header from "@/components/Header";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryProvider>
      <Header />
      <main className="container mx-auto p-4">
        <Component {...pageProps} />
      </main>
    </QueryProvider>
  );
}

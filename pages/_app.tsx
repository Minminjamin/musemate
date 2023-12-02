import Nav from "@/components/templates/Nav/Nav";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/templates/Header/Header";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <>
        <Nav />

        <main className="mainWrap">
          <Header pageName={"Main Page"} />
          <Component {...pageProps} />
        </main>
      </>
    </SessionProvider>
  );
}

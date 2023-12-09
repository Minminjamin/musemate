import Nav from "@/components/templates/Nav/Nav";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import Header from "@/components/templates/Header/Header";
import { QueryClient, QueryClientProvider } from "react-query";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }: AppProps) {
  const [page, setPage] = useState<string>("Main");
  const [userId, setUserId] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const path = router.asPath;

    const fetchData = async () => {
      const res = await axios.get("/api/profile/myProfile");
      setUserId(res.data.id);
    };
    fetchData();

    if (path === "/") setPage("Main");
    if (path.split("/")?.[1] == userId) setPage("My");
  }, [userId]);

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <>
          <Nav />

          <main className="mainWrap">
            <Header pageName={page} />
            <Component {...pageProps} />
          </main>
        </>
      </QueryClientProvider>
    </SessionProvider>
  );
}

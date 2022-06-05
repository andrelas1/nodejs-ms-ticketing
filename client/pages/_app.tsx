import "../styles/globals.css";
import type { AppProps } from "next/app";
import { useState } from "react";

import { Header } from "../components/header";
import { ApplicationContext } from "../state/ApplicationContext";

function MyApp({ Component, pageProps }: AppProps<{ currentUser: any }>) {
  const [appContext, setAppContext] = useState({
    currentUser: { email: "", id: "" },
  });

  return (
    <div>
      <ApplicationContext.Provider value={appContext}>
        <Header />
        <Component {...pageProps} setAppContext={setAppContext} />
      </ApplicationContext.Provider>
    </div>
  );
}

export default MyApp;

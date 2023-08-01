import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import "../styles/globals.css";
import { StateContextProvider } from "../context";

// This is the chain your dApp will work on.
// Change this to the chain your app is built for.
// You can also import additional chains from `@thirdweb-dev/chains` and pass them directly.
const activeChain = "ethereum";

function MyApp({ Component, pageProps }) {
  return (
    <ThirdwebProvider activeChain="goerli" 
    clientId="fb6c88adc89dd9b0186738102d0cba29" desiredChainId={ChainId.Goerli}>
      <StateContextProvider>
      <Component {...pageProps} />
      </StateContextProvider>
    </ThirdwebProvider>
  );
}

export default MyApp;

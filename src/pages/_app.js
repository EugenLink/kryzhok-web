import { Offer } from "@/components/Offer/Offer.js";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <Offer>
      <Component {...pageProps} />
    </Offer>
  );
}

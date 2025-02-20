"use client";

import { Providers } from "./providers";
import { Header } from "./components/Header";
import Checkout from "./components/Checkout";

export default function App() {
  return (
    <Providers>
      <main className="min-h-screen">
        <Header />
        <Checkout />
      </main>
    </Providers>
  );
}

import React from "react";
import Benchmark from "../components/Benchmark";
import HooksApp, { HooksProvider } from "../components/HooksApp";

export default function TestPage() {
  return (
    <Benchmark>
      <HooksProvider>
        <HooksApp />
      </HooksProvider>
    </Benchmark>
  );
}

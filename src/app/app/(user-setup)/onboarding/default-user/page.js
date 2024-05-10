"use client";

import { useEffect } from "react";
import { onboardingFlow } from "./_actions/onboardingFlow";

export default function Setup() {
  useEffect(() => {
    const execOnBoargingFlow = async () => {
      await onboardingFlow();
    };

    execOnBoargingFlow();
  }, []);

  return <h1> Implementando dados... </h1>;
}

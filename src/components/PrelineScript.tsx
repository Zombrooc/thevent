"use client";

import HSAccordion from "@preline/accordion";
import { usePathname } from "next/navigation";
import { HSDropdown } from "preline/preline";
import { useEffect } from "react";

export default function PrelineLoader() {
  const path = usePathname();

  useEffect(() => {
    import("preline/preline");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      HSAccordion.autoInit();
      HSDropdown.autoInit();
    }, 100);
  }, [path]);

  return <></>;
}

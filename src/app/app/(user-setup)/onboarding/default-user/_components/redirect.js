"use client";

import { redirect, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Redirect() {
  const searchParams = useSearchParams();
  const [hasSearchParams, setSearch] = useState(null);

  useEffect(() => {
    const search = searchParams.get("redirect_url");

    if (search) {
      redirect(search);
    } else {
      redirect(`${process.env.NEXT_PUBLIC_APP_URL}/`);
    }
  }, []);
}

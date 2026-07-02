import React from "react";
import HomeClient from "./home-client";
import { getHomepageContent } from "@/lib/homepage-content";

export default async function Page({ params }) {
  const resolvedParams = await params;
  const lang = resolvedParams.lang;

  // Fetch the dynamic homepage content from Neon database
  const dbContent = await getHomepageContent(lang);

  return <HomeClient params={resolvedParams} dbContent={dbContent} />;
}

"use client";
import { useAppData } from "@/hooks/useAppData";
import { useEffect } from "react";

export default function DataInitializer() {
  const { loadAllData } = useAppData();

  useEffect(() => {
    // Load all data when the component mounts
    loadAllData();
  }, [loadAllData]);

  // This component doesn't render anything
  return null;
}

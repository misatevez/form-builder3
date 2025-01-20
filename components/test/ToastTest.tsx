"use client";

import React from "react";
import { Toaster, toast } from "sonner"; // Usando `sonner`
import { Button } from "@/components/ui/button";

export function ToastTest() {
  const handleTestNotification = () => {
    console.log("handleTestNotification called");
    toast("Test Notification", {
      description: "This is a test notification.",
    });
  };

  console.log("ToastTest component rendered");

  return (
    <div>
      <Button onClick={handleTestNotification}>Show Test Notification</Button>
      <Toaster />
    </div>
  );
}

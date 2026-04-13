"use client";

import { useState } from "react";

export function useTodoCompletion(initialComplete = false) {
  const [complete, setComplete] = useState(initialComplete);

  const statusLabel = complete ? "Done" : "In Progress";
  const statusAria = complete ? "Status: Done" : "Status: In Progress";

  return { complete, setComplete, statusLabel, statusAria };
}

"use client";

import { useEffect } from "react";
import { track } from "../lib/track";

// Sends the GA4 purchase event once per order, even if the thank-you page is reloaded.
export default function PurchaseTracker(props: { transactionId: string; value: number; currency: string; itemId: string; itemName: string }) {
  const { transactionId, value, currency, itemId, itemName } = props;

  useEffect(() => {
    const key = `bc_purchase_${transactionId}`;
    try {
      if (localStorage.getItem(key)) return;
      localStorage.setItem(key, "1");
    } catch {
      // Storage blocked: track anyway.
    }
    track("purchase", {
      transaction_id: transactionId,
      value,
      currency,
      items: [{ item_id: itemId, item_name: itemName, price: value }],
    });
  }, [transactionId, value, currency, itemId, itemName]);

  return null;
}

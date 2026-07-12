"use client";

import { useEffect, useState } from "react";
import { PRODUCTS } from "@/lib/products-data";
import { APPS } from "@/lib/apps-data";
import { BLOG_POSTS } from "@/lib/blog-data";
import { JOB_LISTINGS } from "@/lib/careers-data";
import { MOCK_ORDERS, MOCK_TICKETS } from "@/lib/orders-data";

// Helper keys for localStorage
const KEYS = {
  products: "plaxora_cms_products",
  apps: "plaxora_cms_apps",
  blog: "plaxora_cms_blog",
  careers: "plaxora_cms_careers",
  orders: "plaxora_cms_orders",
  tickets: "plaxora_cms_tickets",
};

// Initialize localStorage with default data if empty
export function initCMSStore() {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem(KEYS.products)) {
    localStorage.setItem(KEYS.products, JSON.stringify(PRODUCTS));
  }
  if (!localStorage.getItem(KEYS.apps)) {
    localStorage.setItem(KEYS.apps, JSON.stringify(APPS));
  }
  if (!localStorage.getItem(KEYS.blog)) {
    localStorage.setItem(KEYS.blog, JSON.stringify(BLOG_POSTS));
  }
  if (!localStorage.getItem(KEYS.careers)) {
    localStorage.setItem(KEYS.careers, JSON.stringify(JOB_LISTINGS));
  }
  if (!localStorage.getItem(KEYS.orders)) {
    localStorage.setItem(KEYS.orders, JSON.stringify(MOCK_ORDERS));
  }
  if (!localStorage.getItem(KEYS.tickets)) {
    localStorage.setItem(KEYS.tickets, JSON.stringify(MOCK_TICKETS));
  }
}

export function useCMSData<T>(key: keyof typeof KEYS, fallbackData: T[]): [T[], (newData: T[]) => void] {
  const [data, setData] = useState<T[]>([]);

  useEffect(() => {
    initCMSStore();
    const lsKey = KEYS[key];
    const stored = localStorage.getItem(lsKey);
    if (stored) {
      try {
        setData(JSON.parse(stored));
      } catch (e) {
        setData(fallbackData);
      }
    } else {
      setData(fallbackData);
    }
  }, [key, fallbackData]);

  const updateData = (newData: T[]) => {
    setData(newData);
    if (typeof window !== "undefined") {
      localStorage.setItem(KEYS[key], JSON.stringify(newData));
    }
  };

  return [data, updateData];
}

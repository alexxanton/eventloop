"use client";
import { useStore } from '@/utils/zustand';

export function CGroupChat() {
  const { currentGroup } = useStore();

  return (
    <p>{currentGroup}</p>
  );
}
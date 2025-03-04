"use client";
import { useStore } from '@/utils/zustand';
import { CCalendar } from '../calendars/CCalendar';

export function CGroupChat() {
  const { currentGroup } = useStore();

  if (!currentGroup) {
    return <CCalendar />
  }

  return (
    <p>{currentGroup}</p>
  );
}
"use client";

import { unixTimeToRelative } from "~/utils/time";
import Link from "next/link";
import { create } from "zustand";
import styles from "./CommentClient.module.css";

type FoldedState = {
  foldedIds: Set<number>;
};

type FoldedStateAction = {
  toggleFolded: (id: number) => void;
};

const getToggledFoldedIds = (state: FoldedState, id: number) => {
  const newSet = new Set(state.foldedIds);
  if (state.foldedIds.has(id)) {
    newSet.delete(id);
  } else {
    newSet.add(id);
  }
  return newSet;
};

const useFolded = create<FoldedState & FoldedStateAction>((set) => ({
  foldedIds: new Set<number>(),
  toggleFolded: (id: number) =>
    set((state) => ({
      foldedIds: getToggledFoldedIds(state, id),
    })),
}));

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth" });
};

export function CommentTime({
  by,
  unixTime,
}: {
  by: string;
  unixTime: number;
}) {
  return (
    <span suppressHydrationWarning>
      {by} {unixTimeToRelative(unixTime)}
    </span>
  );
}

export function CommentLink({
  id,
  children,
}: {
  id?: number;
  children: React.ReactNode;
}) {
  return (
    id != undefined && (
      <>
        {" | "}
        <Link
          className="hover:underline"
          href={`#comment-${id}`}
          onClick={(ev) => {
            ev.preventDefault();
            scrollToId(`comment-${id}`);
          }}
        >
          {children}
        </Link>
      </>
    )
  );
}

export function CommentToggleFold({
  id,
  descendants,
}: {
  id: number;
  descendants: number;
}) {
  const foldedIds = useFolded((state) => state.foldedIds);
  const toggleFolded = useFolded((state) => state.toggleFolded);

  const isFolded = foldedIds.has(id);

  return (
    <span className="hover:underline" onClick={() => toggleFolded(id)}>
      {isFolded ? `[${1 + descendants} more]` : "[ – ]"}
    </span>
  );
}

export function CommentMaybeFoldNext({ id }: { id: number }) {
  const foldedIds = useFolded((state) => state.foldedIds);
  const isFolded = foldedIds.has(id);
  return <div className={isFolded ? styles.foldNext : ""} />;
}

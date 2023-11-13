"use client";

import { type CommentFull } from "~/utils/api";
import React, { useState } from "react";
import { unixTimeToRelative } from "~/utils/time";
import Link from "next/link";

const scrollToId = (id: string) => {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: "smooth" });
};

function CommentLink({
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

export default function Comment({
  comment,
  commentContents,
  commentChildren,
  nextId,
  prevId,
  parentId,
  isChild,
}: {
  comment: CommentFull;
  commentContents: React.ReactNode;
  commentChildren: React.ReactNode;
  nextId?: number;
  prevId?: number;
  parentId?: number;
  isChild?: boolean;
}) {
  const [isFolded, setIsFolded] = useState(false);
  const child = isChild !== undefined && isChild;

  return (
    <div className={`${child ? "pl-10" : ""}`} id={`comment-${comment.id}`}>
      <div className="p-2">
        <div className="text-xs text-gray-500">
          <span suppressHydrationWarning>
            {comment.by} {unixTimeToRelative(comment.time)}
          </span>
          <CommentLink id={parentId}>parent</CommentLink>
          <CommentLink id={prevId}>prev</CommentLink>
          <CommentLink id={nextId}>next</CommentLink>{" "}
          <span
            className="hover:underline"
            onClick={() => {
              setIsFolded((p) => !p);
            }}
          >
            {isFolded ? `[${1 + comment.descendants} more]` : "[ – ]"}
          </span>
        </div>
        <div className={isFolded ? "hidden" : ""}>{commentContents}</div>
      </div>
      <div className={isFolded ? "hidden" : ""}>{commentChildren}</div>
    </div>
  );
}

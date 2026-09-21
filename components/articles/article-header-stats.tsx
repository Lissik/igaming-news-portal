"use client";

import { useState, useEffect } from "react";
import { Heart, MessageCircle } from "lucide-react";

interface ArticleHeaderStatsProps {
  slug: string;
  initialLikes: number;
  initialComments: number;
}

export function ArticleHeaderStats({
  slug,
  initialLikes,
  initialComments,
}: ArticleHeaderStatsProps) {
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState(initialComments);

  useEffect(() => {
    fetch(`/api/articles/${slug}/likes?seed=${initialLikes}`)
      .then((r) => r.json())
      .then((d) => { if (typeof d.likes === "number") setLikes(d.likes); })
      .catch(() => {});

    fetch(`/api/articles/${slug}/comments`)
      .then((r) => r.json())
      .then((d) => { if (Array.isArray(d.comments)) setComments(d.comments.length); })
      .catch(() => {});
  }, [slug, initialLikes]);

  return (
    <>
      <div className="flex items-center gap-1.5">
        <Heart className="w-3.5 h-3.5" />
        <span>{likes}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <MessageCircle className="w-3.5 h-3.5" />
        <span>{comments}</span>
      </div>
    </>
  );
}

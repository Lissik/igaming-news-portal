"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";

interface ArticleLikesCountProps {
  slug: string;
  initialLikes: number;
  className?: string;
  iconClassName?: string;
}

export function ArticleLikesCount({
  slug,
  initialLikes,
  className = "",
  iconClassName = "w-3 h-3",
}: ArticleLikesCountProps) {
  const [likes, setLikes] = useState(initialLikes);

  useEffect(() => {
    fetch(`/api/articles/${slug}/likes?seed=${initialLikes}`)
      .then((r) => r.json())
      .then((d) => { if (typeof d.likes === "number") setLikes(d.likes); })
      .catch(() => {});
  }, [slug, initialLikes]);

  return (
    <span className={`flex items-center gap-1 ${className}`}>
      <Heart className={iconClassName} />
      {likes}
    </span>
  );
}

"use client";

import { useState } from "react";
import { Heart, MessageCircle, Send } from "lucide-react";
import { formatDate } from "@/lib/data";

interface Comment {
  id: string;
  author: string;
  content: string;
  publishedAt: string;
}

interface ArticleInteractionsProps {
  initialLikes: number;
  initialComments: Comment[];
}

export function ArticleInteractions({
  initialLikes,
  initialComments,
}: ArticleInteractionsProps) {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(initialLikes);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  function handleLike() {
    if (liked) {
      setLikes((n) => n - 1);
    } else {
      setLikes((n) => n + 1);
    }
    setLiked((v) => !v);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Please enter your name.");
      return;
    }
    if (!text.trim()) {
      setError("Please enter a comment.");
      return;
    }

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      author: name.trim(),
      content: text.trim(),
      publishedAt: new Date().toISOString(),
    };

    setComments((prev) => [...prev, newComment]);
    setName("");
    setText("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  }

  return (
    <div className="mt-10">
      {/* Like button */}
      <div className="flex items-center gap-3 pb-6 border-b border-border">
        <button
          onClick={handleLike}
          aria-pressed={liked}
          className={`flex items-center gap-2 px-4 py-2 rounded-sm border text-sm font-sans font-medium transition-colors ${
            liked
              ? "bg-red-50 border-red-300 text-red-600"
              : "bg-white border-border text-foreground/70 hover:border-red-300 hover:text-red-500"
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-all ${liked ? "fill-red-500 text-red-500" : ""}`}
          />
          <span>{likes} {likes === 1 ? "Like" : "Likes"}</span>
        </button>
        <div className="flex items-center gap-2 text-sm font-sans text-muted-foreground">
          <MessageCircle className="w-4 h-4" />
          <span>{comments.length} {comments.length === 1 ? "Comment" : "Comments"}</span>
        </div>
      </div>

      {/* Existing comments */}
      {comments.length > 0 && (
        <div className="mt-8">
          <h2 className="font-serif text-xl font-bold text-navy mb-5 pb-3 border-b-2 border-navy">
            Comments ({comments.length})
          </h2>
          <div className="flex flex-col gap-4">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-white border border-border rounded-sm p-5"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-sans font-semibold text-sm text-foreground">
                    {comment.author}
                  </span>
                  <time className="text-xs text-muted-foreground font-sans">
                    {formatDate(comment.publishedAt)}
                  </time>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed">{comment.content}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Comment form */}
      <div className="mt-8">
        <h3 className="font-serif text-lg font-bold text-navy mb-5 pb-3 border-b-2 border-navy">
          Leave a Comment
        </h3>
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="comment-name"
              className="text-sm font-sans font-medium text-foreground"
            >
              Your name <span className="text-red-500">*</span>
            </label>
            <input
              id="comment-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. James Smith"
              className="border border-border rounded-sm px-3 py-2.5 text-sm font-sans text-foreground placeholder:text-muted-foreground bg-white focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-colors"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="comment-text"
              className="text-sm font-sans font-medium text-foreground"
            >
              Comment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="comment-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts on this article..."
              rows={4}
              className="border border-border rounded-sm px-3 py-2.5 text-sm font-sans text-foreground placeholder:text-muted-foreground bg-white focus:outline-none focus:ring-2 focus:ring-navy/30 focus:border-navy transition-colors resize-none"
            />
          </div>

          {error && (
            <p className="text-sm text-red-600 font-sans">{error}</p>
          )}

          {submitted && (
            <p className="text-sm text-green-700 font-sans font-medium">
              Your comment has been posted.
            </p>
          )}

          <div>
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-navy text-white text-sm font-sans font-semibold rounded-sm hover:bg-navy/90 active:scale-95 transition-all"
            >
              <Send className="w-4 h-4" />
              Post Comment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

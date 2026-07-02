"use client";

import { useEffect, useRef, useState } from "react";
import { Bold, Italic, List, Quote, Heading2 } from "lucide-react";

export function BlogRichEditor({ value, onChange, placeholder, dir = "ltr" }) {
  const editorRef = useRef(null);
  const [htmlValue, setHtmlValue] = useState(value || "");

  useEffect(() => {
    setHtmlValue(value || "");
  }, [value]);

  const applyFormat = (command, valueArg = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, valueArg);
    const nextHtml = editorRef.current?.innerHTML || "";
    setHtmlValue(nextHtml);
    onChange(nextHtml);
  };

  const handleInput = () => {
    const nextHtml = editorRef.current?.innerHTML || "";
    setHtmlValue(nextHtml);
    onChange(nextHtml);
  };

  return (
    <div className="rounded-2xl border border-border/40 bg-background/80">
      <div className="flex flex-wrap gap-2 border-b border-border/30 p-2">
        <button type="button" onClick={() => applyFormat("bold")} className="rounded-lg border border-border/40 p-2 text-sm hover:bg-muted">
          <Bold className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => applyFormat("italic")} className="rounded-lg border border-border/40 p-2 text-sm hover:bg-muted">
          <Italic className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => applyFormat("formatBlock", "h2")} className="rounded-lg border border-border/40 p-2 text-sm hover:bg-muted">
          <Heading2 className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => applyFormat("insertUnorderedList")} className="rounded-lg border border-border/40 p-2 text-sm hover:bg-muted">
          <List className="h-4 w-4" />
        </button>
        <button type="button" onClick={() => applyFormat("formatBlock", "blockquote")} className="rounded-lg border border-border/40 p-2 text-sm hover:bg-muted">
          <Quote className="h-4 w-4" />
        </button>
      </div>
      <div
        ref={editorRef}
        dir={dir}
        contentEditable
        suppressContentEditableWarning
        onInput={handleInput}
        onBlur={handleInput}
        data-placeholder={placeholder}
        className="min-h-44 max-h-72 overflow-auto p-4 text-sm leading-7 outline-none empty:before:text-muted-foreground empty:before:content-[attr(data-placeholder)]"
        dangerouslySetInnerHTML={{ __html: htmlValue || "" }}
      />
    </div>
  );
}

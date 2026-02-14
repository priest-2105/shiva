"use client";

import * as React from "react";
import { ArrowUp, Paperclip, Mic } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function PromptInput() {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = React.useState("");

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            <div className="relative flex flex-col w-full p-3 overflow-hidden border rounded-xl shadow-sm bg-background focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={handleInput}
                    placeholder="Describe the component or page you want to build..."
                    className="w-full min-h-[60px] max-h-[200px] resize-none border-none focus:ring-0 p-2 text-base placeholder:text-muted-foreground bg-transparent outline-none"
                    rows={1}
                />

                <div className="flex justify-between items-center mt-2 pl-2 pr-1">
                    <div className="flex gap-2">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-text-secondary hover:text-foreground">
                            <Paperclip className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-text-secondary hover:text-foreground">
                            <Mic className="w-4 h-4" />
                        </Button>
                    </div>

                    <Button
                        size="sm"
                        className={cn(
                            "rounded-full h-8 w-8 p-0 transition-opacity duration-200",
                            value.trim() ? "opacity-100" : "opacity-50 cursor-not-allowed"
                        )}
                        disabled={!value.trim()}
                    >
                        <ArrowUp className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="text-center mt-4 text-xs text-text-secondary">
                Shiva can make mistakes. Please review generated code.
            </div>
        </div>
    );
}

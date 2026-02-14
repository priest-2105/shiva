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
            <div className="relative flex flex-col w-full p-4 overflow-hidden border rounded-xl shadow-sm bg-background focus-within:ring-2 focus-within:ring-primary/20 focus-within:border-primary transition-all duration-200 min-h-[140px]">
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={handleInput}
                    placeholder="Describe the component or page you want to build..."
                    className="w-full min-h-[80px] max-h-[200px] resize-none border-none focus:ring-0 p-2 text-base placeholder:text-muted-foreground bg-transparent outline-none"
                    rows={1}
                />

                <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center gap-2 flex-wrap">
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-text-secondary hover:text-foreground">
                            <Paperclip className="w-4 h-4" />
                        </Button>

                        <div className="h-4 w-[1px] bg-border mx-1" />

                        <div className="relative">
                            <select
                                className="h-8 appearance-none rounded-md bg-secondary/50 pl-3 pr-8 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer hover:bg-secondary transition-colors"
                                defaultValue="nextjs"
                            >
                                <option value="nextjs" disabled className="bg-background text-text-secondary">App Type</option>
                                <option value="nextjs">Next.js</option>
                                <option value="react">React</option>
                                <option value="html">HTML/JS</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary">
                                <svg className="h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                            </div>
                        </div>

                        <div className="relative">
                            <select
                                className="h-8 appearance-none rounded-md bg-secondary/50 pl-3 pr-8 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-ring cursor-pointer hover:bg-secondary transition-colors"
                                defaultValue="shadcn"
                            >
                                <option value="shadcn" disabled className="bg-background text-text-secondary">Design System</option>
                                <option value="shadcn">Shadcn UI</option>
                                <option value="salt">Salt DS</option>
                                <option value="mui">Material UI</option>
                                <option value="none">CSS Only</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary">
                                <svg className="h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                            </div>
                        </div>
                    </div>

                    <Button
                        size="sm"
                        className={cn(
                            "rounded-full h-8 w-8 p-0 transition-opacity duration-200 shadow-sm",
                            value.trim() ? "opacity-100" : "opacity-50 cursor-not-allowed"
                        )}
                        disabled={!value.trim()}
                    >
                        <ArrowUp className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="text-center mt-4 text-xs text-text-secondary flex justify-center items-center gap-4">
                <span>Shiva can make mistakes. Please review generated code.</span>
            </div>
        </div>
    );
}

"use client";

import * as React from "react";
import { ArrowUp, Paperclip, Mic, Image, FileText } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function PromptInput() {
    const textareaRef = React.useRef<HTMLTextAreaElement>(null);
    const [value, setValue] = React.useState("");
    const fileInputRef = React.useRef<HTMLInputElement>(null);
    const [isAttachOpen, setIsAttachOpen] = React.useState(false);
    const [attachments, setAttachments] = React.useState<{ file: File; preview: string }[]>([]);
    const attachMenuRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (attachMenuRef.current && !attachMenuRef.current.contains(event.target as Node)) {
                setIsAttachOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto';
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 200)}px`;
        }
    };

    const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const newAttachments = Array.from(e.target.files).map(file => ({
                file,
                preview: file.type.startsWith('image/') ? URL.createObjectURL(file) : ''
            }));
            setAttachments(prev => [...prev, ...newAttachments]);
        }
        setIsAttachOpen(false);
    };

    const triggerFileInput = (accept: string) => {
        if (fileInputRef.current) {
            fileInputRef.current.accept = accept;
            fileInputRef.current.click();
        }
    };

    const removeAttachment = (index: number) => {
        setAttachments(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="relative w-full max-w-3xl mx-auto space-y-3">
            <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                onChange={handleFileSelect}
            />

            <div className={cn(
                "relative flex flex-col w-full p-4 overflow-hidden rounded-2xl min-h-[140px]",
                "bg-white/60 dark:bg-[rgba(4,16,45,0.55)]",
                "backdrop-blur-2xl",
                "border border-blue-200/50 dark:border-blue-800/35",
                "shadow-lg shadow-blue-900/5 dark:shadow-blue-950/30",
                "transition-all duration-200",
                "focus-within:border-blue-400/70 dark:focus-within:border-blue-500/50",
                "focus-within:shadow-blue-400/10 dark:focus-within:shadow-blue-500/20",
                "focus-within:ring-1 focus-within:ring-blue-400/30 dark:focus-within:ring-blue-500/20"
            )}>
                {/* Image Previews */}
                {attachments.length > 0 && (
                    <div className="flex gap-2 mb-2 overflow-x-auto pb-2">
                        {attachments.map((att, i) => (
                            <div key={i} className="relative group shrink-0">
                                {att.preview ? (
                                    <img src={att.preview} alt="preview" className="h-16 w-16 object-cover rounded-lg border border-blue-200/40 dark:border-blue-800/40" />
                                ) : (
                                    <div className="h-16 w-16 flex items-center justify-center bg-blue-50/60 dark:bg-blue-950/40 rounded-lg border border-blue-200/40 dark:border-blue-800/40">
                                        <Paperclip className="w-6 h-6 text-text-secondary" />
                                    </div>
                                )}
                                <button
                                    onClick={() => removeAttachment(i)}
                                    className="absolute -top-1 -right-1 bg-red-500/80 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={handleInput}
                    placeholder="Describe the component or page you want to build..."
                    className="w-full min-h-[80px] max-h-[200px] resize-none border-none focus:ring-0 p-2 text-base placeholder:text-text-secondary/60 bg-transparent outline-none text-foreground"
                    rows={1}
                />

                <div className="flex justify-between items-end mt-4">
                    <div className="flex items-center gap-2 flex-wrap relative" ref={attachMenuRef}>
                        <Button
                            variant="ghost"
                            size="sm"
                            className={cn(
                                "h-8 w-8 p-0 rounded-full text-text-secondary hover:text-foreground hover:bg-blue-100/60 dark:hover:bg-blue-950/50",
                                isAttachOpen && "bg-blue-100/80 dark:bg-blue-950/60 text-foreground"
                            )}
                            onClick={() => setIsAttachOpen(!isAttachOpen)}
                        >
                            <Paperclip className="w-4 h-4" />
                        </Button>

                        {isAttachOpen && (
                            <div className="absolute bottom-full left-0 mb-2 w-48 rounded-xl z-10
                                bg-white/80 dark:bg-[rgba(4,16,45,0.9)]
                                backdrop-blur-2xl
                                border border-blue-200/40 dark:border-blue-800/40
                                shadow-xl shadow-blue-900/10 dark:shadow-blue-950/50
                                p-1">
                                <button
                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-blue-100/60 dark:hover:bg-blue-950/50 rounded-md transition-colors text-left"
                                    onClick={() => triggerFileInput("image/*")}
                                >
                                    <Image className="w-4 h-4 text-text-secondary" />
                                    <span>Upload Image</span>
                                </button>
                                <button
                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm hover:bg-blue-100/60 dark:hover:bg-blue-950/50 rounded-md transition-colors text-left"
                                    onClick={() => triggerFileInput("*")}
                                >
                                    <FileText className="w-4 h-4 text-text-secondary" />
                                    <span>Upload File</span>
                                </button>
                            </div>
                        )}

                        <div className="h-4 w-[1px] bg-blue-200/50 dark:bg-blue-800/50 mx-1" />

                        <div className="relative">
                            <select
                                className="h-8 appearance-none rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/40 dark:border-blue-800/30 pl-3 pr-8 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer hover:bg-blue-100/60 dark:hover:bg-blue-950/60 transition-colors text-foreground backdrop-blur-sm"
                                defaultValue="nextjs"
                            >
                                <option value="nextjs" disabled>App Type</option>
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
                                className="h-8 appearance-none rounded-lg bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/40 dark:border-blue-800/30 pl-3 pr-8 py-1 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer hover:bg-blue-100/60 dark:hover:bg-blue-950/60 transition-colors text-foreground backdrop-blur-sm"
                                defaultValue="shadcn"
                            >
                                <option value="shadcn" disabled>Design System</option>
                                <option value="shadcn">Shadcn UI</option>
                                <option value="salt">Salt DS</option>
                                <option value="mui">Material UI</option>
                                <option value="none">CSS Only</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-text-secondary">
                                <svg className="h-3 w-3 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                            </div>
                        </div>

                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-full text-text-secondary hover:text-foreground hover:bg-blue-100/60 dark:hover:bg-blue-950/50">
                            <Mic className="w-4 h-4" />
                        </Button>
                    </div>

                    <Button
                        size="sm"
                        className={cn(
                            "rounded-full h-8 w-8 p-0 transition-all duration-200 shadow-md shadow-blue-500/20",
                            value.trim() || attachments.length > 0
                                ? "opacity-100 shadow-blue-400/30"
                                : "opacity-40 cursor-not-allowed"
                        )}
                        disabled={!value.trim() && attachments.length === 0}
                    >
                        <ArrowUp className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <div className="text-center mt-4 text-xs text-text-secondary/70 flex justify-center items-center gap-4">
                <span>Shiva can make mistakes. Please review generated code.</span>
            </div>
        </div>
    );
}

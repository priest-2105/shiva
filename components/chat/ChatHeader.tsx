"use client";

import { useState, useRef, useEffect } from "react";
import { Settings, LogOut, User, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import Link from "next/link";

export function ChatHeader() {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="h-16 border-b border-border flex items-center justify-end px-6 bg-background">
            <div className="relative" ref={menuRef}>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-2 hover:bg-secondary/50 p-1.5 rounded-full transition-colors outline-none"
                >
                    <Avatar className="h-8 w-8">
                        <AvatarImage src="https://github.com/shadcn.png" alt="@user" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <ChevronDown className="w-4 h-4 text-text-secondary" />
                </button>

                {isOpen && (
                    <div className="absolute right-0 top-full mt-2 w-56 rounded-md border border-border bg-card-bg shadow-lg py-1 z-50">
                        <div className="px-3 py-2 border-b border-border mb-1">
                            <p className="text-sm font-medium">User Name</p>
                            <p className="text-xs text-text-secondary truncate">user@example.com</p>
                        </div>

                        <Link href="/profile" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary cursor-pointer">
                            <User className="w-4 h-4" />
                            Profile
                        </Link>
                        <Link href="/settings" className="flex items-center gap-2 px-3 py-2 text-sm hover:bg-secondary cursor-pointer">
                            <Settings className="w-4 h-4" />
                            Settings
                        </Link>
                        <div className="border-t border-border my-1" />
                        <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 cursor-pointer">
                            <LogOut className="w-4 h-4" />
                            Log out
                        </button>
                    </div>
                )}
            </div>
        </header>
    );
}

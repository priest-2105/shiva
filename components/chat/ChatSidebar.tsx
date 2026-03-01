"use client";

import Link from "next/link";
import { Plus, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function ChatSidebar() {
    const pathname = usePathname();

    const recentChats = [
        { id: "1", title: "Landing Page Design", date: "Today" },
        { id: "2", title: "Dashboard Layout", date: "Yesterday" },
        { id: "3", title: "Authentication Flow", date: "Last Week" },
    ];

    return (
        <div className="w-64 flex-shrink-0 flex flex-col h-screen
            bg-white/50 dark:bg-[rgba(4,16,45,0.6)]
            backdrop-blur-xl
            border-r border-blue-200/40 dark:border-blue-900/40">

            {/* Header / New Chat */}
            <div className="p-4">
                <Button className="w-full justify-start gap-2" variant="primary">
                    <Plus className="w-4 h-4" />
                    New Project
                </Button>
            </div>

            {/* Recent Chats List */}
            <div className="flex-1 overflow-y-auto py-2">
                <div className="px-4 pb-2">
                    <h3 className="text-xs font-medium text-text-secondary uppercase tracking-wider">
                        Recent
                    </h3>
                </div>
                <div className="space-y-0.5 px-2">
                    {recentChats.map((chat) => (
                        <Link
                            key={chat.id}
                            href={`/chat/${chat.id}`}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-all duration-150",
                                "hover:bg-blue-100/60 dark:hover:bg-blue-950/40 text-foreground",
                                pathname === `/chat/${chat.id}` && "bg-blue-100/80 dark:bg-blue-950/60"
                            )}
                        >
                            <MessageSquare className="w-4 h-4 text-text-secondary shrink-0" />
                            <span className="truncate">{chat.title}</span>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

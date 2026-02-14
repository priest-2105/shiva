"use client";

import Link from "next/link";
import { Plus, MessageSquare, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";

export function ChatSidebar() {
    const pathname = usePathname();

    // Mock data for recent chats - will be replaced by real data later
    const recentChats = [
        { id: "1", title: "Landing Page Design", date: "Today" },
        { id: "2", title: "Dashboard Layout", date: "Yesterday" },
        { id: "3", title: "Authentication Flow", date: "Last Week" },
    ];

    return (
        <div className="w-64 flex-shrink-0 border-r border-border bg-gray-50 dark:bg-zinc-900 flex flex-col h-screen">
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
                <div className="space-y-1 px-2">
                    {recentChats.map((chat) => (
                        <Link
                            key={chat.id}
                            href={`/chat/${chat.id}`}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors",
                                "hover:bg-secondary/50 text-foreground",
                                // Highlight active chat - mocking logic for now since we are just on /chat usually
                                pathname === `/chat/${chat.id}` && "bg-secondary"
                            )}
                        >
                            <MessageSquare className="w-4 h-4 text-text-secondary" />
                            <span className="truncate">{chat.title}</span>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Footer / User Settings */}
            <div className="p-4 border-t border-border mt-auto">
                <div className="space-y-1">
                    <Button variant="ghost" className="w-full justify-start gap-2 px-2">
                        <Settings className="w-4 h-4 text-text-secondary" />
                        <span>Settings</span>
                    </Button>
                    <Button variant="ghost" className="w-full justify-start gap-2 px-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                        <LogOut className="w-4 h-4" />
                        <span>Sign Out</span>
                    </Button>
                </div>
            </div>
        </div>
    );
}

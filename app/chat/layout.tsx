import { ChatSidebar } from "@/components/chat/ChatSidebar";
import { ChatHeader } from "@/components/chat/ChatHeader";

export default function ChatLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex h-screen overflow-hidden bg-background">
            {/* Sidebar - Hidden on mobile, can be toggled later */}
            <aside className="hidden md:flex">
                <ChatSidebar />
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
                <ChatHeader />
                {children}
            </main>
        </div>
    );
}

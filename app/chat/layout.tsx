import { ChatSidebar } from "@/components/chat/ChatSidebar";

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
                {/* Simple Header (Mobile toggle can go here later) */}
                <header className="h-14 border-b border-border flex items-center justify-between px-4 md:hidden">
                    <span className="font-semibold text-lg">Shiva</span>
                    {/* Mobile Menu Button Placeholder */}
                    <button className="text-text-secondary">Menu</button>
                </header>

                {children}
            </main>
        </div>
    );
}

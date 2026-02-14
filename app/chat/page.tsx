import { PromptInput } from "@/components/chat/PromptInput";
import { Button } from "@/components/ui/Button";

export default function ChatPage() {
    const suggestions = [
        "Landing Page",
        "Login Form",
        "Dashboard Layout",
        "Blog Post",
        "E-commerce Product",
        "Pricing Table"
    ];

    return (
        <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
            <div className="w-full max-w-3xl flex flex-col items-center gap-8 -mt-20">
                <h1 className="text-4xl md:text-5xl font-bold font-heading text-center tracking-tight text-foreground">
                    What can I help you build?
                </h1>

                {/* Input Area */}
                <div className="w-full">
                    <PromptInput />
                </div>

                {/* Suggestions */}
                <div className="flex flex-wrap items-center justify-center gap-2">
                    <span className="text-sm text-text-secondary mr-2">Try asking for:</span>
                    {suggestions.map((s) => (
                        <Button
                            key={s}
                            variant="outline"
                            size="sm"
                            className="h-7 text-xs rounded-full border-dashed border-gray-300 dark:border-zinc-700 bg-transparent text-text-secondary hover:text-foreground hover:border-solid transition-all"
                        >
                            {s}
                        </Button>
                    ))}
                </div>
            </div>
        </div>
    );
}

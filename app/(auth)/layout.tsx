import Image from "next/image";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
            {/* Left Side - Branding */}
            <div className="hidden md:flex flex-col justify-between bg-zinc-900 text-white p-12 relative overflow-hidden">
                <div className="z-10">
                    <Image
                        src="/shiva-ai-logo-lg.svg"
                        alt="Shiva Logo"
                        width={150}
                        height={40}
                        className="mb-8"
                    />
                    <h1 className="text-4xl font-heading font-bold mb-4">
                        Build software at the speed of thought.
                    </h1>
                    <p className="text-zinc-400 text-lg max-w-md">
                        The constrained frontend compiler that turns prompts into production-ready code.
                    </p>
                </div>

                {/* Abstract Background Elements */}
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-tertiary/10 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />

                <div className="z-10 text-sm text-zinc-500">
                    &copy; {new Date().getFullYear()} Shiva AI. All rights reserved.
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="flex items-center justify-center p-6 bg-background">
                <div className="w-full max-w-md">
                    {/* Mobile Logo */}
                    <div className="md:hidden flex justify-center mb-8">
                        <Image
                            src="/logo.svg"
                            alt="Shiva Logo"
                            width={48}
                            height={48}
                        />
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}

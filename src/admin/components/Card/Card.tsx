import type { ReactElement } from "react"

const Card = ({ title, children }: { title: string, children: ReactElement }) => {
    return (
        <section className="relative flex min-h-[100%] w-full flex-col items-center justify-center overflow-hidden border border-zinc-200/10 bg-zinc-100/70 dark:bg-gray-800 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-10 rounded-2xl">
            {/* Pattern overlay */}
            <div
                className="pointer-events-none absolute inset-0 opacity-30 dark:opacity-60"
                style={{
                    backgroundImage:
                        "radial-gradient(1px 1px at 20px 20px, rgba(0,0,0,.25), transparent), radial-gradient(1px 1px at 40px 60px, rgba(255,255,255,.25), transparent)",
                    backgroundSize: "80px 80px",
                }}
            />
            {/* Title in upper left corner */}
            <div className="absolute top-6 left-8 z-10">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
            </div>
            <div className="relative max-w-2xl text-center text-zinc-900 dark:text-zinc-100">
                {children}
            </div>
        </section>
    );
}

export default Card
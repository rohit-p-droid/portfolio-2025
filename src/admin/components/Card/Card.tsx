import type { ReactElement } from "react"

const Card = ({ title, children }: { title: string, children: ReactElement }) => {
    return (
        <section className="relative flex min-h-[100%] w-full flex-col overflow-hidden border border-zinc-200/10 bg-zinc-100/70 dark:bg-gray-800 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-10 rounded-2xl">           
           
            <div className="absolute top-6 left-8 z-10">
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">{title}</h2>
            </div>
            <div className="pt-10">
                {children}
            </div>
        </section>
    );
}

export default Card
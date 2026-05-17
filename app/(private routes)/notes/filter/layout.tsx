import css from "./LayoutNotes.module.css";


export default function LayoutNotes({
    children,
    sidebar
}: Readonly<{
    children: React.ReactNode;
    sidebar: React.ReactNode;
}>)  {
    return (
        <section className={css.container}>
            <aside className={css.sidebar}>{sidebar}</aside>
            <main className={css.notesWrapper}>{children}</main>
        </section>
    )
}
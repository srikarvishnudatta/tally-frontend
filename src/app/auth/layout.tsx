export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return <section className="h-screen max-w-7xl mx-auto flex justify-center items-center">
        {children}
    </section>
}
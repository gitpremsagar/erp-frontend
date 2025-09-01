import Header from "@/components/home/Header";
export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>
        <Header />
            {children}
        </>
    )
}
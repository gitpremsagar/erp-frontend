import Header from "@/components/home/Header";

export const metadata = {
    title: "Sri Gopal Traders",
    description: "Sri Gopal Traders is a company that sells products to the public."
}

export default function CommonLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
        <Header />
            {children}
        </>
    )
}
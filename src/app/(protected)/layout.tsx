"use client"
import { Provider } from "react-redux";
import store from "@/redux/store";
import DataInitializer from "@/components/DataInitializer";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <Provider store={store}>
                <DataInitializer />
                {children}
            </Provider>
        </>
    )
}
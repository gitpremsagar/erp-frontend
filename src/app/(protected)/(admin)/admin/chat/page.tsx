import AdminHeader from "../_components/AdminHeader";
import AdminSidebar from "../_components/AdminSidebar";
import ChatHeader from "./_components/ChatHeader";
import ChatSidebar from "./_components/ChatSidebar";
import ChatMain from "./_components/ChatMain";
import { ChatProvider } from "./_components/ChatContext";

export default function ChatPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />
      <div className="flex h-[calc(100vh-64px)]">
        <AdminSidebar />
        <ChatProvider>
          <div className="flex-1 overflow-hidden">
            <div className="h-full flex flex-col">
              <ChatHeader />
              <div className="flex-1 flex overflow-hidden">
                <ChatSidebar />
                <ChatMain />
              </div>
            </div>
          </div>
        </ChatProvider>
      </div>
    </div>
  );
}

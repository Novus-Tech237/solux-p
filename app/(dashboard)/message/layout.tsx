import ConversationList from "@/components/ConversationList";
import Sidebar from "./_components/sidebar/Sidebar";

export default async function MessageLayout({children}:{children: React.ReactNode}){
    return (
    <Sidebar>
    <div className="h-full">
      <ConversationList 
            // users={users} 
            title="Messages" 
            initialItems={[]} users={[]}        // initialItems={conversations}
      />
      {children}
    </div>
  </Sidebar>
    )
}
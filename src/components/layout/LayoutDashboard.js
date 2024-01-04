import Sidebar from "@/components/Sidebar/Sidebar";
import Topbar from "@/components/Topbar/Topbar";
import { useOpenSidebar } from "@/contexts/openSidebar";

export default function LayoutDashboard({ children }) {
  const { isOpen, setIsOpen } = useOpenSidebar();
  return (
    <div className="min-h-screen w-screen relative ">
      <Topbar />
      <Sidebar />
      <div
        className={`flex items-start  absolute left-0 ${
          isOpen
            ? " duration-[calc(1s)] w-[calc(100%-15rem)] "
            : " duration-[calc(3s)] w-full"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

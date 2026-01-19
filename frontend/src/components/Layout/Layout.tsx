
import TopBar from "../../components/TopBar/TopBar";
import Sidebar from "../../components/Sidebar/Sidebar";
import avatar1 from "../../assets/avatar1.png";
import type { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="app-shell">
      <TopBar username="@Khali_1998" avatar={avatar1} />
      <Sidebar />
      <main className="app-content">{children}</main>
    </div>
  );
}

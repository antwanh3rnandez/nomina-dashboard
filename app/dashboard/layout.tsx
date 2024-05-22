import { SidebarProvider } from '../lib/context-sidebar';
import SideNav from '../ui/dashboard/sidenav';
import TopBar from '../ui/dashboard/topbar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col md:flex-row md:overflow-hidden">
        <div className={`w-full md:flex-1`}>
          <SideNav />
        </div>
        <div className="w-full flex-row md:flex-row md:overflow-y-auto">
          <div className="top-0 hidden w-full px-3 md:flex md:flex-col md:px-0">
            <TopBar />
          </div>
          <div className="flex-grow p-6 md:overflow-y-auto md:px-6 md:py-4">
            {children}
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}

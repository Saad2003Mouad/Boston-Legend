"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Home, CalendarDays, Users, Package,
  Settings, LogOut, Menu, X, Bell, Search,
  ChevronRight, Sparkles, User, Box, ArrowRight,
  LayoutDashboard, Calendar, ClipboardList, CheckSquare,
  Inbox, Bot, Truck, MapPin, Shield, Plus, ChevronDown, BookCheck
} from "lucide-react";
import Logo from "@/components/shared/Logo";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const urlBase64ToUint8Array = (base64String: string) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

type NavItem = { href: string; label: string; icon: any; badge?: number };
type NavGroup = { title: string; items: NavItem[] };

const NAV_GROUPS: NavGroup[] = [
  {
    title: "Overview",
    items: [
      { href: "/admin",            label: "Dashboard",     icon: LayoutDashboard },
      { href: "/admin/calendar",   label: "Calendar",      icon: Calendar },
    ]
  },
  {
    title: "Operations",
    items: [
      { href: "/admin/bookings",   label: "Bookings",      icon: ClipboardList },
      { href: "/admin/tasks",      label: "Tasks",         icon: CheckSquare },
    ]
  },
  {
    title: "CRM",
    items: [
      { href: "/admin/customers",  label: "Customers",     icon: Users },
      { href: "/admin/inquiries",  label: "Inquiries",     icon: Inbox },
      { href: "/admin/ai",         label: "AI Concierge",  icon: Bot },
    ]
  },
  {
    title: "Content & Resources",
    items: [
      { href: "/admin/blog",           label: "Blog & Stories", icon: BookCheck },
      { href: "/admin/vehicles",       label: "Fleet",          icon: Truck },
      { href: "/admin/packages",       label: "Packages",       icon: Package },
      { href: "/admin/service-areas",  label: "Service Areas",  icon: MapPin },
    ]
  },
  {
    title: "Administration",
    items: [
      { href: "/admin/users",     label: "Staff & Roles", icon: Shield },
      { href: "/admin/settings",  label: "Settings",      icon: Settings },
    ]
  }
];

function isRouteAllowed(role: string, href: string): boolean {
  if (role === "OWNER" || role === "ADMIN") return true;
  if (role === "DISPATCHER") {
    return ["/admin", "/admin/calendar", "/admin/bookings", "/admin/tasks",
      "/admin/customers", "/admin/inquiries", "/admin/vehicles"].includes(href);
  }
  if (role === "SUPPORT") {
    return ["/admin", "/admin/calendar", "/admin/bookings",
      "/admin/customers", "/admin/inquiries"].includes(href);
  }
  return ["/admin"].includes(href);
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession();
  const userRole = session?.user?.email === "saadmoad2004@gmail.com" ? "OWNER" : ((session?.user as any)?.role || "OWNER");
  const userName = session?.user?.name || session?.user?.email?.split("@")[0] || "Admin";
  const userInitials = userName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showNotif, setShowNotif] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSignOutModal, setShowSignOutModal] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const activePage = NAV_GROUPS.flatMap(g => g.items).find(n => isActive(n.href));

  useEffect(() => {
    async function loadBadges() {
      try {
        const r = await fetch("/api/admin/bookings?status=PENDING_REVIEW&limit=1");
        if (r.ok) {
          const d = await r.json();
          setPendingCount(d.total || 0);
        }
      } catch {}
    }
    async function initPush() {
      if ('serviceWorker' in navigator && 'PushManager' in window && process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY) {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js');
          let subscription = await registration.pushManager.getSubscription();
          
          if (!subscription) {
            subscription = await registration.pushManager.subscribe({
              userVisibleOnly: true,
              applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY)
            });
          }

          if (subscription) {
            await fetch('/api/push/subscribe', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(subscription)
            });
          }
        } catch (e) {
          console.error('Push registration failed', e);
        }
      }
    }
    
    loadBadges();
    initPush();
  }, []);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setShowNotif(false);
      if (userRef.current && !userRef.current.contains(e.target as Node)) setShowUserMenu(false);
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [status, router]);

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      router.push(`/admin/bookings?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  if (status === "loading") {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F9FAFB]">
        <div className="flex flex-col items-center gap-5">
          <div className="relative animate-pulse">
            <div className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <Image src="/images/icon.png" alt="Boston Legend Assistant" fill className="object-contain" sizes="48px" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-coral border-2 border-white animate-ping" />
          </div>
          <p className="text-sm font-semibold text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (status === "unauthenticated") {
    // Next.js redirect doesn't work directly in render like this without throwing, 
    // but we can use useEffect or just let a quick client-side replace happen.
    // However, it's safer to use router.replace in a useEffect.
    // Since we can't easily add a hook here conditionally, we can return null
    // because we will add a useEffect above.
    return null;
  }

  const sidebarW = sidebarCollapsed ? "w-[72px]" : "w-[260px]";

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB] font-sans">

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* ── SIDEBAR ── */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex flex-col bg-white border-r border-gray-100 transition-all duration-300 ease-in-out shadow-sm",
          sidebarW,
          "md:relative md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        )}
      >
        {/* Logo */}
        <div className={cn(
          "flex items-center border-b border-gray-100 h-[72px] flex-shrink-0 transition-all duration-300",
          sidebarCollapsed ? "px-3 justify-center" : "px-4 justify-between"
        )}>
          {!sidebarCollapsed ? (
            <>
              <Link href="/admin" className="flex items-center justify-center w-full">
                <Logo width={180} height={90} />
              </Link>
              <button
                onClick={() => setSidebarCollapsed(true)}
                className="hidden md:flex w-7 h-7 rounded-lg items-center justify-center text-gray-400 hover:text-navy hover:bg-gray-50 transition-colors"
              >
                <ChevronRight className="w-4 h-4 rotate-180" />
              </button>
            </>
          ) : (
            <button
              onClick={() => setSidebarCollapsed(false)}
              className="flex items-center justify-center hover:opacity-80 transition-opacity"
            >
              <Logo width={60} height={30} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {NAV_GROUPS.map((group, gi) => {
            const visibleItems = group.items.filter(item => isRouteAllowed(userRole, item.href));
            if (visibleItems.length === 0) return null;
            return (
              <div key={gi}>
                {!sidebarCollapsed && (
                  <div className="text-[10px] font-black text-gray-400 uppercase tracking-[0.1em] mb-1.5 px-2">
                    {group.title}
                  </div>
                )}
                <div className="space-y-0.5">
                  {visibleItems.map(({ href, label, icon: Icon }) => {
                    const active = isActive(href);
                    return (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setSidebarOpen(false)}
                        title={sidebarCollapsed ? label : undefined}
                        className={cn(
                          "flex items-center gap-3 rounded-xl transition-all duration-150 group relative",
                          sidebarCollapsed ? "justify-center w-10 h-10 mx-auto" : "px-3 py-2.5",
                          active
                            ? "bg-coral/10 text-coral"
                            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        <Icon className={cn(
                          "flex-shrink-0 transition-colors",
                          sidebarCollapsed ? "w-5 h-5" : "w-4 h-4",
                          active ? "text-coral" : "text-gray-400 group-hover:text-gray-600"
                        )} />
                        {!sidebarCollapsed && (
                          <>
                            <span className={cn(
                              "text-[13.5px] font-semibold flex-1",
                              active ? "font-bold" : ""
                            )}>
                              {label}
                            </span>
                            {href === "/admin/bookings" && pendingCount > 0 && (
                              <span className="text-[10px] font-black bg-coral text-white px-1.5 py-0.5 rounded-full">
                                {pendingCount > 99 ? "99+" : pendingCount}
                              </span>
                            )}
                          </>
                        )}
                        {active && !sidebarCollapsed && (
                          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-coral rounded-r-full" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        {/* User Area */}
        <div className="border-t border-gray-100 p-3 flex-shrink-0">
          {!sidebarCollapsed ? (
            <div className="flex items-center gap-3 px-2 py-2 rounded-xl hover:bg-gray-50 transition-colors">
              <div className="w-8 h-8 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center flex-shrink-0">
                <span className="text-coral font-black text-xs">{userInitials}</span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[12.5px] font-bold text-navy truncate">{userName}</div>
                <div className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">{userRole}</div>
              </div>
              <button
                onClick={() => setShowSignOutModal(true)}
                className="text-gray-400 hover:text-red-500 transition-colors p-1 rounded-lg"
                title="Sign Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              onClick={() => setShowSignOutModal(true)}
              className="w-10 h-10 mx-auto flex items-center justify-center rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          )}
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── TOP HEADER ── */}
        <header className="h-16 flex-shrink-0 flex items-center justify-between px-4 md:px-6 bg-white border-b border-gray-100 sticky top-0 z-30">
          {/* Left: Mobile menu + breadcrumb */}
          <div className="flex items-center gap-3">
            <button
              className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </button>

            <div className="hidden sm:flex items-center gap-2">
              <span className="text-sm font-semibold text-gray-400">Admin</span>
              {activePage && (
                <>
                  <ChevronRight className="w-3 h-3 text-gray-300" />
                  <span className="text-sm font-bold text-navy">{activePage.label}</span>
                </>
              )}
            </div>
          </div>

          {/* Right: Search, Actions, Profile */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden lg:flex items-center relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleSearch}
                placeholder="Search bookings, customers..."
                className="w-64 bg-gray-50 border border-gray-200 text-sm rounded-xl pl-9 pr-4 py-2 outline-none focus:bg-white focus:border-coral/50 focus:ring-2 focus:ring-coral/10 transition-all placeholder:text-gray-400 font-medium"
              />
            </div>

            {/* Quick Create */}
            <Link
              href="/book"
              target="_blank"
              className="hidden md:flex items-center gap-1.5 px-3 py-2 bg-coral text-white rounded-xl text-[13px] font-bold hover:bg-coral-dark transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              New Booking
            </Link>

            {/* Notifications */}
            <div className="relative" ref={notifRef}>
              <button
                onClick={() => { setShowNotif(!showNotif); setShowUserMenu(false); }}
                className="relative w-9 h-9 flex items-center justify-center rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
              >
                <Bell className="w-4.5 h-4.5 w-[18px] h-[18px]" />
                {pendingCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-coral rounded-full ring-2 ring-white" />
                )}
              </button>

              {showNotif && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                    <span className="font-bold text-sm text-navy">Notifications</span>
                    {pendingCount > 0 && (
                      <span className="text-xs font-bold text-coral bg-coral/10 px-2 py-0.5 rounded-full">
                        {pendingCount} pending
                      </span>
                    )}
                  </div>
                  {pendingCount > 0 ? (
                    <div className="p-4">
                      <Link
                        href="/admin/bookings?status=PENDING_REVIEW"
                        onClick={() => setShowNotif(false)}
                        className="flex items-center gap-3 p-3 rounded-xl bg-amber-50 border border-amber-100 hover:bg-amber-100 transition-colors"
                      >
                        <div className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                          <ClipboardList className="w-4 h-4 text-amber-600" />
                        </div>
                        <div>
                          <div className="text-sm font-bold text-gray-800">{pendingCount} Bookings Need Review</div>
                          <div className="text-xs font-medium text-gray-500 mt-0.5">Click to review pending bookings</div>
                        </div>
                      </Link>
                    </div>
                  ) : (
                    <div className="py-8 text-center text-sm font-semibold text-gray-400">
                      You're all caught up! 🎉
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* User Menu */}
            <div className="relative" ref={userRef}>
              <button
                onClick={() => { setShowUserMenu(!showUserMenu); setShowNotif(false); }}
                className="flex items-center gap-2 px-2 py-1.5 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-coral/10 border border-coral/20 flex items-center justify-center">
                  <span className="text-coral font-black text-xs">{userInitials}</span>
                </div>
                <span className="hidden sm:block text-[13px] font-bold text-navy max-w-[100px] truncate">{userName}</span>
                <ChevronDown className="hidden sm:block w-3.5 h-3.5 text-gray-400" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden z-50">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <div className="text-sm font-bold text-navy truncate">{userName}</div>
                    <div className="text-xs text-gray-400 font-semibold uppercase tracking-wide mt-0.5">{userRole}</div>
                  </div>
                  <div className="py-1">
                    <Link
                      href="/admin/settings"
                      onClick={() => setShowUserMenu(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
                    >
                      <Settings className="w-4 h-4 text-gray-400" />
                      Settings
                    </Link>
                  </div>
                  <div className="py-1 border-t border-gray-100">
                    <button
                      onClick={() => { setShowUserMenu(false); setShowSignOutModal(true); }}
                      className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm font-medium text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* ── CONTENT ── */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F9FAFB]">
          <div className="max-w-[1600px] mx-auto p-4 md:p-6 lg:p-8">
            {children}
          </div>
        </main>
      </div>

      {/* ── SIGN OUT MODAL ── */}
      {showSignOutModal && (
        <div className="fixed inset-0 bg-black/50 z-[100] flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6 border border-gray-100">
            <div className="w-12 h-12 rounded-full bg-red-50 border border-red-100 flex items-center justify-center mx-auto mb-4">
              <LogOut className="w-5 h-5 text-red-500" />
            </div>
            <h2 className="text-lg font-black text-navy text-center mb-1">Sign Out?</h2>
            <p className="text-sm text-gray-500 text-center mb-6 font-medium">
              You'll need to sign back in to access the admin dashboard.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowSignOutModal(false)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => signOut({ callbackUrl: "/login" })}
                className="flex-1 py-2.5 rounded-xl bg-red-500 text-white text-sm font-bold hover:bg-red-600 transition-colors shadow-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

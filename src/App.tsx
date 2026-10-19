import "@fontsource-variable/figtree";
import "@fontsource-variable/kode-mono";

import { useEffect, useState } from "react";

import { Badge } from "@ui/badge";
import { Button } from "@ui/button";
import { Toaster } from "@ui/sonner";
import { ThemeProvider } from "@ui/theme-provider";

import { cn } from "./lib/utils";
import { Dashboard } from "./parts/Dashboard";
import { ModalManager } from "./parts/ModalManager";
import { NavBar } from "./parts/NavBar";
import { SettingsModal } from "./parts/Settings";
import { WidgetPropsEditorModal } from "./parts/WidgetPropsEditor";
import { dataActions, useBackgroundTasks } from "./stores/Data";
import { useDashboard, useWorkspaceStore } from "./stores/Workspace";

import "./global.css";

import { useIcons } from "./hooks/useIcons";
import { useRobotNetworkAddress, useRobotPingTimeoutMilliseconds } from "./hooks/useRobotSettings";
import { useSyncWindowTitle } from "./hooks/useSyncWindowTitle";

const { connect, disconnect, subscribe, setPingTimeoutMilliseconds } = dataActions;

type AppTab = "home" | "scouting" | "dashboard";

export const App = () => {
  const [activeTab, setActiveTab] = useState<AppTab>("home");

  useIcons();
  useSyncWindowTitle();

  useBackgroundTasks();

  const address = useRobotNetworkAddress();
  useEffect(() => {
    if (address) {
      connect(address);
      subscribe(useWorkspaceStore.getState().slots);
    }
    return () => disconnect();
  }, [address]);

  const pingTimeoutMilliseconds = useRobotPingTimeoutMilliseconds();
  useEffect(() => {
    setPingTimeoutMilliseconds(pingTimeoutMilliseconds);
  }, [pingTimeoutMilliseconds]);

  const slots = useWorkspaceStore((store) => store.slots);
  useEffect(() => {
    subscribe(slots);
  }, [slots]);

  const dashboard = useDashboard();

  return (
    <ThemeProvider defaultTheme="dark">
      <ModalManager
        slot="default"
        side="right"
      />
      <SettingsModal />
      <WidgetPropsEditorModal />
      <div className="flex h-screen w-full flex-col overflow-hidden bg-background text-foreground">
        <header className="flex h-12 flex-none items-center justify-between border-b bg-background px-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("home")}
              className="cursor-pointer text-base font-bold tracking-tight text-foreground transition-opacity hover:opacity-80">
              SpectreHub
            </button>
            <Badge
              variant="secondary"
              className="text-[11px] font-medium text-muted-foreground">
              Work in Progress
            </Badge>
          </div>

          <div
            role="tablist"
            aria-label="SpectreHub Sections"
            className="flex items-center gap-1 rounded-md bg-secondary/60 p-1">
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "scouting"}
              onClick={() => setActiveTab("scouting")}
              className={cn(
                "cursor-pointer rounded px-3 py-1 text-xs font-medium transition-colors select-none",
                activeTab === "scouting"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}>
              Scouting
            </button>
            <button
              type="button"
              role="tab"
              aria-selected={activeTab === "dashboard"}
              onClick={() => setActiveTab("dashboard")}
              className={cn(
                "cursor-pointer rounded px-3 py-1 text-xs font-medium transition-colors select-none",
                activeTab === "dashboard"
                  ? "bg-background text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground"
              )}>
              Dashboard (Reflect)
            </button>
          </div>
        </header>

        <main className="relative z-0 flex min-h-0 flex-1 w-full overflow-hidden">
          {activeTab === "home" && (
            <div className="flex flex-1 flex-col items-center justify-center gap-4 p-6 text-center">
              <Badge
                variant="outline"
                className="px-2.5 py-1 text-xs tracking-wide uppercase">
                Work in Progress
              </Badge>
              <h1 className="text-4xl font-bold tracking-tight">SpectreHub</h1>
              <p className="max-w-md text-sm text-muted-foreground">
                This is a work in progress. Select a tab above or below to switch between Scouting and the Reflect
                Dashboard.
              </p>
              <div className="mt-2 flex items-center gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setActiveTab("scouting")}>
                  Scouting
                </Button>
                <Button
                  variant="default"
                  onClick={() => setActiveTab("dashboard")}>
                  Dashboard (Reflect)
                </Button>
              </div>
            </div>
          )}

          {activeTab === "scouting" && <div className="flex flex-1 overflow-hidden bg-background" />}

          {activeTab === "dashboard" && (
            <div className="relative z-0 flex h-full w-full overflow-hidden">
              <aside className="w-14 flex-none border-r bg-background">
                <NavBar />
              </aside>
              {dashboard && <Dashboard dashboard={dashboard} />}
            </div>
          )}
        </main>
      </div>
      <Toaster position="bottom-right" />
    </ThemeProvider>
  );
};


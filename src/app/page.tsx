import Desktop from "@/components/Desktop";
import Taskbar from "@/components/Taskbar";
import WindowManager from "@/components/WindowManager";

export default function Home() {
  return (
    <main className="h-full">
      <Desktop />
      <WindowManager />
      <Taskbar />
    </main>
  );
}

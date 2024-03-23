import Content from "components/layout/Content";
import Header from "components/layout/Header";
import Navigation from "components/layout/Navigation";
import { useEffect, useState } from "react";

export default function App() {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState<any>(null);

  useEffect(() => {
    const handler = (e: any) => {
      e.preventDefault();
      setSupportsPWA(true);
      setPromptInstall(e);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("transitionend", handler);
  }, []);
  const onClick = (e: any) => {
    e.preventDefault();
    if (promptInstall) {
      promptInstall.prompt();
    } else {
      return;
    }
  };
  return (
    <div className="cv-app flex flex-col">
      <main className="cv-content flex-1 w-full pt-[20px] pb-[80px]">
        <Content />
      </main>
      <footer className="cv-footer w-full h-[80px] flex justify-center fixed z-20 bg-black bottom-0">
        <Navigation />
      </footer>
    </div>
  );
}

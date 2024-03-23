import Content from "components/layout/Content";
import Header from "components/layout/Header";
import Navigation from "components/layout/Navigation";
import { useAppStore } from "stores/AppStore";

export default function App() {
  const { activeView } = useAppStore();

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

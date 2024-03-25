import Content from "components/layout/Content";
import Navigation from "components/layout/Navigation";
import { useEffect, useState } from "react";
import { useAppStore } from "stores/AppStore";

export default function App() {
  const { activeView } = useAppStore();

  const [scrollTop, setScrollTop] = useState(0);

  const handleNavbarOnScroll = (e: any) => {
    setScrollTop(e.target.scrollingElement.scrollTop);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleNavbarOnScroll);
    return () => {
      window.removeEventListener("scroll", handleNavbarOnScroll);
    };
  }, [scrollTop]);

  return (
    <div className="cv-app flex flex-col">
      <div
        className="fixed w-full z-30"
        style={{
          height: scrollTop > 0 ? "40px" : "80px",
        }}
      >
        <div className="origin-top-left bg-black/90 px-[40px] pt-[20px] pb-[20px]">
          {activeView === "grotte-passe" && (
            <h1
              className="mb-0 text-center"
              style={{
                transition: "font-size 0.1s linear",
                fontSize: scrollTop > 0 ? "1.5rem" : "2rem",
              }}
            >
              La Grotte du Passé
            </h1>
          )}
          {activeView === "grotte-present" && (
            <h1
              className="mb-0 text-center"
              style={{
                transition: "font-size 0.1s linear",
                fontSize: scrollTop > 0 ? "1.5rem" : "2rem",
              }}
            >
              La Grotte du Présent
            </h1>
          )}
        </div>
      </div>

      <main className="cv-content flex-1 w-full pt-[70px] pb-[80px]">
        <Content />
      </main>
      <footer className="cv-footer w-full h-[80px] flex justify-center fixed z-20 bg-black bottom-0">
        <Navigation />
      </footer>
    </div>
  );
}

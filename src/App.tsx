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
      <div className="fixed bg-black w-full z-30">
        {activeView === "grotte-passe" && (
          <h1
            className="mb-0"
            style={{
              fontSize: scrollTop > 0 ? "1.5rem" : "2rem",
              lineHeight: scrollTop > 0 ? "1.5rem" : "2rem",
              padding:
                scrollTop > 0 ? "20px 40px 15px 40px" : "30px 40px 20px 40px",
              transition: "all 0.1s ease-out",
            }}
          >
            La Grotte du Passé
          </h1>
        )}
        {activeView === "grotte-present" && (
          <h1
            className="mb-0"
            style={{
              fontSize: scrollTop > 0 ? "1.5rem" : "2rem",
              lineHeight: scrollTop > 0 ? "1.5rem" : "2rem",
              padding:
                scrollTop > 0 ? "20px 40px 15px 40px" : "30px 40px 20px 40px",
              transition: "all 0.1s ease-out",
            }}
          >
            La Grotte du Présent
          </h1>
        )}
      </div>

      <main className="cv-content flex-1 w-full pt-[100px] pb-[80px]">
        <Content />
      </main>
      <footer className="cv-footer w-full h-[80px] flex justify-center fixed z-20 bg-black bottom-0">
        <Navigation />
      </footer>
    </div>
  );
}

import Content from "components/layout/Content";
import Navigation from "components/layout/Navigation";
import { useEffect, useState } from "react";
import { useAppStore } from "stores/AppStore";
import navigationMask from "assets/images/navigation_mask.png";

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
        <img
          src={navigationMask}
          style={{
            bottom: scrollTop > 0 ? -30 : -10,
            transform: "rotate(180deg)",
          }}
          className="absolute w-full h-[40px] left-0"
        />
        <div
          className="absolute w-full origin-top-left bg-black px-[40px]"
          style={{
            paddingTop: scrollTop > 0 ? 10 : 20,
          }}
        >
          {activeView === "grotte-passe" && (
            <h1
              className="mb-0 text-center"
              style={{
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
                fontSize: scrollTop > 0 ? "1.5rem" : "2rem",
              }}
            >
              La Grotte du Présent
            </h1>
          )}
        </div>
      </div>

      <main className="cv-content flex-1 flex w-full items-center justify-center pt-[90px] pb-[100px]">
        <Content />
      </main>
      <footer className="cv-footer w-full h-[100px] pt-[5px] flex justify-center fixed z-20 bg-black bottom-0">
        <Navigation />
      </footer>
    </div>
  );
}

import { useAppStore } from "stores/AppStore";
import navigationMask from "assets/images/navigation_mask.png";
import { useEffect } from "react";

export default function Header() {
  const { activeView } = useAppStore();

  useEffect(() => {});
  return (
    <div className="w-full h-full flex justify-center items-center p-2">
      <img
        src={navigationMask}
        style={{ transform: "rotate(180deg)" }}
        className="absolute w-full h-[40px] top-[-40px]"
      />
      {activeView === "grotte-passe" && <h1>La Grotte du Passé</h1>}
      {activeView === "grotte-present" && <h1>La Grotte du Présent</h1>}
      <p>MUTE</p>
    </div>
  );
}

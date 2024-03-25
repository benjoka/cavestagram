import passeIcon from "assets/images/icons/icon_lamp.png";
import passeIconFill from "assets/images/icons/icon_lamp_fill.png";
import presentIcon from "assets/images/icons/icon_lighter.png";
import presentIconFill from "assets/images/icons/icon_lighter_fill.png";
import { useAppStore } from "stores/AppStore";

export default function Navigation() {
  const { activeView, setActiveView } = useAppStore();

  return (
    <div className="cv-app w-full h-full max-w-[500px] flex flex-row justify-around">
      <div
        className="h-full flex items-start"
        onClick={() => setActiveView("grotte-passe")}
      >
        <div className="w-[60px] h-[60px]">
          <img
            src={passeIcon}
            width={50}
            height={50}
            className="absolute top-[10px]"
          />
          {activeView === "grotte-passe" && (
            <img
              src={passeIconFill}
              width={50}
              height={50}
              className="mt-[10px]"
            />
          )}
        </div>
      </div>
      <div
        className="h-full flex items-start"
        onClick={() => setActiveView("grotte-present")}
      >
        <div className="w-[60px] h-[60px]">
          <img src={presentIcon} width={60} height={60} className="absolute" />
          {activeView === "grotte-present" && (
            <img src={presentIconFill} width={60} height={60} />
          )}
        </div>
      </div>
    </div>
  );
}

import caveIcon from "assets/images/icons/icon_home.png";
import caveIconFill from "assets/images/icons/icon_home_fill.png";
import exploreIcon from "assets/images/icons/icon_lamp.png";
import exploreIconFill from "assets/images/icons/icon_lamp_fill.png";
import participateIcon from "assets/images/icons/icon_brush.png";
import participateIconFill from "assets/images/icons/icon_brush_fill.png";
import { useAppStore } from "stores/AppStore";

export default function Navigation() {
  const { activeView, setActiveView } = useAppStore();

  return (
    <div className="cv-app w-full h-full max-w-[500px] flex flex-row justify-around">
      <div
        className="h-full flex items-center"
        onClick={() => setActiveView("grotte-passe")}
      >
        <div className="w-[50px] h-[50px]">
          <img src={caveIcon} width={50} height={50} className="absolute" />
          {activeView === "grotte-passe" && (
            <img src={caveIconFill} width={50} height={50} />
          )}
        </div>
      </div>
      <div
        className="h-full flex items-center"
        onClick={() => setActiveView("grotte-present")}
      >
        <div className="w-[50px] h-[50px]">
          <img src={exploreIcon} width={50} height={50} className="absolute" />
          {activeView === "grotte-present" && (
            <img src={exploreIconFill} width={50} height={50} />
          )}
        </div>
      </div>
    </div>
  );
}

import GrottePasse from "components/views/GrottePasse";
import GrottePresent from "components/views/GrottePresent";
import Participate from "components/views/Participate";
import { useAppStore } from "stores/AppStore";

export default function Content() {
  const { activeView } = useAppStore();

  return (
    <div className=" w-full h-full px-[40px]">
      {activeView === "grotte-passe" && <GrottePasse />}
      {activeView === "grotte-present" && <GrottePresent />}
      {activeView === "participate" && <Participate />}
    </div>
  );
}

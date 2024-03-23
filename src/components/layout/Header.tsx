import cavesLogo from "assets/images/logo/caves.png";
import { useAppStore } from "stores/AppStore";
export default function Header() {
  const { activeView } = useAppStore();

  return (
    <div className="w-full h-full flex justify-center items-center p-2">
      {activeView === "grotte-passe" && <h1>La Grotte du Passé</h1>}
      {activeView === "grotte-present" && <h1>La Grotte du Présent</h1>}
    </div>
  );
}

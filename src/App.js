import Home from "./Component/Home";
import Result from "./Component/Result";
import SearchBar from "./Component/Search";

export default function App() {
  return (
    <div className="w-screen h-screen bg-gradient-to-r from-cyan-500 to-blue-500">
      <Home/>
    <SearchBar/>
    <Result/>
    </div>
  );
}

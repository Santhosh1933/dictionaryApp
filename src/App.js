import "./App.css";
import { CopyRight } from "./component/CopyRight";
import { Dictionary } from "./component/Dictionary";
import { Loading } from "./component/Loading";

function App() {
  return (
    <div className="App min-h-screen dark:bg-darkPrimary flex flex-col gap-16 bg-slate-50">
      <Dictionary />
      <CopyRight/>

    </div>
  );
}

export default App;

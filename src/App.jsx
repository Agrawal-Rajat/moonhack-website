import { useState, useEffect } from "react";
import Preloader from "./components/PreLoader";
import MainContent from "./components/MainContent";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 3000); // Show for 3 sec
  }, []);

  return loading ? <Preloader onComplete={() => setLoading(false)} /> : <MainContent />;


}

export default App;

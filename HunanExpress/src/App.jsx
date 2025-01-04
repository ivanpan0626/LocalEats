import AppRoutes from "./AppRoutes.jsx"; //Handles App Routes
import Header from "./components/Header.jsx";
import Loading from "./components/Loading/Loading.jsx";
import { useLoading } from "./hooks/useLoading.jsx";
import { setLoadingInterceptor } from "./interceptors/loadingInterceptor.jsx";
import { useState, useEffect } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

function App() {
  const { showLoading, hideLoading } = useLoading(); //Loading screen
  const [searchTerm, setSearchTerm] = useState(""); //Pulling search from Header.jsx
  const [tag, setTag] = useState("All"); //Pulling search from Header.jsx

  useEffect(() => {
    setLoadingInterceptor({ showLoading, hideLoading });
  }, []);

  const handleSearch = (query) => {
    setSearchTerm(query); // Update searchTerm
  };

  const handleTagClick = (query) => {
    setTag(query); // Update searchTerm
  };

  return (
    <>
      <Loading />
      <Header onSearch={handleSearch} onTagClick={handleTagClick} />
      <AppRoutes />
      <SpeedInsights />
      <Analytics />
    </>
  );
}

export default App;

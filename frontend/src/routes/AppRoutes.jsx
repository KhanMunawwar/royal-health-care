import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import HomeCare from "../pages/HomeCare";
import OnlineConsultation from "../pages/OnlineConsultation";
import Contact from "../pages/Contact";
import NotFound from "../pages/NotFound";


function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/services" element={<Services />} />
      <Route path="/home-care" element={<HomeCare />} />
      <Route path="/online-consultation" element={<OnlineConsultation />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
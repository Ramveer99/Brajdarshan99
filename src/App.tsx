import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Destinations from './pages/Destinations';
import DestinationDetail from './pages/DestinationDetail';
import Temples from './pages/Temples';
import TempleDetail from './pages/TempleDetail';
import Experiences from './pages/Experiences';
import YatraPlanner from './pages/YatraPlanner';
import Guide from './pages/Guide';
import Journal from './pages/Journal';
import ArticleDetail from './pages/ArticleDetail';
import Festivals from './pages/Festivals';
import Routes3 from './pages/RoutesPage';
import NotFound from './pages/NotFound';

export default function App() {
  return (
    <BrowserRouter basename="/braj">
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/destinations/:slug" element={<DestinationDetail />} />
          <Route path="/temples" element={<Temples />} />
          <Route path="/temples/:slug" element={<TempleDetail />} />
          <Route path="/experiences" element={<Experiences />} />
          <Route path="/routes" element={<Routes3 />} />
          <Route path="/planner" element={<YatraPlanner />} />
          <Route path="/guide" element={<Guide />} />
          <Route path="/journal" element={<Journal />} />
          <Route path="/journal/:slug" element={<ArticleDetail />} />
          <Route path="/festivals" element={<Festivals />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

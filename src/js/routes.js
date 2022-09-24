import HomePage from "../pages/home.jsx";
import InfoPage from "../pages/info.jsx";
import FavouritePage from "../pages/favorite.jsx";
import MusicPlayerPage from "../pages/music-player.jsx";
import NotFoundPage from "../pages/404.jsx";

var routes = [
  {
    path: "/",
    component: HomePage,
  },
  {
    path: "/music-player/:id/",
    component: MusicPlayerPage,
  },
  {
    path: "/favorite/",
    component: FavouritePage,
  },
  {
    path: "/info/",
    component: InfoPage,
  },
  {
    path: "(.*)",
    component: NotFoundPage,
  },
];

export default routes;

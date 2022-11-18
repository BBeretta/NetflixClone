import React, { useEffect, useState } from "react";
import Tmdb from "./Tmdb";
import MovieRow from "./components/MovieRow";
import "./App.css";
import FeaturedMoview from "./components/FeaturedMovie";
import Header from "./components/Header";

// eslint-disable-next-line import/no-anonymous-default-export
// eslint-disable-next-line
export default () => {
  const [movieList, setMovieList] = useState([]);
  const [featuredData, setFeaturedData] = useState(null);
  const [blackHeader, setBlackHeader] = useState(false);

  useEffect(() => {
    const loadAll = async () => {
      //Get list total
      let list = await Tmdb.getHomeList();
      setMovieList(list);

      //Get Featured (Filme em destaque, no fundo, background)
      let originals = list.filter((i) => i.slug === "originals");
      let randomChosen = Math.floor(
        Math.random() * (originals[0].items.results.length - 1)
      );
      let chosen = originals[0].items.results[randomChosen];

      //Get Filme or TV Info
      let chosenInfo = await Tmdb.getMovieInfo(chosen.id, "tv");

      setFeaturedData(chosenInfo);
    };

    loadAll();
  }, []);

  useEffect(() => {
    const scrollListener = () => {
      if (window.scrollY > 10) {
        setBlackHeader(true);
      } else {
        setBlackHeader(false);
      }
    };

    window.addEventListener("scroll", scrollListener);

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  return (
    <div className="page">
      <Header black={blackHeader} />

      {featuredData && <FeaturedMoview item={featuredData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>

      <footer>
        Feito com{" "}
        <span role="img" arial-labels="coração">
          ❤️
        </span>{" "}
        Primeiro Projeto React
        <br />
        Copyright: Netflix
        <br />
        API: themoviedb.org
        <br />
      </footer>

      {movieList.length <= 0 && (
        <div className="loading">
          <img
            src="https://media.wired.com/photos/592744d3f3e2356fd800bf00/master/w_1280%2Cc_limit/Netflix_LoadTime.gif"
            alt="Loading"
          />
        </div>
      )}
    </div>
  );
};

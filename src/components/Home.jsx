import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommend";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movies/movieSlice";

const Home = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = db.collection("movies").onSnapshot((snapshot) => {
      let recommends = [];
      let newDisney = [];
      let originals = [];
      let trending = [];

      snapshot.docs.forEach((doc) => {
        const movieData = { id: doc.id, ...doc.data() };
        switch (movieData.type) {
          case "new":
            newDisney = [...newDisney, movieData];
            break;
          case "original":
            originals = [...originals, movieData];
            break;
          case "trending":
            trending = [...trending, movieData];
            break;
          default:
            recommends = [...recommends, movieData];
            break;
        }
      });

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney,
          original: originals,
          trending,
        }),
      );
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trending />
    </Container>
  );
};

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-y: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background: url("/images/home-background.png") center center / cover
      no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;
  }
`;

export default Home;

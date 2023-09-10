import styled from "styled-components";
import ImgSlider from "./ImgSlider";
import Viewers from "./Viewers";
import Recommends from "./Recommend";
import NewDisney from "./NewDisney";
import Originals from "./Originals";
import Trending from "./Trending";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import db from "../firebase";
import { setMovies } from "../features/movies/movieSlice";
import { selectUserName } from "../features/user/UserSlice";

const Home = (props) => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  const [recommends, setRecommends] = useState([]);
  const [newDisney, setNewDisney] = useState([]);
  const [originals, setOriginals] = useState([]);
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    // console.log("hello");
    db.collection("movies").onSnapshot((snapshot) => {
      let recommends = [];
      let newDisney = [];
      let originals = [];
      let trending = [];

      snapshot.docs.forEach((doc) => {
        const movieData = { id: doc.id, ...doc.data() };
        // console.log(recommends);
        switch (movieData.type) {
          default:
            recommends = [...recommends, movieData];
            break;

          case "new":
            newDisney = [...newDisney, movieData];
            break;

          case "original":
            originals = [...originals, movieData];
            break;

          case "trending":
            trending = [...trending, movieData];
            break;
        }
      });
      setRecommends(recommends);
      setNewDisney(newDisney);
      setOriginals(originals);
      setTrending(trending);

      dispatch(
        setMovies({
          recommend: recommends,
          newDisney: newDisney,
          original: originals,
          trending: trending,
        })
      );
    });
  }, [dispatch, newDisney, originals, recommends, trending, userName]);

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

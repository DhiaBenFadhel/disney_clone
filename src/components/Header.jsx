import { auth, provider } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  selectUserName,
  selectUserPhoto,
  setUserLoginDetails,
  setSignOutState,
} from "../features/user/UserSlice";
import styled from "styled-components";
import { useCallback, useEffect } from "react";

const Header = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userName = useSelector(selectUserName);
  const userPhoto = useSelector(selectUserPhoto);
  const setUser = useCallback(
    (user) =>
      dispatch(
        setUserLoginDetails({
          name: user.displayName,
          photo: user.photoURL,
        })
      ),
    [dispatch]
  );

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        setUser(user);
        navigate("/home");
      }
    });
  }, [userName, setUser, navigate]);

  const handleAuth = () => {
    if (!userName) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          setUser(result.user);
          navigate("/home"); // After successful login, navigate to the home page
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (userName) {
      auth
        .signOut()
        .then(() => {
          dispatch(setSignOutState());
          navigate("/"); // After successful sign out, navigate to the login page
        })
        .catch((error) => alert(error.message));
    }
  };

  return (
    <Nav>
      <Link to="/">
        <Logo>
          <img src="/images/logo.svg" alt="Disney+" />
        </Logo>
      </Link>

      {!userName ? (
        <LoginBtn onClick={handleAuth}>Login</LoginBtn>
      ) : (
        <>
          <NavMenu>
            <Link to="/home">
              <img src="/images/home-icon.svg" alt="HOME" />
              <span>HOME</span>
            </Link>
            <Link to="/search">
              <img src="/images/search-icon.svg" alt="SEARCH" />
              <span>SEARCH</span>
            </Link>
            <Link to="/watchlist">
              <img src="/images/watchlist-icon.svg" alt="WATCHLIST" />
              <span>WATCHLIST</span>
            </Link>
            <Link to="/originals">
              <img src="/images/original-icon.svg" alt="ORIGINALS" />
              <span>ORIGINALS</span>
            </Link>
            <Link to="/movies">
              <img src="/images/movie-icon.svg" alt="MOVIEs" />
              <span>MOVIES</span>
            </Link>
            <Link to="/series">
              <img src="/images/series-icon.svg" alt="SERIES" />
              <span>SERIES</span>
            </Link>
          </NavMenu>
          <SignOut>
            <Link to="/">
              <USerImg src={userPhoto} alt={userName} />
              <DropDown>
                <span onClick={handleAuth}>Sign Out</span>
              </DropDown>
            </Link>
          </SignOut>
        </>
      )}
    </Nav>
  );
};

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;

  img {
    display: block;
    width: 100%;
  }
  cursor: pointer;
`;

const NavMenu = styled.div`
  align-items: center;
  display: flex;
  flex-flow: row nowrap;
  height: 100%;
  justify-content: center;
  margin: 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
    display: flex;
    align-items: center;
    padding: 0 12px;

    img {
      padding-right: 2px;
      height: 20px;
      min-width: 20px;
      width: 20px;
      z-index: auto;
    }

    span {
      color: rgb(249, 249, 249);
      font-size: 13px;
      letter-spacing: 1.42px;
      line-height: 1.08;
      padding: 2px;
      white-space: nowrap;
      position: relative;

      &:before {
        background-color: rgb(249, 249, 249);
        border-radius: 0px 0px 4px 4px;
        bottom: -6px;
        content: "";
        height: 2px;
        left: 0px;
        opacity: 0;
        position: absolute;
        right: 0px;
        transform-origin: left center;
        transform: scaleX(0);
        transition: all 300ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
        visibility: hidden;
        width: auto;
      }
    }

    &:hover {
      span:before {
        transform: scaleX(1);
        visibility: visible;
        opacity: 1 !important;
      }
    }
  }
  @media (max-width: 768px) {
    display: none;
  }
`;

const LoginBtn = styled.a`
  background-color: #090b13;
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #090b13;
    border-color: transparent;
  }
  cursor: pointer;
`;

const USerImg = styled.img`
  height: 90%;
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 12px;
  letter-spacing: 3px;
  width: 100px;
  opacity: 0;
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${USerImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;

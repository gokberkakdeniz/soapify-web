import { useTheme } from "@emotion/react";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RoundedButton } from "..";
import { getMessage } from "../../helpers";
import { authRequest } from "../../store/auth";

function Status(): JSX.Element | null {
  const dispatch = useDispatch();
  const theme = useTheme();
  const auth = useSelector((state) => state.auth);
  const { display_name, loaded } = useSelector((state) => state.profile);

  const login = useCallback(() => dispatch(authRequest()), [dispatch]);

  switch (auth.status) {
    case "initial":
      return (
        <RoundedButton onClick={login} color="#1db954">
          Login with Spotify
        </RoundedButton>
      );
    case "success":
      return loaded ? (
        <RoundedButton as="div" color={theme.colors.accent.primary}>
          {display_name}
        </RoundedButton>
      ) : (
        <RoundedButton as="div" color={theme.colors.accent.secondary}>
          Loading...
        </RoundedButton>
      );
    case "fail":
      return (
        <RoundedButton
          onClick={login}
          color={theme.colors.error.primary}
          title={getMessage(auth.error)}
        >
          Login with Spotify
        </RoundedButton>
      );
    default:
      return null;
  }
}

export default Status;

import { Auth0Provider, Auth0ProviderOptions } from "@auth0/auth0-react";
import { ReactNode } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children: ReactNode;
};
export const AuthenticationProvider = ({ children }: Props) => {
  const navigate = useNavigate();

  const domain = "printed.eu.auth0.com";
  const clientId = "Osac6BMW0ewuL7ELtZJwBfhXhCoyy59c";
  const redirectUri = window.location.origin;

  const onRedirectCallback: Auth0ProviderOptions["onRedirectCallback"] = (
    appState
  ) => {
    navigate(appState?.returnTo || window.location.pathname);
  };

  if (!(domain && clientId && redirectUri)) {
    return null;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: redirectUri,
      }}
      onRedirectCallback={onRedirectCallback}
    >
      {children}
    </Auth0Provider>
  );
};

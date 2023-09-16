import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ComponentType } from "react";
import { LoadingPage } from "../LoadingPage";

type Props = {
  component: ComponentType;
  onRedirecting?: () => JSX.Element;
};
export const AuthenticationGuard = ({ component, onRedirecting }: Props) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => onRedirecting?.() ?? <LoadingPage />,
  });

  return <Component />;
};

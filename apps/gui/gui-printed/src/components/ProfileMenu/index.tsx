import { useAuth0 } from "@auth0/auth0-react";
import { Button, Menu, MenuItem } from "@printed/design-system";

type Props = {
  anchorElement: HTMLElement | null;
  onClose: () => void;
};
export function ProfileMenu({ anchorElement, onClose }: Props) {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();

  const open = Boolean(anchorElement);

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
    });
  };

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <Menu anchorEl={anchorElement} open={open} onClose={onClose}>
      {isAuthenticated && (
        <MenuItem>
          <Button variant="text" onClick={handleLogout}>
            Logout
          </Button>
        </MenuItem>
      )}
      {!isAuthenticated && (
        <MenuItem>
          <Button variant="text" onClick={handleLogin}>
            Log in
          </Button>
        </MenuItem>
      )}
    </Menu>
  );
}

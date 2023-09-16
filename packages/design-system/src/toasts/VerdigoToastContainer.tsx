import { memo, ReactNode } from "react";

import { ToastContainer, IconProps } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import {
  CloseRounded,
  WarningAmberOutlined,
  CheckCircleOutlineRounded,
  InfoRounded,
  NotificationsActiveRounded,
  ErrorOutlineRounded,
} from "@mui/icons-material";

import { useTheme } from "@mui/material";
import { css } from "@emotion/css";

// import { Spacings } from '../theme';

type Props = {
  children?: ReactNode;
};

const VerdigoToastContainer = ({}: Props) => {
  const theme = useTheme();
  const mode = theme.palette.mode;

  return (
    <ToastContainer
      theme={mode}
      limit={3}
      style={{
        color: theme.palette.text.primary,
      }}
      closeButton={() => <CloseRounded fontSize="medium" color="inherit" />}
      icon={(props: IconProps) => {
        switch (props.type) {
          case "info":
            return <InfoRounded fontSize="medium" color="info" />;
          case "success":
            return (
              <CheckCircleOutlineRounded fontSize="medium" color="success" />
            );
          case "error":
            return <ErrorOutlineRounded fontSize="medium" color="error" />;
          case "warning":
            return <WarningAmberOutlined fontSize="medium" color="warning" />;
          case "default":
            return (
              <NotificationsActiveRounded fontSize="medium" color="inherit" />
            );
          default:
            undefined;
        }
      }}
      className={css`
        --toastify-text-color-light: ${theme.palette.text.primary};
        --toastify-text-color-dark: ${theme.palette.text.primary};
        --toastify-color-light: ${theme.palette.background.paper};
        --toastify-color-dark: ${theme.palette.background.paper};
        --toastify-color-info: ${theme.palette.info.main};
        --toastify-color-success: ${theme.palette.success.main};
        --toastify-color-warning: ${theme.palette.warning.main};
        --toastify-color-error: ${theme.palette.error.main};
        --toastify-color-transparent: rgba(255, 255, 255, 0.7);
        --toastify-color-progress-light: ${theme.palette.text.primary};
        --toastify-color-progress-dark: ${theme.palette.text.primary};
        --toastify-color-progress-info: var(--toastify-color-info);
        --toastify-color-progress-success: var(--toastify-color-success);
        --toastify-color-progress-warning: var(--toastify-color-warning);
        --toastify-color-progress-error: var(--toastify-color-error);
      `}
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      //   toastStyle={{ padding: theme.spacing(Spacings.smaller, Spacings.default) }}
      // bodyStyle: 8px between text and button
      // textPadding Vertical is 8px
    />
  );
};

export default memo(VerdigoToastContainer);

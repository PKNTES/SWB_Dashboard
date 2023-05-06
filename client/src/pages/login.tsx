import { useLogin } from "@refinedev/core";
import { useEffect, useRef } from "react";
import { SportsSoccerTwoTone } from "@mui/icons-material";

import { yariga } from "assets";

import { Box, Container, Typography } from "@mui/material";
import { ThemedTitleV2 } from "@refinedev/mui";

import { CredentialResponse } from "../interfaces/google";

// Todo: Update your Google Client ID here
const GOOGLE_CLIENT_ID =
  process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          client_id: GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  return (
    <Container
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        display="flex"
        gap="36px"
        justifyContent="center"
        flexDirection="column"
      >
        <ThemedTitleV2
          collapsed={false}
          icon={<SportsSoccerTwoTone />}
          text="SWB Dashboard"
          wrapperStyles={{
            fontSize: "22px",
            justifyContent: "center",
          }}
        />

        <GoogleButton />

        <Typography align="center" color={"text.secondary"} fontSize="12px">
          Powered by SWB
          <img
            style={{ padding: "0 5px" }}
            alt="SWB  "
            src="https://static.wixstatic.com/media/f3b58a_4e2d24c559d9463da234a24c190e436c~mv2.png/v1/fill/w_86,h_86,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/SWB%20Logo%20Primary%20(Large).png"
          />
          
        </Typography>
      </Box>
    </Container>
  );
};

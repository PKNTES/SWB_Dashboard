import {
  AuthBindings,
  Authenticated,
  GitHubBanner,
  Refine,
} from "@refinedev/core";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";

import {
  ErrorComponent,
  notificationProvider,
  RefineSnackbarProvider,
  Sider,
  ThemedLayoutV2,
  ThemedTitleV2
} from "@refinedev/mui";

import SportsSoccerIcon from '@mui/icons-material/SportsSoccer';
import EmojiPeopleIcon from '@mui/icons-material/EmojiPeople';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import SportsIcon from '@mui/icons-material/Sports';
import EngineeringIcon from '@mui/icons-material/Engineering';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

import { CssBaseline, GlobalStyles } from "@mui/material";
import routerBindings, {
  CatchAllNavigate,
  NavigateToResource,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import dataProvider from "@refinedev/simple-rest";
import axios, { AxiosRequestConfig } from "axios";
import { CredentialResponse } from "interfaces/google";
import {
  BlogPostCreate,
  BlogPostEdit,
  BlogPostList,
  BlogPostShow,
} from "pages/blog-posts";
import {
  CategoryCreate,
  CategoryEdit,
  CategoryList,
  CategoryShow,
} from "pages/categories";
import { CoachProfile, Login  } from "pages";
import { BrowserRouter, Outlet, Route, RouterProvider, Routes } from "react-router-dom";
import { parseJwt } from "utils/parse-jwt";
import { Header } from "./components/header";
import { ColorModeContextProvider } from "./contexts/color-mode";

import { MuiInferencer } from "@refinedev/inferencer/mui";
import { Dashboard } from "@mui/icons-material";
import Home from "pages/Home";
import ReportDetails from "pages/report-Details";
import AllReports from "pages/all-Reports";
import CreateReports from "pages/create-Reports";
import  EditReports  from "pages/edit-Reports";


import PlayerDetails from 'pages/player-Details';
import AllPlayers from 'pages/all-Players';
import CreatePlayers from "pages/create-Players";
import EditPlayers from "pages/edit-Players";
import { useParams } from "react-router-dom";

import Profile from "pages/coach-Profile";
import MyProfile from "pages/my-Profile";
import Teams from "pages/Teams";
import TeamDetails from "pages/Team-Details";
import { profile } from "console";
import Coaches from "pages/coach";


const axiosInstance = axios.create();
axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
  const token = localStorage.getItem("token");
  if (request.headers) {
    request.headers["Authorization"] = `Bearer ${token}`;
  } else {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

function App() {
  const { id } = useParams();
  const authProvider: AuthBindings = {
    login: async ({ credential }: CredentialResponse) => {
      const profileObj = credential ? parseJwt(credential) : null;

      if (profileObj) {
        const response =  await fetch('http://localhost:8080/api/v1/users', {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            name: profileObj.name,
            email: profileObj.email,
            avatar: profileObj.picture,
          }),
        },
          );

        const data = await response.json();
          
        if(response.status === 200) {
        localStorage.setItem(
          "user",
          JSON.stringify({
            ...profileObj,
            avatar: profileObj.picture,
            userid: data._id
          }),  
        );
        } else   {
          return Promise.reject();
        }
      }

        localStorage.setItem("token", `${credential}`);

        return {
          success: true,
          redirectTo: "/",
        };
      
      

    },
    logout: async () => {
      const token = localStorage.getItem("token");

      if (token && typeof window !== "undefined") {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        axios.defaults.headers.common = {};
        window.google?.accounts.id.revoke(token, () => {
          return {};
        });
      }

      return {
        success: true,
        redirectTo: "/login",
      };
    },
    onError: async (error) => {
      console.error(error);
      return { error };
    },
    check: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        return {
          authenticated: true,
        };
      }

      return {
        authenticated: false,
        error: {
          message: "Check failed",
          name: "Token not found",
        },
        logout: true,
        redirectTo: "/login",
      };
    },
    getPermissions: async () => null,
    getIdentity: async () => {
      const user = localStorage.getItem("user");
      if (user) {
        return JSON.parse(user);
      }

      return null;
    },
  };

  return (
    <BrowserRouter>
      
      <RefineKbarProvider>
        <ColorModeContextProvider>
          <CssBaseline />
          <GlobalStyles styles={{ html: { WebkitFontSmoothing: "auto" } }} />
          <RefineSnackbarProvider>
            <Refine
              dataProvider={dataProvider("http://localhost:8080/api/v1")}
              notificationProvider={notificationProvider}
              routerProvider={routerBindings}
              authProvider={authProvider}
              //DashboardPage={Home}
              resources={[
                {
                  name: "home",
                  options:  { label : 'Dashboard'},
                  list: MuiInferencer,
                  icon: <Dashboard color="secondary" />,
                  
                },
                {
                  name: "players",
                  list: AllPlayers,
                  show: PlayerDetails,
                  create: "/players/create",
                  edit: EditPlayers,
                  icon: <EmojiPeopleIcon color="secondary" />,
                  

                },
                {
                  name: "reports",
                  list: AllReports,
                  show: ReportDetails,
                  create: "/reports/create",
                  edit: EditReports,
                  icon: <EmojiPeopleIcon color="secondary" />,
                  

                },
                {
                  name: "Teams",
                  list: Teams,
                  icon: <Diversity3Icon color="secondary" />,
                  
                },
                {
                  name: "Coaches",
                  list: Coaches,
                  show: Profile,
                  icon: <SportsIcon color="secondary" />,
                  
                },
                {
                  name: "Admins",
                  options:  { label : 'Admin'},
                  list: Home,
                  icon: <EngineeringIcon color="secondary" />,
                  
                },
                {
                  name: "My-Profile",
                  options:  { label : 'My Profile'},
                  icon: <AccountCircleIcon color="secondary" />,
                  list: MyProfile,
                  
                },
                
                
              ]}
              options={{
                syncWithLocation: true,
                warnWhenUnsavedChanges: true,
              }}
            >
              <Routes>
                <Route
                  element={
                    <Authenticated fallback={<CatchAllNavigate to="/login" />}>
                      <ThemedLayoutV2 Header={Header} Title={({ collapsed }) => (
                        
                    <><ThemedTitleV2
                          // collapsed is a boolean value that indicates whether the <Sidebar> is collapsed or not
                          collapsed={collapsed}
                          icon={collapsed ? <SportsSoccerIcon  /> : <SportsSoccerIcon />}
                          text="SWB Dashboard" 
                          
                          /></>
                    
                )} >
                        <Outlet />
                        
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route
                    index
                    element={<NavigateToResource resource="home" />}
                  />
                  <Route path="/home" element={<Home />} >
                    
                  </Route>
                  <Route path="players">
                    <Route index element={<AllPlayers />} />
                    <Route path="create" element={<CreatePlayers />} />
                    <Route path="edit/:id" element={<EditPlayers />} />
                    <Route path="show/:id" element={<PlayerDetails />} />
                  </Route>
                  <Route path="reports">
                    <Route index element={<AllReports />} />
                    <Route path="create" element={<CreateReports />} />
                    <Route path="edit/:id" element={<EditReports />} />
                    <Route path="show/:id" element={<ReportDetails />} />
                  </Route>
                  <Route path="coaches">
                    <Route index element={<Coaches />} />
                    <Route path="show/"  element={<Profile  />} /> 
                  </Route>

                  <Route path="/Admins" element={<Home />  }>

                  </Route>
                  <Route path="/Teams"  element={<Teams />}>
                    <Route path="show/:id" element={<TeamDetails />} />

                  </Route>
                  <Route path="/My-Profile" element={<MyProfile />}>

                  </Route>
                </Route>
                <Route
                  element={
                    <Authenticated fallback={<Outlet />}>
                      <NavigateToResource />
                    </Authenticated>
                  }
                >
                  <Route path="/login" element={<Login />} />
                </Route>
                <Route
                  element={
                    <Authenticated>
                      <ThemedLayoutV2 Header={Header}>
                        <Outlet />
                      </ThemedLayoutV2>
                    </Authenticated>
                  }
                >
                  <Route path="*" element={<ErrorComponent />} />
                </Route>
              </Routes>

              <RefineKbar />
              <UnsavedChangesNotifier />
            </Refine>
          </RefineSnackbarProvider>
        </ColorModeContextProvider>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

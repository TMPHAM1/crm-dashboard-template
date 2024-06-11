import { Authenticated, GitHubBanner, Refine, WelcomePage } from "@refinedev/core";
import { DevtoolsPanel, DevtoolsProvider } from "@refinedev/devtools";
import { RefineKbar, RefineKbarProvider } from "@refinedev/kbar";
import {Home, ForgotPassword, Login, Register} from './pages'
import Layout from "./components/layout";
import CreateTask from "./pages/tasks/create";
import EditTask from "./pages/tasks/edit";

import { useNotificationProvider } from "@refinedev/antd";
import "@refinedev/antd/dist/reset.css";



import {dataProvider, liveProvider} from './providers/data'
import {authProvider} from './providers'
import routerBindings, {
  CatchAllNavigate,
  DocumentTitleHandler,
  UnsavedChangesNotifier,
} from "@refinedev/react-router-v6";
import { App as AntdApp } from "antd";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { resources } from "./config/resources";
import { CompanyList } from "./pages/company/list";
import TaskList from "./pages/tasks/list"
import Create from "./pages/company/create";
import Edit from "./pages/company/edit";


function App() {
  return (
    <BrowserRouter>
      <RefineKbarProvider>
          <AntdApp>
            <DevtoolsProvider>
              <Refine
                dataProvider={dataProvider}
                liveProvider={liveProvider}
                notificationProvider={useNotificationProvider}
                routerProvider={routerBindings}
                authProvider={authProvider}
                resources={resources}
                options={{
                  syncWithLocation: true,
                  warnWhenUnsavedChanges: true,
                  useNewQueryKeys: true,
                  projectId: "3510kk-mshUst-5LJxCh",
                  liveMode: "auto",
                }}
              >
                <Routes>
                  <Route  path="/login" element={<Login />} />
                  <Route  path="/forgot-password" element={<ForgotPassword />} />
                  <Route  path="/register" element={<Register />} />

                  <Route
                    element={<Authenticated
                      key="authenticated-layout"
                      fallback={<CatchAllNavigate to="/login" />}
                    >
                      <Layout>
                        <Outlet />
                      </Layout>
                    </Authenticated>}
                   >
                     <Route index element={<Home />} />
                     <Route  path="/companies">
                      <Route index element={<CompanyList/>} />
                      <Route path="new" element ={<Create />}></Route>
                      <Route path="edit/:id" element ={<Edit />}></Route>
                     </Route>
                     <Route  path="/tasks" element={<TaskList>
                          <Outlet />
                     </TaskList>}>
                     <Route path="new" element={<CreateTask />} />
                     <Route path="edit/:id" element={<EditTask />} />
                     </Route>
                  </Route>
                  
                </Routes>
                <RefineKbar />
                <UnsavedChangesNotifier />
                <DocumentTitleHandler />
              </Refine>
              <DevtoolsPanel />
            </DevtoolsProvider>
          </AntdApp>
      </RefineKbarProvider>
    </BrowserRouter>
  );
}

export default App;

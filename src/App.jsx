import React from "react";
import {
  useRoutes,
  Link,
  useParams,
  Navigate,
  Outlet,
  useLocation,
} from "react-router-dom";

const users = ["0", "1", "2", "3", "4"];

const routes = () => [
  {
    path: "",
    element: <MainPage />,
  },
  {
    path: "users/:id?",
    element: <UsersLayout />,
    children: [
      { path: "profile", element: <UserInfo /> },
      { path: "edit", element: <UserEdit /> },
      { path: "*", element: <Navigate to={"../profile"} /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
];

const UsersLayout = () => {
  const { id } = useParams();
  const location = useLocation();
  if (!id) return <UsersList />;
  if (location.pathname === `/users/${id}`) {
    return <Navigate to={`/users/${id}/profile`} />;
  }
  return (
    <>
      UserLayout {id}
      <Outlet />
    </>
  );
};

const UsersList = () => {
  const { id } = useParams();
  return (
    <>
      {!id &&
        users.map((user) => (
          <p key={user}>
            <Link to={`/users/${user}/profile`}>User {user}</Link>
          </p>
        ))}
      <Outlet />
    </>
  );
};

const UserInfo = () => {
  const { id } = useParams();
  const user = users.find((user) => user === id);
  if (!user) return <Navigate to="/users" />;
  return (
    <>
      <p>
        <Link to={`/users/${user}/edit`}>Edit this user</Link>
      </p>
      <p>
        <Link to={`/users`}>Users List Page</Link>
      </p>
      <h3>User-{id}</h3>
    </>
  );
};

const UserEdit = () => {
  const { id } = useParams();
  const user = users.find((user) => user === id);
  if (!user) return <Navigate to="/users" />;
  return (
    <>
      <p>
        <Link to={`/users/${id}/profile`}>User Profile Page</Link>
      </p>
      <p>
        <Link to={`/users/${+id + 1}/profile`}>Another User</Link>
      </p>
      <p>
        <Link to={`/users`}>Users List Page</Link>
      </p>
      <h3>User-{id}</h3>
    </>
  );
};

const MainPage = () => {
  return <h1>Main Page</h1>;
};

function App() {
  const elements = useRoutes(routes());
  return (
    <div>
      <h1>App</h1>
      <p>
        <Link to="/users">Users List</Link>
      </p>
      <p>
        <Link to="/">Main Page</Link>
      </p>
      <hr />
      {elements}
    </div>
  );
}

export default App;

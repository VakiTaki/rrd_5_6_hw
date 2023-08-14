import React from "react";
import { useRoutes, Link, useParams, Navigate } from "react-router-dom";

const users = ["0", "1", "2", "3", "4"];

const routes = () => [
  {
    path: "",
    element: <MainPage />,
  },
  {
    path: "users/",
    children: [
      { path: ":id?", element: <UsersList /> },
      { path: ":id/profile", element: <UserInfo /> },
      { path: ":id/edit", element: <UserEdit /> },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/"} />,
  },
];

const UsersList = () => {
  const { id } = useParams();
  if (id) {
    return <Navigate to={`/users/${id}/profile`} />;
  }
  return (
    <>
      {users.map((user) => (
        <p key={user}>
          <Link to={`/users/${user}/profile`}>User {user}</Link>
        </p>
      ))}
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
      {/* <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/users" element={<UsersList />}>
          <Route path="/users/:id/edit" element={<UserEdit />} />
          <Route path="/users/:id/profile" element={<UserInfo />} />
        </Route>
        <Route to="*" element={<Navigate to={"/"} />} />
      </Routes> */}
    </div>
  );
}

export default App;

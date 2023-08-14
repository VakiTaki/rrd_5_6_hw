import React from "react";
import { Route, Switch, Redirect, Link, useParams } from "react-router-dom";

const users = ["0", "1", "2", "3", "4"];

const UsersList = () => {
  const { id } = useParams();
  if (id) {
    return <Redirect to={`/users/${id}/profile`} />;
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
  if (!user) return <Redirect to="/users" />;
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
  if (!user) return <Redirect to="/users" />;
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
      <Switch>
        <Route path="/" component={MainPage} exact />
        <Route path="/users/:id/edit" component={UserEdit} />
        <Route path="/users/:id/profile" component={UserInfo} />
        <Route path="/users/:id?" component={UsersList} />
        <Redirect to="/" />
      </Switch>
    </div>
  );
}

export default App;

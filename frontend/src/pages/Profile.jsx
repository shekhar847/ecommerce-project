function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));

  if (!user) {
    return (
      <div className="container mt-5">
        <h3>Please Login First</h3>
      </div>
    );
  }
  return (
    <div className="container mt-5">
      <h2>My Profile</h2>
      <hr />
      <h4>Name: {user.name}</h4>
      <h4>Email: {user.email}</h4>
    </div>
  );
}

export default Profile;
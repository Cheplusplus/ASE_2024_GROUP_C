import ProfilePage from "../components/ProfilePage";

export default function ProfilePageRoute() {
  // Replace with actual user ID or get it from session
  const userId = "exampleUserId";

  return <ProfilePage userId={userId} />;
}

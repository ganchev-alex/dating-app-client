import { ScrollView } from "react-native";
import ProfileHeader from "./components/main_profile/ProfileHeader";
import ProfilePreview from "./components/main_profile/ProfilePreview";
import Gallery from "./components/main_profile/Gallery";
import ProfileControls from "./components/main_profile/ProfileControls";

const Profile: React.FC = function () {
  return (
    <ScrollView>
      <ProfileHeader />
      <ProfilePreview />
      <Gallery />
      <ProfileControls />
    </ScrollView>
  );
};

export default Profile;

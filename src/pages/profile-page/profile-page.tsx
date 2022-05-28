import { ProfileEditor } from '../../components/profile-editor';

function ProfilePage() {
  const userId = '123';

  return <ProfileEditor profileId={userId} />;
}

export default ProfilePage;

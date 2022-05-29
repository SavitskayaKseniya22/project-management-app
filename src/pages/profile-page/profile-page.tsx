import { ProfileEditor } from '../../components/profile-editor';
import jwtDecode from 'jwt-decode';
import { getAccessTokenSelector } from '../../store';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import './profile-page.scss';

function ProfilePage() {
  const accessToken = useSelector(getAccessTokenSelector);
  const [userId, setUserId] = useState<string | undefined>();

  useEffect(() => {
    if (!accessToken) return;
    const payload = jwtDecode<{ userId: string }>(accessToken);
    setUserId(payload.userId);
  }, [accessToken]);

  if (!userId) {
    return <>User not found</>;
  }

  return (
    <div className="profile-wrapper">
      <ProfileEditor profileId={userId} />
    </div>
  );
}

export default ProfilePage;

import { useProfilePage } from './hooks/useProfilePage';
import { ProfileForm } from '@/features/users/components/ProfileForm';
import { PasswordChangeForm } from '@/features/users/components/PasswordChangeForm';
import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/Card';

export function ProfilePage() {
  const { user, handleUpdateProfile, handleChangePassword, loading, error } = useProfilePage();

  if (!user) {
    return <div className="container mx-auto py-8">Please log in to view your profile.</div>;
  }

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6">Profile Settings</h1>
      
      {error && <div className="text-red-600 mb-4">{error}</div>}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Update Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <ProfileForm 
              onSubmit={handleUpdateProfile} 
              loading={loading}
              initialData={user}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Change Password</CardTitle>
          </CardHeader>
          <CardContent>
            <PasswordChangeForm 
              onSubmit={handleChangePassword} 
              loading={loading}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

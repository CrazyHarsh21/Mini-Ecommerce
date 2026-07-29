import { useAuth } from '../context/AuthContext';
import { Container, Card } from 'react-bootstrap';

const Profile = () => {
  const { user } = useAuth();
  return (
    <Container className="py-4">
      <Card className="p-4 shadow">
        <h2>Profile</h2>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Phone:</strong> {user?.phone || 'N/A'}</p>
        <p><strong>Address:</strong> {user?.address || 'N/A'}</p>
        <p><strong>Role:</strong> {user?.role}</p>
      </Card>
    </Container>
  );
};

export default Profile;

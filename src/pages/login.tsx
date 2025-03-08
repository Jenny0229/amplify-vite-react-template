import { useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import '@aws-amplify/ui-react/styles.css';
import '../CSS/authenticatorStyles.css'; // Import CSS for styling

const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <Authenticator>
      {({signOut, user }) => {
        useEffect(() => {
          if (user) {
            navigate('/dashboard/${user.username}'); // ✅ Redirects only after login
          }
        }, [user]);

        return <></>; // Empty return because we navigate immediately
      }}
    </Authenticator>
  );
};

export default LoginPage;

import { useEffect } from 'react';
import { Authenticator } from '@aws-amplify/ui-react';
import { useNavigate } from 'react-router-dom';
import { Amplify } from 'aws-amplify';
import '@aws-amplify/ui-react/styles.css';
import '../CSS/authenticatorStyles.css';
import outputs from "../../amplify_outputs.json";

Amplify.configure(outputs);

const AuthRedirect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('/dashboard');
  }, [navigate]);

  return null;
};

const LoginPage = () => {
  return (
    <Authenticator>
      <AuthRedirect />
    </Authenticator>
  );
};

export default LoginPage;

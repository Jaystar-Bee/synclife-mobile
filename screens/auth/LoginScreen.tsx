import AuthComponent from '../../components/auth/AuthComponent';
import LoginForm from '../../components/auth/LoginForm';
import SafeArea from '../../components/common/SafeArea';

const LoginScreen = () => {
  return (
    <SafeArea noPadding={true}>
      <AuthComponent
        title="Welcome Back"
        description="Sign in to sync your data across devices"
        belowText="Don't have an account?"
        linkText="Register"
        link="register">
        <LoginForm />
      </AuthComponent>
    </SafeArea>
  );
};

export default LoginScreen;

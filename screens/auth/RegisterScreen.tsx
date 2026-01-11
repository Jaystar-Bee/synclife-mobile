import AuthComponent from '../../components/auth/AuthComponent';
import RegisterForm from '../../components/auth/RegisterForm';
import SafeArea from '../../components/common/SafeArea';

const RegisterScreen = () => {
  return (
    <SafeArea noPadding={true}>
      <AuthComponent
        title="Join Productivity"
        description="Sign up to one way to manage your productivity"
        belowText="Already have an account?"
        linkText="Login"
        link="login">
          <RegisterForm />
      </AuthComponent>
    </SafeArea>
  );
};

export default RegisterScreen;

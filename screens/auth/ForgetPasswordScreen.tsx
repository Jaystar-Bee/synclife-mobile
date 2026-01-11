import AuthComponent from '../../components/auth/AuthComponent';
import SafeArea from '../../components/common/SafeArea';

const ForgetPasswordScreen = () => {
  return (
    <SafeArea noPadding={true}>
      <AuthComponent
        title="Forgot Password?"
        description="Enter your email to reset your password"
        linkText="Back"
        link="login">
      </AuthComponent>
    </SafeArea>
  );
};

export default ForgetPasswordScreen;

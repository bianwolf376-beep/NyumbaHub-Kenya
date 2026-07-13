import AuthCard from '@/components/auth/AuthCard';
import AuthFooter from '@/components/auth/AuthFooter';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthLayout from '@/components/auth/AuthLayout';
import SocialLogin from '@/components/auth/SocialLogin';

import RegisterForm from '@/features/auth/register/RegisterForm';

export default function RegisterPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Create an Account"
          subtitle="Join NyumbaHub Kenya today"
        />

        <SocialLogin />

        <RegisterForm />

        <AuthFooter
          text="Already have an account?"
          link="/login"
          linkText="Login"
        />
      </AuthCard>
    </AuthLayout>
  );
}
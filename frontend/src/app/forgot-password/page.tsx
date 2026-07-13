import AuthCard from '@/components/auth/AuthCard';
import AuthHeader from '@/components/auth/AuthHeader';
import AuthLayout from '@/components/auth/AuthLayout';

import ForgotPasswordForm from '@/features/auth/forgot-password/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <AuthCard>
        <AuthHeader
          title="Forgot Password"
          subtitle="Enter your email address to receive a password reset link."
        />

        <ForgotPasswordForm />
      </AuthCard>
    </AuthLayout>
  );
}
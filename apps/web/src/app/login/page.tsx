'use client';
import FormInput from '@/components/FormInput';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useLogin from '@/hooks/api/auth/useLogin';
import { appConfig } from '@/utils/config';
import { useFormik } from 'formik';
import { LoginValidationSchema } from './validationSchema';
import { useRouter } from 'next/navigation';

const Login = () => {
  const { login } = useLogin();
  const router = useRouter();

  const { baseUrl } = appConfig;

  const { values, handleSubmit, errors, handleBlur, handleChange, touched } =
    useFormik({
      initialValues: {
        email: '',
        password: '',
      },

      validationSchema: LoginValidationSchema,

      onSubmit: (values) => {
        login(values);
      },
    });
  return (
    <main className="container mx-auto">
      <div className="flex justify-center">
        <Card className="w-[450px] rounded-lg">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-primary mb-5">
              Welcome to Sosmek
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid w-full items-center gap-4">
                {/* EMAIL */}
                <FormInput
                  name="email"
                  label='Email'
                  error={errors.email}
                  isError={!!touched.email && !!errors.email}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  placeholder="email"
                  type="email"
                  value={values.email}
                />

                {/* PASSWORD */}
                <FormInput
                  name="password"
                  label='Password'
                  error={errors.password}
                  isError={!!touched.password && !!errors.password}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  placeholder="password"
                  type="password"
                  value={values.password}
                />

                <p
                  className="text-end text-xs cursor-pointer"
                  onClick={() => router.push('/forgot-password')}
                >
                  Forgot Password
                </p>
              </div>
              <Button className="mt-6 w-full" type="submit">
                Login
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default Login;

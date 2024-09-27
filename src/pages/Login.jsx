// pages/login.tsx
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Image, Input, Spacer } from '@nextui-org/react';
import { useMutation } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { z } from 'zod';
import Logo from '../assets/logo.jpg';
import loginUser from '../services/loginUser';
import { useUser } from '../utils/UserProvider';
import { FaLock, FaUnlockAlt } from 'react-icons/fa';

// Define the schema for vali/* d */ation using Zod
const schema = z.object({
  email: z.string().min(1, 'Email cannot be empty').email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
});

const Login = () => {
  const [ email, setEmail ] = useState('');
  const [ password, setPassword ] = useState('');
  const { state, setUser } = useUser();
  const navigate = useNavigate();
  const [ showPassword, setShowPassword ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const mutation = useMutation({
    mutationFn: loginUser,  // Mutation function
    onSuccess: (user) => {
      setUser({ ...user });
      
      navigate('/');
    },
    onError: (error) => {
      // toast.error('Error logging in! Check your credentials');
    }
  });

  const onSubmit = (data) => {
    // Handle form submission, e.g., send data to your authentication API
    const loginUserCredentials = {
      email: data?.email,
      password: data?.password,
    } 
     mutation.mutate(loginUserCredentials);
  };

  const LockUnlockPassword = () => !showPassword ? (<FaUnlockAlt className="text-2xl text-default-400 flex-shrink-0 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />) : (<FaLock className="text-2xl text-default-400 flex-shrink-0 cursor-pointer" onClick={() => setShowPassword(!showPassword)} />)

  if (state?.isAuthenticated) {
    navigate('/');
  }

  return (
    <div className="flex w-full h-full items-center justify-center overflow-hidden">
      <Toaster position='top-right' />
        <div className="flex items-center justify-center min-h-screen w-[95%] max-w-[500px]">
          <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }} className="w-full max-w-md p-2 lg:p-0 text-center">
            <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }} className="w-16 h-16 md:w-32 md:h-32 block mx-auto">
              <Image src={Logo} objectFit="cover" />
            </motion.div>
            <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }} className='text-3xl font-bold my-4 text-[#ff6b6b]'>MBT - Sirius App</motion.h1>
            <motion.h1
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }} className="text-2xl font-semibold mb-4">Login</motion.h1>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                <Input
                    label="Email"
                    type="email"
                    {...register('email')}
                    aria-invalid={errors.email ? 'true' : 'false'}
                    value={email}
                    onValueChange={setEmail}
                    labelPlacement='inside'
                    size='lg'
                    placeholder='Enter your email address'
                    autoFocus
                />
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.9 }}
                >
                  <Input
                      label="Password"
                      type={ showPassword ? 'text' : 'password' }
                      {...register('password')}
                      aria-invalid={errors.password ? 'true' : 'false'}
                      value={password}
                      onValueChange={setPassword}
                      labelPlacement='inside'
                      placeholder='Enter your password'
                      size='lg'
                      endContent={ <LockUnlockPassword />  }
                  />
                  {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
                </motion.div>
                {/* <Link className='text-end block'>Forget Password?</Link> */}
                <Spacer y={1} />
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1.1 }}
                >
                  <Button type="submit" size='lg' className='bg-[#ff6b6b] w-full text-black'>
                  Login
                  </Button>
                </motion.div>
            </form>
          </motion.div>
        </div>
    </div>
  );
};

export default Login;

import Head from 'next/head';
import Image from 'next/image';
import { useState, useContext } from 'react';
import { TextField } from 'src/components';
import { Formik, Form } from 'formik';
import * as Yup from 'yup'
import { useAuth } from 'src/hooks/useAuth';
import { GetServerSideProps } from 'next';

const Auth = () => {
  const [ auth, setAuth ] = useState<'signup' | 'signin'>( 'signin' );
  const { error, isLoading, signIn, signUp } = useAuth()

  const toggleAuth = ( state: 'signup' | 'signin' ) => {
    setAuth(state)
  };
  
  const onSubmit = async ( formData: { email: string; password: string }) =>{
    if( auth === 'signup'){      
      signUp( formData.email, formData.password );
    } else {
      signIn( formData.email, formData.password );    
    }
  }

  const validation = Yup.object({
    email: Yup.string().email('Enter valid email').required('Email is required'),
    password: Yup.string().min( 6, '6 minimum character').required('Password is required')
  })
  return (
    <div className='relative flex h-screen w-screen flex-col md:items-center md:justify-center bg-black md:bg-transparent'>
    <Head>
      <title>Auth</title>
      <meta name="description" content="For watching movies you should sign to app" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="logo.svg" />
    </Head>
    <Image src={'https://assets.nflxext.com/ffe/siteui/vlv3/d0982892-13ac-4702-b9fa-87a410c1f2da/519e3d3a-1c8c-4fdb-8f8a-7eabdbe87056/AE-en-20220321-popsignuptwoweeks-perspective_alpha_website_large.jpg'} alt={'img'} fill className='object-cover -z-10 !hidden sm:!inline opacity-70' />
    <Image src={"/logo.svg"} alt={"logo"} width={70} height={70} className={"absolute left-4 top-4 cursor-pointer object-contain"} />

    <div className='relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-10'>
      
      <Formik initialValues={{email: '', password: ''}} onSubmit={onSubmit} validationSchema={validation}>
        <Form>
          <h1 className='text-4xl font-semibold my-5 '>{auth === 'signup' ? 'Sign Up' : 'Sign In'}</h1>
          {error && <p className='text-red-500 font-semibold text-center my-5'>{error}</p>}
          <div className='space-y-4'>
            <TextField name='email' type={'text'} placeholder={'Email'} />
            <TextField name='password' type={'password'} placeholder={'Password'} />        
          </div>
          <button type='submit' disabled={isLoading} className='w-full bg-[#E10856] py-4 rounded mt-4 font-semibold'>
						{isLoading ? 'Loading...' : auth === 'signin' ? 'Sign In' : 'Sign Up'}
					</button>
        </Form>
      </Formik>
      
      
      {auth === 'signin' ? (
        <div className='text-[gray]'>
          Not yet account? {' '} <button type='button' onClick={ () => toggleAuth('signup') } className='text-white hover:underline'>Sign Up Now</button>
        </div>
      ) : (
        <div className='text-[gray]'>
          Already have account?{' '} <button type='button' onClick={ () => toggleAuth('signin') } className='text-white hover:underline'>Sign In</button>
        </div>
      )}
      
    </div>
  </div>
  )
}

export default Auth


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
	const user_id = req.cookies.user_id;

	if (user_id) {
		return {
			redirect: { destination: '/', permanent: false },
		};
	}

	return {
		props: {},
	};
};
import React from "react";

const Login = ({ googleSignIn }) => {
  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" h-screen relative bg-indigo-800">
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover"
          src="https://images.pexels.com/photos/4753987/pexels-photo-4753987.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt=""
        />
        <div className="absolute inset-0 bg-black opacity-60 " aria-hidden="true" />
      </div>
      <div className="relative justify-around h-full max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <div>
          <h1 className="mt-4 text-4xl tracking-tight font-bold text-white sm:mt-5 sm:text-6xl sm:tracking-tight lg:mt-6 xl:text-6xl xl:tracking-tight">
            {/* <span className="pb-3 block bg-clip-text text-transparent bg-gradient-to-r from-violet-300 to-violet-800 sm:pb-5">
              No need to
            </span> */}
            <span className="pb-3 block bg-clip-text text-white sm:pb-5">
              No need to
            </span>
            <span className="block">create an account</span>
          </h1>
          <h1 className="text-base text-gray-300 sm:text-xl lg:text-lg xl:text-xl mt-4">
            Log in to your account with:
          </h1>
        </div>
        <button
          onClick={handleGoogleSignIn}
          type="button"
          class=" self-center my-8 text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
        >
          <svg
            class="mr-2 -ml-1 w-4 h-4"
            aria-hidden="true"
            focusable="false"
            data-prefix="fab"
            data-icon="google"
            role="img"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 488 512"
          >
            <path
              fill="currentColor"
              d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
            ></path>
          </svg>
          Google
        </button>
      </div>
    </div>

    // <div className="h-screen">
    //   <h1>Sign in</h1>
    //   <button
    //     onClick={handleGoogleSignIn}
    //     type="button"
    //     class="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
    //   >
    //     <svg
    //       class="mr-2 -ml-1 w-4 h-4"
    //       aria-hidden="true"
    //       focusable="false"
    //       data-prefix="fab"
    //       data-icon="google"
    //       role="img"
    //       xmlns="http://www.w3.org/2000/svg"
    //       viewBox="0 0 488 512"
    //     >
    //       <path
    //         fill="currentColor"
    //         d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"
    //       ></path>
    //     </svg>
    //     Sign in with Google
    //   </button>

    // </div>
  );
};

export default Login;

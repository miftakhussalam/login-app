const Loader = () => {
  const animationStyles = (
    <style>
      {`
        /* Define the custom spinning animation keyframes */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        /* Apply the custom animation to the loader class */
        .loader-spin {
            /* Using the same fun bounce effect timing function */
            animation: spin 1s cubic-bezier(0.68, -0.55, 0.27, 1.55) infinite;
        }

        /* Ensure Inter font is used globally */
        body {
            font-family: 'Inter', sans-serif;
        }
      `}
    </style>
  );

  return (
    <>
      {animationStyles}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center p-4">
        <div className="w-full max-w-sm p-8 bg-white dark:bg-slate-900 rounded-2xl shadow-xl flex flex-col items-center space-y-6 transform transition duration-500 hover:shadow-2xl">
          <div className="flex flex-col items-center justify-center space-y-4">
            <div
              className="
                w-16 h-16 rounded-full
                border-4 border-solid
                border-t-sky-600    
                border-r-sky-400    
                border-b-sky-200    
                border-l-sky-400    
                loader-spin
            "
            ></div>

            <p className="text-lg font-semibold text-gray-700 dark:text-white tracking-wider">
              Processing...
            </p>
          </div>

          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-sky-500 rounded-full w-1/2 animate-pulse"></div>
          </div>

          <p className="text-sm text-gray-500 dark:text-white text-center">
            The future is loading...
          </p>
        </div>
      </div>
    </>
  );
};

export default Loader;

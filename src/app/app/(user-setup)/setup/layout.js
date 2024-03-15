export default function UserSetupLayout({ children }) {
  return (
    <div className="h-screen flex flex-col justify-center items-center px-6 py-12 lg:px-8 ">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-10 w-auto"
          src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
      </div>

      <div className="flex flex-1 items-center justify-center">
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-md bg-white p-6 rounded-lg shadow-lg border-border transform -translate-y-1/4">
          {children}
        </div>
      </div>
    </div>
  );
}

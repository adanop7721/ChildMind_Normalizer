import UserHeader from "../containers/user/UserHeader";
import UserStepper from "../containers/user/UserStepper";

import UserProvider from "../context/UserProvider";

const UserPage = () => {
  return (
    <UserProvider>
      <div className="min-h-screen bg-gray-50">
        <UserHeader />
        <UserStepper />
      </div>
    </UserProvider>
  );
};

export default UserPage;

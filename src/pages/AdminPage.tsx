import AdminHeader from "../containers/admin/AdminHeader";
import Stepper from "../components/Stepper";

import ConfigProvider from "../context/ConfigProvider";

const AdminPage = () => {
  return (
    <ConfigProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <Stepper />
      </div>
    </ConfigProvider>
  );
};

export default AdminPage;

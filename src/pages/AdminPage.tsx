import AdminHeader from "../containers/admin/AdminHeader";
import AdminStepper from "../containers/admin/AdminStepper";

import ConfigProvider from "../context/ConfigProvider";

const AdminPage = () => {
  return (
    <ConfigProvider>
      <div className="min-h-screen bg-gray-50">
        <AdminHeader />
        <AdminStepper />
      </div>
    </ConfigProvider>
  );
};

export default AdminPage;

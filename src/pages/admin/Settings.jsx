import AdminPlaceholder from "../../components/AdminPlaceholder";

function Settings() {
  return (
    <AdminPlaceholder
      title="Settings"
      description="Platform-level configuration can be added here."
      bullets={[
        "Change admin account credentials",
        "Set business hours and delivery radius",
        "Configure payment and notification integrations",
      ]}
    />
  );
}

export default Settings;

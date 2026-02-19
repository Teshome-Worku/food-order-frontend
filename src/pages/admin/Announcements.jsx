import AdminPlaceholder from "../../components/AdminPlaceholder";

function Announcements() {
  return (
    <AdminPlaceholder
      title="Announcements"
      description="Use this page for operational broadcasts to customers."
      bullets={[
        "Publish limited-time promotions",
        "Show delivery-delay notices during peak hours",
        "Pin holiday schedule changes on the homepage",
      ]}
    />
  );
}

export default Announcements;

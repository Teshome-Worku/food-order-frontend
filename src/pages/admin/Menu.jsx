import AdminPlaceholder from "../../components/AdminPlaceholder";

function Menu() {
  return (
    <AdminPlaceholder
      title="Menu Management"
      description="This section is ready for menu CRUD operations."
      bullets={[
        "Add and edit menu items with image URLs and prices",
        "Toggle item availability for out-of-stock meals",
        "Group dishes by category for easier browsing",
      ]}
    />
  );
}

export default Menu;

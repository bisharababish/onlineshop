
import { useParams } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import ProductForm from "@/components/admin/ProductForm";

const AdminEditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const isNew = !id;

  return (
    <AdminLayout title={isNew ? "Add Product" : "Edit Product"}>
      <ProductForm productId={id} />
    </AdminLayout>
  );
};

export default AdminEditProduct;

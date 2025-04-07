
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AdminLayout from "@/components/admin/AdminLayout";
import { useProducts } from "@/context/ProductContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PlusIcon, TrashIcon, PencilIcon, SearchIcon } from "lucide-react";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

const AdminProducts = () => {
  const { products, deleteProduct } = useProducts();
  const navigate = useNavigate();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  
  // Filter products based on search term
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleDeleteClick = (productId: string) => {
    setDeleteProductId(productId);
  };
  
  const confirmDelete = () => {
    if (deleteProductId) {
      deleteProduct(deleteProductId);
      setDeleteProductId(null);
    }
  };
  
  const cancelDelete = () => {
    setDeleteProductId(null);
  };

  return (
    <AdminLayout title="Products">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="w-full md:w-1/3 relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button 
          onClick={() => navigate("/admin/products/new")}
          className="bg-teal-600 hover:bg-teal-700"
        >
          <PlusIcon className="h-4 w-4 mr-2" /> Add Product
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell>
                      <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                    </TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell>{product.category}</TableCell>
                    <TableCell>{formatPrice(product.price)}</TableCell>
                    <TableCell>
                      <span className={
                        product.inStock === 0 
                          ? "text-red-600" 
                          : product.inStock < 5 
                            ? "text-orange-600"
                            : "text-green-600"
                      }>
                        {product.inStock}
                      </span>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate(`/admin/products/${product.id}`)}
                        >
                          <PencilIcon className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDeleteClick(product.id)}
                        >
                          <TrashIcon className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                    {searchTerm 
                      ? "No products match your search."
                      : "No products found. Add some products to get started."
                    }
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      <AlertDialog open={!!deleteProductId} onOpenChange={() => setDeleteProductId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the 
              product from your store.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelDelete}>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 text-white hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
};

export default AdminProducts;

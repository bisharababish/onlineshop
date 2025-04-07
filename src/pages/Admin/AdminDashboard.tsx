
import AdminLayout from "@/components/admin/AdminLayout";
import { useProducts } from "@/context/ProductContext";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, ShoppingCart } from "lucide-react";

const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(price);
};

const AdminDashboard = () => {
  const { products } = useProducts();
  
  // Calculate some basic stats for the dashboard
  const totalProducts = products.length;
  const totalInventory = products.reduce((sum, product) => sum + product.inStock, 0);
  const totalValue = products.reduce((sum, product) => sum + (product.price * product.inStock), 0);
  const lowStockProducts = products.filter(product => product.inStock < 5);
  
  return (
    <AdminLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Products</CardDescription>
            <CardTitle className="flex items-center justify-between">
              <span>{totalProducts}</span>
              <Package className="h-5 w-5 text-teal-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link to="/admin/products" className="text-sm text-teal-600 hover:underline">
              View all products
            </Link>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Inventory</CardDescription>
            <CardTitle className="flex items-center justify-between">
              <span>{totalInventory} units</span>
              <ShoppingCart className="h-5 w-5 text-teal-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Across all products
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Inventory Value</CardDescription>
            <CardTitle className="flex items-center justify-between">
              <span>{formatPrice(totalValue)}</span>
              <DollarSign className="h-5 w-5 text-teal-600" />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500">
              Total value at retail price
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Low Stock Products</CardTitle>
            <CardDescription>Products with fewer than 5 items in stock</CardDescription>
          </CardHeader>
          <CardContent>
            {lowStockProducts.length > 0 ? (
              <div className="space-y-4">
                {lowStockProducts.map((product) => (
                  <div key={product.id} className="flex items-center justify-between border-b pb-2">
                    <div className="flex items-center gap-3">
                      <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="w-10 h-10 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-gray-500">
                          {product.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-medium ${product.inStock === 0 ? 'text-red-600' : 'text-orange-600'}`}>
                        {product.inStock} in stock
                      </p>
                      <Link 
                        to={`/admin/products/${product.id}`}
                        className="text-xs text-teal-600 hover:underline"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500">No products are currently low on stock.</p>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link 
              to="/admin/products/new" 
              className="block p-4 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium">Add New Product</h3>
              <p className="text-sm text-gray-500">
                Create a new product listing for your store
              </p>
            </Link>
            
            <Link 
              to="/admin/products" 
              className="block p-4 border rounded-md hover:bg-gray-50 transition-colors"
            >
              <h3 className="font-medium">Manage Products</h3>
              <p className="text-sm text-gray-500">
                Edit, delete, or update your existing products
              </p>
            </Link>
            
            <Link 
              to="/" 
              className="block p-4 border rounded-md hover:bg-gray-50 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              <h3 className="font-medium">View Store Frontend</h3>
              <p className="text-sm text-gray-500">
                See your store as customers see it
              </p>
            </Link>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;

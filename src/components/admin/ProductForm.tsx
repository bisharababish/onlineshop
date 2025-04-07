import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Product, useProducts } from "@/context/ProductContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFormProps {
  productId?: string;
}

const categories = [
  "Electronics",
  "Clothing",
  "Home & Kitchen",
  "Books",
  "Toys",
  "Beauty",
  "Sports",
  "Accessories"
];

const getRandomImageUrl = () => {
  const randomId = Math.floor(Math.random() * 1000);
  return `https://picsum.photos/id/${randomId}/400/400`;
};

const ProductForm = ({ productId }: ProductFormProps) => {
  const { getProduct, addProduct, updateProduct } = useProducts();
  const navigate = useNavigate();

  const isEditing = !!productId;

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Safely get the product and handle non-existent products
  const product = isEditing ? getProduct(productId) : undefined;

  // If we're editing but can't find the product, show an error
  useEffect(() => {
    if (isEditing && !product) {
      toast.error("Product not found");
      navigate("/admin/products");
    }
  }, [isEditing, product, navigate]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "",
    inStock: "1",
  });

  useEffect(() => {
    if (product) {
      try {
        setFormData({
          name: product.name || "",
          description: product.description || "",
          price: product.price ? product.price.toString() : "0",
          imageUrl: product.imageUrl || "",
          category: product.category || "",
          inStock: product.inStock ? product.inStock.toString() : "1",
        });
      } catch (error) {
        console.error("Error setting form data:", error);
        toast.error("Error loading product data");
      }
    }
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user types
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for this field when user selects something
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const errors: Record<string, string> = {};

    // Required fields
    if (!formData.name.trim()) {
      errors.name = "Product name is required";
    }

    if (!formData.category) {
      errors.category = "Category is required";
    }

    if (!formData.description.trim()) {
      errors.description = "Description is required";
    }

    // Number validations
    const price = parseFloat(formData.price);
    if (isNaN(price) || price < 0) {
      errors.price = "Please enter a valid price";
    }

    const inStock = parseInt(formData.inStock);
    if (isNaN(inStock) || inStock < 0) {
      errors.inStock = "Please enter a valid stock quantity";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the errors in the form");
      return;
    }

    setIsSubmitting(true);

    try {
      const price = parseFloat(formData.price);
      const inStock = parseInt(formData.inStock);

      const productData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        price,
        imageUrl: formData.imageUrl || getRandomImageUrl(),
        category: formData.category,
        inStock,
      };

      if (isEditing && productId) {
        updateProduct(productId, productData);
      } else {
        addProduct(productData);
      }

      navigate("/admin/products");
    } catch (error) {
      console.error("Error saving product:", error);
      toast.error("Failed to save product");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGenerateImage = () => {
    setFormData(prev => ({
      ...prev,
      imageUrl: getRandomImageUrl()
    }));
  };

  // Return early if editing and product not found
  if (isEditing && !product) {
    return null;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="name" className={formErrors.name ? "text-red-500" : ""}>
              Product Name {formErrors.name && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Product Name"
              className={formErrors.name ? "border-red-500" : ""}
              required
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm">{formErrors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="price" className={formErrors.price ? "text-red-500" : ""}>
              Price (USD) {formErrors.price && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id="price"
              name="price"
              type="number"
              step="0.01"
              min="0"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              className={formErrors.price ? "border-red-500" : ""}
              required
            />
            {formErrors.price && (
              <p className="text-red-500 text-sm">{formErrors.price}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="category" className={formErrors.category ? "text-red-500" : ""}>
              Category {formErrors.category && <span className="text-red-500">*</span>}
            </Label>
            <Select
              value={formData.category}
              onValueChange={(value) => handleSelectChange("category", value)}
              required
            >
              <SelectTrigger className={formErrors.category ? "border-red-500" : ""}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {formErrors.category && (
              <p className="text-red-500 text-sm">{formErrors.category}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="inStock" className={formErrors.inStock ? "text-red-500" : ""}>
              In Stock Quantity {formErrors.inStock && <span className="text-red-500">*</span>}
            </Label>
            <Input
              id="inStock"
              name="inStock"
              type="number"
              min="0"
              value={formData.inStock}
              onChange={handleChange}
              placeholder="0"
              className={formErrors.inStock ? "border-red-500" : ""}
              required
            />
            {formErrors.inStock && (
              <p className="text-red-500 text-sm">{formErrors.inStock}</p>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="description" className={formErrors.description ? "text-red-500" : ""}>
              Description {formErrors.description && <span className="text-red-500">*</span>}
            </Label>
            <Textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Product description"
              className={`h-32 ${formErrors.description ? "border-red-500" : ""}`}
              required
            />
            {formErrors.description && (
              <p className="text-red-500 text-sm">{formErrors.description}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">Image URL</Label>
            <div className="flex gap-2">
              <Input
                id="imageUrl"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
              <Button
                type="button"
                variant="outline"
                onClick={handleGenerateImage}
              >
                Generate
              </Button>
            </div>
          </div>

          {formData.imageUrl && (
            <div className="mt-4">
              <p className="text-sm font-medium mb-2">Image Preview</p>
              <div className="border rounded-md overflow-hidden w-40 h-40">
                <img
                  src={formData.imageUrl}
                  alt="Product preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "https://placehold.co/400x400?text=No+Image";
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          type="submit"
          className="bg-teal-600 hover:bg-teal-700"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : isEditing ? "Update Product" : "Add Product"}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/admin/products")}
          disabled={isSubmitting}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default ProductForm;
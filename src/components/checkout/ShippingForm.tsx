import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface ShippingFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSelectChange: (field: string, value: string) => void;
}

export const ShippingForm = ({ formData, handleChange, handleSelectChange }: ShippingFormProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
        <CardDescription>
          Please enter your shipping details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name *</Label>
            <Input
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name *</Label>
            <Input
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Street Address *</Label>
          <Input
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              name="city"
              value={formData.city}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="state">State/Province *</Label>
            <Input
              id="state"
              name="state"
              value={formData.state}
              onChange={handleChange}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="zip">ZIP/Postal Code *</Label>
            <Input
              id="zip"
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country *</Label>
          <Select
            value={formData.country}
            onValueChange={(value) =>
              handleSelectChange("country", value)
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a country" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="US">United States</SelectItem>
              <SelectItem value="CA">Canada</SelectItem>
              <SelectItem value="UK">United Kingdom</SelectItem>
              <SelectItem value="AU">Australia</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};

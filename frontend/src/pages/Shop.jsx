import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Sparkles, ShoppingCart, Plus, Minus, Trash2, Star, Home } from 'lucide-react';
import { products, addToCart, getCart, removeFromCart, updateCartQuantity, clearCart } from '../mock';
import { useToast } from '../hooks/use-toast';

const Shop = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    setCart(getCart());
  }, []);

  const categories = ['All', ...new Set(products.map(p => p.category))];

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  const handleAddToCart = (product) => {
    const updatedCart = addToCart(product, 1);
    setCart(updatedCart);
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (productId, newQuantity) => {
    const updatedCart = updateCartQuantity(productId, newQuantity);
    setCart(updatedCart);
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = removeFromCart(productId);
    setCart(updatedCart);
    toast({
      title: "Removed from Cart",
      description: "Item has been removed from your cart.",
    });
  };

  const handleClearCart = () => {
    clearCart();
    setCart([]);
    toast({
      title: "Cart Cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Cart is Empty",
        description: "Please add items to your cart before checkout.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Checkout",
      description: "Checkout functionality coming soon!",
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-peach-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-peach-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-green-600" />
              <h1 className="text-2xl font-bold text-green-800">Trip2Ooty Shop</h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="outline" onClick={() => navigate('/')}>
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
              <Button className="bg-green-600 hover:bg-green-700 relative">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Cart
                {cartItemCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 bg-peach-500 text-white">
                    {cartItemCount}
                  </Badge>
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Products Section */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-green-800 mb-4">Ooty Souvenirs & Specialties</h2>
              <p className="text-gray-600">Authentic products from the Queen of Hills</p>
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2 mb-8">
              {categories.map(category => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? "bg-green-600 hover:bg-green-700" : ""}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredProducts.map(product => (
                <Card key={product.id} className="overflow-hidden hover:shadow-xl transition-shadow duration-300 border-peach-200">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name} 
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                    <Badge className="absolute top-4 right-4 bg-green-600 text-white">
                      {product.category}
                    </Badge>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-800">{product.name}</CardTitle>
                    <CardDescription className="text-gray-600">{product.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                      </div>
                      {product.inStock && (
                        <Badge variant="outline" className="text-xs border-green-300 text-green-700">
                          In Stock
                        </Badge>
                      )}
                    </div>
                    <div className="text-2xl font-bold text-green-700">
                      ₹{product.price}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button 
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-peach-500 hover:bg-peach-600 text-white"
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>

          {/* Cart Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24 border-peach-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-green-800 flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Shopping Cart
                </CardTitle>
                <CardDescription>
                  {cartItemCount} {cartItemCount === 1 ? 'item' : 'items'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {cart.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    <ShoppingCart className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>Your cart is empty</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex gap-3 pb-4 border-b border-peach-200">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-16 h-16 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-semibold text-sm text-green-800">{item.name}</h4>
                          <p className="text-xs text-gray-600 mb-2">₹{item.price}</p>
                          <div className="flex items-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                              className="h-6 w-6 p-0"
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleRemoveFromCart(item.id)}
                              className="h-6 w-6 p-0 ml-auto"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
              {cart.length > 0 && (
                <CardFooter className="flex-col gap-3">
                  <div className="w-full flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span className="text-green-700">₹{cartTotal}</span>
                  </div>
                  <Button 
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </Button>
                  <Button 
                    variant="outline"
                    className="w-full"
                    onClick={handleClearCart}
                  >
                    Clear Cart
                  </Button>
                </CardFooter>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
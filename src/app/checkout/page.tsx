import React from 'react';
import Image from 'next/image';

const Checkout = () => {
  return (
    <div className="max-w-[1440px] mx-auto overflow-hidden">
             <div>
               <Image
                 src={"/image/checkout.png"}
                 alt="cart-section"
                 width={1440}
                 height={316}
                 className="w-full h-auto mt-20"
               />
             </div>
    <div className="flex flex-col md:flex-row md:space-x-8 px-6 md:px-16 py-8">
     
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-6">Billing details</h2>

        <form className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block font-medium mb-2" htmlFor="firstName">First Name</label>
              <input
                type="text"
                id="firstName"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex-1">
              <label className="block font-medium mb-2" htmlFor="lastName">Last Name</label>
              <input
                type="text"
                id="lastName"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2" htmlFor="companyName">Company Name (Optional)</label>
            <input
              type="text"
              id="companyName"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-2" htmlFor="country">Country / Region</label>
            <select
              id="country"
              className="w-full border border-gray-300 rounded-md p-2 bg-white"
            >
              <option value="Sri Lanka">Sri Lanka</option>
              <option value="Pakistan">Pakistan</option>
              <option value="India">India</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-2" htmlFor="address">Street Address</label>
            <input
              type="text"
              id="address"
              placeholder="House number and street name"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div className="flex space-x-4">
            <div className="flex-1">
              <label className="block font-medium mb-2" htmlFor="city">Town / City</label>
              <input
                type="text"
                id="city"
                className="w-full border border-gray-300 rounded-md p-2"
              />
            </div>

            <div className="flex-1">
              <label className="block font-medium mb-2" htmlFor="province">Province</label>
              <select
                id="province"
                className="w-full border border-gray-300 rounded-md p-2 bg-white"
              >
                <option value="Western Province">Western Province</option>
                <option value="Central Province">Central Province</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2" htmlFor="zip">ZIP Code</label>
            <input
              type="text"
              id="zip"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-2" htmlFor="phone">Phone</label>
            <input
              type="text"
              id="phone"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-2" htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              className="w-full border border-gray-300 rounded-md p-2"
            />
          </div>

          <div>
            <label className="block font-medium mb-2" htmlFor="additionalInfo">Additional Information</label>
            <textarea
              id="additionalInfo"
              className="w-full border border-gray-300 rounded-md p-2"
            ></textarea>
          </div>
        </form>
      </div>

      {/* Order Summary */}
      <div className="flex-1 bg-gray-50 p-6 rounded-lg shadow-md mt-8 md:mt-0">
        <h2 className="text-xl font-bold mb-6">Your Order</h2>

        <div className="border-b border-gray-300 pb-4 mb-4">
          <div className="flex justify-between">
            <span>Product</span>
            <span>Subtotal</span>
          </div>
          <div className="flex justify-between mt-2">
            <span>Asgard Sofa x 1</span>
            <span>Rs. 250,000.00</span>
          </div>
        </div>

        <div className="flex justify-between font-medium mb-4">
          <span>Total</span>
          <span className="text-lg text-orange-500">Rs. 250,000.00</span>
        </div>

        <div className="mb-6">
          <label className="block mb-2 font-medium">Payment Method</label>
          <div className="space-y-2">
            <div>
              <input
                type="radio"
                id="bankTransfer"
                name="payment"
                className="mr-2"
                defaultChecked
              />
              <label htmlFor="bankTransfer">Direct Bank Transfer</label>
            </div>

            <div>
              <input
                type="radio"
                id="cod"
                name="payment"
                className="mr-2"
              />
              <label htmlFor="cod">Cash on Delivery</label>
            </div>
          </div>
        </div>

        <button className="w-full bg-orange-500 text-white font-bold py-3 rounded-md">
          Place Order
        </button>
      </div>
    </div>
    </div>
  );
};

export default Checkout;

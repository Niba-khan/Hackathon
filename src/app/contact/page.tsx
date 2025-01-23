import React from "react";
import Image from "next/image";

const Contact = () => {
  return (
   <div className="max-w-[1440px] mx-auto overflow-hidden">
         <div>
           <Image
             src={"/image/contact.png"}
             alt="cart-section"
             width={1440}
             height={316}
             className="w-full h-auto mt-20"
           />
         </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 py-10">
        <h2 className="text-3xl font-bold text-center mb-4">Get In Touch With Us</h2>
        <p className="text-center text-gray-600 mb-10">
          For More Information About Our Products & Services, Please Feel Free To Drop Us An Email.
          Our Staff Always Is There To Help You Out. Do Not Hesitate!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Contact Info Section */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="text-yellow-500 text-2xl">
                <i className="fas fa-map-marker-alt"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Address</h3>
                <p className="text-gray-600">
                  236 5th SE Avenue, New York NY10000, United States
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-yellow-500 text-2xl">
                <i className="fas fa-phone"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Phone</h3>
                <p className="text-gray-600">
                  Mobile: (+84) 546-6789
                </p>
                <p className="text-gray-600">
                  Hotline: (+84) 456-6789
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="text-yellow-500 text-2xl">
                <i className="fas fa-clock"></i>
              </div>
              <div>
                <h3 className="text-lg font-semibold">Working Time</h3>
                <p className="text-gray-600">Monday-Friday: 8:00 - 22:00</p>
                <p className="text-gray-600">Saturday-Sunday: 9:00 - 21:00</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <form>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                  Your Name
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Enter your name"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="subject">
                  Subject
                </label>
                <input
                  id="subject"
                  type="text"
                  placeholder="This is optional"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  placeholder="Hi! I'd like to ask about..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-yellow-500 text-white font-bold py-2 px-4 rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;

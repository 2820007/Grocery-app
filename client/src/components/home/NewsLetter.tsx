import { MailIcon } from "lucide-react";

const NewsLetter = () => {
  return (
    <section className="py-16 mt-20 bg-white">
      <div className="max-w-2xl mx-auto px-4 text-center">
        <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center mx-auto mb-6 shadow-md">
          <MailIcon
            className="w-8 h-8 text-app-green"
            strokeWidth={1.5}
          />
        </div>

        <h2 className="text-3xl font-bold text-gray-900">
          Subscribe to our Newsletter
        </h2>

        <p className="mt-3 text-gray-600">
          Get the latest offers, discounts, and updates delivered
          straight to your inbox.
        </p>

        <form className="mt-8 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder="Enter your email address"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-app-green"
          />

          <button
            type="submit"
            className="px-6 py-3 bg-app-green text-white rounded-lg font-medium hover:opacity-90 transition"
          >
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsLetter;
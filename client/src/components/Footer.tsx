import { BikeIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { footerData } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-app-green text-white mt-20">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-14">

        {/* Top */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div className="space-y-5">
            <Link
              to="/"
              className="flex items-center gap-2 text-2xl font-bold"
            >
              <BikeIcon className="w-7 h-7" />
              <span>{footerData.brand.name}</span>
            </Link>

            <p className="text-white/70 leading-7 text-sm">
              {footerData.brand.description}
            </p>

            <div className="flex items-center gap-3">
              {footerData.brand.socials.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-white/10 hover:bg-white hover:text-app-green transition-all duration-300 flex items-center justify-center hover:-translate-y-1"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Quick Links
            </h3>

            <ul className="space-y-3">
              {[
                { name: "Home", path: "/" },
                { name: "Products", path: "/products" },
                { name: "About", path: "/about" },
                { name: "Contact", path: "/contact" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-white/70 hover:text-white hover:translate-x-1 transition-all inline-block"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Categories
            </h3>

            <ul className="space-y-3">
              {[
                "Vegetables",
                "Fruits",
                "Dairy Products",
                "Bakery",
                "Beverages",
              ].map((item) => (
                <li
                  key={item}
                  className="text-white/70 hover:text-white transition cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-5">
              Contact Us
            </h3>

            <div className="space-y-4 text-white/70">

              <div className="flex gap-3">
                <span>📍</span>
                <span>Kathmandu, Nepal</span>
              </div>

              <div className="flex gap-3">
                <span>📞</span>
                <span>+977 9800000000</span>
              </div>

              <div className="flex gap-3">
                <span>✉️</span>
                <span>support@grocery.com</span>
              </div>

            </div>
          </div>

        </div>

        {/* Divider */}

        <div className="border-t border-white/10 my-10"></div>

        {/* Bottom */}

        <div className="flex flex-col md:flex-row justify-between items-center gap-5 text-sm text-white/60">

          <p className="text-center md:text-left">
            © {new Date().getFullYear()}{" "}
            <span className="font-semibold">
              {footerData.brand.name}
            </span>
            . All Rights Reserved.
          </p>

          <div className="flex flex-wrap justify-center gap-6">

            <Link
              to="/privacy"
              className="hover:text-white transition"
            >
              Privacy Policy
            </Link>

            <Link
              to="/terms"
              className="hover:text-white transition"
            >
              Terms & Conditions
            </Link>

          </div>

        </div>

      </div>
    </footer>
  );
};

export default Footer;
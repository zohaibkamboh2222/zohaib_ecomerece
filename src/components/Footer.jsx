export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-100 bg-white py-8 text-center text-sm text-gray-500">
      © {new Date().getFullYear()} ShopZone. Built with React, Tailwind CSS and React Router.
    </footer>
  );
}

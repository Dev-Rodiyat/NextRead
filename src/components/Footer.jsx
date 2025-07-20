export function Footer() {
  return (
    <footer className={`bg-white border-t mt-12 py-6 px-4 text-center text-gray-600 text-sm`}>
      <p>© {new Date().getFullYear()} NextRead. All rights reserved.</p>
    </footer>
  );
}
import LogoutButton from '../Auth/Logout';

export default function Navbar() {
  return (
    <aside className="w-[250px] h-screen bg-gradient-to-b from-white to-[#21baa7] flex flex-col">
      {/* Logo */}
      <div className="flex justify-center py-6">
        <img src="assets/images/BBKK.png" alt="Logo" className="w-[220px]" />
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-3 px-4 mt-4">
        <NavItem active label="Dashboard">
          <DashboardIcon />
        </NavItem>

        <NavItem label="Product">
          <ProductIcon />
        </NavItem>

        <NavItem label="Inventory">
          <InventoryIcon />
        </NavItem>

        <NavItem label="Stock Movement">
          <StockIcon />
        </NavItem>
      </nav>

      {/* Logout */}
      <div className="mt-auto px-4 pb-6">
        <LogoutButton />
      </div>
    </aside>
  );
}

function NavItem({ label, active, children }) {
  return (
    <a
      className={`flex items-center gap-3 px-5 py-3 rounded-full cursor-pointer transition
        ${
          active
            ? 'bg-white text-[#0b7b6a] font-semibold'
            : 'text-[#037d68] hover:bg-white/30 hover:text-white'
        }`}
    >
      {children}
      {label}
    </a>
  );
}

/* Icons */
const DashboardIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-layout-dashboard-icon lucide-layout-dashboard"
  >
    <rect width="7" height="9" x="3" y="3" rx="1" />
    <rect width="7" height="5" x="14" y="3" rx="1" />
    <rect width="7" height="9" x="14" y="12" rx="1" />
    <rect width="7" height="5" x="3" y="16" rx="1" />
  </svg>
);
const inventory = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-notepad-text-icon lucide-notepad-text"
  >
    <path d="M8 2v4" />
    <path d="M12 2v4" />
    <path d="M16 2v4" />
    <rect width="16" height="18" x="4" y="4" rx="2" />
    <path d="M8 10h6" />
    <path d="M8 14h8" />
    <path d="M8 18h5" />
  </svg>
);
const product = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-package-search-icon lucide-package-search"
  >
    <path d="M21 10V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l2-1.14" />
    <path d="m7.5 4.27 9 5.15" />
    <polyline points="3.29 7 12 12 20.71 7" />
    <line x1="12" x2="12" y1="22" y2="12" />
    <circle cx="18.5" cy="15.5" r="2.5" />
    <path d="M20.27 17.27 22 19" />
  </svg>
);
const stock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-warehouse-icon lucide-warehouse"
  >
    <path d="M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11" />
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z" />
    <path d="M6 13h12" />
    <path d="M6 17h12" />
  </svg>
);

const ProductIcon = product;
const InventoryIcon = inventory;
const StockIcon = stock;

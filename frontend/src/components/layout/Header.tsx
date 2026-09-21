function Header() {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="w-64 px-4 py-2 border border-slate-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="text-right">
          <p className="font-medium text-slate-800">System Admin</p>

          <p className="text-sm text-slate-500">admin@test.com</p>
        </div>
      </div>
    </header>
  );
}

export default Header;

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-6">
      <input
        type="text"
        placeholder="Search ..."
        className="w-full max-w-[1050px] px-5 py-3 rounded-full shadow outline-none"
      />

      <div className="flex items-center gap-3 ml-6">
        <div className="w-9 h-9 bg-orange-400 rounded-full" />
        <span className="font-medium">Admin account</span>
      </div>
    </header>
  );
}

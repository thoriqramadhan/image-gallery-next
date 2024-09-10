export const CategoryTag = ({ name }) => {
  return (
    <div className="w-fit px-3 py-1 bg-slate-300/70 rounded-xl text-xs tracking-wider border border-transparent cursor-pointer transition-300 hover:bg-slate-600 hover:border hover:border-white">
      {name}
    </div>
  );
};

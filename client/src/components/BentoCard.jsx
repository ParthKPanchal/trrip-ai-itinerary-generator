export default function BentoCard({
  title,
  value,
  children,
  className = "",
}) {
  return (
    <div
      className={`
        bg-[#0F1024]/80
        backdrop-blur-xl
        border
        border-white/10
        rounded-3xl
        p-6
        hover:border-purple-500/50
        transition-all
        duration-300
        shadow-xl
        ${className}
      `}
    >
      {title && (
        <h3 className="text-slate-400 text-sm mb-2">
          {title}
        </h3>
      )}

      {value && (
        <h2 className="text-3xl font-bold text-white mb-3">
          {value}
        </h2>
      )}

      {children}
    </div>
  );
}
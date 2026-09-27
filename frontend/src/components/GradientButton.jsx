function GradientButton({
  children,
  className = "",
  disabled = false,
  ...props
}) {
  return (
    <button
      disabled={disabled}
      {...props}
      className={`
        w-full
        py-4
        rounded-2xl
        font-semibold
        text-xl
        text-white
        bg-gradient-to-r
        from-cyan-500
        via-blue-500
        to-purple-600
        transition-all
        duration-300
        hover:scale-105
        hover:shadow-[0_0_40px_rgba(0,255,255,.5)]
        active:scale-95
        disabled:opacity-50
        disabled:cursor-not-allowed
        disabled:hover:scale-100
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default GradientButton;
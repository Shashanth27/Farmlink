function Button({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition duration-300"
    >
      {text}
    </button>
  );
}

export default Button;
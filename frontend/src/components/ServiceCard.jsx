function ServiceCard({ icon, title, description, price }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600 mb-4">{description}</p>
        <p className="text-2xl font-bold text-[#d72638]">{price}</p>
      </div>
    </div>
  );
}

export default ServiceCard; 
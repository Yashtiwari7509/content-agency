const SectionLabel = ({ text }: { text: string }) => {
  return (
    <div className="flex justify-center mb-8">
      <span className="text-sm font-medium text-gray-700 bg-gray-100 px-6 py-2 rounded-full inline-block">{text}</span>
    </div>
  );
};

export default SectionLabel;

function FormResults({ banks }) {
  return (
    <div className="flex flex-col gap-6 mt-6 justify-center items-center w-full px-4">
      {banks.map((bank, index) => (
        <div
          key={index}
          className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-md w-full max-w-lg"
        >
          {/* Bank Name */}
          <h3 className="text-lg sm:text-xl font-bold text-red-400 mb-3 text-center">
            {bank[" Blood Bank Name"]}
          </h3>

          {/* Info section */}
          <div className="text-gray-200 space-y-2 text-sm sm:text-base">
            <p>
              <span className="font-semibold">Address:</span>{" "}
              {bank[" Address"] || "Not available"}
            </p>
            <p>
              <span className="font-semibold">Contact:</span>{" "}
              {bank[" Contact No"] || bank[" Mobile"] || "Not available"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default FormResults;

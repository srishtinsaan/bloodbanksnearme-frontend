export default function GetStartedSection() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // smooth scroll
    });
  };

  return (
    <section className="text-white py-12 mt-16">
      <div className="container mx-auto text-center px-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">
          Ready to Find a Blood Bank Near You?
        </h2>
        <p className="mb-6 text-gray-200">
          Start searching now and connect with life-saving resources in just a few clicks.
        </p>
        <button
          onClick={scrollToTop}
          className="bg-white text-black hover:bg-grey-900 font-bold py-2 px-4 rounded-lg shadow-md transition"
        >
          Get Started
        </button>
      </div>
    </section>
  );
}

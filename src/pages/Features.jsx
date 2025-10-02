
function Features() {
 
  const features = [
    {
      title: "Instant Search",
      desc: "Find nearby blood banks quickly by entering your pincode.",
      icon: "🔍",
    },
    {
      title: "Reliable Data",
      desc: "Get updated information about availability and locations.",
      icon: "📍",
    },
    {
      title: "Free of Cost",
      desc: "Enjoy all services without any charges — because saving lives should never come with a price tag.",
      icon: "💎",
    },
    {
      title: "Fast & Simple",
      desc: "Minimal steps to connect you with life-saving resources.",
      icon: "⚡",
    },
    {
      title: "24/7 Access",
      desc: "Search anytime, anywhere without restrictions.",
      icon: "⏰",
    },
    {
      title: "Community Support",
      desc: "Connects donors with those in need, making blood donation accessible and efficient.",
      icon: "🤝",
    },
  ];

  return (
    <div className="py-16 px-6 text-white my-20">
      <h2 className="text-5xl font-bold text-center mb-12">
        Key Features
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <div
            key={index}
            className="border border-white/10 p-6 rounded-2xl shadow-lg hover:scale-101 transition transform"
          >
            <div className="text-4xl mb-4">{feature.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-300">{feature.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Features

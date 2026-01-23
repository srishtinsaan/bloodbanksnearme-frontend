import React from "react";

export default function Testimonials() {
  const testimonials = [
    {
      name: "Dr. Sarah Johnson",
      handle: "@dr_sarah_j",
      avatar: "SJ",
      text: "MediConnect has revolutionized how we handle emergency blood requests. The response time is incredible!",
    },
    {
      name: "Michael Chen",
      handle: "@mchen_health",
      avatar: "MC",
      text: "As a regular donor, this platform makes it so easy to help others. I've donated 5 times this year already.",
    },
    {
      name: "Dr. Priya Patel",
      handle: "@priya_healthcare",
      avatar: "PP",
      text: "The verification system gives us confidence that we're connecting with genuine donors. Highly recommended!",
    },
    {
      name: "James Rodriguez",
      handle: "@jrodriguez",
      avatar: "JR",
      text: "Saved my brother's life when we needed O- blood urgently. Connected with a donor within 30 minutes!",
    },
    {
      name: "Dr. Emily Watson",
      handle: "@dr_watson_med",
      avatar: "EW",
      text: "The AI matching system is brilliant. It finds the right donors based on location and availability instantly.",
    },
    {
      name: "Alex Kumar",
      handle: "@alex_kumar",
      avatar: "AK",
      text: "I love the community aspect. Regular updates and the ability to track my donation impact is amazing.",
    },
    {
      name: "Dr. Robert Lee",
      handle: "@dr_robert_lee",
      avatar: "RL",
      text: "24/7 support has been a game changer for our hospital. We can request blood any time of day or night.",
    },
    {
      name: "Maria Santos",
      handle: "@maria_cares",
      avatar: "MS",
      text: "Beautiful interface and so simple to use. Even my parents could navigate it easily. Great work!",
    },
  ];

  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="relative bg-black py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 mb-16 text-center">
        <h2 className="text-2xl md:text-5xl font-bold text-white mb-6">
          Trusted by healthcare <br/>professionals and patients
        </h2>
        <p className="text-xl text-zinc-400">
          Join thousands of users who are already experiencing better healthcare
          with MediConnect
        </p>
      </div>

      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-black to-transparent z-10" />

      <div className="relative group">
        <div className="flex gap-6 scroll-animation">
          {duplicatedTestimonials.map((t, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[330px] bg-[#111111]/80 border border-white/5 rounded-[20px] p-6 shadow-lg hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center text-white font-bold">
                  {t.avatar}
                </div>

                <div>
                  <div className="text-white font-bold text-lg">{t.name}</div>
                  <div className="text-zinc-400 text-sm">{t.handle}</div>
                </div>
              </div>

              <p className="text-zinc-300 text-[15px] leading-relaxed">
                {t.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

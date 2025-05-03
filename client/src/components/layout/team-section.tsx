import React from 'react';

const TeamSection = () => {
  const teamMembers = [
    {
      name: "Mr. Boniface K. Terer",
      position: "CEO",
      experience: "31 years industry experience"
    },
    {
      name: "Mr. David C. Ruto",
      position: "Director, Agency Marketing & Letting",
      experience: "33 years industry experience"
    },
    {
      name: "Mr. Geoffrey Koros",
      position: "Director, Property Management",
      experience: "15+ years industry experience"
    }
  ];

  return (
    <section className="bg-amber-900/20 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold text-amber-300 mb-6 text-center">Our Leadership Team</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-primary/70 p-4 rounded-lg border-l-4 border-amber-400">
            <p className="font-semibold text-amber-200 text-lg">{member.name}</p>
            <p className="text-white">{member.position}</p>
            <p className="text-amber-100 text-xs mt-2">{member.experience}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
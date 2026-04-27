"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, useEffect } from "react";
import { Code, Camera, Palette } from "lucide-react";

const team = [
  {
    name: "Marco",
    role: "Lead Developer",
    icon: Code,
    description: "Esperto in React, Next.js e animazioni web. Trasforma le idee in codice elegante.",
    skills: ["React", "Next.js", "TypeScript", "Framer Motion"],
    gradient: "from-cyan-500 to-blue-500",
  },
  {
    name: "Luca",
    role: "Fotografo & Designer",
    icon: Camera,
    description: "Cattura l'essenza del tuo brand con scatti professionali e creativi.",
    skills: ["Fotografia", "Lightroom", "Photoshop", "Video"],
    gradient: "from-violet-500 to-purple-500",
  },
  {
    name: "Andrea",
    role: "UI/UX Designer",
    icon: Palette,
    description: "Crea esperienze utente intuitive e design che fanno la differenza.",
    skills: ["Figma", "UI Design", "UX Research", "Branding"],
    gradient: "from-pink-500 to-rose-500",
  },
];

const stats = [
  { number: "50+", label: "Progetti Completati" },
  { number: "100%", label: "Clienti Soddisfatti" },
  { number: "3", label: "Esperti del Team" },
  { number: "24/7", label: "Supporto" },
];

function TeamCard({ member, index }: { member: typeof team[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springConfig = { stiffness: 100, damping: 20 };
  const rotateXSpring = useSpring(rotateX, springConfig);
  const rotateYSpring = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(x * 20);
    rotateX.set(-y * 20);
  };

  const handleMouseLeave = () => {
    rotateX.set(0);
    rotateY.set(0);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.2 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: rotateXSpring,
        rotateY: rotateYSpring,
        transformStyle: "preserve-3d",
      }}
      className="group relative"
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${member.gradient} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`} />
      
      <div className="relative bg-card border border-border rounded-3xl p-8 h-full hover:border-transparent transition-colors" style={{ transform: "translateZ(50px)" }}>
        {/* Icon */}
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8 }}
          className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-6`}
        >
          <member.icon className="w-8 h-8 text-white" />
        </motion.div>

        {/* Info */}
        <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
        <p className={`text-sm font-medium bg-gradient-to-r ${member.gradient} bg-clip-text text-transparent mb-4`}>
          {member.role}
        </p>
        <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
          {member.description}
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-2">
          {member.skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 text-xs bg-secondary rounded-full text-muted-foreground"
            >
              {skill}
            </span>
          ))}
        </div>

        {/* Decorative corner */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${member.gradient} opacity-10 rounded-bl-3xl rounded-tr-3xl`} />
      </div>
    </motion.div>
  );
}

export function About() {
  return (
    <section id="chi-siamo" className="py-32 relative overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 200, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 200, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
            Il Nostro Team
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            <span className="text-gradient">Chi Siamo</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-3xl mx-auto text-balance">
            Siamo tre ragazzi con la passione per il digitale e la creatività.
            Uniamo le nostre competenze in sviluppo web, fotografia e design
            per creare esperienze uniche per i nostri clienti.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 + 0.2, type: "spring" }}
                className="text-4xl md:text-5xl font-bold text-gradient mb-2"
              >
                {stat.number}
              </motion.div>
              <div className="text-muted-foreground text-sm">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Team Cards */}
        <div className="grid md:grid-cols-3 gap-8" style={{ perspective: 1000 }}>
          {team.map((member, index) => (
            <TeamCard key={member.name} member={member} index={index} />
          ))}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="inline-block p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-violet-500/10 border border-border">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              La Nostra <span className="text-gradient">Mission</span>
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed text-balance">
              Crediamo che ogni business meriti una presenza online di qualità.
              Per questo offriamo non solo siti web, ma un&apos;esperienza completa
              che include shooting fotografico professionale. Il nostro approccio
              &quot;prima il progetto, poi il pagamento&quot; dimostra la fiducia che
              abbiamo nel nostro lavoro.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

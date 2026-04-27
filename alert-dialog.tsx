"use client";

import { motion } from "framer-motion";
import { Check, Sparkles, Camera, Code, Palette, Rocket, Zap, Shield } from "lucide-react";

const packages = [
  {
    name: "Starter",
    price: "799",
    description: "Perfetto per chi inizia la sua presenza online",
    features: [
      "Sito web di 5 pagine",
      "Design responsive",
      "SEO base",
      "5 foto professionali",
      "1 revisione",
      "Consegna in 2 settimane",
    ],
    popular: false,
    gradient: "from-zinc-500 to-zinc-600",
  },
  {
    name: "Professional",
    price: "1499",
    description: "La scelta migliore per far crescere il tuo business",
    features: [
      "Sito web di 10 pagine",
      "Design personalizzato",
      "SEO avanzato",
      "15 foto professionali",
      "Shooting di 2 ore",
      "3 revisioni",
      "Animazioni avanzate",
      "Consegna in 3 settimane",
    ],
    popular: true,
    gradient: "from-cyan-500 to-violet-500",
  },
  {
    name: "Enterprise",
    price: "2999",
    description: "Soluzione completa per grandi ambizioni",
    features: [
      "Sito web illimitato",
      "Design premium",
      "SEO enterprise",
      "30+ foto professionali",
      "Shooting di 4 ore",
      "Video promozionale",
      "Revisioni illimitate",
      "Supporto prioritario",
      "Consegna in 4 settimane",
    ],
    popular: false,
    gradient: "from-violet-500 to-fuchsia-500",
  },
];

const services = [
  {
    icon: Code,
    title: "Web Development",
    description: "Siti web moderni, veloci e ottimizzati per ogni dispositivo",
  },
  {
    icon: Camera,
    title: "Shooting Fotografico",
    description: "Fotografie professionali per dare vita al tuo brand",
  },
  {
    icon: Palette,
    title: "Brand Identity",
    description: "Creiamo un'identità visiva unica e riconoscibile",
  },
  {
    icon: Rocket,
    title: "SEO & Marketing",
    description: "Strategie per farti trovare dai tuoi clienti ideali",
  },
  {
    icon: Zap,
    title: "Performance",
    description: "Siti ultra-veloci per un'esperienza utente perfetta",
  },
  {
    icon: Shield,
    title: "Sicurezza",
    description: "Protezione SSL e best practices di sicurezza",
  },
];

export function Services() {
  return (
    <section id="servizi" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/3 left-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 15, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-500/10 rounded-full blur-3xl"
          animate={{
            y: [0, -50, 0],
            scale: [1.2, 1, 1.2],
          }}
          transition={{ duration: 12, repeat: Infinity }}
        />
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
            Cosa Offriamo
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            I Nostri <span className="text-gradient">Servizi</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Un pacchetto completo che unisce web design e fotografia professionale
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group p-6 rounded-2xl bg-card border border-border hover:border-cyan-500/50 transition-all"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 flex items-center justify-center mb-4"
              >
                <service.icon className="w-7 h-7 text-cyan-400" />
              </motion.div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-gradient transition-colors">
                {service.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Packages Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-violet-400 text-sm font-medium uppercase tracking-wider">
            Prezzi Trasparenti
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6">
            I Nostri <span className="text-gradient">Pacchetti</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Scegli il pacchetto più adatto alle tue esigenze
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -10 }}
              className={`relative rounded-3xl ${
                pkg.popular
                  ? "bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border-2 border-cyan-500/50"
                  : "bg-card border border-border"
              } p-1`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-1 px-4 py-1.5 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-sm font-medium text-background"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>Più Popolare</span>
                  </motion.div>
                </div>
              )}

              <div className="bg-card rounded-2xl p-8 h-full">
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm mb-6">
                  {pkg.description}
                </p>

                <div className="mb-8">
                  <span className="text-5xl font-bold text-gradient">
                    €{pkg.price}
                  </span>
                </div>

                <ul className="space-y-4 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full bg-gradient-to-br ${pkg.gradient} flex items-center justify-center flex-shrink-0`}>
                        <Check className="w-3 h-3 text-white" />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="#prenota"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`block w-full py-4 rounded-xl font-semibold text-center transition-all ${
                    pkg.popular
                      ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-background hover:shadow-lg hover:shadow-cyan-500/25"
                      : "bg-secondary text-foreground hover:bg-secondary/80"
                  }`}
                >
                  Scegli {pkg.name}
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

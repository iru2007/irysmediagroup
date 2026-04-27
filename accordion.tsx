"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, X } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Caffè Centrale",
    category: "Bar & Ristorante",
    description: "Sito web elegante con galleria fotografica per un caffè storico nel centro città.",
    image: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=800&q=80",
    color: "from-amber-500/20 to-orange-500/20",
    url: "#",
  },
  {
    id: 2,
    title: "Studio Legale Rossi",
    category: "Servizi Professionali",
    description: "Presenza online professionale con sistema di prenotazione appuntamenti.",
    image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80",
    color: "from-blue-500/20 to-cyan-500/20",
    url: "#",
  },
  {
    id: 3,
    title: "Fitness Revolution",
    category: "Palestra",
    description: "Piattaforma dinamica con corsi online e abbonamenti digitali.",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80",
    color: "from-red-500/20 to-pink-500/20",
    url: "#",
  },
  {
    id: 4,
    title: "Boutique Eleganza",
    category: "Moda",
    description: "E-commerce completo con shooting prodotti e lookbook stagionale.",
    image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80",
    color: "from-purple-500/20 to-violet-500/20",
    url: "#",
  },
  {
    id: 5,
    title: "Tech Solutions",
    category: "Startup Tech",
    description: "Landing page moderna con animazioni avanzate e lead generation.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80",
    color: "from-cyan-500/20 to-teal-500/20",
    url: "#",
  },
  {
    id: 6,
    title: "Ristorante Da Mario",
    category: "Food & Beverage",
    description: "Sito con menu digitale interattivo e sistema di prenotazione tavoli.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80",
    color: "from-green-500/20 to-emerald-500/20",
    url: "#",
  },
];

export function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  return (
    <section id="portfolio" className="py-32 overflow-hidden" ref={containerRef}>
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
            I Nostri Lavori
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            <span className="text-gradient">Portfolio</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Scorri orizzontalmente per esplorare i progetti realizzati per i nostri clienti
          </p>
        </motion.div>
      </div>

      {/* Horizontal Scroll Container */}
      <div className="relative">
        {/* Scroll indicator */}
        <div className="absolute left-6 top-1/2 -translate-y-1/2 z-10 hidden md:flex flex-col items-center gap-2">
          <motion.div
            animate={{ x: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-muted-foreground text-sm rotate-90 origin-center whitespace-nowrap"
          >
            ← Scorri →
          </motion.div>
        </div>

        <div className="horizontal-scroll overflow-x-auto pb-8">
          <motion.div 
            className="flex gap-8 px-6 md:px-20"
            style={{ x }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                onClick={() => setSelectedProject(project)}
                className="group flex-shrink-0 w-[350px] md:w-[400px] cursor-pointer"
              >
                {/* Card */}
                <div className={`relative h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br ${project.color} border border-border/50 p-1`}>
                  <div className="relative h-full rounded-2xl overflow-hidden bg-card">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <motion.img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.6 }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                      
                      {/* View button */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileHover={{ opacity: 1, scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center bg-background/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <div className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full text-background font-medium">
                          <span>Visualizza</span>
                          <ExternalLink className="w-4 h-4" />
                        </div>
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <span className="text-cyan-400 text-sm font-medium">
                        {project.category}
                      </span>
                      <h3 className="text-2xl font-bold mt-2 mb-3 text-foreground group-hover:text-gradient transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="w-2 h-2 rounded-full bg-cyan-400/50"
                          animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.5, 1, 0.5],
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: i * 0.3,
                          }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Project Modal */}
      {selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-xl p-6"
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-card rounded-3xl overflow-hidden border border-border"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-background/50 backdrop-blur-sm rounded-full text-foreground hover:bg-background transition-colors"
              aria-label="Chiudi"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-full">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8">
                <span className="text-cyan-400 text-sm font-medium">
                  {selectedProject.category}
                </span>
                <h3 className="text-3xl font-bold mt-2 mb-4 text-gradient">
                  {selectedProject.title}
                </h3>
                <p className="text-muted-foreground mb-8 leading-relaxed">
                  {selectedProject.description}
                </p>
                <a
                  href={selectedProject.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full font-medium text-background hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  <span>Visita il Sito</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}

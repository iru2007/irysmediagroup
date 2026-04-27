"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import {
  format,
  addDays,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isToday,
  isBefore,
  startOfDay,
  addMonths,
  subMonths,
  getDay,
} from "date-fns";
import { it } from "date-fns/locale";
import { ChevronLeft, ChevronRight, Clock, Calendar, User, Mail, MessageSquare, Check, Sparkles } from "lucide-react";

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "14:00", "14:30", "15:00", "15:30", "16:00", "16:30",
  "17:00", "17:30", "18:00",
];

// Simulate some booked slots
const getAvailableSlots = (date: Date) => {
  const dayOfWeek = getDay(date);
  // Weekend has fewer slots
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return timeSlots.filter((_, i) => i % 3 === 0);
  }
  // Randomly remove some slots to simulate bookings
  const seed = date.getDate() + date.getMonth();
  return timeSlots.filter((_, i) => (i + seed) % 4 !== 0);
};

export function Booking() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [step, setStep] = useState<"calendar" | "time" | "form" | "success">("calendar");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const days = useMemo(() => {
    const start = startOfMonth(currentMonth);
    const end = endOfMonth(currentMonth);
    return eachDayOfInterval({ start, end });
  }, [currentMonth]);

  const firstDayOfMonth = getDay(startOfMonth(currentMonth));
  const emptyDays = Array.from({ length: firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1 });

  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];
    return getAvailableSlots(selectedDate);
  }, [selectedDate]);

  const handleDateSelect = (date: Date) => {
    if (isBefore(date, startOfDay(new Date()))) return;
    setSelectedDate(date);
    setSelectedTime(null);
    setStep("time");
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
    setStep("form");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setStep("success");
  };

  const resetBooking = () => {
    setSelectedDate(null);
    setSelectedTime(null);
    setFormData({ name: "", email: "", description: "" });
    setStep("calendar");
  };

  return (
    <section id="prenota" className="py-32 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-gradient-to-br from-cyan-500/10 to-violet-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 20, repeat: Infinity }}
        />
      </div>

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 text-sm font-medium uppercase tracking-wider">
            Inizia Oggi
          </span>
          <h2 className="text-4xl md:text-6xl font-bold mt-4 mb-6">
            Prenota una <span className="text-gradient">Call Gratuita</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            30 minuti per conoscerci, capire le tue esigenze e mostrarti come possiamo aiutarti
          </p>
        </motion.div>

        {/* Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/20 to-violet-500/20 rounded-3xl blur-xl" />
          
          <div className="relative bg-card border border-border rounded-3xl p-8 md:p-12">
            {/* Progress Steps */}
            <div className="flex items-center justify-center gap-4 mb-12">
              {[
                { step: "calendar", label: "Data", icon: Calendar },
                { step: "time", label: "Orario", icon: Clock },
                { step: "form", label: "Dati", icon: User },
              ].map((s, index) => (
                <div key={s.step} className="flex items-center">
                  <motion.div
                    initial={false}
                    animate={{
                      backgroundColor:
                        step === s.step || 
                        (step === "time" && index === 0) ||
                        (step === "form" && index <= 1) ||
                        step === "success"
                          ? "rgb(6, 182, 212)"
                          : "transparent",
                      borderColor:
                        step === s.step ||
                        (step === "time" && index === 0) ||
                        (step === "form" && index <= 1) ||
                        step === "success"
                          ? "rgb(6, 182, 212)"
                          : "rgb(63, 63, 70)",
                    }}
                    className="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors"
                  >
                    <s.icon className={`w-5 h-5 ${
                      step === s.step ||
                      (step === "time" && index === 0) ||
                      (step === "form" && index <= 1) ||
                      step === "success"
                        ? "text-background"
                        : "text-muted-foreground"
                    }`} />
                  </motion.div>
                  {index < 2 && (
                    <div className="w-16 md:w-24 h-0.5 bg-border mx-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{
                          width:
                            (step === "time" && index === 0) ||
                            (step === "form" && index <= 1) ||
                            step === "success"
                              ? "100%"
                              : "0%",
                        }}
                        className="h-full bg-cyan-500"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {/* Calendar Step */}
              {step === "calendar" && (
                <motion.div
                  key="calendar"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="max-w-md mx-auto"
                >
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between mb-6">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      aria-label="Mese precedente"
                    >
                      <ChevronLeft className="w-5 h-5" />
                    </motion.button>
                    <h3 className="text-xl font-bold capitalize">
                      {format(currentMonth, "MMMM yyyy", { locale: it })}
                    </h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
                      className="p-2 rounded-lg hover:bg-secondary transition-colors"
                      aria-label="Mese successivo"
                    >
                      <ChevronRight className="w-5 h-5" />
                    </motion.button>
                  </div>

                  {/* Day Headers */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"].map((day) => (
                      <div
                        key={day}
                        className="text-center text-xs text-muted-foreground font-medium py-2"
                      >
                        {day}
                      </div>
                    ))}
                  </div>

                  {/* Calendar Grid */}
                  <div className="grid grid-cols-7 gap-1">
                    {emptyDays.map((_, i) => (
                      <div key={`empty-${i}`} className="aspect-square" />
                    ))}
                    {days.map((day) => {
                      const isPast = isBefore(day, startOfDay(new Date()));
                      const isSelected = selectedDate?.toDateString() === day.toDateString();
                      
                      return (
                        <motion.button
                          key={day.toISOString()}
                          onClick={() => handleDateSelect(day)}
                          disabled={isPast}
                          whileHover={!isPast ? { scale: 1.1 } : {}}
                          whileTap={!isPast ? { scale: 0.95 } : {}}
                          className={`
                            aspect-square rounded-xl text-sm font-medium transition-all
                            ${isPast ? "text-muted-foreground/50 cursor-not-allowed" : "hover:bg-secondary cursor-pointer"}
                            ${isToday(day) ? "ring-2 ring-cyan-500/50" : ""}
                            ${isSelected ? "bg-gradient-to-br from-cyan-500 to-violet-500 text-background" : ""}
                          `}
                        >
                          {format(day, "d")}
                        </motion.button>
                      );
                    })}
                  </div>
                </motion.div>
              )}

              {/* Time Step */}
              {step === "time" && selectedDate && (
                <motion.div
                  key="time"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="max-w-md mx-auto"
                >
                  <div className="text-center mb-8">
                    <h3 className="text-xl font-bold mb-2">
                      {format(selectedDate, "EEEE d MMMM", { locale: it })}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Seleziona un orario disponibile
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {availableSlots.length > 0 ? (
                      availableSlots.map((time) => (
                        <motion.button
                          key={time}
                          onClick={() => handleTimeSelect(time)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className={`
                            py-3 px-4 rounded-xl text-sm font-medium transition-all border
                            ${selectedTime === time
                              ? "bg-gradient-to-r from-cyan-500 to-violet-500 text-background border-transparent"
                              : "bg-secondary border-border hover:border-cyan-500/50"
                            }
                          `}
                        >
                          {time}
                        </motion.button>
                      ))
                    ) : (
                      <p className="col-span-3 text-center text-muted-foreground py-8">
                        Nessun orario disponibile per questa data
                      </p>
                    )}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setStep("calendar")}
                    className="mt-8 w-full py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-all"
                  >
                    ← Torna al Calendario
                  </motion.button>
                </motion.div>
              )}

              {/* Form Step */}
              {step === "form" && selectedDate && selectedTime && (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="max-w-md mx-auto"
                >
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-glow border border-cyan-500/30 text-sm text-cyan-400 mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>
                        {format(selectedDate, "d MMMM", { locale: it })} alle {selectedTime}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold">Completa la Prenotazione</h3>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label htmlFor="booking-name" className="flex items-center gap-2 text-sm font-medium mb-2">
                        <User className="w-4 h-4 text-cyan-400" />
                        Nome Completo
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="text"
                        id="booking-name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="Il tuo nome"
                      />
                    </div>

                    <div>
                      <label htmlFor="booking-email" className="flex items-center gap-2 text-sm font-medium mb-2">
                        <Mail className="w-4 h-4 text-cyan-400" />
                        Email
                      </label>
                      <motion.input
                        whileFocus={{ scale: 1.01 }}
                        type="email"
                        id="booking-email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
                        placeholder="la-tua@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="booking-description" className="flex items-center gap-2 text-sm font-medium mb-2">
                        <MessageSquare className="w-4 h-4 text-cyan-400" />
                        Di cosa vorresti parlare?
                      </label>
                      <motion.textarea
                        whileFocus={{ scale: 1.01 }}
                        id="booking-description"
                        rows={3}
                        required
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-cyan-500/50 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all resize-none"
                        placeholder="Racconta brevemente il tuo progetto..."
                      />
                    </div>

                    <div className="flex gap-4">
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setStep("time")}
                        className="flex-1 py-4 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-all"
                      >
                        Indietro
                      </motion.button>
                      <motion.button
                        type="submit"
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(0, 200, 255, 0.3)" }}
                        whileTap={{ scale: 0.98 }}
                        className="flex-1 py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 text-background font-semibold disabled:opacity-70 transition-all"
                      >
                        {isSubmitting ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-5 h-5 border-2 border-background border-t-transparent rounded-full mx-auto"
                          />
                        ) : (
                          "Conferma"
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* Success Step */}
              {step === "success" && (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-violet-500 flex items-center justify-center mx-auto mb-8"
                  >
                    <Check className="w-12 h-12 text-background" />
                  </motion.div>
                  
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-3xl font-bold mb-4 text-gradient">
                      Prenotazione Confermata!
                    </h3>
                    <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                      Ti abbiamo inviato una email di conferma con tutti i dettagli.
                      Non vediamo l&apos;ora di conoscerti!
                    </p>
                    
                    <div className="flex flex-wrap gap-4 justify-center">
                      <div className="px-4 py-2 rounded-lg bg-secondary text-sm">
                        📅 {selectedDate && format(selectedDate, "d MMMM yyyy", { locale: it })}
                      </div>
                      <div className="px-4 py-2 rounded-lg bg-secondary text-sm">
                        ⏰ {selectedTime}
                      </div>
                    </div>
                  </motion.div>

                  <motion.button
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={resetBooking}
                    className="mt-8 px-8 py-3 rounded-xl bg-secondary text-foreground font-medium hover:bg-secondary/80 transition-all"
                  >
                    Prenota un&apos;altra Call
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center gap-2 text-muted-foreground text-sm">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>Call gratuita di 30 minuti • Nessun impegno</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

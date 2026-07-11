'use client';

import { useState } from 'react';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Mail } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem('driftwear_newsletter') || '[]');
    if (!existing.includes(email)) {
      existing.push(email);
      localStorage.setItem('driftwear_newsletter', JSON.stringify(existing));
    }

    setSubmitted(true);
  }

  return (
    <section className="py-16 md:py-24 bg-cream">
      <Container>
        <Reveal>
          <div className="max-w-lg mx-auto text-center">
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-ink mb-4">
              Good clothes. Better inbox.
            </h2>
            <p className="text-muted-foreground text-sm md:text-base mb-8 max-w-md mx-auto">
              New drops, soft fabrics, and the occasional sale — no inbox chaos.
            </p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-2 text-olive"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    You&apos;re in! Welcome to the soft side.
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex gap-2"
                >
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-11 pl-10 rounded-md border-sand bg-offwhite"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="bg-navy text-cream hover:bg-navy/90 h-11 px-6 rounded-md text-sm flex-shrink-0"
                  >
                    Subscribe
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
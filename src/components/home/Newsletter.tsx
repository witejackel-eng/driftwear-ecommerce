'use client';

import { useState } from 'react';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Mail, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type FormState = 'idle' | 'loading' | 'success' | 'error';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [state, setState] = useState<FormState>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Validate email
    if (!email.trim()) {
      setState('error');
      setErrorMessage('Please enter your email address.');
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setState('error');
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Simulate a brief loading state
    setState('loading');
    setErrorMessage('');

    setTimeout(() => {
      try {
        const existing = JSON.parse(localStorage.getItem('driftwear_newsletter') || '[]');
        if (Array.isArray(existing) && existing.includes(email)) {
          setState('success');
          return;
        }
        existing.push(email);
        localStorage.setItem('driftwear_newsletter', JSON.stringify(existing));
        setState('success');
      } catch {
        // localStorage not available — still show success for UX
        setState('success');
      }
    }, 600);
  }

  return (
    <section className="py-20 md:py-28 bg-ink">
      <Container>
        <Reveal>
          <div className="max-w-lg mx-auto text-center">
            <Mail className="h-8 w-8 text-clay mx-auto mb-5" />
            <h2 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-offwhite mb-4">
              Good clothes. Better inbox.
            </h2>
            <p className="text-muted-brown text-sm md:text-base mb-8 max-w-md mx-auto leading-relaxed">
              New drops, soft fabrics, and the occasional sale — no inbox chaos.
            </p>

            <AnimatePresence mode="wait">
              {state === 'success' ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center justify-center gap-2 text-faded-olive"
                >
                  <CheckCircle2 className="h-5 w-5" />
                  <span className="text-sm font-medium">
                    You&apos;re in. Welcome to the soft side.
                  </span>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3"
                >
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          if (state === 'error') setState('idle');
                        }}
                        disabled={state === 'loading'}
                        className="h-11 pl-4 rounded-md border-light-sand/20 bg-offwhite/10 text-offwhite placeholder:text-muted-brown/60 focus:border-clay/50 focus-visible:ring-clay/30"
                        aria-label="Email address"
                        aria-invalid={state === 'error'}
                      />
                    </div>
                    <Button
                      type="submit"
                      disabled={state === 'loading'}
                      className="bg-clay text-offwhite hover:bg-clay/90 h-11 px-6 rounded-md text-sm font-medium flex-shrink-0 disabled:opacity-60"
                    >
                      {state === 'loading' ? (
                        <span className="inline-flex items-center gap-1.5">
                          <span className="h-3.5 w-3.5 border-2 border-offwhite/30 border-t-offwhite rounded-full animate-spin" />
                          Subscribing…
                        </span>
                      ) : (
                        'Subscribe'
                      )}
                    </Button>
                  </div>

                  {state === 'error' && errorMessage && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-center gap-1.5 text-clay text-xs"
                      role="alert"
                    >
                      <AlertCircle className="h-3.5 w-3.5" />
                      {errorMessage}
                    </motion.p>
                  )}
                </motion.form>
              )}
            </AnimatePresence>

            <p className="text-muted-brown/60 text-xs mt-5">
              We respect your privacy. Unsubscribe anytime.
            </p>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
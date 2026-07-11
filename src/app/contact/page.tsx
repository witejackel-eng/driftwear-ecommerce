'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Send, Mail, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Container } from '@/components/shared/Container';
import { Reveal } from '@/components/shared/Reveal';
import { storeConfig } from '@/lib/store-config';

type FormState = 'idle' | 'loading' | 'success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  reason?: string;
  message?: string;
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const reasonOptions = [
  { value: 'order-issue', label: 'Order Issue' },
  { value: 'sizing', label: 'Sizing' },
  { value: 'returns', label: 'Returns' },
  { value: 'general', label: 'General Question' },
  { value: 'other', label: 'Other' },
] as const;

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    orderNumber: '',
    reason: '',
    message: '',
  });
  const [formState, setFormState] = useState<FormState>('idle');
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [serverMessage, setServerMessage] = useState('');

  const update = useCallback((field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setFormErrors((prev) => ({ ...prev, [field]: undefined }));
  }, []);

  const validate = useCallback((): boolean => {
    const errors: FormErrors = {};
    if (!form.name.trim()) errors.name = 'Name is required';
    if (!form.email.trim()) errors.email = 'Email is required';
    else if (!EMAIL_REGEX.test(form.email)) errors.email = 'Please enter a valid email';
    if (!form.reason) errors.reason = 'Please select a reason';
    if (!form.message.trim()) errors.message = 'Message is required';
    else if (form.message.trim().length < 10) errors.message = 'Message must be at least 10 characters';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  }, [form]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setFormState('loading');
    setServerMessage('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
          orderNumber: form.orderNumber.trim() || undefined,
          reason: form.reason,
          message: form.message.trim(),
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setFormState('success');
        setServerMessage(data.message);
      } else {
        setFormState('error');
        setServerMessage(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setFormState('error');
      setServerMessage('Could not connect to the server. Please check your connection and try again.');
    }
  };

  const resetForm = () => {
    setForm({ name: '', email: '', orderNumber: '', reason: '', message: '' });
    setFormErrors({});
    setServerMessage('');
    setFormState('idle');
  };

  return (
    <main className="flex-1">
      <Container className="py-8 md:py-12">
        {/* Breadcrumb */}
        <Reveal>
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Contact</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Reveal>

        <Reveal>
          <p className="font-[family-name:var(--font-instrument-serif)] text-clay text-xs uppercase tracking-widest mb-4">
            Help
          </p>
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-deep-ink leading-tight mb-4">
            Get in Touch
          </h1>
          <p className="text-sm text-muted-brown mb-10 max-w-xl">
            Have a question, issue, or just want to say hi? Fill out the form
            below and we&apos;ll get back to you as soon as we can.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <Reveal>
              {formState === 'success' ? (
                <div className="bg-warm-paper p-8 md:p-12 text-center">
                  <CheckCircle className="w-10 h-10 text-faded-olive mx-auto mb-4" />
                  <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl text-deep-ink mb-2">
                    Thank you
                  </h2>
                  <p className="text-sm text-muted-brown mb-1">
                    {serverMessage}
                  </p>
                  <p className="text-xs text-muted-brown mb-8">
                    {storeConfig.isDemo
                      ? 'This is a demo, so no email was sent.'
                      : 'We typically respond within 1–2 business days.'}
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-sm border-deep-ink text-deep-ink hover:bg-deep-ink hover:text-offwhite"
                    onClick={resetForm}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-xl" noValidate>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-xs text-muted-brown mb-1.5 block">
                        Name <span className="text-clay">*</span>
                      </Label>
                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Your name"
                        aria-invalid={!!formErrors.name}
                        aria-describedby={formErrors.name ? 'name-error' : undefined}
                        className="h-11 rounded-sm bg-offwhite border-light-sand focus:border-clay"
                      />
                      {formErrors.name && (
                        <p id="name-error" className="text-xs text-clay mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.name}
                        </p>
                      )}
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs text-muted-brown mb-1.5 block">
                        Email <span className="text-clay">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="you@example.com"
                        aria-invalid={!!formErrors.email}
                        aria-describedby={formErrors.email ? 'email-error' : undefined}
                        className="h-11 rounded-sm bg-offwhite border-light-sand focus:border-clay"
                      />
                      {formErrors.email && (
                        <p id="email-error" className="text-xs text-clay mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.email}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="orderNumber" className="text-xs text-muted-brown mb-1.5 block">
                        Order Number
                      </Label>
                      <Input
                        id="orderNumber"
                        value={form.orderNumber}
                        onChange={(e) => update('orderNumber', e.target.value)}
                        placeholder="DW-XXXXXX (optional)"
                        className="h-11 rounded-sm bg-offwhite border-light-sand focus:border-clay"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reason" className="text-xs text-muted-brown mb-1.5 block">
                        Reason <span className="text-clay">*</span>
                      </Label>
                      <Select
                        value={form.reason}
                        onValueChange={(v) => update('reason', v)}
                      >
                        <SelectTrigger
                          className="h-11 rounded-sm bg-offwhite border-light-sand focus:border-clay"
                          aria-invalid={!!formErrors.reason}
                          aria-describedby={formErrors.reason ? 'reason-error' : undefined}
                        >
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          {reasonOptions.map((opt) => (
                            <SelectItem key={opt.value} value={opt.value}>
                              {opt.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {formErrors.reason && (
                        <p id="reason-error" className="text-xs text-clay mt-1 flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.reason}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-xs text-muted-brown mb-1.5 block">
                      Message <span className="text-clay">*</span>
                    </Label>
                    <Textarea
                      id="message"
                      required
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                      aria-invalid={!!formErrors.message}
                      aria-describedby={formErrors.message ? 'message-error' : undefined}
                      className="rounded-sm bg-offwhite border-light-sand focus:border-clay resize-none"
                    />
                    <div className="flex justify-between mt-1">
                      {formErrors.message ? (
                        <p id="message-error" className="text-xs text-clay flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {formErrors.message}
                        </p>
                      ) : (
                        <span />
                      )}
                      <span className="text-xs text-muted-brown">
                        {form.message.trim().length} / 2000
                      </span>
                    </div>
                  </div>

                  {formState === 'error' && serverMessage && (
                    <div className="bg-clay/10 border border-clay/20 rounded-sm p-4">
                      <p className="text-sm text-clay flex items-start gap-2">
                        <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                        {serverMessage}
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    disabled={formState === 'loading'}
                    className="bg-deep-ink text-offwhite hover:bg-deep-ink/90 rounded-sm h-11"
                  >
                    {formState === 'loading' ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              )}
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Reveal direction="right" delay={0.1}>
              <div className="space-y-8">
                {/* Email — only if configured */}
                {storeConfig.supportEmail && (
                  <div>
                    <h3 className="font-[family-name:var(--font-instrument-serif)] text-lg text-deep-ink mb-3">
                      Email us
                    </h3>
                    <p className="text-sm text-muted-brown flex items-center gap-2">
                      <Mail className="w-4 h-4 text-clay shrink-0" />
                      <a
                        href={`mailto:${storeConfig.supportEmail}`}
                        className="hover:text-deep-ink transition-colors"
                      >
                        {storeConfig.supportEmail}
                      </a>
                    </p>
                    <p className="text-xs text-muted-brown mt-1.5">
                      We typically respond within 1–2 business days.
                    </p>
                  </div>
                )}

                {/* Quick links */}
                <div>
                  <h3 className="font-[family-name:var(--font-instrument-serif)] text-lg text-deep-ink mb-3">
                    Common questions
                  </h3>
                  <div className="space-y-2.5">
                    <Link
                      href="/faq"
                      className="block text-sm text-muted-brown hover:text-clay transition-colors"
                    >
                      Frequently Asked Questions
                    </Link>
                    <Link
                      href="/shipping-returns"
                      className="block text-sm text-muted-brown hover:text-clay transition-colors"
                    >
                      Shipping &amp; Returns Policy
                    </Link>
                    <Link
                      href="/size-guide"
                      className="block text-sm text-muted-brown hover:text-clay transition-colors"
                    >
                      Size Guide
                    </Link>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </Container>
    </main>
  );
}
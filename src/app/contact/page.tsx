'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Send, Mail, MapPin, Phone, MessageCircle } from 'lucide-react';
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

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    orderNumber: '',
    reason: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Save to localStorage as demo
    try {
      const messages = JSON.parse(
        localStorage.getItem('driftwear_contact_messages') || '[]'
      );
      messages.push({ ...form, createdAt: new Date().toISOString() });
      localStorage.setItem('driftwear_contact_messages', JSON.stringify(messages));
    } catch {
      // ignore
    }
    setSubmitted(true);
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
          <h1 className="font-[family-name:var(--font-instrument-serif)] text-3xl md:text-4xl text-ink mb-4">
            Get in Touch
          </h1>
          <p className="text-sm text-muted-foreground mb-10 max-w-xl">
            Have a question, issue, or just want to say hi? Fill out the form below and
            we&apos;ll get back to you as soon as we can.
          </p>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Form */}
          <div className="lg:col-span-2">
            <Reveal>
              {submitted ? (
                <div className="bg-olive/10 rounded-sm p-8 text-center">
                  <MessageCircle className="w-10 h-10 text-olive mx-auto mb-4" />
                  <h2 className="font-[family-name:var(--font-instrument-serif)] text-2xl text-ink mb-2">
                    Message saved!
                  </h2>
                  <p className="text-sm text-muted-foreground mb-1">
                    Message saved as demo. Connect an email service before production.
                  </p>
                  <p className="text-xs text-muted-foreground mb-6">
                    In a real store, this would be sent to our support team.
                  </p>
                  <Button
                    variant="outline"
                    className="rounded-sm"
                    onClick={() => {
                      setSubmitted(false);
                      setForm({
                        name: '',
                        email: '',
                        orderNumber: '',
                        reason: '',
                        message: '',
                      });
                    }}
                  >
                    Send another message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-xs text-muted-foreground mb-1.5 block">
                        Name *
                      </Label>
                      <Input
                        id="name"
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        placeholder="Your name"
                        className="h-10 rounded-sm bg-cream/30 border-sand"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-xs text-muted-foreground mb-1.5 block">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        placeholder="you@example.com"
                        className="h-10 rounded-sm bg-cream/30 border-sand"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label
                        htmlFor="orderNumber"
                        className="text-xs text-muted-foreground mb-1.5 block"
                      >
                        Order Number (optional)
                      </Label>
                      <Input
                        id="orderNumber"
                        value={form.orderNumber}
                        onChange={(e) => update('orderNumber', e.target.value)}
                        placeholder="DW-XXXXXX"
                        className="h-10 rounded-sm bg-cream/30 border-sand"
                      />
                    </div>
                    <div>
                      <Label htmlFor="reason" className="text-xs text-muted-foreground mb-1.5 block">
                        Reason *
                      </Label>
                      <Select
                        value={form.reason}
                        onValueChange={(v) => update('reason', v)}
                        required
                      >
                        <SelectTrigger className="h-10 rounded-sm bg-cream/30 border-sand">
                          <SelectValue placeholder="Select a reason" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order-issue">Order Issue</SelectItem>
                          <SelectItem value="sizing">Sizing</SelectItem>
                          <SelectItem value="returns">Returns</SelectItem>
                          <SelectItem value="general">General</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-xs text-muted-foreground mb-1.5 block">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      required
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      placeholder="Tell us what's on your mind..."
                      rows={5}
                      className="rounded-sm bg-cream/30 border-sand resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="bg-navy text-white hover:bg-navy/90 rounded-sm"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              )}
            </Reveal>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Reveal direction="right" delay={0.1}>
              <div className="space-y-8">
                {/* Email */}
                <div>
                  <h3 className="font-[family-name:var(--font-instrument-serif)] text-lg text-ink mb-3">
                    Email us
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Mail className="w-4 h-4 text-navy" />
                    hello@driftwear.studio
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    We typically respond within 24 hours (demo — not a real email).
                  </p>
                </div>

                {/* Phone */}
                <div>
                  <h3 className="font-[family-name:var(--font-instrument-serif)] text-lg text-ink mb-3">
                    Call us
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <Phone className="w-4 h-4 text-navy" />
                    +91 98765 43210
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Mon–Sat, 10am–6pm IST
                  </p>
                </div>

                {/* Location */}
                <div>
                  <h3 className="font-[family-name:var(--font-instrument-serif)] text-lg text-ink mb-3">
                    Visit us
                  </h3>
                  <p className="text-sm text-muted-foreground flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-navy mt-0.5 shrink-0" />
                    <span>
                      Driftwear Studio (demo)
                      <br />
                      42 Fabric Lane, Kala Ghoda
                      <br />
                      Mumbai 400001, India
                    </span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    This is a placeholder address for the demo.
                  </p>
                </div>

                {/* Quick links */}
                <div>
                  <h3 className="font-[family-name:var(--font-instrument-serif)] text-lg text-ink mb-3">
                    Quick Links
                  </h3>
                  <div className="space-y-2">
                    <Link
                      href="/faq"
                      className="block text-sm text-navy hover:underline"
                    >
                      Frequently Asked Questions
                    </Link>
                    <Link
                      href="/shipping-returns"
                      className="block text-sm text-navy hover:underline"
                    >
                      Shipping & Returns Policy
                    </Link>
                    <Link
                      href="/sustainability"
                      className="block text-sm text-navy hover:underline"
                    >
                      Sustainability
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
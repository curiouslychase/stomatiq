'use client';

import { useState, FormEvent, useId } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NewsletterSubscribeProps {
  variant?: 'default' | 'article';
  layout?: 'inline' | 'stacked';
  heading?: string;
  description?: string;
  className?: string;
  buttonLabel?: string;
  placeholder?: string;
  action?: string;
  successMessage?: string;
  duplicateMessage?: string;
  errorMessage?: string;
  networkMessage?: string;
  emptyMessage?: string;
  subscribingMessage?: string;
  formId?: string;
}

export default function NewsletterSubscribe({
  variant = 'default',
  layout: layoutProp,
  heading: headingProp,
  description: descriptionProp,
  className = '',
  buttonLabel = 'Subscribe',
  placeholder = 'you@example.com',
  action = '/api/newsletter/subscribe',
  successMessage = "You're subscribed!",
  duplicateMessage = "You're already subscribed.",
  errorMessage = 'Something went wrong.',
  networkMessage = 'Network error. Try again.',
  emptyMessage = 'Enter an email address.',
  subscribingMessage = 'Subscribing…',
  formId: providedFormId,
}: NewsletterSubscribeProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [tone, setTone] = useState<'idle' | 'success' | 'error'>('idle');
  const [loading, setLoading] = useState(false);
  const generatedId = useId();
  const formId = providedFormId ?? `newsletter-${generatedId.replace(/[:]/g, '')}`;

  const isArticle = variant === 'article';
  const layout = layoutProp ?? (isArticle ? 'stacked' : 'inline');
  const heading = headingProp ?? (isArticle ? 'Subscribe to the newsletter' : undefined);
  const description = descriptionProp ?? (isArticle
    ? 'New essays and updates—delivered occasionally.'
    : 'Get new essays and updates delivered occasionally.');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedEmail = email.trim();
    if (!trimmedEmail.length) {
      setStatus(emptyMessage);
      setTone('error');
      return;
    }

    setLoading(true);
    setStatus(subscribingMessage);
    setTone('idle');

    try {
      const response = await fetch(action, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail }),
      });

      const payload = await response.json().catch(() => ({}));

      if (response.ok && payload?.success) {
        setEmail('');
        setStatus(payload?.duplicate ? duplicateMessage : successMessage);
        setTone('success');
        setTimeout(() => {
          setStatus('');
          setTone('idle');
        }, 6000);
      } else {
        const reason = typeof payload?.error === 'string' && payload.error.trim().length
          ? payload.error
          : errorMessage;
        setStatus(reason);
        setTone('error');
      }
    } catch (error) {
      console.error('Newsletter subscribe failed', error);
      setStatus(networkMessage);
      setTone('error');
    } finally {
      setLoading(false);
    }
  };

  const wrapperClasses = [
    'newsletter-subscribe',
    'w-full',
    'flex',
    'flex-col',
    'items-center',
    isArticle ? 'rounded-3xl border border-foreground/12 bg-background-alt/60 p-6 shadow-sm' : '',
    className,
  ].filter(Boolean).join(' ');

  const formClasses = [
    'w-full',
    'max-w-xl',
    layout === 'inline'
      ? 'grid gap-3 sm:grid-cols-[1fr_auto]'
      : 'flex flex-col gap-3',
    isArticle ? 'mt-4' : 'mt-6',
  ].filter(Boolean).join(' ');

  const statusClasses = [
    'text-center',
    layout === 'inline'
      ? 'sm:col-span-2 text-xs uppercase tracking-[0.25em]'
      : isArticle
      ? 'text-[13px] leading-6'
      : 'text-xs uppercase tracking-[0.25em]',
    'transition-colors',
    tone === 'success' ? (isArticle ? 'text-emerald-400' : 'text-emerald-500') : '',
    tone === 'error' ? 'text-red-500' : '',
    tone === 'idle' ? (isArticle ? 'text-foreground/60' : 'text-foreground/50') : '',
  ].join(' ');

  const headingClass = isArticle
    ? 'text-xs font-semibold uppercase tracking-[0.18em] text-foreground/70 text-center'
    : 'text-sm font-semibold uppercase tracking-[0.3em] text-foreground/60 text-center';

  return (
    <section
      className={wrapperClasses}
      data-newsletter-wrapper={formId}
      data-variant={variant}
    >
      {heading && (
        <div className="text-center">
          <h2 className={headingClass}>{heading}</h2>
        </div>
      )}
      {!status && description && (
        <p className={statusClasses}>{description}</p>
      )}
      <form
        className={formClasses}
        onSubmit={handleSubmit}
        data-newsletter-form={formId}
        noValidate
      >
        <div className={layout === 'inline' ? 'sm:col-span-1' : 'w-full'}>
          <Label className="sr-only" htmlFor={`newsletter-email-${formId}`}>
            Email address
          </Label>
          <Input
            id={`newsletter-email-${formId}`}
            name="email"
            type="email"
            autoComplete="email"
            required
            placeholder={placeholder}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={isArticle ? 'border-foreground/12' : 'border-foreground/15'}
          />
        </div>
        <Button
          type="submit"
          disabled={loading}
          variant={isArticle ? "outline" : "default"}
          className={[
            isArticle
              ? 'self-start border-foreground/30 bg-background text-sm font-semibold uppercase tracking-[0.18em] hover:bg-foreground/10'
              : 'border-foreground bg-foreground text-xs font-semibold uppercase tracking-[0.25em] text-background hover:bg-foreground/90',
          ].join(' ')}
        >
          {buttonLabel}
        </Button>
        {status && (
          <p
            className={statusClasses}
            role="status"
            aria-live="polite"
          >
            {status}
          </p>
        )}
      </form>
    </section>
  );
}

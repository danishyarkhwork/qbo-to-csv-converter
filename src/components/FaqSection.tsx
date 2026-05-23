import { faqItems } from "@/content/faqs";

export function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-20">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-copper">FAQ</p>
        <h2 className="mt-2 font-display text-3xl tracking-tight text-ink sm:text-4xl">
          Common questions
        </h2>
        <dl className="mt-10 divide-y divide-line">
          {faqItems.map((item) => (
            <div key={item.question} className="py-6">
              <dt className="font-display text-lg text-ink">{item.question}</dt>
              <dd className="mt-3 text-sm leading-relaxed text-ink-muted">{item.answer}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

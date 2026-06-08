import { Link } from 'react-router-dom';
import {
  Brush,
  Download,
  FileImage,
  LayoutPanelTop,
  Sparkles,
  Wand2,
  CheckCircle,
  Zap,
  Shield,
  Globe,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useState } from 'react';

const features = [
  {
    icon: FileImage,
    title: 'Publication-Ready Output',
    description: 'Prepare architecture diagrams, flowcharts, and figures for journal and conference submissions.',
  },
  {
    icon: Wand2,
    title: 'Powerful Editing',
    description: 'Crop, resize, rotate, zoom, adjust brightness/contrast, and fine-tune backgrounds.',
  },
  {
    icon: LayoutPanelTop,
    title: 'Research Presets',
    description: 'IEEE, Springer, ACM, A4, and custom dimensions—optimized for every format.',
  },
  {
    icon: Download,
    title: 'High-Quality Export',
    description: 'PNG/JPG with custom filename and full resolution preservation.',
  },
];

const benefits = [
  { icon: Zap, text: 'No installation—edit in your browser instantly' },
  { icon: Shield, text: 'Your images stay private—no uploads to servers' },
  { icon: Globe, text: 'Works on any device—laptop, tablet, or mobile' },
  { icon: CheckCircle, text: 'Free and open—no subscriptions or hidden fees' },
];

const testimonials = [
  {
    name: "Dr. Emily Chen",
    title: "Computer Science Researcher",
    text: "Research Figure Studio saved me hours of work. I can now optimize diagrams in seconds without reopening Lucidchart.",
    avatar: "👩‍🔬",
  },
  {
    name: "Prof. James Wilson",
    title: "IEEE Conference Committee",
    text: "My students use it to meet strict figure requirements. It's intuitive and produces publication-quality output every time.",
    avatar: "👨‍🏫",
  },
  {
    name: "Alex Kumar",
    title: "PhD Student, Biomedical Engineering",
    text: "Finally, a tool that understands academic publishing constraints. The preset dimensions are exactly what we need.",
    avatar: "👨‍💼",
  },
];

const faqs = [
  {
    q: 'What file types does Research Figure Studio support?',
    a: 'PNG, JPG, and JPEG formats. Recommended minimum resolution is 300 DPI for publication-quality figures.',
  },
  {
    q: 'Is my image data stored on your servers?',
    a: 'No. All image processing happens in your browser. Your images never leave your device—complete privacy guaranteed.',
  },
  {
    q: 'Can I use presets from multiple journals simultaneously?',
    a: 'Yes! Switch presets instantly while editing and compare outputs. Perfect for submitting to multiple venues.',
  },
  {
    q: 'Does it work offline?',
    a: 'Yes, you can use Research Figure Studio offline after the initial load. All processing is client-side.',
  },
  {
    q: 'Can I undo and redo unlimited times?',
    a: 'Up to 20 edits in the history stack. Perfect for iterative refinement without cluttering your workflow.',
  },
  {
    q: 'What about keyboard shortcuts?',
    a: 'Ctrl+Z (Cmd+Z on Mac) for undo, Ctrl+Y for redo, and more shortcuts available in the editor.',
  },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-slate-200 py-4 dark:border-slate-800">
      <button
        type="button"
        className="flex w-full items-center justify-between text-left"
        onClick={() => setOpen((p) => !p)}
      >
        <p className="font-semibold text-slate-900 dark:text-slate-100">{q}</p>
        {open ? (
          <ChevronUp className="flex-shrink-0 text-brand-600" />
        ) : (
          <ChevronDown className="flex-shrink-0 text-slate-400" />
        )}
      </button>
      {open && <p className="mt-3 text-sm text-slate-600 dark:text-slate-300">{a}</p>}
    </div>
  );
}

function LandingPage() {
  return (
    <div>
      {/* Hero Section */}
      <section className="container-page py-20 sm:py-24">
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-brand-700 dark:border-brand-700/30 dark:bg-brand-500/10 dark:text-brand-200">
              <Sparkles size={14} /> Optimize research figures instantly
            </p>
            <h1 className="mt-6 text-5xl font-bold leading-tight sm:text-6xl">
              Research Figure Studio
            </h1>
            <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
              Resize, crop, and optimize your research diagrams for any academic publication format. 
              No design experience needed. No installation required.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/editor" className="btn-primary">
                Start Editing Free
              </Link>
              <a href="#how-it-works" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="card">
            <div className="rounded-xl border border-dashed border-slate-300 p-8 dark:border-slate-700">
              <div className="grid gap-6 sm:grid-cols-2">
                <div className="rounded-lg bg-brand-50 p-4 dark:bg-brand-900/20">
                  <Brush className="mb-2 text-brand-600" size={24} />
                  <p className="text-sm font-semibold">Real-time Canvas</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-4 dark:bg-brand-900/20">
                  <LayoutPanelTop className="mb-2 text-brand-600" size={24} />
                  <p className="text-sm font-semibold">5 Paper Presets</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-4 dark:bg-brand-900/20">
                  <Download className="mb-2 text-brand-600" size={24} />
                  <p className="text-sm font-semibold">PNG & JPG Export</p>
                </div>
                <div className="rounded-lg bg-brand-50 p-4 dark:bg-brand-900/20">
                  <FileImage className="mb-2 text-brand-600" size={24} />
                  <p className="text-sm font-semibold">Image History</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="container-page">
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">The Problem</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                You've created a diagram in Draw.io, Figma, or Lucidchart. Perfect. But now it needs to fit an 
                IEEE double-column format, have specific margins, a transparent background, and adjusted contrast 
                for print. You'd have to reopen the original tool and make all these small tweaks again—wasting hours.
              </p>
            </div>
            <div>
              <h2 className="text-2xl font-bold">The Solution</h2>
              <p className="mt-3 text-slate-600 dark:text-slate-300">
                Upload your figure once. Research Figure Studio handles all publication optimization instantly: 
                resizing, cropping, background adjustment, brightness/contrast, and preset dimensions. Export 
                high-quality PNG or JPG in seconds. No reopening the original tool.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container-page py-16">
        <h2 className="text-3xl font-bold">Powerful Features for Researchers</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map(({ icon: Icon, title, description }) => (
            <article key={title} className="card">
              <Icon className="text-brand-600" size={28} />
              <h3 className="mt-3 font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Benefits */}
      <section className="border-t border-slate-200 py-12 dark:border-slate-800">
        <div className="container-page">
          <h2 className="text-2xl font-bold">Why Researchers Love Us</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {benefits.map(({ icon: Icon, text }) => (
              <div key={text} className="flex gap-4">
                <Icon className="mt-1 flex-shrink-0 text-brand-600" size={20} />
                <p className="text-slate-700 dark:text-slate-200">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="container-page">
          <h2 className="text-3xl font-bold">How It Works</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              { step: '1', title: 'Upload', desc: 'Drag and drop or select your research figure.' },
              { step: '2', title: 'Edit', desc: 'Adjust size, crop, rotate, change background, apply filters.' },
              { step: '3', title: 'Export', desc: 'Download publication-ready PNG or JPG instantly.' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="card">
                <p className="text-3xl font-bold text-brand-600">{step}</p>
                <p className="mt-2 font-semibold">{title}</p>
                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="container-page py-16">
        <h2 className="text-3xl font-bold">Loved by Researchers & Students</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {testimonials.map(({ name, title, text, avatar }) => (
            <div key={name} className="card">
              <p className="text-4xl">{avatar}</p>
              <p className="mt-3 text-sm italic text-slate-600 dark:text-slate-300">"{text}"</p>
              <p className="mt-4 font-semibold">{name}</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">{title}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-slate-200 bg-slate-50 py-16 dark:border-slate-800 dark:bg-slate-900/50">
        <div className="container-page max-w-2xl">
          <h2 className="text-3xl font-bold">Frequently Asked Questions</h2>
          <div className="mt-8 rounded-2xl border border-slate-200 p-6 dark:border-slate-800">
            {faqs.map(({ q, a }) => (
              <FAQItem key={q} q={q} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16">
        <div className="rounded-2xl bg-gradient-to-r from-brand-500 to-brand-600 p-12 text-center text-white">
          <h2 className="text-3xl font-bold">Ready to Optimize Your Figures?</h2>
          <p className="mt-3 text-lg opacity-90">
            Start editing for free. No sign-up. No credit card. No limits.
          </p>
          <Link to="/editor" className="btn-primary mt-8 bg-white text-brand-600 hover:bg-slate-100">
            Start Now
          </Link>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;

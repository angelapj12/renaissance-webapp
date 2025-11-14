import React, { useState } from 'react';
import {
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Users,
  Zap,
  Heart,
  Rocket,
  Check,
  Play,
  Music,
  Palette,
  Mic2,
  Dumbbell,
} from 'lucide-react';

const InstructorLanding = () => {
  const [section, setSection] = useState(0);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const sections = [
    {
      id: 'hook',
      title: "You're Not Like Other Teachers",
      subtitle: "Teaching has changed. Instructors haven't.",
      description:
        "You're passionate, innovative, and driven by something deeper than a paycheck. You want to build your brand. You want to impact lives. You want autonomy.",
    },
    {
      id: 'problem',
      title: "Here's What's Broken",
      subtitle: "Traditional teaching doesn't work for you.",
      points: [
        { icon: '🔒', label: 'No Ownership', desc: "You're told what to teach, how to teach it." },
        { icon: '👤', label: 'Invisible', desc: "Your students don't know your name. Your brand doesn't grow." },
        { icon: '💼', label: 'Just a Job', desc: 'No entrepreneurial upside. No real growth.' },
        { icon: '🎯', label: 'Isolated', desc: 'Teaching alone. No community, no collaboration.' },
      ],
    },
    {
      id: 'vision',
      title: 'What If Teaching Was Different?',
      subtitle: 'What if there was another way?',
      description: 'Imagine teaching where you have:',
      features: [
        { emoji: '⭐', text: 'Full creative control over your classes' },
        { emoji: '📈', text: 'Your brand amplified and promoted' },
        { emoji: '💪', text: 'Real ownership and entrepreneurial upside' },
        { emoji: '🤝', text: 'A thriving community of innovators like you' },
      ],
    },
    {
      id: 'difference',
      title: "We're Not Like Other Platforms",
      subtitle: 'Here\'s what makes Renaissance different.',
      pillars: [
        {
          icon: Sparkles,
          title: 'Your Brand = Your Business',
          desc: 'We amplify you. Marketing, promotion, brand building—all focused on making YOU the hero.',
        },
        {
          icon: Zap,
          title: 'Tech That Empowers',
          desc: 'Real-time student data, gamification, automation. We stay at the forefront of innovation.',
        },
        {
          icon: Users,
          title: 'Real Community',
          desc: 'Collaborate, learn, and grow with other passionate instructors. Partnership, not isolation.',
        },
        {
          icon: Rocket,
          title: 'Future-Ready',
          desc: 'First access to AI, metaverse, web3. Be ahead of the curve.',
        },
      ],
    },
    {
      id: 'promise',
      title: 'The Renaissance Instructor Promise',
      subtitle: "Here's exactly what you get.",
      offerings: [
        { icon: '📢', title: 'Brand & Marketing Support', desc: 'Consistent promotion of you and your classes.' },
        { icon: '⚙️', title: 'Tech & Operations', desc: 'All the tools you need. Zero admin burden.' },
        { icon: '👥', title: 'Community & Collaboration', desc: 'Events, mentorship, mutual growth.' },
        { icon: '📚', title: 'Professional Growth', desc: 'Training, development, thought leadership.' },
        { icon: '🔮', title: 'Innovation Access', desc: 'First to experiment with cutting-edge tech.' },
        { icon: '💰', title: 'Fair Revenue Sharing', desc: "You're rewarded for excellence and impact." },
      ],
    },
    {
      id: 'ideal',
      title: 'Does This Sound Like You?',
      subtitle: 'You might be perfect for Renaissance if...',
      checklist: [
        "You're charismatic and passionate about teaching",
        "You see teaching as an art form, not just a job",
        "You have a growth mindset and embrace innovation",
        "You're entrepreneurial and own your outcomes",
        'You care deeply about student transformation',
        'You want to build your personal brand',
      ],
    },
  ];

  const formQuestions = [
    { id: 'name', label: "What's your name?", type: 'text', placeholder: 'Your name' },
    { id: 'email', label: 'Email address', type: 'email', placeholder: 'you@example.com' },
    { id: 'phone', label: 'Phone number', type: 'tel', placeholder: '+852 XXXX XXXX' },
    { id: 'expertise', label: 'What do you teach?', type: 'text', placeholder: 'e.g., Contemporary Dance, UX Design' },
    { id: 'experience', label: 'Years of teaching experience', type: 'number', placeholder: 'e.g., 5' },
    { id: 'philosophy', label: "What's your teaching philosophy?", type: 'textarea', placeholder: "What makes your teaching unique?" },
    { id: 'portfolio', label: 'Portfolio or website (optional)', type: 'text', placeholder: 'https://...' },
    { id: 'social', label: 'Instagram or social (optional)', type: 'text', placeholder: '@yourhandle' },
  ];

  const handleNextSection = () => {
    if (section < sections.length - 1) {
      setSection(section + 1);
    } else {
      setSection(sections.length);
    }
  };

  const handlePrevSection = () => {
    if (section > 0) {
      setSection(section - 1);
    }
  };

  const handleFormInput = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleNextForm = () => {
    if (formStep < formQuestions.length - 1) {
      setFormStep(formStep + 1);
    } else {
      setSubmitted(true);
    }
  };

  const handlePrevForm = () => {
    if (formStep > 0) {
      setFormStep(formStep - 1);
    }
  };

  if (section === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden relative">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 right-10 w-72 h-72 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-10 left-10 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-rose-500/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">Renaissance</span>
            </div>
            <div className="text-sm text-slate-300">For Innovative Instructors</div>
          </div>
        </nav>

        <div className="relative z-10 pt-32 pb-20 px-6">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl md:text-7xl font-bold leading-tight mb-6">
                You're Not Like Other
                <br />
                <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">Teachers</span>
              </h1>
              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                Teaching has changed. The world has changed. But the system hasn't. You want autonomy, brand, impact—and you shouldn't have to choose.
              </p>
              <button
                onClick={handleNextSection}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-rose-500/50 transition transform hover:scale-105 font-semibold"
              >
                Discover Renaissance <ChevronRight size={20} />
              </button>
            </div>

            <div className="relative h-96 md:h-full min-h-96">
              <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-rose-500/30 bg-gradient-to-br from-slate-800 to-slate-900">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-slate-800 to-pink-500/20 animate-pulse" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-48 h-48">
                    <div className="absolute inset-0 flex items-center justify-center text-7xl animate-bounce">🎭</div>

                    <div
                      className="absolute w-12 h-12 bg-rose-500/30 rounded-full top-0 left-1/2 transform -translate-x-1/2 flex items-center justify-center animate-spin"
                      style={{ animationDuration: '8s' }}
                    >
                      <Music size={24} className="text-rose-300" />
                    </div>
                    <div
                      className="absolute w-12 h-12 bg-pink-500/30 rounded-full bottom-0 right-0 flex items-center justify-center animate-spin"
                      style={{ animationDuration: '6s', animationDirection: 'reverse' }}
                    >
                      <Palette size={24} className="text-pink-300" />
                    </div>
                    <div
                      className="absolute w-12 h-12 bg-purple-500/30 rounded-full top-1/2 right-0 flex items-center justify-center animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    >
                      <Mic2 size={24} className="text-purple-300" />
                    </div>
                    <div
                      className="absolute w-12 h-12 bg-blue-500/30 rounded-full bottom-1/4 left-0 flex items-center justify-center animate-bounce"
                      style={{ animationDelay: '0.6s' }}
                    >
                      <Dumbbell size={24} className="text-blue-300" />
                    </div>
                  </div>
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 rounded-full bg-rose-500/30 backdrop-blur-sm flex items-center justify-center hover:bg-rose-500/50 transition cursor-pointer group">
                    <Play size={48} className="fill-rose-400 text-rose-400 group-hover:scale-110 transition" />
                  </div>
                </div>
              </div>

              <p className="text-sm text-slate-400 mt-4 text-center">Asian instructors • Teaching with passion</p>
            </div>
          </div>
        </div>

        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </div>
    );
  }

  if (section < sections.length) {
    const current = sections[section];

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-40 -right-40 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          />
        </div>

        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-rose-500/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">Renaissance</span>
            </div>
            <div className="text-sm text-slate-400">Step {section + 1} of {sections.length}</div>
          </div>
        </nav>

        <div className="fixed top-20 left-0 right-0 z-40 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="w-full bg-slate-800/50 h-1 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-rose-500 to-pink-500 h-full transition-all duration-700"
                style={{ width: `${((section + 1) / sections.length) * 100}%` }}
              />
            </div>
          </div>
        </div>

        <div className="relative z-10 pt-40 pb-24 px-6">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-5xl font-bold mb-4">{current.title}</h2>
            <p className="text-xl text-rose-400 mb-12">{current.subtitle}</p>

            {section === 1 && (
              <div className="grid md:grid-cols-2 gap-8">
                {current.points.map((point, i) => (
                  <div
                    key={i}
                    className="p-8 rounded-xl bg-slate-800/50 border border-rose-500/10 hover:border-rose-500/30 transition hover:bg-slate-800/70"
                  >
                    <div className="text-5xl mb-4">{point.icon}</div>
                    <h3 className="text-2xl font-semibold mb-2">{point.label}</h3>
                    <p className="text-slate-400">{point.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {section === 2 && (
              <div className="max-w-3xl space-y-6">
                <p className="text-lg text-slate-300">{current.description}</p>
                {current.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex gap-6 items-start p-6 rounded-lg bg-slate-800/30 border border-rose-500/10 hover:border-rose-500/30 transition"
                  >
                    <span className="text-4xl flex-shrink-0">{feature.emoji}</span>
                    <p className="text-xl text-slate-200 pt-2">{feature.text}</p>
                  </div>
                ))}
              </div>
            )}

            {section === 3 && (
              <div className="grid md:grid-cols-2 gap-8">
                {current.pillars.map((pillar, i) => {
                  const Icon = pillar.icon;
                  return (
                    <div
                      key={i}
                      className="p-8 rounded-xl bg-slate-800/50 border border-rose-500/10 hover:border-rose-500/30 transition hover:bg-slate-800/70 hover:shadow-lg hover:shadow-rose-500/20"
                    >
                      <Icon className="text-rose-400 mb-4" size={40} />
                      <h3 className="text-2xl font-semibold mb-3">{pillar.title}</h3>
                      <p className="text-slate-400">{pillar.desc}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {section === 4 && (
              <div className="grid md:grid-cols-2 gap-6">
                {current.offerings.map((offer, i) => (
                  <div
                    key={i}
                    className="p-6 rounded-xl bg-slate-800/50 border border-rose-500/10 hover:border-rose-500/30 transition hover:bg-slate-800/70"
                  >
                    <div className="text-4xl mb-3">{offer.icon}</div>
                    <p className="font-semibold text-white mb-2">{offer.title}</p>
                    <p className="text-sm text-slate-400">{offer.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {section === 5 && (
              <div className="max-w-3xl">
                <div className="space-y-4 mb-12">
                  {current.checklist.map((item, i) => (
                    <div key={i} className="flex gap-4">
                      <Check className="text-rose-400 flex-shrink-0 mt-1" size={24} />
                      <p className="text-lg text-slate-300">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="p-6 bg-rose-500/10 border border-rose-500/30 rounded-lg">
                  <p className="text-slate-200">
                    <span className="text-rose-400 font-semibold">Ready?</span> If this resonates deeply, let's talk. Apply now and we'll answer any questions you have.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="fixed bottom-8 left-0 right-0 z-30">
          <div className="max-w-6xl mx-auto px-6 flex justify-between items-center gap-4">
            <button
              onClick={handlePrevSection}
              disabled={section === 0}
              className="flex items-center gap-2 px-6 py-3 border border-slate-600 rounded-lg hover:border-slate-400 hover:bg-slate-800 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
            >
              <ChevronLeft size={20} /> Previous
            </button>

            <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-700"
                style={{ width: `${((section + 1) / sections.length) * 100}%` }}
              />
            </div>

            <button
              onClick={handleNextSection}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-rose-500/50 transition font-semibold"
            >
              {section === sections.length - 1 ? 'Apply Now' : 'Next'} <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (section === sections.length && !submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-rose-500/20">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <div className="text-2xl font-bold tracking-tight">
              <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">Renaissance</span>
            </div>
            <div className="text-sm text-slate-400">Application • Step {formStep + 1} of {formQuestions.length}</div>
          </div>
        </nav>

        <div className="pt-40 pb-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div className="mb-8">
              <h2 className="text-4xl font-bold mb-2">Ready to Apply?</h2>
              <p className="text-slate-300">Tell us about yourself. We can't wait to meet you.</p>
            </div>

            <div className="mb-8">
              <div className="w-full bg-slate-800 h-1 rounded-full overflow-hidden mb-3">
                <div
                  className="bg-gradient-to-r from-rose-500 to-pink-500 h-full transition-all duration-300"
                  style={{ width: `${((formStep + 1) / formQuestions.length) * 100}%` }}
                />
              </div>
            </div>

            <div className="bg-slate-800/50 border border-rose-500/20 rounded-2xl p-8 mb-8">
              <label className="text-sm uppercase tracking-widest text-slate-400 block mb-4">
                {formQuestions[formStep].label}
              </label>

              {formQuestions[formStep].type === 'textarea' ? (
                <textarea
                  placeholder={formQuestions[formStep].placeholder}
                  rows="5"
                  value={formData[formQuestions[formStep].id] || ''}
                  onChange={(e) => handleFormInput(formQuestions[formStep].id, e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition resize-none"
                  autoFocus
                />
              ) : (
                <input
                  type={formQuestions[formStep].type}
                  placeholder={formQuestions[formStep].placeholder}
                  value={formData[formQuestions[formStep].id] || ''}
                  onChange={(e) => handleFormInput(formQuestions[formStep].id, e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition"
                  autoFocus
                />
              )}
            </div>

            <div className="flex gap-4">
              <button
                onClick={handlePrevForm}
                disabled={formStep === 0}
                className="flex-1 py-3 border border-slate-600 rounded-lg hover:bg-slate-800 transition font-semibold disabled:opacity-50"
              >
                Back
              </button>
              <button
                onClick={handleNextForm}
                className="flex-1 py-4 bg-gradient-to-r from-rose-500 to-pink-500 rounded-lg hover:shadow-lg hover:shadow-rose-500/50 transition font-semibold"
              >
                {formStep === formQuestions.length - 1 ? 'Submit Application' : 'Next'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden flex items-center justify-center">
      <div className="px-6 text-center max-w-2xl">
        <div className="inline-block p-6 bg-rose-500/20 rounded-full mb-8 animate-bounce">
          <Sparkles size={48} className="text-rose-400" />
        </div>

        <h1 className="text-5xl font-bold mb-4">Application Received!</h1>
        <p className="text-xl text-slate-300 mb-8">
          Thank you for applying to Renaissance. We're genuinely excited to learn more about you.
        </p>

        <div className="bg-slate-800/50 border border-rose-500/20 rounded-xl p-8 mb-8 text-left">
          <p className="font-semibold text-white mb-4">What happens next:</p>
          <ul className="space-y-3 text-slate-300">
            <li className="flex gap-3">
              <span className="text-rose-400 font-bold flex-shrink-0">1</span>
              <span>We review your application (3-5 days)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-rose-400 font-bold flex-shrink-0">2</span>
              <span>If you're a fit, we'll reach out for a screening call</span>
            </li>
            <li className="flex gap-3">
              <span className="text-rose-400 font-bold flex-shrink-0">3</span>
              <span>Selected instructors meet us for an on-site interview</span>
            </li>
            <li className="flex gap-3">
              <span className="text-rose-400 font-bold flex-shrink-0">4</span>
              <span>Approved instructors lead pilot classes and launch officially</span>
            </li>
          </ul>
        </div>

        <div className="bg-slate-800/30 border border-slate-700 rounded-lg p-6 mb-8">
          <p className="text-slate-300">
            In the meantime, <span className="text-rose-400 font-semibold">follow us on Instagram</span> and stay tuned. We're building something legendary.
          </p>
        </div>

        <button
          onClick={() => {
            setSection(0);
            setFormStep(0);
            setFormData({});
            setSubmitted(false);
          }}
          className="inline-block px-8 py-3 bg-rose-500/20 border border-rose-500/50 rounded-lg hover:bg-rose-500/30 transition font-semibold"
        >
          Back to Start
        </button>
      </div>
    </div>
  );
};

export default InstructorLanding;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const ApplicationForm = ({ onBack, onNext, currentStep = 1, totalSteps = 8 }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    experience: '',
    philosophy: '',
    portfolio: '',
    social: '',
  });

  const progress = (currentStep / totalSteps) * 100;

  const handleNext = () => {
    if (typeof onNext === 'function') {
      onNext();
    }
  };

  const handleSubmit = () => {
    // Handle form submission here
    // TODO: Send formData to your backend/API
    alert('Application submitted! Thank you for applying.');
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const isStepValid = () => {
    // Allow null/empty values to proceed for now
    return true;
  };

  const getStepContent = () => {
    switch (currentStep) {
      case 1:
        return {
          question: "WHAT'S YOUR NAME?",
          field: 'name',
          placeholder: 'Your name',
          value: formData.name,
        };
      case 2:
        return {
          question: 'EMAIL ADDRESS',
          field: 'email',
          placeholder: 'you@example.com',
          value: formData.email,
          inputType: 'email',
        };
      case 3:
        return {
          question: 'PHONE NUMBER',
          field: 'phone',
          placeholder: '+852 XXXX XXXX',
          value: formData.phone,
          inputType: 'tel',
        };
      case 4:
        return {
          question: 'WHAT DO YOU TEACH?',
          field: 'subject',
          placeholder: 'e.g., Piano, Yoga, Photography, Design...',
          value: formData.subject,
        };
      case 5:
        return {
          question: 'YEARS OF TEACHING EXPERIENCE',
          field: 'experience',
          placeholder: 'e.g., 5 years, 10+ years...',
          value: formData.experience,
          inputType: 'text',
        };
      case 6:
        return {
          question: "WHAT'S YOUR TEACHING PHILOSOPHY?",
          field: 'philosophy',
          placeholder: 'What makes your teaching unique?',
          value: formData.philosophy,
          inputType: 'textarea',
        };
      case 7:
        return {
          question: 'PORTFOLIO OR WEBSITE (OPTIONAL)',
          field: 'portfolio',
          placeholder: 'https://yourportfolio.com',
          value: formData.portfolio,
          inputType: 'url',
        };
      case 8:
        return {
          question: 'INSTAGRAM OR SOCIAL (OPTIONAL)',
          field: 'social',
          placeholder: '@yourusername or https://instagram.com/yourusername',
          value: formData.social,
          inputType: 'text',
        };
      default:
        return {
          question: "WHAT'S YOUR NAME?",
          field: 'name',
          placeholder: 'Your name',
          value: formData.name,
        };
    }
  };

  const stepContent = getStepContent();

  return (
    <section className="relative w-full overflow-hidden bg-[#0a0a0f] text-white h-screen-safe">
      <div className="relative z-20 flex h-full flex-col items-center justify-center px-6 py-12 sm:px-8">
        <div className="w-full max-w-2xl space-y-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-3 text-center"
          >
            <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl md:text-6xl">
              Ready to Apply?
            </h1>
            <p className="text-base text-white/70 sm:text-lg">
              Tell us about yourself. We can't wait to meet you.
            </p>
          </motion.div>

          {/* Progress Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="w-full"
          >
            <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-gradient-to-r from-pink-500 to-rose-500"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
            </div>
          </motion.div>

          {/* Form Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <label className="block text-center text-sm font-medium text-white/60 sm:text-base">
              {stepContent.question}
            </label>
            {stepContent.inputType === 'textarea' ? (
              <textarea
                value={stepContent.value}
                onChange={(e) => handleInputChange(stepContent.field, e.target.value)}
                placeholder={stepContent.placeholder}
                rows={6}
                className="w-full rounded-lg border border-white/20 bg-[#1a1a24] px-4 py-3 text-white placeholder:text-white/40 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20 resize-none"
              />
            ) : (
              <input
                type={stepContent.inputType || 'text'}
                value={stepContent.value}
                onChange={(e) => handleInputChange(stepContent.field, e.target.value)}
                placeholder={stepContent.placeholder}
                className="w-full rounded-lg border border-white/20 bg-[#1a1a24] px-4 py-3 text-white placeholder:text-white/40 focus:border-pink-500/50 focus:outline-none focus:ring-2 focus:ring-pink-500/20"
              />
            )}
          </motion.div>

          {/* Navigation Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex items-center justify-between gap-4"
          >
            <button
              type="button"
              onClick={onBack}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 px-6 py-3 text-sm font-medium text-white transition hover:bg-white/15 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <ArrowLeft className="size-4" />
              Back
            </button>
            {currentStep === totalSteps ? (
              <button
                type="button"
                onClick={handleSubmit}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-8 py-3 text-sm font-semibold text-white transition hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50"
              >
                Submit Application
              </button>
            ) : (
              <button
                type="button"
                onClick={handleNext}
                disabled={!isStepValid()}
                className="inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-red-500 to-pink-500 px-8 py-3 text-sm font-semibold text-white transition hover:from-red-600 hover:to-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
              </button>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ApplicationForm;


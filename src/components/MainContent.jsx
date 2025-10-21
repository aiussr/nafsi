import React from 'react';

/**
 * Main content area containing all course sections
 * Responsive: full width on mobile, left margin for sidebar on desktop
 */
export const MainContent = () => {
  return (
    <main className="w-full lg:ml-80">
      <div className="max-w-3xl mx-auto py-12 px-6 sm:py-16 sm:px-10 lg:py-20 lg:px-16">

        {/* Introduction - with sub-chapters */}
        <section id="intro-welcome" className="min-h-screen mb-20 sm:mb-24 lg:mb-32">
          <div className="border-l pl-4 sm:pl-6 lg:pl-8 mb-8 sm:mb-10 lg:mb-12" style={{
            borderLeftWidth: '2px',
            borderLeftColor: '#1a1a1a',
            borderLeftStyle: 'solid'
          }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-3 sm:mb-4" style={{ color: '#1a1a1a' }}>
              Welcome
            </h2>
            <p className="text-xs sm:text-sm font-light" style={{ color: '#999' }}>
              Introduction · Part One
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed font-light" style={{ color: '#333' }}>
            <p>
              Welcome to this exploration. What follows is not merely a collection of information,
              but a carefully structured journey through interconnected concepts that build upon
              one another in deliberate sequence.
            </p>
            <p>
              Each section reveals layers of understanding, inviting you to move beyond surface
              comprehension toward genuine insight. The path ahead requires patience and attention,
              but rewards both with clarity.
            </p>
          </div>
        </section>

        <section id="intro-context" className="min-h-screen mb-20 sm:mb-24 lg:mb-32">
          <div className="border-l pl-4 sm:pl-6 lg:pl-8 mb-8 sm:mb-10 lg:mb-12" style={{
            borderLeftWidth: '2px',
            borderLeftColor: '#1a1a1a'
          }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-3 sm:mb-4" style={{ color: '#1a1a1a' }}>
              Setting Context
            </h2>
            <p className="text-xs sm:text-sm font-light" style={{ color: '#999' }}>
              Introduction · Part Two
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed font-light" style={{ color: '#333' }}>
            <p>
              Before advancing into methodology, we must establish shared understanding of the
              terrain. Context provides the frame through which all subsequent information gains meaning.
            </p>
            <div className="h-px my-6 sm:my-8" style={{
              background: 'linear-gradient(to right, transparent, #1a1a1a, transparent)'
            }} />
            <p>
              Without proper context, even accurate information can mislead. With it, patterns
              emerge that isolated facts cannot reveal.
            </p>
          </div>
        </section>

        <section id="intro-framework" className="min-h-screen mb-20 sm:mb-24 lg:mb-32">
          <div className="border-l pl-4 sm:pl-6 lg:pl-8 mb-8 sm:mb-10 lg:mb-12" style={{
            borderLeftWidth: '2px',
            borderLeftColor: '#1a1a1a'
          }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-3 sm:mb-4" style={{ color: '#1a1a1a' }}>
              Framework
            </h2>
            <p className="text-xs sm:text-sm font-light" style={{ color: '#999' }}>
              Introduction · Part Three
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed font-light" style={{ color: '#333' }}>
            <p>
              Every inquiry operates within some framework, whether acknowledged or not. Making
              our framework explicit allows us to examine its assumptions, test its boundaries,
              and refine its structure.
            </p>
            <p className="text-xs sm:text-sm" style={{ color: '#666' }}>
              This framework establishes the foundation. What comes next will build systematically
              upon these principles.
            </p>
          </div>
        </section>

        {/* Foundations */}
        <section id="foundations" className="min-h-screen mb-20 sm:mb-24 lg:mb-32">
          <div className="border-l pl-4 sm:pl-6 lg:pl-8 mb-8 sm:mb-10 lg:mb-12" style={{
            borderLeftWidth: '2px',
            borderLeftColor: '#1a1a1a'
          }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-3 sm:mb-4" style={{ color: '#1a1a1a' }}>
              Foundations
            </h2>
            <p className="text-xs sm:text-sm font-light" style={{ color: '#999' }}>
              Core principles
            </p>
          </div>

          <div className="space-y-6 sm:space-y-8">
            <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed font-light" style={{ color: '#333' }}>
              <p>
                Every discipline rests upon fundamental principles. These are not arbitrary starting points,
                but necessary truths discovered through rigorous inquiry and tested across contexts.
              </p>
            </div>
          </div>
        </section>

        {/* Practice */}
        <section id="practice" className="min-h-screen mb-20 sm:mb-24 lg:mb-32">
          <div className="border-l pl-4 sm:pl-6 lg:pl-8 mb-8 sm:mb-10 lg:mb-12" style={{
            borderLeftWidth: '2px',
            borderLeftColor: '#1a1a1a'
          }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-3 sm:mb-4" style={{ color: '#1a1a1a' }}>
              Practice
            </h2>
            <p className="text-xs sm:text-sm font-light" style={{ color: '#999' }}>
              Applied learning
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed font-light" style={{ color: '#333' }}>
            <p>
              Theory becomes meaningful through application. Here we translate abstract principles
              into concrete methods, testing understanding against actual challenges.
            </p>
          </div>
        </section>

        {/* Mastery - with sub-chapters */}
        <section id="mastery-complexity" className="min-h-screen mb-20 sm:mb-24 lg:mb-32">
          <div className="border-l pl-4 sm:pl-6 lg:pl-8 mb-8 sm:mb-10 lg:mb-12" style={{
            borderLeftWidth: '2px',
            borderLeftColor: '#1a1a1a'
          }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-3 sm:mb-4" style={{ color: '#1a1a1a' }}>
              Complexity
            </h2>
            <p className="text-xs sm:text-sm font-light" style={{ color: '#999' }}>
              Mastery · Part One
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed font-light" style={{ color: '#333' }}>
            <p>
              Mastery emerges not from accumulation but from integration. The advanced practitioner
              sees connections invisible to beginners, recognizes patterns across domains.
            </p>
            <p>
              Complexity is not avoided but embraced. Where others see confusion, the master
              sees structure waiting to be revealed.
            </p>
          </div>
        </section>

        <section id="mastery-integration" className="min-h-screen mb-20 sm:mb-24 lg:mb-32">
          <div className="border-l pl-4 sm:pl-6 lg:pl-8 mb-8 sm:mb-10 lg:mb-12" style={{
            borderLeftWidth: '2px',
            borderLeftColor: '#1a1a1a'
          }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-3 sm:mb-4" style={{ color: '#1a1a1a' }}>
              Integration
            </h2>
            <p className="text-xs sm:text-sm font-light" style={{ color: '#999' }}>
              Mastery · Part Two
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed font-light" style={{ color: '#333' }}>
            <p>
              Advanced understanding recognizes when rules apply and when they don't, when
              principles hold and when they fail, when methods work and when they mislead.
            </p>
            <p>
              This metacognitive awareness—knowing what you know and how you know it—distinguishes
              competence from expertise.
            </p>
          </div>
        </section>

        {/* Synthesis - with sub-chapters */}
        <section id="synthesis-convergence" className="min-h-screen mb-20 sm:mb-24 lg:mb-32">
          <div className="border-l pl-4 sm:pl-6 lg:pl-8 mb-8 sm:mb-10 lg:mb-12" style={{
            borderLeftWidth: '2px',
            borderLeftColor: '#1a1a1a'
          }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-3 sm:mb-4" style={{ color: '#1a1a1a' }}>
              Convergence
            </h2>
            <p className="text-xs sm:text-sm font-light" style={{ color: '#999' }}>
              Synthesis · Part One
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed font-light" style={{ color: '#333' }}>
            <p>
              We return now to where we began, but with transformed perspective. The journey
              through foundations, practice, and mastery has equipped you to see the whole
              differently than its parts.
            </p>
            <p>
              Synthesis means recognizing how disparate elements form coherent systems, how
              separate principles reinforce one another.
            </p>
          </div>
        </section>

        <section id="synthesis-application" className="min-h-screen mb-20 sm:mb-24 lg:mb-32">
          <div className="border-l pl-4 sm:pl-6 lg:pl-8 mb-8 sm:mb-10 lg:mb-12" style={{
            borderLeftWidth: '2px',
            borderLeftColor: '#1a1a1a'
          }}>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-light tracking-tight mb-3 sm:mb-4" style={{ color: '#1a1a1a' }}>
              Application
            </h2>
            <p className="text-xs sm:text-sm font-light" style={{ color: '#999' }}>
              Synthesis · Part Two
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6 text-sm sm:text-base leading-relaxed font-light" style={{ color: '#333' }}>
            <p>
              This understanding completes the circle. What you know now changes how you engage
              with new material, how you approach unfamiliar problems.
            </p>
            <p>
              The end of this course marks the beginning of independent practice. Take what serves
              you, question what doesn't, build what comes next.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
};

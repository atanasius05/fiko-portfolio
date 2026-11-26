import ScrollStack, { ScrollStackItem } from "./ScrollStack";
import CircularText from "./CircularText";
import type { CSSProperties } from "react";

import { projects } from "./projectData";
import "./ProjectStackFolder.css";

/**
 * Setiap proyek menjadi satu folder berwarna dan seluruh folder ditumpuk
 * dengan animasi ScrollStack saat halaman digulir.
 */
export default function ProjectStackFolder() {
  return (
    <section className="project-stack-section relative z-10 w-full px-4 py-20 sm:px-8 lg:py-28">
      <div className="project-stack-section__intro mx-auto mb-12 max-w-3xl text-center">
        <p
          className="mb-3 inline-block text-3xl text-neutral-700 sm:text-4xl"
          style={{ fontFamily: '"Gochi Hand", cursive', transform: "rotate(-2deg)" }}
        >
          pick a project file
        </p>
        <h2
          className="text-[clamp(2.25rem,7vw,4.5rem)] font-black leading-none tracking-tight text-neutral-950"
          style={{ fontFamily: '"Inter Tight", sans-serif' }}
        >
          Work, in layers.
        </h2>
        <p
          className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-neutral-500 sm:text-lg"
          style={{ fontFamily: '"Inter Tight", sans-serif' }}
        >
          Scroll through the project files. Each folder brings one selected work to the front.
        </p>
      </div>

      <ScrollStack
        className="project-stack-scroll mx-auto max-w-[1440px]"
        useWindowScroll
        itemDistance={200}
        itemStackDistance={15}
        stackPosition="12%"
        itemScale={0.04}
        baseScale={1}
        dimAmount={0}
        holdDistance={240}
      >
        {projects.map((project, index) => {
          const projectStyle = {
            "--project-color": project.color,
            "--project-ink": project.ink,
            "--tab-index": index,
            "--tab-count": projects.length,
          } as CSSProperties;
          const projectNumber = String(index + 1).padStart(2, "0");

          return (
            <ScrollStackItem
              key={project.title}
              itemClassName="project-stack__panel project-stack__card"
              style={projectStyle}
            >
              {/* Layer dekoratif lingkaran di-clip ke batas kartu (overflow:hidden),
                  sehingga tidak bocor keluar halaman. Tab folder tetap bisa
                  menonjol ke atas karena berada di luar wrapper ini. */}
              <div className="project-stack__bg" aria-hidden="true" />

              <div
                className="project-stack__folder-tab"
                aria-hidden="true"
                style={{ "--tab-index": index, "--tab-count": projects.length } as CSSProperties}
              >
                <span>{projectNumber}</span>
                <span>{project.title}</span>
              </div>

              <div role="group" aria-label={`${projectNumber} ${project.title}`}>
                <header className="project-stack__header">
                  <div>
                    <p className="project-stack__eyebrow">
                      {project.date} <span>·</span> {project.category}
                    </p>
                    <h3 className="project-stack__title">
                      <span>{projectNumber}</span>
                      {project.title}
                    </h3>
                  </div>
                  <div className="project-stack__tags" aria-label="Project tags">
                    {project.tags.map((tag) => (
                      <span className="project-stack__tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </header>

                <div className="project-stack__stage">
                  <aside className="project-stack__note project-stack__note--left">
                    <span className="project-stack__note-kicker">01 / THE FOCUS</span>
                    <strong>Made around people.</strong>
                    <p>Clear steps, thoughtful details, and less friction from the first interaction.</p>
                  </aside>

                  {/* <div
                    className="project-stack__mockup"
                    aria-label={`${project.title} interface preview`}
                  >
                    <div className="project-stack__mockup-bar">
                      <span className="project-stack__mockup-dots"><i /><i /><i /></span>
                      <span>{project.category.toUpperCase()}</span>
                      <span className="project-stack__mockup-status">LIVE PREVIEW</span>
                    </div>
                    <div className="project-stack__mockup-body">
                      <div className="project-stack__mockup-sidebar">
                        <span className="project-stack__mockup-logo" />
                        <i /><i /><i /><i />
                      </div>
                      <div className="project-stack__mockup-content">
                        <div className="project-stack__mockup-topline">
                          <span />
                          <span />
                        </div>
                        <div className="project-stack__mockup-heading">
                          <span />
                          <span />
                          <span />
                        </div>
                        <div className="project-stack__mockup-cards">
                          <div><span /><b /><i /></div>
                          <div><span /><b /><i /></div>
                          <div><span /><b /><i /></div>
                        </div>
                        <div className="project-stack__mockup-chart">
                          <div className="project-stack__chart-labels"><i /><i /><i /></div>
                          <div className="project-stack__chart-bars">
                            {[42, 68, 51, 83, 60, 92, 72].map((height, barIndex) => (
                              <i key={barIndex} style={{ height: `${height}%` }} />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}

                  <aside className="project-stack__note project-stack__note--right">
                    <span className="project-stack__note-kicker">02 / THE APPROACH</span>
                    <strong>Useful by design.</strong>
                    <p>{project.description} — shaped into a coherent, easy-to-use experience.</p>
                  </aside>
                </div>

                <footer className="project-stack__footer">
                  <p>{project.summary}</p>
                  <div className="project-stack__stamp" aria-hidden="true">
                    <CircularText
                      text="WEB VIEW · WEB VIEW · "
                      spinDuration={20}
                      size={80}
                      fontSize={11}
                      fontWeight={900}
                      color="var(--project-ink)"
                    >
                      <span className="project-stack__stamp-arrow">↗</span>
                    </CircularText>
                  </div>
                </footer>
              </div>
            </ScrollStackItem>
          );
        })}
      </ScrollStack>
    </section>
  );
}

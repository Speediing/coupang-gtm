import type { SlideCard } from "@/data/types";

export function HeardSlide({
  slides,
  size = "lg",
}: {
  slides: SlideCard[];
  size?: "sm" | "lg";
  wash?: string;
}) {
  return (
    <div className={`leave leave-heard size-${size}`}>
      <article className="heard-slide">
        <header className="heard-bar">
          <span>Illustrative output</span>
          <span>Working brief · draft</span>
        </header>
        <div className="heard-main">
          <h3>Launch checks and owners</h3>
          <ol>
            {slides.map((slide) => (
              <li key={`${slide.n}-${slide.title}`}>
                <p className="heard-tag">{slide.kicker}</p>
                <h4>{slide.title}</h4>
                <p className="heard-quote">{slide.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </article>
    </div>
  );
}

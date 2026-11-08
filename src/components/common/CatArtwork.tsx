import { CatHead } from "./CatHead";
export function CatArtwork({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 280 310"
      fill="none"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <g
        className="cat-tail"
        stroke="var(--stripe)"
        strokeWidth="22"
        strokeLinecap="round"
      >
        <path d="M192 263C256 272 274 231 245 219" />
      </g>
      <g className="cat-body">
        <path
          d="M86 177Q65 203 65 263Q78 293 140 290Q207 294 215 260Q213 199 190 176Z"
          fill="var(--fur)"
        />
        <path
          d="M115 180Q93 228 116 273L140 289L163 269Q186 224 162 180"
          fill="var(--light-fur)"
        />
        <path
          d="M87 244Q67 269 78 283Q92 294 113 282L116 263M166 264L170 283Q200 295 204 275L195 245"
          fill="var(--light-fur)"
          stroke="var(--stripe)"
          strokeWidth="2"
        />
        <path
          d="M86 209L102 216M78 230L97 235M188 211L201 206M186 232L204 226"
          stroke="var(--stripe)"
          strokeWidth="6"
          strokeLinecap="round"
        />
      </g>
      <CatHead />
      <g
        className="cat-pearls"
        fill="var(--pearl)"
        stroke="var(--light-fur)"
        strokeWidth="1.5"
      >
        {[
          [88, 195],
          [95, 208],
          [106, 220],
          [122, 227],
          [140, 230],
          [158, 227],
          [174, 220],
          [185, 208],
          [192, 195],
        ].map(([cx, cy]) => (
          <circle key={cx} cx={cx} cy={cy} r="7.5" />
        ))}
        <path
          d="M140 235L145 243L140 252L135 243Z"
          fill="var(--cat-charm)"
          stroke="var(--foreground)"
        />
      </g>
    </svg>
  );
}

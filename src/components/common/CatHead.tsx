export function CatHead() {
  return (
    <g className="cat-head">
      <g className="cat-ear-left">
        <path
          d="M59 102Q38 62 52 20Q89 22 114 63Z"
          fill="var(--fur)"
          stroke="var(--stripe)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M62 75L61 38L93 62" fill="var(--cat-nose)" />
        <path
          d="M49 39L56 45L49 51M48 59L56 65"
          stroke="var(--light-fur)"
          strokeWidth="3"
        />
      </g>
      <g className="cat-ear-right">
        <path
          d="M169 62Q197 23 233 20Q245 59 221 103Z"
          fill="var(--fur)"
          stroke="var(--stripe)"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M192 63L223 38L222 78" fill="var(--cat-nose)" />
      </g>
      <path
        d="M53 101Q72 56 140 55Q211 56 228 103L240 119L231 125L245 143L231 149L237 164L218 169Q206 204 140 210Q75 204 61 173L43 165L50 150L35 141L48 126L39 118Z"
        fill="var(--fur)"
        stroke="var(--stripe)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path
        d="M113 61L125 90L133 63M148 61L154 89L169 64M57 112L80 119M51 136L73 139M207 119L227 110M211 140L234 134"
        stroke="var(--stripe)"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M73 154Q90 138 113 153L140 161L165 151Q194 140 211 157Q212 191 141 201Q78 193 73 154"
        fill="var(--light-fur)"
      />
      <g
        className="cat-eye"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
      >
        <ellipse
          cx="95"
          cy="125"
          rx="23"
          ry="25"
          fill="var(--cat-eye)"
          stroke="var(--cat-pupil)"
          strokeWidth="4"
        />
        <ellipse
          cx="185"
          cy="125"
          rx="23"
          ry="25"
          fill="var(--cat-eye)"
          stroke="var(--cat-pupil)"
          strokeWidth="4"
        />
        <ellipse cx="97" cy="123" rx="15" ry="20" fill="var(--cat-pupil)" />
        <ellipse cx="183" cy="123" rx="15" ry="20" fill="var(--cat-pupil)" />
        <circle cx="89" cy="116" r="5" fill="var(--pearl)" />
        <circle cx="175" cy="116" r="5" fill="var(--pearl)" />
      </g>
      <ellipse cx="125" cy="165" rx="22" ry="16" fill="var(--cat-muzzle)" />
      <ellipse cx="155" cy="165" rx="22" ry="16" fill="var(--cat-muzzle)" />
      <path
        d="M129 153Q140 148 151 153L140 164Z"
        fill="var(--cat-nose)"
        stroke="var(--stripe)"
        strokeWidth="2"
      />
      <path
        d="M140 164V170M140 170Q130 179 123 171M140 170Q150 179 157 171"
        stroke="var(--cat-pupil)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M105 162L34 150M104 170L24 173M106 177L40 192M175 162L247 150M176 170L256 173M174 177L241 192"
        stroke="var(--cat-muzzle)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </g>
  );
}

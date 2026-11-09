import { useId } from "react";
import type { ArticleLanguage } from "../types/article";
export function QueueDiagram({ language }: { language: ArticleLanguage }) {
  const id = language === "id";
  const uid = useId();
  const title = id
    ? "Alur background job BullMQ"
    : "BullMQ background job flow";
  const description = id
    ? "API server mengirim job ke Queue di Redis. Worker mengambil dan memproses job, lalu menuju Completed atau Failed. Job gagal kembali ke Queue selama masih ada attempts, dengan backoff."
    : "The API server sends jobs to the Queue inside Redis. The Worker processes jobs into Completed or Failed. Failed jobs return to the Queue with backoff while attempts remain.";
  return (
    <figure className="article-queue-diagram" aria-label={title}>
      <div
        className="queue-diagram-viewport"
        tabIndex={0}
        role="region"
        aria-label={
          id
            ? "Bagan antrean; geser untuk melihat seluruh alur"
            : "Queue diagram; scroll to see the full flow"
        }
      >
        <svg
          viewBox="0 0 780 380"
          role="img"
          aria-labelledby={`${uid}-title ${uid}-description`}
        >
          <title id={`${uid}-title`}>{title}</title>
          <desc id={`${uid}-description`}>{description}</desc>
          <defs>
            <marker
              id={`${uid}-arrow`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 1 L 9 5 L 1 9"
                fill="none"
                stroke="var(--queue-line)"
                strokeWidth="1.3"
              />
            </marker>
            <marker
              id={`${uid}-retry`}
              viewBox="0 0 10 10"
              refX="9"
              refY="5"
              markerWidth="7"
              markerHeight="7"
              orient="auto-start-reverse"
            >
              <path
                d="M 1 1 L 9 5 L 1 9"
                fill="none"
                stroke="var(--queue-retry)"
                strokeWidth="1.3"
              />
            </marker>
          </defs>
          <rect
            className="queue-redis-boundary"
            x="270"
            y="32"
            width="238"
            height="156"
            rx="16"
          />
          <text x="289" y="54" className="queue-diagram-label">
            Redis
          </text>
          <g className="queue-connectors" markerEnd={`url(#${uid}-arrow)`}>
            <path data-connection="producer-to-queue" d="M 200 114 H 304" />
            <path data-connection="queue-to-worker" d="M 474 114 H 554" />
            <path
              data-connection="worker-to-completed"
              d="M 604 150 L 544 220"
            />
            <path data-connection="worker-to-failed" d="M 676 150 L 689 220" />
          </g>
          <path
            className="queue-retry-path"
            data-connection="failed-to-queue"
            d="M 687 278 V 318 H 390 V 152"
            markerEnd={`url(#${uid}-retry)`}
          />
          <g className="queue-diagram-node queue-producer">
            <rect x="32" y="80" width="168" height="67" rx="10" />
            <text x="116" y="108">
              API server
            </text>
            <text x="116" y="130" className="queue-node-subtitle">
              Producer
            </text>
          </g>
          <g className="queue-diagram-node queue-waiting">
            <rect x="306" y="80" width="168" height="67" rx="10" />
            <text x="390" y="108">
              Queue
            </text>
            <text x="390" y="130" className="queue-node-subtitle">
              {id ? "Job menunggu" : "Waiting jobs"}
            </text>
          </g>
          <g className="queue-diagram-node queue-worker">
            <rect x="556" y="80" width="168" height="67" rx="10" />
            <text x="640" y="108">
              Worker
            </text>
            <text x="640" y="130" className="queue-node-subtitle">
              {id ? "Proses job" : "Process jobs"}
            </text>
          </g>
          <g className="queue-diagram-node queue-completed">
            <rect x="485" y="223" width="119" height="53" rx="10" />
            <text x="544.5" y="255">
              Completed
            </text>
          </g>
          <g className="queue-diagram-node queue-failed">
            <rect x="628" y="223" width="119" height="53" rx="10" />
            <text x="687.5" y="255">
              Failed
            </text>
          </g>
          <text
            x="538"
            y="344"
            className="queue-diagram-label queue-retry-caption"
          >
            {id
              ? "Retry sampai attempts habis"
              : "Retry until attempts are exhausted"}
          </text>
        </svg>
      </div>
      <figcaption>
        {id
          ? "Job gagal kembali ke antrean sesuai backoff, selama batas attempts belum habis."
          : "Failed jobs return to the queue with backoff until the attempts limit is reached."}
      </figcaption>
    </figure>
  );
}

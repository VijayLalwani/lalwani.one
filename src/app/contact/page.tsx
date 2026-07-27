"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

// Ported from broomfieldhomelab.net's /contact (Max Broome's site,
// github.com/MaxBroome/homepage, src/routes/contact/+page.svelte): the email
// split into username/@/domain, annotated like commented-out code
// ("// me" / "// website"), with box-drawing bracket connectors. Works here
// because the domain IS the email host, same as his site.
const EMAIL = "vijay@lalwani.one";
const [USERNAME, DOMAIN] = EMAIL.split("@");

export default function Contact() {
  const [copied, setCopied] = useState(false);

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy email:", err);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <h3 className="my-6 text-2xl font-bold text-gray-900 dark:text-gray-100">
        Contact
      </h3>
      <p className="text-lg leading-snug text-gray-700 dark:text-gray-300">
        Want to chat? Here&apos;s how to reach me.
      </p>

      <div className="diagram-wrapper relative my-10">
        <div className="diagram-grid">
          <div className="label-me">// me</div>
          <div />
          <div className="label-website">// website</div>

          <div className="bracket-top">
            <span>┌</span>
            <span className="line" />
            <span>┐</span>
          </div>
          <div />
          <div className="bracket-top">
            <span>┌</span>
            <span className="line" />
            <span>┐</span>
          </div>

          <button
            type="button"
            onClick={copyEmail}
            className={`email-link ${copied ? "email-copied" : ""}`}
            style={{ gridColumn: "1 / 4" }}
          >
            <span className="email-part">{USERNAME}</span>
            <span className="email-part">@</span>
            <span className="email-part">{DOMAIN}</span>
          </button>

          <div className="bracket-bottom" style={{ gridColumn: "1 / 4" }}>
            <span>└</span>
            <span className="line" />
            <span>┘</span>
          </div>

          <div className="label-email" style={{ gridColumn: "1 / 4" }}>
            // email
          </div>
        </div>

        <button
          type="button"
          onClick={copyEmail}
          title="Copy email"
          className="absolute left-0 top-1/2 -translate-x-10 -translate-y-1/2 p-2 text-gray-400 transition-colors hover:text-gray-900 dark:text-gray-500 dark:hover:text-white"
        >
          {copied ? <Check className="size-5" /> : <Copy className="size-5" />}
        </button>
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        I&apos;ll respond whenever I can. Looking forward to hearing from you!
      </p>
    </div>
  );
}

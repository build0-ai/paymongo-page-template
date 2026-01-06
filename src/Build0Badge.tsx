import React, { useEffect, useState } from "react";
import { X } from "lucide-react";

interface PhotoAttribution {
  photographer: string;
  photographerUrl: string;
}

const Build0Badge: React.FC = () => {
  const [attributions, setAttributions] = useState<PhotoAttribution[]>([]);

  useEffect(() => {
    // Fetch attributions from the same origin
    fetch("/attributions.json")
      .then((res) => (res.ok ? res.json() : []))
      .then((data) => setAttributions(data))
      .catch(() => setAttributions([]));
  }, []);

  return (
    <div className="bg-white px-4 py-3 md:px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        {/* Left: Powered by badge */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="text-xs font-medium text-[#7C8595]">Powered by</div>
          <div className="flex items-center gap-3">
            <a
              href="https://paymongo.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="https://qn11priio8mql1dy.public.blob.vercel-storage.com/static/PayMongo-Logo-Horizontal-Black-2025%403x.png"
                alt="PayMongo"
                className="h-4 mt-[3px] hover:scale-110 transition-transform duration-200"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(52%) sepia(8%) saturate(555%) hue-rotate(173deg) brightness(96%) contrast(89%)",
                }}
              />
            </a>
            <X className="w-4 h-4 text-[#7C8595]" />
            <a
              href="https://build0.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <img
                src="https://qn11priio8mql1dy.public.blob.vercel-storage.com/static/Full%20Logo%20-%20Black%20-%20Oct%202025-znxYJlHZURcWBkx0oHZak3jSaE8MjG.png"
                alt="Build0"
                className="h-5 hover:scale-110 transition-transform duration-200"
                style={{
                  filter:
                    "brightness(0) saturate(100%) invert(52%) sepia(8%) saturate(555%) hue-rotate(173deg) brightness(96%) contrast(89%)",
                }}
              />
            </a>
          </div>
        </div>

        {/* Right: Unsplash attribution */}
        {attributions.length > 0 && (
          <div className="text-[10px] text-[#A0A7B4] text-center md:text-right">
            Photos by{" "}
            {attributions.map((attr, i) => (
              <span key={attr.photographer}>
                <a
                  href={attr.photographerUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#7C8595] transition-colors underline"
                >
                  {attr.photographer}
                </a>
                {i < attributions.length - 1 && ", "}
              </span>
            ))}
            {" on "}
            <a
              href="https://unsplash.com?utm_source=build0_pages&utm_medium=referral"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#7C8595] transition-colors underline"
            >
              Unsplash
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Build0Badge;

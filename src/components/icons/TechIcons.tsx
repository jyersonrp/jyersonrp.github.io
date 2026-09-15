import React from 'react';

export interface TechIconProps {
  className?: string;
  color?: string;
  style?: React.CSSProperties;
}

// 1. Python (Official dual-snake logo)
export const PythonIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fill="#3776AB"
      d="M11.922 2c-3.13 0-2.94 1.357-2.94 1.357l.003 1.407h2.981v.427H6.012S4 4.962 4 8.087c0 3.124 1.748 3.018 1.748 3.018h1.043v-1.464s-.057-1.748 1.722-1.748h2.973V6.438s.16-1.854-1.823-1.854H7.876V3.255h4.046c1.23 0 2.228.998 2.228 2.228v.57h1.464V4.228C15.614 2.998 14.616 2 13.386 2h-1.464zm-1.637 1.018a.636.636 0 1 1 0 1.272.636.636 0 0 1 0-1.272z"
    />
    <path
      fill="#FFD43B"
      d="M12.078 22c3.13 0 2.94-1.357 2.94-1.357l-.003-1.407h-2.981v-.427h5.954S20 19.038 20 15.913c0-3.124-1.748-3.018-1.748-3.018h-1.043v1.464s.057 1.748-1.722 1.748h-2.973v1.455s-.16 1.854 1.823 1.854h1.787v1.329h-4.046c-1.23 0-2.228-.998-2.228-2.228v-.57h-1.464v1.825C8.386 21.002 9.384 22 10.614 22h1.464zm1.637-1.018a.636.636 0 1 1 0-1.272.636.636 0 0 1 0 1.272z"
    />
  </svg>
);

// 2. FastAPI (Official lightning bolt circle)
export const FastApiIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="11" fill="#05998B" />
    <path
      fill="#ffffff"
      d="M12.8 3.5L5.5 13.5h5.4L9.8 20.5l8.7-10.8h-5.7z"
    />
  </svg>
);

// 3. Odoo ERP (Official brand icon)
export const OdooIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <circle cx="12" cy="12" r="10" fill="#714B67" />
    <circle cx="8" cy="12" r="3.2" fill="#ffffff" />
    <circle cx="8" cy="12" r="1.5" fill="#714B67" />
    <path
      fill="#ffffff"
      d="M13.8 6.5h2.2v5.1a3.2 3.2 0 1 1-2.2 0V6.5zm0 5.5a1.5 1.5 0 1 0 2.2 0v-.2a1.5 1.5 0 0 0-2.2.2z"
    />
  </svg>
);

// 4. OpenCV (Official three-ring triad)
export const OpenCvIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    {/* Red ring (Top) */}
    <circle cx="12" cy="6.8" r="4.2" stroke="#EA4335" strokeWidth="2.2" />
    {/* Green ring (Bottom left) */}
    <circle cx="7.2" cy="15.8" r="4.2" stroke="#34A853" strokeWidth="2.2" />
    {/* Blue ring (Bottom right) */}
    <circle cx="16.8" cy="15.8" r="4.2" stroke="#4285F4" strokeWidth="2.2" />
  </svg>
);

// 5. PostgreSQL (Official elephant insignia)
export const PostgreSqlIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fill="#336791"
      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14.5c-.3.4-1.2.9-2.2.9-1.5 0-2.3-.9-2.7-1.5-.4-.6-.6-1.5-.7-2.4-.1-.8-.1-1.6-.2-2.1h-.2c-.1.5-.2 1.3-.3 2.1-.1.9-.3 1.8-.7 2.4-.4.6-1.2 1.5-2.7 1.5-1 0-1.9-.5-2.2-.9-.4-.5-.4-1.2-.4-1.9 0-2.2 1.6-4.2 3.6-4.9.4-.1.8-.2 1.3-.2h1.6c.5 0 .9.1 1.3.2 2 .7 3.6 2.7 3.6 4.9 0 .7 0 1.4-.4 1.9z"
    />
    <circle cx="9.2" cy="10.8" r="0.9" fill="#ffffff" />
    <circle cx="14.8" cy="10.8" r="0.9" fill="#ffffff" />
  </svg>
);

// 6. Docker (Official whale with containers)
export const DockerIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fill="#2496ED"
      d="M13 5.5h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm6 3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm-3 0h2v2H4zm9 3h2v2h-2zm-3 0h2v2h-2zm-3 0h2v2H7zm-3 0h2v2H4zm-3 0h2v2H1zm20.8 1.4c-.3-.2-1.3-.8-2.6-.5-.3-.9-1-1.6-1.8-2-.1 0-.3-.1-.4-.1l-.3.2s-.3.3-.4.8c-.2.7 0 1.5.3 2-.5.3-1.5.5-2.7.5H2.4c-.4 1.3-.1 3.5 1.5 5.5 1.8 2.2 4.4 3.1 8 3.1 6.5 0 10.3-4.1 10.7-9.4.6-.2 1.2-.4 1.6-.8.2-.2.2-.4.1-.7-.2-.2-.7-.4-1.5-.5z"
    />
  </svg>
);

// 7. TypeScript (Official TS square)
export const TypeScriptIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect width="22" height="22" x="1" y="1" rx="4" fill="#3178C6" />
    <path
      fill="#ffffff"
      d="M5.5 10.5h5v1.8H8.8v7.2H7.2v-7.2H5.5v-1.8zm6.4 6.7c.6.4 1.4.7 2.3.7 1.3 0 2.1-.7 2.1-1.7 0-1-.6-1.5-2.1-2.1-1.9-.7-3.1-1.7-3.1-3.4 0-1.9 1.5-3.3 3.8-3.3 1 0 1.9.3 2.5.7l-.6 1.6c-.5-.3-1.2-.6-1.9-.6-1.2 0-1.9.6-1.9 1.5 0 .9.6 1.4 2.2 2 2 .8 3 1.8 3 3.5 0 2-1.6 3.5-4.1 3.5-1.2 0-2.3-.4-3-1l.7-1.5z"
    />
  </svg>
);

// 8. JavaScript (Official JS square)
export const JavaScriptIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect width="22" height="22" x="1" y="1" rx="4" fill="#F7DF1E" />
    <path
      fill="#000000"
      d="M7.5 17.5c.5.8 1.2 1.3 2.3 1.3 1.2 0 2-.6 2-2.1V10h-2v6.6c0 .6-.3.9-.8.9-.4 0-.7-.2-1-.6l-.5.6zm7.2-.2c.7.9 1.7 1.5 3 1.5 1.7 0 2.8-.9 2.8-2.3 0-1.4-.8-2-2.3-2.6l-.6-.3c-.9-.4-1.3-.8-1.3-1.4 0-.6.5-1.1 1.4-1.1.8 0 1.4.3 1.8.9l1.2-.8c-.7-1.1-1.7-1.6-3-1.6-1.8 0-2.9 1-2.9 2.4 0 1.2.7 1.9 2.1 2.5l.6.3c1 .4 1.5.8 1.5 1.5 0 .8-.7 1.3-1.7 1.3-1.1 0-1.8-.5-2.3-1.3l-1.6 1.1z"
    />
  </svg>
);

// 9. React (Official atom)
export const ReactIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#61DAFB" strokeWidth="1.5">
    <ellipse cx="12" cy="12" rx="9.5" ry="3.8" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(60 12 12)" />
    <ellipse cx="12" cy="12" rx="9.5" ry="3.8" transform="rotate(120 12 12)" />
    <circle cx="12" cy="12" r="1.8" fill="#61DAFB" stroke="none" />
  </svg>
);

// 10. Tailwind CSS (Official wave mark)
export const TailwindIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fill="#06B6D4"
      d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z"
    />
  </svg>
);

// 11. Git (Official branching icon)
export const GitIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fill="#F05032"
      d="M21.62 10.59L13.41 2.38a1.69 1.69 0 0 0-2.4 0L8.62 4.77l3.03 3.03a2 2 0 0 1 2.54 2.55l2.91 2.91a2 2 0 1 1-1.2 1.2l-2.73-2.73v4.61a2 2 0 1 1-1.7 0v-4.8a2 2 0 0 1-1.09-2.63L7.4 5.98 2.38 11a1.69 1.69 0 0 0 0 2.4l8.21 8.21a1.69 1.69 0 0 0 2.4 0l8.63-8.62a1.69 1.69 0 0 0 0-2.4z"
    />
  </svg>
);

// 12. Linux (Official Tux silhouette)
export const LinuxIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fill="#FCC624"
      d="M12 2C9.5 2 8 3.8 8 6.5v2.8c-1.4.9-2.3 2.5-2.3 4.2 0 2.2 1.5 3.9 3.5 4.3-.2.6-.7 1.7-1.7 2.2-.4.2-.6.7-.4 1.1.2.4.6.6 1 .6 2.3 0 3.9-1.9 4-4.7.1 2.8 1.7 4.7 4 4.7.4 0 .8-.2 1-.6.2-.4 0-.9-.4-1.1-1-.5-1.5-1.6-1.7-2.2 2-.4 3.5-2.1 3.5-4.3 0-1.7-.9-3.3-2.3-4.2V6.5C16 3.8 14.5 2 12 2zm-1.8 5.2a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8zm3.6 0a.9.9 0 1 1 0-1.8.9.9 0 0 1 0 1.8zm-1.8 1.3c.7 0 1.2.4 1.2.9s-.5.9-1.2.9-1.2-.4-1.2-.9.5-.9 1.2-.9z"
    />
  </svg>
);

// 13. Pytest (Official testing beaker & checkmark)
export const PytestIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M9 3h6v3h-6z" fill="#0A9EDC" />
    <path d="M10 6v5l-4.5 8c-.6 1.1.2 2.5 1.5 2.5h10c1.3 0 2.1-1.4 1.5-2.5L14 11V6h-4z" stroke="#0A9EDC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 16l2 2 4-4" stroke="#2EE6A0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

// 14. Django & Flask (Web framework insignia)
export const DjangoFlaskIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <rect width="22" height="22" x="1" y="1" rx="4" fill="#092E20" />
    <path
      fill="#44B78B"
      d="M10.8 7.2v9.6h-2.1v-.8c-.4.6-1.1 1-1.9 1-1.7 0-2.8-1.4-2.8-3.4 0-2 1.1-3.4 2.8-3.4.8 0 1.5.4 1.9 1V7.2h2.1zm-2.1 6.4c0-1.1-.6-1.8-1.5-1.8-.9 0-1.5.7-1.5 1.8 0 1.1.6 1.8 1.5 1.8.9 0 1.5-.7 1.5-1.8zm7.3 3.3c-1.8 0-2.8-.8-3-2.4l1.9-.3c.1.9.6 1.3 1.3 1.3.8 0 1.2-.4 1.2-1.2V7.2h2.1v7.1c0 1.7-1.1 2.6-3.5 2.6z"
    />
  </svg>
);

// 15. ONNX Runtime (High performance neural inference)
export const OnnxIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#005CED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 20 6.5 20 15.5 12 20 4 15.5 4 6.5 12 2" />
    <circle cx="12" cy="11" r="2.5" fill="#005CED" stroke="none" />
    <line x1="12" y1="2" x2="12" y2="8.5" />
    <line x1="4" y1="15.5" x2="10" y2="12" />
    <line x1="20" y1="15.5" x2="14" y2="12" />
  </svg>
);

// 16. YOLO (Real-time neural object detection reticle)
export const YoloIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    {/* Detection Bounding Box */}
    <rect x="5" y="5" width="14" height="14" rx="2" stroke="#FF3838" strokeWidth="1.8" strokeDasharray="3 2" />
    {/* Targeting corners */}
    <path d="M3 7V3h4M21 7V3h-4M3 17v4h4M21 17v4h-4" stroke="#00FFFF" strokeWidth="2" strokeLinecap="round" />
    {/* Center crosshair */}
    <circle cx="12" cy="12" r="2" fill="#FF3838" />
  </svg>
);

// 17. NumPy (Tensor & numerical matrix)
export const NumPyIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fill="#4DABCF"
      d="M12 2.2L3.5 7.1v9.8L12 21.8l8.5-4.9V7.1L12 2.2zm-1 15.6l-5.5-3.2V9.4l5.5 3.2v5.2zm2 0v-5.2l5.5-3.2v5.2L13 17.8zm5.2-9.6L13 11.2V5.9l5.2 2.3zM11 5.9v5.3L5.8 8.2 11 5.9z"
    />
  </svg>
);

// 18. HTML5 & CSS3 (Modern Web Standards)
export const HtmlCssIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fill="#E34F26"
      d="M4 3l1.5 16.5L12 22l6.5-2.5L20 3H4zm13.3 5.4H8.7l.2 2.3h8.1l-.7 7.2-4.3 1.2-4.3-1.2-.3-3.2h2.2l.1 1.6 2.3.6 2.3-.6.3-3.2H8.3l-.6-6.4h10l-.4 1.7z"
    />
  </svg>
);

// 19. Framer Motion & Canvas (Animation engine)
export const FramerMotionIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path fill="#0055FF" d="M4 2h16v8h-8zM4 10h8l8 7H4zM4 17h8l-8 7z" />
  </svg>
);

// 20. POO & SOLID (Modular Object-Oriented Engineering)
export const OopSolidIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="var(--accent-secondary)" strokeWidth="1.8">
    <polygon points="12 2 21 7 21 17 12 22 3 17 3 7 12 2" />
    <line x1="12" y1="2" x2="12" y2="22" stroke="var(--accent-primary)" />
    <line x1="3" y1="7" x2="21" y2="17" stroke="var(--accent-secondary)" />
    <line x1="21" y1="7" x2="3" y2="17" stroke="var(--accent-secondary)" />
    <circle cx="12" cy="12" r="3.5" fill="#09090f" stroke="var(--accent-primary)" strokeWidth="2" />
  </svg>
);

// 21. Clean Architecture (Concentric layers & separation of concerns)
export const CleanArchitectureIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9.5" stroke="var(--accent-primary)" strokeWidth="1.5" strokeDasharray="3 2" />
    <circle cx="12" cy="12" r="6.5" stroke="var(--accent-secondary)" strokeWidth="1.8" />
    <circle cx="12" cy="12" r="3.5" fill="var(--accent-primary)" stroke="#ffffff" strokeWidth="1.5" />
    <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3" stroke="var(--accent-primary)" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

// 22. Data Structures & Algorithms (Tree & Graph nodes)
export const DataStructuresIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#A855F7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="5" r="3" fill="#A855F7" />
    <circle cx="6" cy="17" r="3" fill="#A855F7" />
    <circle cx="18" cy="17" r="3" fill="#A855F7" />
    <line x1="10" y1="7.2" x2="7.5" y2="14.5" />
    <line x1="14" y1="7.2" x2="16.5" y2="14.5" />
    <line x1="8.8" y1="17" x2="15.2" y2="17" strokeDasharray="2 2" />
  </svg>
);

// 23. Video Processing MJPEG/RTSP (Real-time camera & streaming stream)
export const VideoProcessingIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#F43F5E" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="6" width="14" height="12" rx="2" />
    <polygon points="22 8 16 12 22 16 22 8" fill="#F43F5E" stroke="none" />
    <circle cx="9" cy="12" r="2.5" stroke="#ffffff" strokeWidth="1.5" />
    <circle cx="5" cy="9" r="1" fill="#F43F5E" stroke="none" />
  </svg>
);

// 24. Generative AI & LLMs (Neural intelligence star)
export const GenerativeAiIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path
      fill="#8B5CF6"
      d="M12 2l2.4 6.8L21 11.2l-6.6 2.4L12 20.4l-2.4-6.8L3 11.2l6.6-2.4L12 2zm7 13l1 2.8 2.8 1-2.8 1-1 2.8-1-2.8-2.8-1 2.8-1 1-2.8z"
    />
  </svg>
);

// 25. RESTful APIs & Webhooks (Data exchange payload)
export const RestApiIcon: React.FC<TechIconProps> = ({ className = "w-5 h-5" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="4" width="16" height="6" rx="2" />
    <rect x="4" y="14" width="16" height="6" rx="2" />
    <path d="M8 10v4M16 10v4" />
    <circle cx="8" cy="7" r="1" fill="#10B981" stroke="none" />
    <circle cx="8" cy="17" r="1" fill="#10B981" stroke="none" />
  </svg>
);

export interface TechSkillMeta {
  icon: React.FC<TechIconProps>;
  brandColor: string;
  glowColor: string;
  borderHoverClass: string;
  bgHoverClass: string;
}

/**
 * Returns the exact brand icon and reactive illumination palette for each skill.
 */
export const getTechSkillMeta = (skillName: string): TechSkillMeta => {
  const normalized = skillName.toLowerCase();

  // 1. Python
  if (normalized.includes('python')) {
    return {
      icon: PythonIcon,
      brandColor: '#3776AB',
      glowColor: 'rgba(55, 118, 171, 0.45)',
      borderHoverClass: 'hover:border-[#3776AB]/70',
      bgHoverClass: 'hover:bg-[#3776AB]/[0.06]',
    };
  }

  // 2. FastAPI
  if (normalized.includes('fastapi')) {
    return {
      icon: FastApiIcon,
      brandColor: '#05998B',
      glowColor: 'rgba(5, 153, 139, 0.5)',
      borderHoverClass: 'hover:border-[#05998B]/70',
      bgHoverClass: 'hover:bg-[#05998B]/[0.07]',
    };
  }

  // 3. Odoo
  if (normalized.includes('odoo')) {
    return {
      icon: OdooIcon,
      brandColor: '#714B67',
      glowColor: 'rgba(162, 70, 137, 0.5)',
      borderHoverClass: 'hover:border-[#A24689]/70',
      bgHoverClass: 'hover:bg-[#714B67]/[0.08]',
    };
  }

  // 4. Flask & Django
  if (normalized.includes('django') || normalized.includes('flask')) {
    return {
      icon: DjangoFlaskIcon,
      brandColor: '#44B78B',
      glowColor: 'rgba(68, 183, 139, 0.45)',
      borderHoverClass: 'hover:border-[#44B78B]/70',
      bgHoverClass: 'hover:bg-[#44B78B]/[0.06]',
    };
  }

  // 5. Pytest & TDD
  if (normalized.includes('pytest') || normalized.includes('tdd')) {
    return {
      icon: PytestIcon,
      brandColor: '#0A9EDC',
      glowColor: 'rgba(10, 158, 220, 0.5)',
      borderHoverClass: 'hover:border-[#0A9EDC]/70',
      bgHoverClass: 'hover:bg-[#0A9EDC]/[0.07]',
    };
  }

  // 6. OpenCV
  if (normalized.includes('opencv')) {
    return {
      icon: OpenCvIcon,
      brandColor: '#5C3EE8',
      glowColor: 'rgba(92, 62, 232, 0.55)',
      borderHoverClass: 'hover:border-[#5C3EE8]/70',
      bgHoverClass: 'hover:bg-[#5C3EE8]/[0.08]',
    };
  }

  // 7. YOLO
  if (normalized.includes('yolo')) {
    return {
      icon: YoloIcon,
      brandColor: '#FF3838',
      glowColor: 'rgba(255, 56, 56, 0.5)',
      borderHoverClass: 'hover:border-[#FF3838]/70',
      bgHoverClass: 'hover:bg-[#FF3838]/[0.07]',
    };
  }

  // 8. ONNX
  if (normalized.includes('onnx')) {
    return {
      icon: OnnxIcon,
      brandColor: '#005CED',
      glowColor: 'rgba(0, 92, 237, 0.5)',
      borderHoverClass: 'hover:border-[#005CED]/70',
      bgHoverClass: 'hover:bg-[#005CED]/[0.07]',
    };
  }

  // 9. NumPy
  if (normalized.includes('numpy')) {
    return {
      icon: NumPyIcon,
      brandColor: '#4DABCF',
      glowColor: 'rgba(77, 171, 207, 0.5)',
      borderHoverClass: 'hover:border-[#4DABCF]/70',
      bgHoverClass: 'hover:bg-[#4DABCF]/[0.07]',
    };
  }

  // 10. TypeScript
  if (normalized.includes('typescript')) {
    return {
      icon: TypeScriptIcon,
      brandColor: '#3178C6',
      glowColor: 'rgba(49, 120, 198, 0.5)',
      borderHoverClass: 'hover:border-[#3178C6]/70',
      bgHoverClass: 'hover:bg-[#3178C6]/[0.08]',
    };
  }

  // 11. JavaScript
  if (normalized.includes('javascript') || normalized.includes('esnext')) {
    return {
      icon: JavaScriptIcon,
      brandColor: '#F7DF1E',
      glowColor: 'rgba(247, 223, 30, 0.45)',
      borderHoverClass: 'hover:border-[#F7DF1E]/70',
      bgHoverClass: 'hover:bg-[#F7DF1E]/[0.07]',
    };
  }

  // 12. React
  if (normalized.includes('react')) {
    return {
      icon: ReactIcon,
      brandColor: '#61DAFB',
      glowColor: 'rgba(97, 218, 251, 0.55)',
      borderHoverClass: 'hover:border-[#61DAFB]/70',
      bgHoverClass: 'hover:bg-[#61DAFB]/[0.08]',
    };
  }

  // 13. Tailwind CSS (must precede general CSS and AI)
  if (normalized.includes('tailwind')) {
    return {
      icon: TailwindIcon,
      brandColor: '#06B6D4',
      glowColor: 'rgba(6, 182, 212, 0.55)',
      borderHoverClass: 'hover:border-[#06B6D4]/70',
      bgHoverClass: 'hover:bg-[#06B6D4]/[0.08]',
    };
  }

  // 14. Framer Motion & Canvas API (must precede general API)
  if (normalized.includes('framer') || normalized.includes('canvas')) {
    return {
      icon: FramerMotionIcon,
      brandColor: '#0055FF',
      glowColor: 'rgba(0, 85, 255, 0.5)',
      borderHoverClass: 'hover:border-[#0055FF]/70',
      bgHoverClass: 'hover:bg-[#0055FF]/[0.07]',
    };
  }

  // 15. HTML & CSS
  if (normalized.includes('html') || normalized.includes('css')) {
    return {
      icon: HtmlCssIcon,
      brandColor: '#E34F26',
      glowColor: 'rgba(227, 79, 38, 0.5)',
      borderHoverClass: 'hover:border-[#E34F26]/70',
      bgHoverClass: 'hover:bg-[#E34F26]/[0.07]',
    };
  }

  // 16. Video processing RTSP / MJPEG
  if (normalized.includes('video') || normalized.includes('mjpeg') || normalized.includes('rtsp')) {
    return {
      icon: VideoProcessingIcon,
      brandColor: '#F43F5E',
      glowColor: 'rgba(244, 63, 94, 0.5)',
      borderHoverClass: 'hover:border-[#F43F5E]/70',
      bgHoverClass: 'hover:bg-[#F43F5E]/[0.07]',
    };
  }

  // 17. Docker
  if (normalized.includes('docker') || normalized.includes('contenedor')) {
    return {
      icon: DockerIcon,
      brandColor: '#2496ED',
      glowColor: 'rgba(36, 150, 237, 0.5)',
      borderHoverClass: 'hover:border-[#2496ED]/70',
      bgHoverClass: 'hover:bg-[#2496ED]/[0.07]',
    };
  }

  // 18. Git & GitHub
  if (normalized.includes('git')) {
    return {
      icon: GitIcon,
      brandColor: '#F05032',
      glowColor: 'rgba(240, 80, 50, 0.5)',
      borderHoverClass: 'hover:border-[#F05032]/70',
      bgHoverClass: 'hover:bg-[#F05032]/[0.07]',
    };
  }

  // 19. Linux / Bash
  if (normalized.includes('linux') || normalized.includes('bash')) {
    return {
      icon: LinuxIcon,
      brandColor: '#FCC624',
      glowColor: 'rgba(252, 198, 36, 0.45)',
      borderHoverClass: 'hover:border-[#FCC624]/70',
      bgHoverClass: 'hover:bg-[#FCC624]/[0.07]',
    };
  }

  // 20. PostgreSQL & Relational SQL
  if (normalized.includes('postgresql') || normalized.includes('postgres') || /(^|\W)sql(\W|$)/i.test(normalized) || normalized.includes('prisma')) {
    return {
      icon: PostgreSqlIcon,
      brandColor: '#336791',
      glowColor: 'rgba(51, 103, 145, 0.5)',
      borderHoverClass: 'hover:border-[#336791]/70',
      bgHoverClass: 'hover:bg-[#336791]/[0.07]',
    };
  }

  // 21. POO & SOLID
  if (normalized.includes('poo') || normalized.includes('solid') || /(^|\W)oop(\W|$)/i.test(normalized)) {
    return {
      icon: OopSolidIcon,
      brandColor: 'var(--accent-secondary)',
      glowColor: 'var(--accent-glow-secondary)',
      borderHoverClass: 'hover:border-[var(--accent-secondary)]/70',
      bgHoverClass: 'hover:bg-[var(--accent-secondary)]/[0.08]',
    };
  }

  // 22. Clean Architecture & Design Patterns
  if (normalized.includes('clean architecture') || normalized.includes('arquitectura') || normalized.includes('patrones de diseño')) {
    return {
      icon: CleanArchitectureIcon,
      brandColor: 'var(--accent-primary)',
      glowColor: 'var(--accent-glow)',
      borderHoverClass: 'hover:border-[var(--accent-primary)]/70',
      bgHoverClass: 'hover:bg-[var(--accent-primary)]/[0.08]',
    };
  }

  // 23. Data Structures & Algorithms
  if (
    normalized.includes('estructura') ||
    normalized.includes('algoritmo') ||
    normalized.includes('data structure') ||
    normalized.includes('árbol') ||
    normalized.includes('grafo') ||
    normalized.includes('lista enlazada') ||
    normalized.includes('big-o')
  ) {
    return {
      icon: DataStructuresIcon,
      brandColor: '#A855F7',
      glowColor: 'rgba(168, 85, 247, 0.55)',
      borderHoverClass: 'hover:border-[#A855F7]/70',
      bgHoverClass: 'hover:bg-[#A855F7]/[0.08]',
    };
  }

  // 24. Generative AI & LLMs (strict word boundary to prevent matching inside 'tailwind')
  if (
    normalized.includes('generativ') ||
    normalized.includes('llm') ||
    /(^|\W)(ia|ai|genai)(\W|$)/i.test(normalized)
  ) {
    return {
      icon: GenerativeAiIcon,
      brandColor: '#8B5CF6',
      glowColor: 'rgba(139, 92, 246, 0.5)',
      borderHoverClass: 'hover:border-[#8B5CF6]/70',
      bgHoverClass: 'hover:bg-[#8B5CF6]/[0.07]',
    };
  }

  // 25. RESTful APIs & Webhooks (strict word boundary to avoid matching inside 'canvas api')
  if (
    normalized.includes('rest') ||
    normalized.includes('webhook') ||
    /(^|\W)apis?(\W|$)/i.test(normalized)
  ) {
    return {
      icon: RestApiIcon,
      brandColor: '#10B981',
      glowColor: 'rgba(16, 185, 129, 0.5)',
      borderHoverClass: 'hover:border-[#10B981]/70',
      bgHoverClass: 'hover:bg-[#10B981]/[0.07]',
    };
  }

  // Default fallback
  return {
    icon: CleanArchitectureIcon,
    brandColor: 'var(--accent-primary)',
    glowColor: 'var(--accent-glow)',
    borderHoverClass: 'hover:border-[var(--accent-primary)]/70',
    bgHoverClass: 'hover:bg-[var(--accent-primary)]/[0.07]',
  };
};

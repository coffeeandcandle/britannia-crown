type IconProps = { className?: string };

const base = {
  viewBox: "0 0 24 24",
  fill: "none" as const,
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function NurseryIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 21V10l8-6 8 6v11" />
      <path d="M9 21v-6h6v6" />
      <path d="M9 12a3 3 0 0 1 6 0" />
    </svg>
  );
}

export function SchoolIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3 2 8l10 5 10-5-10-5Z" />
      <path d="M6 10.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-5.5" />
      <path d="M22 8v6" />
    </svg>
  );
}

export function TutorIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="3.25" />
      <path d="M5 21c0-3.9 3.13-7 7-7s7 3.1 7 7" />
      <path d="M9 21v-3.5M15 21v-3.5" />
    </svg>
  );
}

export function ExamPrepIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <path d="M14 3H6a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V8Z" />
      <path d="M14 3v5h5" />
      <path d="M9 13h6M9 17h6" />
    </svg>
  );
}

export function HomeschoolIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v10h13V10" />
      <path d="M10 20v-6h4v6" />
    </svg>
  );
}

export function ConciergeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="8" width="18" height="12" rx="1.5" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
      <path d="M3 13h18" />
    </svg>
  );
}

export function SignUpIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 20 5.5 15.5 16 5a1.5 1.5 0 0 1 2 0l0.5.5a1.5 1.5 0 0 1 0 2L8.5 18.5 4 20Z" />
      <path d="M14 7l3 3" />
    </svg>
  );
}

export function ShareCodeIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  );
}

export function FamilyBooksIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="4.5" />
      <circle cx="12" cy="12" r="0.6" fill="currentColor" />
    </svg>
  );
}

export function PaidIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v10M9.5 9.3c0-1.3 1.1-2.3 2.5-2.3s2.5.8 2.5 2c0 3-5 1.7-5 4.6 0 1.3 1.1 2.3 2.5 2.3s2.5-1 2.5-2.3" />
    </svg>
  );
}

export function NannyIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="7" r="3.25" />
      <path d="M5 21c0-3.9 3.13-7 7-7s7 3.1 7 7" />
      <path d="M12 14.5V21" />
    </svg>
  );
}

export function TeacherIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <path d="M3 6.5 12 3l9 3.5-9 3.5-9-3.5Z" />
      <path d="M7 8.5V14c0 1.4 2.2 2.5 5 2.5s5-1.1 5-2.5V8.5" />
    </svg>
  );
}

export function CommunityIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <circle cx="8.5" cy="9" r="2.5" />
      <circle cx="16" cy="10" r="2" />
      <path d="M3.5 20c0-3 2.2-5.5 5-5.5s5 2.5 5 5.5" />
      <path d="M14 15.2c1.9.3 3.5 1.9 3.5 4.3" />
    </svg>
  );
}

export function WhatsAppIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
      <path d="M8.5 9.5c0 3.5 2.5 6 6 6" strokeWidth="1.5" />
    </svg>
  );
}

export function EmailIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <rect x="3" y="5" width="18" height="14" rx="1.5" />
      <path d="M4 6.5 12 13l8-6.5" />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg className={className} {...base} xmlns="http://www.w3.org/2000/svg">
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="3.75" />
      <circle cx="16.8" cy="7.2" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

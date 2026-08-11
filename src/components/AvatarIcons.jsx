// Simple flat avatar silhouettes used for the Feedback form's gender-based
// preview. Single-tone (currentColor) so they can be tinted like any icon.
export function MaleAvatar(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="9" r="4.3" />
      <rect x="7.7" y="4.3" width="8.6" height="2.8" rx="1.4" />
      <path d="M5 21.5C5 16.5 8.1 13 12 13C15.9 13 19 16.5 19 21.5Z" />
    </svg>
  );
}

export function FemaleAvatar(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <ellipse cx="12" cy="8.6" rx="5.6" ry="5.2" />
      <rect x="6.6" y="8.6" width="2.2" height="6.4" rx="1.1" />
      <rect x="15.2" y="8.6" width="2.2" height="6.4" rx="1.1" />
      <path d="M5 21.5C5 16.5 8.1 13 12 13C15.9 13 19 16.5 19 21.5Z" />
    </svg>
  );
}

export function NeutralAvatar(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <circle cx="12" cy="9" r="4.3" />
      <path d="M5 21.5C5 16.5 8.1 13 12 13C15.9 13 19 16.5 19 21.5Z" />
    </svg>
  );
}

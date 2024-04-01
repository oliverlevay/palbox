export default function PaginationBall({
  active,
  onClick,
}: {
  active: boolean;
  onClick: () => void;
}) {
  if (active) {
    return (
      <button onClick={onClick}>
        <svg
          width="12"
          height="12"
          viewBox="0 0 12 12"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="6" cy="6" r="6" fill="#07CDF3" />
        </svg>
      </button>
    );
  }

  return (
    <button onClick={onClick}>
      <svg
        width="8"
        height="8"
        viewBox="0 0 8 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="4" cy="4" r="4" fill="#565B64" />
      </svg>
    </button>
  );
}

export default function Error({ status, message, statusText }) {
  return (
    <p>
      Error: {status} {message || statusText}
    </p>
  );
}

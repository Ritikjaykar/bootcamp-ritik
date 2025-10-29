import { sum } from "@acme/shared";

export default function HomePage() {
  return (
    <div>
      <h1>Mini Monorepo Example</h1>
      <p>Sum 5 + 10 = {sum(5, 10)}</p>
    </div>
  );
}

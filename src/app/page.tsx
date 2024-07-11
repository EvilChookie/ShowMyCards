import Banner from "@/app/_components/layout/banner";
import { Prose } from "@/app/_components/layout/prose";

export default async function Home() {
  return (
    <>
      <Prose>
        <h1>Hello World</h1>
        <p>Welcome to ShowMyCards using ... React, of all things.</p>
      </Prose>
    </>
  );
}

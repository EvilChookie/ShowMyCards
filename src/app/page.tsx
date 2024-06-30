import Banner from "@/app/_components/layout/banner";
import { Prose } from "@/app/_components/layout/prose";

export default async function Home() {
  return (
    <>
      <Prose>
        <h1>Hello World</h1>
        <p>Welcome to ShowMyCards using ... React, of all things.</p>
      </Prose>

      <Banner type="info" heading="Information!">
        <p>This is an informational banner.</p>
      </Banner>

      <Banner type="warning" heading="Warning!">
        <p>This is a warning banner.</p>
      </Banner>

      <Banner type="error" heading="Error!">
        <p>This is an error banner.</p>
      </Banner>

      <Banner type="success" heading="Success!">
        <p>This is a successful banner.</p>
      </Banner>
    </>
  );
}

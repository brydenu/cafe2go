import Head from "next/head";

export default function Header() {
  return (
    <Head>
      <title>
        Biolife Cafe | Internal Coffee/Cafe Ordering System | Biolife Solutions
      </title>
      <meta
        name="description"
        content="Welcome to Biolife Cafe, the internal coffee/cafe ordering system for Biolife Solutions. Order your favorite coffee and delicious drinks conveniently."
      />
      <link rel="canonical" href="https://www.biolifecafe.com/" />
      {/* Open Graph (OG) Tags */}
      <meta
        property="og:title"
        content="Biolife Cafe | Internal Coffee/Cafe Ordering System | Biolife Solutions"
      />
      <meta
        property="og:description"
        content="Welcome to Biolife Cafe, the internal coffee/cafe ordering system for Biolife Solutions. Order your favorite coffee and delicious drinks conveniently."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.biolifecafe.com/" />
      <meta
        property="og:image"
        content="https://www.biolifecafe.com/images/og-image.jpg"
      />{" "}
      {/* Replace with an actual image URL */}
      <meta property="og:image:alt" content="Biolife Cafe" />
      {/* Robots Meta Tag */}
      <meta name="robots" content="index, follow" />
      {/* Additional Keywords (Optional) */}
      <meta
        name="keywords"
        content="Biolife Cafe, internal coffee ordering, cafe ordering system, BioLife Solutions, coffee, cafe, treats, Biolife, Biolife cafe"
      />
    </Head>
  );
}

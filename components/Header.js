import Head from "next/head";

export default function Header() {
  return (
    <Head>
      <title>
        BioLife Cafe | Internal Coffee/Cafe Ordering System | BioLife Solutions
      </title>
      <meta
        name="description"
        content="Welcome to BioLife Cafe, the internal coffee/cafe ordering system for BioLife Solutions. Order your favorite coffee and delicious drinks conveniently."
      />
      <link rel="canonical" href="https://www.biolifecafe.com/" />
      {/* Open Graph (OG) Tags */}
      <meta
        property="og:title"
        content="BioLife Cafe | Internal Coffee/Cafe Ordering System | BioLife Solutions"
      />
      <meta
        property="og:description"
        content="Welcome to BioLife Cafe, the internal coffee/cafe ordering system for BioLife Solutions. Order your favorite coffee and delicious drinks conveniently."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.biolifecafe.com/" />
      <meta
        property="og:image"
        content="https://www.biolifecafe.com/images/og-image.jpg"
      />{" "}
      {/* Replace with an actual image URL */}
      <meta property="og:image:alt" content="BioLife Cafe" />
      {/* Robots Meta Tag */}
      <meta name="robots" content="index, follow" />
      {/* Additional Keywords (Optional) */}
      <meta
        name="keywords"
        content="BioLife Cafe, internal coffee ordering, cafe ordering system, BioLife Solutions, coffee, cafe, treats, BioLife, BioLife cafe"
      />
    </Head>
  );
}

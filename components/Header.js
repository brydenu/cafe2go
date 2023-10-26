import Head from "next/head";

export default function Header() {
  return (
    <Head>
      <title>
        Cafe2Go | Cafe Ordering System
      </title>
      <meta
        name="description"
        content="Welcome to Cafe2Go. Order your favorite coffee and delicious drinks conveniently."
      />
      <link rel="canonical" href="https://www.cafe.brydenuyehara.com/" />
      {/* Open Graph (OG) Tags */}
      <meta
        property="og:title"
        content="Cafe2Go | Cafe Ordering System | Bryden Uyehara"
      />
      <meta
        property="og:description"
        content="Welcome to Cafe2Go, the quick and easy cafe ordering system. Order your favorite coffee and delicious drinks conveniently."
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://www.cafe.brydenuyehara.com/" />
      {/* <meta
        property="og:image"
        content="https://www.cafe.brydenuyehara.com/images/og-image.jpg"
      />{" "} */}
      {/* Replace with an actual image URL */}
      <meta property="og:image:alt" content="Cafe2Go" />
      {/* Robots Meta Tag */}
      <meta name="robots" content="index, follow" />
      {/* Additional Keywords (Optional) */}
      <meta
        name="keywords"
        content="Cafe2Go, coffee ordering, cafe ordering system, coffee, cafe, treats, cafe"
      />
    </Head>
  );
}

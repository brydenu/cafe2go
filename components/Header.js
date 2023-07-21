import Head from 'next/head'

export default function Header({ title="Biolife Cafe" }) {
    return (
        <Head>
            <title>{title}</title>
            <meta name="BLFS Cafe" content="Internal cafe ordering system for Biolife Solutions in Bothell" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    )
}

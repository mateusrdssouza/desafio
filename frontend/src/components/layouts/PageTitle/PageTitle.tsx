import Head from "next/head";

interface PageTitleProps {
  title?: string;
}

export default function PageTitle({ title }: PageTitleProps) {
  return (
    <>
      <Head>
        <title>{title ? title : "Invest"}</title>
      </Head>
    </>
  );
}

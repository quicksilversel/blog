const GA_TRACKING_ID = 'G-WJEXDK6XH9'

export const GoogleAnalytics = () => {
  return (
    // eslint-disable-next-line @next/next/next-script-for-ga
    <>
      <script
        async
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <script
        id="gtag-init"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', '${GA_TRACKING_ID}');`,
        }}
      />
    </>
  )
}

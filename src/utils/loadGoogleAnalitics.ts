export const loadAnalytics = () => {
  if (document.getElementById("ga-script")) return;

  const script1 = document.createElement("script");
  script1.id = "ga-script";
  script1.async = true;
  script1.setAttribute("type", "text/partytown");
  script1.src = "https://www.googletagmanager.com/gtag/js?id=G-VH4ZJDDVDG";
  document.head.appendChild(script1);

  const script2 = document.createElement("script");
  script2.id = "gtag-script";
  script2.setAttribute("type", "text/partytown");
  script2.innerHTML = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-VH4ZJDDVDG');
  `;
  document.head.appendChild(script2);

  console.log("Google Analytics loaded dynamically");
};

export const disableAnalitics = () => {
  document.getElementById("ga-script")?.remove();
  document.getElementById("gtag-script")?.remove();
  console.log("Google Analytics disabled");
};

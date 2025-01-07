import React from "react";

export default function Price({ price, locale, currency }) {
  const formatPrice = () =>
    new Intl.NumberFormat(locale, {
      style: "currency",
      currency,
    }).format(price);

  return <span className="px-2">{formatPrice()}</span>;
}

Price.defaultProps = {
  locale: "en-us", //sets local region
  currency: "USD", //sets currency type
};

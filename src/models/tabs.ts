import { TabsProps } from "antd";

export const productManagement: TabsProps["items"] = [
  {
    key: "/product-management/categories",
    label: "Category List",
  },
  {
    key: "/product-management/products",
    label: "Product List",
  },
];

export const faqManagement: TabsProps["items"] = [
  {
    key: "/web-management/faq/categories",
    label: "Category List",
  },
  {
    key: "/web-management/faq",
    label: "FAQ List",
  },
];

export const homeManagement: TabsProps["items"] = [
  {
    key: "/web-management/homepage/hero-section",
    label: "Hero Section",
  },
  {
    key: "/web-management/homepage/partner",
    label: "Partner",
  },
  {
    key: "/web-management/homepage/about",
    label: "About",
  },
  {
    key: "/web-management/homepage/cta",
    label: "CTA",
  },
];

export const contactManagement: TabsProps["items"] = [
  {
    key: "1",
    label: "Contact Us",
  },
];

export const privacyManagement: TabsProps["items"] = [
  {
    key: "/web-management/terms-policy/terms-condition",
    label: "Terms and Condition",
  },
  {
    key: "/web-management/terms-policy/privacy-policy",
    label: "Privacy Policy",
  },
  {
    key: "/web-management/terms-policy/return-policy",
    label: "Return Policy",
  },
];

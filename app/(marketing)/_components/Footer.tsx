// import BrandLogo from "@/components/BrandLogo";
import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <footer className="container pt-16 pb-8 flex flex-col sm:flex-row gap-8 sm:gap-4 justifty-between items-start">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col gap-4">
          <FooterLinkGroup
            title="Chat History"
            links={[
              { label: "Privacy Policy", href: "/privacy" },
              { label: "Terms of Service", href: "/terms" },
              { label: "Cookie Policy", href: "/cookies" },
              { label: "Data Usage", href: "/data-usage" },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col gap-4">
          <FooterLinkGroup
            title="Features"
            links={[
              { label: "Mobile View", href: "/features/mobile" },
              { label: "Desktop View", href: "/features/desktop" },
              { label: "Platform Templates", href: "/features/templates" },
              { label: "Custom Styling", href: "/features/styling" },
              { label: "Export Options", href: "/features/export" },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col gap-4">
          <FooterLinkGroup
            title="Platforms"
            links={[
              { label: "WhatsApp", href: "/platforms/whatsapp" },
              { label: "Telegram", href: "/platforms/telegram" },
              { label: "Facebook", href: "/platforms/facebook" },
              { label: "Instagram", href: "/platforms/instagram" },
              { label: "X (Twitter)", href: "/platforms/x" },
              { label: "Snapchat", href: "/platforms/snapchat" },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col gap-4">
          <FooterLinkGroup
            title="Resources"
            links={[
              { label: "Documentation", href: "/docs" },
              { label: "API Reference", href: "/api" },
              { label: "Examples", href: "/examples" },
              { label: "Tutorials", href: "/tutorials" },
            ]}
          />
        </div>
      </div>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col gap-4">
          <FooterLinkGroup
            title="Support"
            links={[
              { label: "Help Center", href: "/help" },
              { label: "Contact Us", href: "/contact" },
              { label: "FAQs", href: "/faqs" },
              { label: "Community", href: "/community" },
            ]}
          />
        </div>
      </div>
    </footer>
  );
}

export default Footer;

function FooterLinkGroup({
  title,
  links,
}: {
  title?: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-semibold">{title}</h3>
      <ul className="flex flex-col gap-2 text-sm">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/nav/CustomCursor";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: {
    default: "Vinit V Balgum — UI UX Designer",
    template: "%s | Vinit V Balgum",
  },
  description:
    "Vinit V Balgum — UI UX Designer designing and building user-centered, high-impact digital products.",
  openGraph: {
    title: "Vinit V Balgum — UI UX Designer",
    description:
      "Designing and building user-centered, high-impact digital products.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vinit V Balgum — UI UX Designer",
    description:
      "Designing and building user-centered, high-impact digital products.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased dark`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/buttons/Button";
import LinkButton from "@/components/ui/buttons/LinkButton";
import Heading2 from "@/components/ui/typography/Heading2";
import Text from "@/components/ui/typography/Text";
import {cn} from '@/lib/utils';

export default function IndexPage() {
  return (
    <>
      <Header />
    </>
  );
}

function Header() {
  return (
    <>
      <section className="container grid gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl">
            Discover Your Perfect Color Palette with{" "}
            <span
              className={
                "bg-gradient-to-r from-indigo-500 to-primary bg-clip-text text-transparent"
              }
            >
              AI-Powered ColorPaletteAI.
            </span>
          </h1>
          <Text size={"lg"} weight={"medium"}>
            Effortlessly convert your product descriptions into visually
            captivating color schemes with our AI-powered tool, perfect for
            branding, design, and web projects.
          </Text>
        </div>
        <LinkButton
          href={"/app"}
          size={"lg"}
          width={"full"}
          className={"sm:w-fit"}
        >
          Get started for free
        </LinkButton>
      </section>
      <Pricing />
    </>
  );
}

function Pricing() {
  const plans = [
    {
      name: "Pro",
      desc: "Generate colors like a pro.",
      buttonLabel: "Upgrade to Pro",
      price: 2.99,
      isMostPop: true,
      features: [
        "Unlimited color generations",
        "Advanced generation options",
        "Palette History",
        "* Regenerate colors",
        "* Edit palettes and colors",
      ],
      redirect: "/api/stripe/create-checkout-session",
    },
    {
      name: "Free",
      desc: "Free for testing out ColorPaletteAI.",
      buttonLabel: "Continue as Free",
      price: 0,
      isMostPop: false,
      features: ["3 color generations"],
      redirect: "/app",
    },
  ];

  return (
    <section className="relative py-14">
      <div className="absolute top-0 h-[521px] w-full bg-gradient-to-b from-primary/10 to-background"></div>
      <div className="mx-auto max-w-screen-xl sm:px-4 md:px-8">
        <div className="container mx-auto max-w-xl space-y-3 sm:px-0 sm:text-center">
          <Heading2>Pricing</Heading2>
          <div className="max-w-xl text-muted-foreground">
            <Text weight={"medium"}>
              Our all-in-one plan caters to both personal and small business
              needs, offering the ideal balance of features and affordability.
            </Text>
          </div>
        </div>
        <div className="container mx-auto mt-16 justify-center gap-6 sm:flex">
          {plans.map((item, idx) => (
            <div
              key={idx}
              className={`relative mt-6 flex flex-1 flex-col items-stretch rounded-lg border border-foreground/10 px-2 sm:mt-0 sm:max-w-md ${
                item.isMostPop ? "bg-accent shadow-lg sm:border" : "bg-background"
              }`}
            >
              <div
                className={`flex flex-col gap-6 border-b ${
                  item.isMostPop ? "border-gray-300" : ""
                } p-4 py-8 md:p-8`}
              >
                <span className="font-medium text-primary">{item.name}</span>
                <div className={"space-y-2"}>
                  <div
                    className={`text-3xl font-semibold text-accent-foreground`}
                  >
                    ${item.price}{" "}
                    <span className="text-xl font-normal">/mo</span>
                  </div>
                  <Text>{item.desc}</Text>
                </div>
                <LinkButton
                  href={item.redirect}
                  size={"lg"}
                  variant={!item.isMostPop ? "outline" : "default"}
                  width={"full"}
                >
                  {item.buttonLabel}
                </LinkButton>
              </div>
              <ul className="space-y-3 p-4 py-8 md:p-8">
                <li className="pb-2 font-medium">
                  <Text weight={"semibold"}>Features</Text>
                </li>
                {item.features.map((featureItem, idx) => (
                  <li
                    key={idx}
                    className="flex items-center gap-5 text-muted-foreground"
                  >
                    <Check className={"text-primary"} />
                    <Text>{featureItem}</Text>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

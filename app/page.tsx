import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function IndexPage() {
  return (
    <>
      <Header />
    </>
  )
}

function Header() {
  return (
    <>
      <section className="container grid gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Discover Your Perfect Color Palette with AI-Powered ColorPaletteAI
          </h1>
          <p className="max-w-[700px] text-lg text-muted-foreground sm:text-xl">
            Effortlessly convert your product descriptions into visually captivating color schemes with our AI-powered
            tool, perfect for branding, design, and web projects.
          </p>
        </div>
        <Link href={"/app"}>
          <Button className="w-full whitespace-nowrap md:w-fit" variant={"default"} size={"lg"}>Get started for
            free</Button>
        </Link>
      </section>
      <Pricing />
      <Features />
    </>
  );
}

function Features() {
  const features = [
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
        </svg>,
      title: "Fast Refresh",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus."
    },
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
        </svg>,
      title: "Analytics",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus."
    },
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
        </svg>,
      title: "Datacenter security",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus."
    },
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3" />
        </svg>,
      title: "Build on your terms",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus."
    },
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>,
      title: "Safe to use",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus."
    },
    {
      icon:
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
        </svg>,
      title: "Flexible",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus."
    },
  ]

  return (
    <section className="mt-20 container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="max-w-screen-xl px-4 md:px-8">
        <div className="max-w-2xl">
          <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Features
          </h2>
          <p className="leading-7 [&:not(:first-child)]:mt-6">
            Explore a range of advanced features that will transform your website design with stunning and harmonious color palettes.
          </p>
        </div>
        <div className="mt-20 mx-auto">
          <ul className="grid gap-y-8 gap-x-12 sm:grid-cols-2 lg:grid-cols-3">
            {
              features.map((item, idx) => (
                <li key={idx} className="space-y-3">
                  <div className="w-12 h-12 mx-auto bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                    {item.icon}
                  </div>
                  <h4 className="text-lg font-semibold">
                    {item.title}
                  </h4>
                  <p className="leading-7 [&:not(:first-child)]:mt-6">
                    {item.desc}
                  </p>
                </li>
              ))
            }
          </ul>
        </div>
      </div>
    </section>
  )
}

function Pricing() {
  const plans = [
    {
      name: "Free",
      desc: "Free for testing out ColorPaletteAI.",
      price: 0,
      features: [
        "3 color generations",
      ],
      redirect: "/app"
    },
    {
      name: "Pro",
      desc: "Generate colors like a pro.",
      price: 2.99,
      features: [
        "Unlimited color generations",
        "Advanced generation options",
      ],
      redirect: "https://buy.stripe.com/aEUg0r6Jn1QV37OdQQ"
    },
  ];

  return (
    <section className="mt-20 container grid gap-6 pb-8 pt-6 md:py-10">
      <div className="w-fit relative">
        <h2 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
          Pricing
        </h2>
        <p className="leading-7 [&:not(:first-child)]:mt-6">
          Our all-in-one plan caters to both personal and small business needs, offering the ideal balance of features and affordability.
        </p>
      </div>
      <div className="w-full lg:w-2/3 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0">
        {
          plans.map((item, idx) => (
            <div key={idx} className={"flex-1 flex items-stretch flex-col rounded-xl border-2 mt-6 sm:mt-0"}>
              <div className="p-8 space-y-4 border-b">
                <span className="text-primary font-medium">
                  {item.name}
                </span>
                <div className="text-3xl font-semibold">
                  ${item.price} <span className="text-xl font-normal">/mo</span>
                </div>
                <p className="leading-7 [&:not(:first-child)]:mt-6">
                  {item.desc}
                </p>
                <Link href={item.redirect}>
                  <Button className="w-full mt-2">Get Started</Button>
                </Link>
              </div>
              <ul className="p-8 space-y-3">
                <li className="pb-2 font-medium">
                  <p className="leading-7 [&:not(:first-child)]:mt-6">Features</p>
                </li>
                {
                  item.features.map((featureItem, idx) => (
                    <li key={idx} className="flex items-center gap-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-primary"
                        viewBox="0 0 20 20"
                        fill="currentColor">
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"></path>
                      </svg>
                      {featureItem}
                    </li>
                  ))
                }
              </ul>
            </div>
          ))
        }
      </div>
    </section>
  );
}

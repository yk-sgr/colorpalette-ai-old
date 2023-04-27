import {Button} from "@/components/ui/button";
import Link from "next/link";
import {env} from '@/env';

export default function IndexPage() {
  return (
    <>
      <Header/>
    </>
  )
}

function Header() {
  return (
    <>
      <section className="container grid gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter sm:text-3xl md:text-5xl lg:text-6xl">
            Discover Your Perfect Color Palette with <span className={"bg-gradient-to-r from-indigo-500 to-primary bg-clip-text text-transparent"}>AI-Powered ColorPaletteAI.</span>
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
      <Pricing/>
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
        "* Advanced generation options",
        "* Palette History",
        "* Regenerate colors",
        "* Edit palettes manually",
      ],
      redirect: "/api/stripe/create-checkout-session",
    },
    {
      name: "Free",
      desc: "Free for testing out ColorPaletteAI.",
      buttonLabel: "Continue as Free",
      price: 0,
      isMostPop: false,
      features: [
        "3 color generations",
      ],
      redirect: "/app"
    },
  ];

  return (
    <section className='relative py-14'>
      <div className="absolute top-0 h-[521px] w-full bg-gradient-to-b from-primary/10 to-background"></div>
      <div className="mx-auto max-w-screen-xl text-gray-600 sm:px-4 md:px-8">
        <div className='relative mx-auto max-w-xl space-y-3 px-4 sm:px-0 sm:text-center'>
          <h3 className="font-semibold text-primary">
            Pricing
          </h3>
          <p className='text-3xl font-semibold text-muted-foreground sm:text-4xl'>
            Affordable and Transparent Pricing
          </p>
          <div className='max-w-xl text-muted-foreground'>
            <p>
              Our all-in-one plan caters to both personal and small business needs, offering the ideal balance of
              features and affordability.
            </p>
          </div>
        </div>
        <div className='mt-16 justify-center sm:flex'>
          {
            plans.map((item, idx) => (
              <div key={idx}
                   className={`relative mt-6 flex flex-1 flex-col items-stretch sm:mt-0 sm:max-w-md sm:rounded-lg ${item.isMostPop ? "bg-white shadow-lg dark:bg-accent sm:border" : ""}`}>
                <div className="space-y-4 border-b p-4 py-8 md:p-8">
                  <span className='font-medium text-primary'>
                      {item.name}
                  </span>
                  <div className={`text-3xl font-semibold ${item.isMostPop ? "text-accent-foreground" : "text-accent-foreground"}`}>
                    ${item.price} <span className="text-xl font-normal">/mo</span>
                  </div>
                  <p className={"text-muted-foreground"}>
                    {item.desc}
                  </p>
                  <Link href={item.redirect}>
                    <Button className="mt-2 w-full" variant={item.price === 0 ? "outline" : "default"}>{item.buttonLabel}</Button>
                  </Link>
                </div>
                <ul className='space-y-3 p-4 py-8 md:p-8'>
                  <li className="pb-2 font-medium text-gray-800">
                    <p className={"text-muted-foreground"}>Features</p>
                  </li>
                  {
                    item.features.map((featureItem, idx) => (
                      <li key={idx} className='flex items-center gap-5 text-muted-foreground'>
                        <svg
                          xmlns='http://www.w3.org/2000/svg'
                          className='h-5 w-5 text-primary'
                          viewBox='0 0 20 20'
                          fill='currentColor'>
                          <path
                            fillRule='evenodd'
                            d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                            clipRule='evenodd'></path>
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
      </div>
    </section>
  );
}

'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import React from "react";
import Image from 'next/image'
import JSConfetti from 'js-confetti'
import Autoplay from "embla-carousel-autoplay"
import { FunButton } from "@/components/ui/FunButton";

// table name
// upload pictures (grattishälsningar)
// se kluringar för bordet

export default function Index() {
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])

  const onClick = () => {
    const jsConfetti = new JSConfetti()

    jsConfetti.addConfetti({
      emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸'],
    })
  }

  return (
    <div className="flex flex-col items-center justify-center py-2 max-w-md w-full my-8 p-4 noto-serif text-center" onClick={onClick}>
      <h1 className="text-xl font-bold mb-4">
        Sonia, Elviras och Joels 90-årsfest!
      </h1>
      <FunButton />
      <section className="w-full mb-6 pb-6 border-b-[1px]">
        <Carousel
          setApi={setApi}
          plugins={[
            // @ts-ignore
            Autoplay({
              delay: 4000,
              stopOnInteraction: false
            }),
          ]}
          opts={{
            align: "start",
            loop: true,
          }}>
          <CarouselContent>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center relative">
                    <Image
                      src="/bild-0.jpg"
                      fill
                      alt="Bild på Elvira, Sonia och Joel"
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center relative">
                    <Image
                      src="/bild-1.jpg"
                      fill
                      alt="Bild på Elvira, Sonia och Joel"
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center relative">
                    <h2>2</h2>
                    <Image
                      src="/bild-2.jpg"
                      fill
                      alt="Bild på Elvira, Sonia och Joel"
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
            <CarouselItem>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center relative">
                    <Image
                      src="/sonia.png"
                      fill
                      alt="Bild på Sonia"
                      className="object-cover"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          </CarouselContent>
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          {current} av {count}
        </div>
      </section>
      <article className="mb-6 pb-6 border-b-[1px]">
        <h1 className="text-md font-bold mb-3">
          Helan går
        </h1>
        <p className="mb-2">
          Helan går, <br />
          sjung hopp falleri faderallan lej,
        </p>
        <p className="mb-2">
          helan går, <br />
          sjung hopp faderallan lej
        </p>
        <p className="mb-2">
          Och den som inte helan tar <br />
          han inte heller halvan får
        </p>
        <p className="mb-2">
          Helan gåååååååår <br />
          sjung hopp faderallan lej.
        </p>
      </article>
      <article className="mb-6 pb-6 border-b-[1px]">
        <h1 className="text-md font-bold mb-3">
          Skomakar anderssonskans käring
        </h1>
        <p className="mb-2">
          Vem e’ de’? Vem e’ de’? <br />
          Vem e’ de’ som kommer där? <br />
          Jo, skitåkar Anderssonskans käring, <br />
          skitåkar Anderssonskans käring. <br />
          Hon som bor på Hagagatan tre. <br />
          Tjofaderittan, <br />
          klia mej på träskon. <br />
          Här ska det vara mer!
        </p>

        <p className="mb-2">
          Ja, jag vill dö, jag vill ej längre leva, <br />
          jag vill dö i famnen på en mö! <br />
          Ja, jag vill dö, jag vill ej längre leva, <br />
          jag vill dö i famnen på en mö! <br />
        </p>
      </article>

      <article className="mb-6 pb-6 border-b-[1px]">
        <h1 className="text-md font-bold mb-1">
          Finland är finland
        </h1>
        <h2 className="text-sm font-semibold mb-3">
          Melodi: Högt över havet
        </h2>

        <p className="mb-2">
          Finland är Finland och Finland är bra. <br />
          Dom har en pipeline med sprit från Moskva. <br />
          Bada Bastu, piska med ris, <br />
          hacka hål i is. <br />
        </p>
        <p className="mb-2">
          Danmark är Danmark och Danmark är bra. <br />
          Dom har en jungfru som sitter så bar. <br />
          Röde pölsor med Tuborg och lök, <br />
          vi köpte billig krök <br />
        </p>
        <p className="mb-2">
          Norge är Norge och Norge är bra. <br />
          Dom har den olja som vi vill ha. <br />
          Dyrt i baren ett jävla pris, <br />
          klubba säl med is. <br />
        </p>
        <p className="mb-2">
          Island är Island och Island är bra. <br />
          Kriser, vulkaner och hästar dom har. <br />
          Jag fiser i geisern vad var det jag sa, valspeck varje dag. <br />
        </p>
        <p className="mb-2">
          Sverige är Sverige och Sverige är bäst. <br />
          Ingvar Kamprad han tjänar mest. <br />
          Ullared, Abba och Absolut, <br />
          Nu är visan slut. <br />
        </p>
      </article>

      <article className="mb-6 pb-6 border-b-[1px]">
        <h1 className="text-md font-bold mb-1">
          Feta fransyskor
        </h1>
        <h2 className="text-sm font-semibold mb-3">
          Melodi: Tomtarnas julmarsch
        </h2>

        <p className="mb-2">
          Feta fransyskor som svettas om fötterna <br />
          de trampar druvor som sedan skall jäsas till vin <br />
          Transpirationen viktig e’ <br />
          ty den ger fin bouquet <br />
          Vårtor och svampar följer me’, <br />
          men vad gör väl de’?
        </p>
        <p className="mb-2">
          För...  <br />
          Vi vill ha vin, vill ha vin, vill ha mera vin <br />
          även om följderna bli att vi må lida pin <br />
          Flaskan och glaset gått i sin <br />
          Hit med vin, mera vin <br />
          Tror ni att vi är fyllesvin?
        </p>
        <p className="mb-2">
          JA! (Fast större)
        </p>
      </article>

      <article className="mb-6 pb-6 border-b-[1px]">
        <h1 className="text-md font-bold mb-3">
          Punschen kommer
        </h1>
        <p>
          Punschen kommer, <br />
          punschen kommer, <br />
          ljuv och sval. <br />
          Glasen imma, <br />
          röster stimma <br />
          i vår sal. <br />
          Skål för glada minnen! <br />
          Skål för varje vår! <br />
          Inga sorger finnes mer <br />
          när punsch vi får.
        </p>
      </article>

    </div>
  );
}


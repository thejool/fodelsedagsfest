'use client'

import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselApi, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import React from "react";
import Image from 'next/image'
import JSConfetti from 'js-confetti'
import Autoplay from "embla-carousel-autoplay"
import { FunButton } from "@/components/ui/FunButton";

const emojis: Record<string, string> = {
  champagne: '🍾',
  dinosaur: '🦖',
  penguin: '🐧',
  unicorn: '🦄',
  popcorn: '🍿',
  narwhal: '🐳'
}
const names: Record<string, string> = {
  champagne: 'Champagne',
  dinosaur: 'Dinosaurie',
  penguin: 'Pingvin',
  unicorn: 'Unicorn',
  popcorn: 'Popcorn',
  narwhal: 'Narwhal'
}

const images: Record<string, number> = {
  champagne: 50,
  dinosaur: 14,
  penguin: 12,
  unicorn: 14,
  popcorn: 13,
  narwhal: 18
}

const riddles: Record<string, string[]> = {
  dinosaur: [
    "Är döpta efter två katter",
    "Ville bli polishund när hen blev stor",
    "Har turnerat land och rike med Fricky",
    "Har försökt muta polisen med sin sista cigarett",
  ],
  unicorn: [
    "Är ett FAKE Arsenal-fan",
    "Drömde (och försökte tappert) starta ett band tillsammans med Joel",
    "Har turnerat land och rike med Fricky",
    "Gick hip-hop linjen på gymnasiet",
    "Har försökt muta polisen med sin sista cigarett",
  ],
  penguin: [
    "Är en stjärna på pinball (kuggis)",
    "Har köpt en lapdance till Sonia",
    "Blev tagna på bar gärning efter att ha stulit McDonalds M:et",
    "Ringde ambulans och blev ivägskickad på bår för att sedan inse att hen enbart var bakis"
  ],
  narwhal: [
    "Har fått pungvred på Nya Zeeland",
    "Är partykompisar med en av grundarna av paypal",
    "Bor deltid i Kroatien",
    "Smet från sin husarrest på ålandsfärjan för att inte missa markolioo",
    "Har en officiell titel som ”Lord” och äger mark i Skottland",
    "Har brutit sitt lillfinger 5 gånger och har nedsatt känsel i den",
  ],
  popcorn: [
    "Har tatuerat in ”bara bara bere bere” på röven",
    "Är så besatt av Anders Hansen att det var temat på hens födelsedagsfest",
    "Har gjort inbrott på sin gamla grundskola",
    "Har vunnit VM-brons i Visual Merchandising 🥉",
    "Har deltagit i melodifestivalen med bland annat Linda Bengtzing"
  ]

}

export default function Index({ params }: { params: { slug: string } }) {
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
      emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸', '🍾', '🦖', '🐧', '🦄', '🍿', '🐳'],
    })
  }

  return (
    <div className="flex flex-col items-center">
      <div className="flex flex-col items-center justify-center py-2 max-w-md w-full my-8 p-4 noto-serif text-center" onClick={onClick}>
        <h1 className="text-[30px] font-bold mb-4">
          Sonia, Elviras och Joels 90-årsfest! 🥳
        </h1>

        <FunButton icon={emojis[params.slug]} />

        <section className="w-full mb-6 pb-6 border-b-[1px] border-t-[1px] pt-6 mt-6">
          <h2 className="text-lg font-bold mb-4 flex items-center justify-center">
            <span>Bord {names[params.slug]}</span>
            <span className="ml-2 text-[40px]">{emojis[params.slug]}</span>
          </h2>

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
              {Array(images[params.slug]).fill(1).map((_image, index) => (
                <CarouselItem>
                  <div className="p-1">
                    <Card>
                      <CardContent className="flex aspect-square items-center justify-center relative">
                        <Image
                          src={`/${params.slug}/${index + 1}.jpg`}
                          fill
                          alt="Partybilder"
                          className="object-contain"
                        />
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
          {riddles[params.slug] && (
            <>
              <h3 className="mt-5 text-lg font-bold mb-4 flex items-center justify-center">
                Gissa vem/vilka vid bordet:
              </h3>
              <ul>
                {riddles[params.slug].map((riddle) => (
                  <li className="mb-4">✅ {riddle}</li>
                ))}
              </ul>
            </>
          )}
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
          <h1 className="text-md font-bold mb-1">
            Till spritbolaget ränner jag
          </h1>
          <h2 className="text-sm font-semibold mb-3">
            Melodi: Du kära lille snickerbo
          </h2>

          <p className="mb-2">
            Till spritbolaget ränner jag <br />
            Och bankar på dess port. <br />
            Jag vill ha nåt’ som bränner bra <br />
            Och gör mig sketfull fort. <br />
            Expediten fråga och sa: <br />
            Hur gammal kan min herre va? <br />
            Har du nåt legg  ditt fula drägg <br />
            Kom hit igen när du fått skägg.
          </p>
          <p className="mb-2">
            Nej, detta var ju inte bra, <br />
            Jag ska bli full i kväll. <br />
            Då kom jag på en bra idé, <br />
            Dom har ju sprit på Shell. <br />
            Många flaskor stod där på rad. <br />
            Hurra, nu kan jag bli full och glad. <br />
            Den röda drycken rann ju ner. <br />
            Nu kan jag inte se nåt mer.
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
    </div>
  );
}


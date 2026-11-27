import { CtaButton, RoundButton, ScreenTitle, SecondaryButton } from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { href } from "../types"
import { ImagePlaceholder } from "./_parts"

/** 03.1 Location · Figma 254:2359 */
export default function Location() {
  return (
    <PhoneScreen
      title="Location"
      left={<RoundButton icon="back" href={href("02-4")} aria-label="Back" />}
      right={<RoundButton icon="help" href={href("11-1")} aria-label="Help" />}
      footer={
        <>
          <CtaButton href={href("03-2")} className="text-center">
            Allow location
          </CtaButton>
          <SecondaryButton href={href("03-2")}>Choose place manually</SecondaryButton>
        </>
      }
    >
      <ImagePlaceholder label="map · nearby spots" />
      <ScreenTitle muted="usually train?">Where do you</ScreenTitle>
      <p className="text-[15px] leading-[1.32] text-text-secondary">
        We use your location to confirm where you train. Only while you&apos;re covered.
      </p>
    </PhoneScreen>
  )
}

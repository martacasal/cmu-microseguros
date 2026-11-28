import {
  CtaButton,
  RoundButton,
  ScreenTitle,
  SecondaryButton,
  TextField,
} from "@/components/pulse"
import { PhoneScreen } from "@/components/screen/phone-screen"
import { AppleIcon, GoogleIcon } from "@/components/pulse/brand-icons"
import { href } from "../types"

/** 01.3 Log in · Figma 254:2242 */
export default function LogIn() {
  return (
    <PhoneScreen
      title="Log in"
      left={<RoundButton icon="back" href={href("01-1")} aria-label="Back" />}
      footer={
        <CtaButton href={href("01-4")} className="text-center">
          Send code
        </CtaButton>
      }
    >
      <ScreenTitle muted="back">Welcome</ScreenTitle>
      <SecondaryButton href={href("04-1")} className="gap-2.5">
        <AppleIcon />
        Continue with Apple
      </SecondaryButton>
      <SecondaryButton href={href("04-1")} className="gap-2.5">
        <GoogleIcon />
        Continue with Google
      </SecondaryButton>
      <p className="text-center text-[12px] leading-[1.32] font-medium text-text-secondary">
        or with your email
      </p>
      <TextField label="Email" type="email" placeholder="name@email.com" />
    </PhoneScreen>
  )
}

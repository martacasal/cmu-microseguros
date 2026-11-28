import {
  ActivityTile,
  BottomNav,
  ChatBubble,
  CheckRow,
  DataRow,
  InfoCard,
  SecondaryButton,
  TextButton,
  Chip,
  CoverCard,
  CtaButton,
  DurationBars,
  Option,
  OptionGroup,
  RiskBanner,
  RoundButton,
  Seal,
  SlideToTurnOn,
  Step,
  TextField,
  SportIcon,
  SPORT_NAMES,
} from "@/components/pulse"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Progress } from "@/components/ui/progress"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const swatches = [
  ["indigo-950", "bg-indigo-950"],
  ["indigo-800", "bg-indigo-800"],
  ["gray-700", "bg-gray-700"],
  ["gray-600", "bg-gray-600"],
  ["gray-500", "bg-gray-500"],
  ["slate-200", "bg-slate-200"],
  ["white", "bg-white"],
  ["sand-50", "bg-sand-50"],
  ["sand-100", "bg-sand-100"],
  ["sand-200", "bg-sand-200"],
  ["periwinkle-200", "bg-periwinkle-200"],
  ["yellow-400", "bg-yellow-400"],
  ["red-700", "bg-red-700"],
  ["red-600", "bg-red-600"],
  ["red-200", "bg-red-200"],
  ["violet-500", "bg-violet-500"],
  ["indigo-500", "bg-indigo-500"],
  ["indigo-600", "bg-indigo-600"],
  ["indigo-700", "bg-indigo-700"],
] as const

const typeScale = [
  ["Display XL · 60", "type-display-xl"],
  ["Display L · 40", "type-display-l"],
  ["Heading L · 28", "type-heading-l"],
  ["Heading M · 22", "type-heading-m"],
  ["Title · 18", "type-title"],
  ["Body L · 16", "type-body-l"],
  ["Body M · 15", "type-body-m"],
  ["Body S · 14", "type-body-s"],
  ["Label · 13", "type-label"],
  ["Caption · 12", "type-caption"],
  ["Overline · 11", "type-overline"],
] as const

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="flex flex-col gap-4">
      <h2 className="type-overline text-text-secondary">{title}</h2>
      <div className="rounded-xl bg-surface-muted/60 p-4 sm:p-6">{children}</div>
    </section>
  )
}

export default function Page() {
  return (
    <main className="mx-auto flex max-w-5xl flex-col gap-12 px-4 py-10 sm:px-8">
      <header className="flex flex-col gap-2">
        <span className="type-overline text-text-secondary">PULSE · Ink &amp; Coral</span>
        <h1 className="type-display-l">
          Cover on,
          <br />
          <span className="text-text-secondary">in one tap</span>
        </h1>
        <p className="type-body-l text-text-secondary">
          shadcn/ui themed with the PULSE design system, plus the B2 components.
        </p>
      </header>

      <Section title="Colour primitives">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
          {swatches.map(([name, cls]) => (
            <div key={name} className="overflow-hidden rounded-md bg-surface-card">
              <div className={`h-14 ${cls} border-b border-border`} />
              <div className="p-2 type-caption">{name}</div>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Typography · Geist + GCMOX titles">
        <div className="flex flex-col gap-3">
          {typeScale.map(([label, cls]) => (
            <div key={cls} className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
              <span className="w-32 shrink-0 type-caption text-text-secondary">{label}</span>
              <span className={cls}>Cover on, in one tap</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="CTA">
        <div className="grid gap-3 sm:grid-cols-3">
          <CtaButton price="€X.XX">Continue</CtaButton>
          <CtaButton variant="brand" price="€X.XX">Continue</CtaButton>
          <CtaButton variant="danger" price="€X.XX">Continue</CtaButton>
          <CtaButton variant="end" price="€X.XX">End now</CtaButton>
          <CtaButton disabled price="€X.XX">Continue</CtaButton>
        </div>
      </Section>

      <Section title="v2 kit · secondary, text, check, row, bubble, info card">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-3">
            <SecondaryButton>Action</SecondaryButton>
            <TextButton>Action</TextButton>
            <CheckRow label="Option" />
            <CheckRow label="Option" defaultChecked />
            <DataRow label="Label" value="Value" />
          </div>
          <div className="flex flex-col gap-3">
            <ChatBubble from="assistant" who="PULSE assistant">Message</ChatBubble>
            <ChatBubble from="person" who="Ana · PULSE team">Message</ChatBubble>
            <ChatBubble from="you" who="You">Message</ChatBubble>
            <div className="grid grid-cols-2 gap-2">
              <InfoCard variant="brand" overline="Step 1" title="Pick" titleSize={20} description="activity and time, see the price first" />
              <InfoCard overline="Step 2" title="Turn on" titleSize={20} description="billed by the minute, switches off by itself" />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Slide to turn on">
        <div className="grid gap-3 sm:grid-cols-2">
          <SlideToTurnOn />
          <SlideToTurnOn on />
        </div>
      </Section>

      <Section title="Buttons (shadcn, themed)">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-3">
            <Button>Default</Button>
            <Button variant="brand">Brand</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="end">End</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="link">Link</Button>
          </div>
          <div className="grid gap-3 sm:grid-cols-3">
            <Button variant="outline" size="lg">Use another method</Button>
            <Button variant="ghost" size="lg">Cancel</Button>
            <Button variant="outline" size="lg" disabled>Use another method</Button>
          </div>
        </div>
      </Section>

      <Section title="Chips, round buttons, tags">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            <Chip>Football</Chip>
            <Chip selected>Football</Chip>
            <Chip disabled>Football</Chip>
          </div>
          <div className="flex flex-wrap gap-2">
            <RoundButton icon="back" aria-label="Back" />
            <RoundButton icon="close" aria-label="Close" />
            <RoundButton icon="help" aria-label="Help" />
            <RoundButton icon="user" aria-label="Profile" />
            <RoundButton variant="muted" icon="back" aria-label="Back" />
            <RoundButton variant="sos">SOS</RoundButton>
          </div>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-10 pb-14">
            <BottomNav />
            <BottomNav tab="history" covered />
            <RoundButton variant="minus" aria-label="Less">−</RoundButton>
            <RoundButton variant="plus" aria-label="More">+</RoundButton>
          </div>
          <div className="flex flex-wrap gap-2">
            <Badge variant="covered">Covered</Badge>
            <Badge variant="not-covered">Not covered</Badge>
            <Badge variant="warning">Medium risk</Badge>
            <Badge variant="now">Now</Badge>
            <Badge variant="done">Done</Badge>
            <Badge variant="outline">Outline</Badge>
          </div>
          <RiskBanner>Medium risk · contact, knee and ankle</RiskBanner>
        </div>
      </Section>

      <Section title="Sport icons · 24px, 2px stroke, currentColor">
        <div className="flex flex-wrap gap-3">
          {SPORT_NAMES.map((n) => (
            <div key={n} className="flex w-[88px] flex-col items-center gap-2 rounded-[22px] bg-surface-card py-4 text-text-primary">
              <SportIcon name={n} size={32} />
              <span className="text-[12px] font-medium capitalize">{n}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Inputs">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <TextField label="MB WAY mobile" placeholder="+351 9XX XXX XXX" helper="We send the payment request here." />
          <TextField label="MB WAY mobile" defaultValue="+351 912 345 678" autoFocus helper="We send the payment request here." />
          <TextField label="MB WAY mobile" defaultValue="+351 912 345 678" error="This number has no MB WAY. Check it and try again." />
          <TextField label="MB WAY mobile" placeholder="+351 9XX XXX XXX" disabled helper="We send the payment request here." />
          <div className="flex flex-col gap-1.5 sm:col-span-2">
            <span className="type-caption text-text-secondary">Notes</span>
            <Textarea placeholder="Anything we should know?" />
          </div>
        </div>
      </Section>

      <Section title="Options & controls">
        <div className="grid gap-6 sm:grid-cols-2">
          <OptionGroup defaultValue="mbway">
            <Option value="card">Card</Option>
            <Option value="mbway">MB WAY</Option>
            <Option value="x" disabled>Multibanco</Option>
          </OptionGroup>
          <div className="flex flex-col gap-4">
            <label className="flex items-center gap-3 type-body-m"><Switch defaultChecked /> Cover my gear</label>
            <label className="flex items-center gap-3 type-body-m"><Switch /> Off</label>
            <label className="flex items-center gap-3 type-body-m"><Checkbox defaultChecked /> I accept the terms</label>
            <RadioGroup defaultValue="a">
              <label className="flex items-center gap-3 type-body-m"><RadioGroupItem value="a" /> 1 h</label>
              <label className="flex items-center gap-3 type-body-m"><RadioGroupItem value="b" /> 2 h</label>
            </RadioGroup>
            <Slider defaultValue={[40]} max={100} />
          </div>
        </div>
      </Section>

      <Section title="Cards">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <CoverCard overline="Your cover" title="What to do if you get hurt" description="Quick guide" />
          <CoverCard variant="brand" overline="Your cover" title="What to do if you get hurt" description="Quick guide" />
          <CoverCard variant="info" overline="Your cover" title="What to do if you get hurt" description="Quick guide" />
          <CoverCard variant="muted" overline="Your cover" title="What to do if you get hurt" description="Quick guide" />
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <ActivityTile>Running</ActivityTile>
          <ActivityTile selected>Football</ActivityTile>
          <ActivityTile>Cycling</ActivityTile>
        </div>
        <Card className="mt-4">
          <CardHeader>
            <div className="type-display-l">1 h 20</div>
            <CardDescription>until 19:20 · max. 4 h</CardDescription>
          </CardHeader>
          <CardContent>
            <DurationBars value={5} />
          </CardContent>
        </Card>
      </Section>

      <Section title="Steps, tabs, seal, progress">
        <div className="flex flex-col gap-6">
          <div className="grid gap-4 rounded-md bg-surface-card p-4 sm:grid-cols-3">
            <Step state="done" title="Duration" description="1h 20, until 19:20" />
            <Step state="now" title="Duration" description="1h 20, until 19:20" />
            <Step state="next" title="Duration" description="1h 20, until 19:20" />
          </div>
          <Tabs defaultValue="football">
            <TabsList variant="line">
              <TabsTrigger value="activity">Activity</TabsTrigger>
              <TabsTrigger value="football">Football</TabsTrigger>
            </TabsList>
            <TabsContent value="activity" className="pt-3 type-body-s text-text-secondary">Pick an activity.</TabsContent>
            <TabsContent value="football" className="pt-3 type-body-s text-text-secondary">Contact sport · medium risk.</TabsContent>
          </Tabs>
          <Seal>Insurance issued by [Partner insurer], supervised by ASF.</Seal>
          <div className="grid gap-4 sm:grid-cols-3">
            <Progress value={0} />
            <Progress value={50} />
            <Progress value={100} />
          </div>
        </div>
      </Section>

      <Section title="More shadcn">
        <div className="flex flex-col gap-6">
          <Alert>
            <AlertTitle>Cover is on</AlertTitle>
            <AlertDescription>You are covered until 19:20.</AlertDescription>
          </Alert>
          <Alert variant="destructive">
            <AlertTitle>Payment declined</AlertTitle>
            <AlertDescription>Try another method.</AlertDescription>
          </Alert>
          <Accordion className="rounded-md bg-surface-card px-4">
            <AccordionItem value="a">
              <AccordionTrigger>What is covered?</AccordionTrigger>
              <AccordionContent>Accidents during the activity you picked.</AccordionContent>
            </AccordionItem>
            <AccordionItem value="b">
              <AccordionTrigger>Can I end it early?</AccordionTrigger>
              <AccordionContent>Yes, you only pay for the time used.</AccordionContent>
            </AccordionItem>
          </Accordion>
          <div className="flex flex-wrap items-center gap-4">
            <Avatar><AvatarFallback>EL</AvatarFallback></Avatar>
            <Skeleton className="h-10 w-40" />
            <Separator orientation="vertical" className="h-8" />
            <Dialog>
              <DialogTrigger render={<Button variant="outline" />}>Open dialog</DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>End cover now?</DialogTitle>
                  <DialogDescription>You only pay for the time used.</DialogDescription>
                </DialogHeader>
                <Button variant="end">End cover</Button>
              </DialogContent>
            </Dialog>
            <Drawer showSwipeHandle swipeDirection="down">
              <DrawerTrigger render={<Button variant="outline" />}>
                Open bottom drawer
              </DrawerTrigger>
              <DrawerContent className="[--drawer-inset:0px] rounded-b-none">
                <DrawerHeader>
                  <DrawerTitle>End cover now?</DrawerTitle>
                  <DrawerDescription>
                    You only pay for the time used.
                  </DrawerDescription>
                </DrawerHeader>
                <DrawerFooter className="pt-8">
                  <DrawerClose render={<Button variant="end" />}>
                    End cover
                  </DrawerClose>
                  <DrawerClose render={<Button variant="outline" />}>
                    Keep cover
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
      </Section>
    </main>
  )
}

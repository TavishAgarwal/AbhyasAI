import svgPaths from "./svg-ye2o5do37f";

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:ExtraBold',sans-serif] font-extrabold justify-center leading-[0] relative shrink-0 text-[#4f378a] text-[40px] tracking-[-0.8px] whitespace-nowrap">
        <p className="leading-[48px]">Generated Worksheets</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#494551] text-[18px] whitespace-nowrap">
        <p className="leading-[28.8px]">Three tailored editions created for your classroom.</p>
      </div>
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-[438.64px]" data-name="Container">
      <Heading />
      <Container1 />
    </div>
  );
}

function Header() {
  return (
    <div className="content-stretch flex items-end relative shrink-0 w-full" data-name="Header">
      <Container />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="font-bold h-[43.98px] leading-[0] relative shrink-0 text-white w-[99.64px] whitespace-nowrap" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] justify-center left-0 opacity-80 text-[11px] top-[7px] tracking-[0.55px] uppercase">
        <p className="leading-[15.4px]">EDITION A</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] justify-center left-0 text-[22px] top-[29.39px]">
        <p className="leading-[28.6px]">Standard</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="h-[26.667px] relative shrink-0 w-[21.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 21.3333 26.6667">
        <g id="Container" opacity="0.5">
          <path d={svgPaths.p3b2e7180} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Header1() {
  return (
    <div className="bg-[#1b5e8b] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Paragraph />
          <Container2 />
        </div>
      </div>
    </div>
  );
}

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4f378a] text-[13px] tracking-[0.13px] w-full">
        <p className="leading-[18.2px]">Nutrients in Food</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1d1b20] text-[15px] w-full">
        <p className="leading-[24px] mb-0">Our body needs different types of food for</p>
        <p className="leading-[24px] mb-0">growth, energy, and protection against</p>
        <p className="leading-[24px] mb-0">diseases. These special components present</p>
        <p className="leading-[24px]">in our food are called nutrients.</p>
      </div>
    </div>
  );
}

function Item() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Item">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center left-0 top-[12px]">
        <p className="leading-[24px]">{` `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center left-0 top-[24px]">
        <p className="mb-0">
          <span className="leading-[24px]">Carbohydrates:</span>
          <span className="font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal leading-[24px]">{` Provide energy (e.g., rice,`}</span>
        </p>
        <p className="font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal leading-[24px]">wheat).</p>
      </div>
    </div>
  );
}

function Item1() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Item">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center left-0 top-[12px]">
        <p className="leading-[24px]">{` `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center left-0 top-[24px]">
        <p className="mb-0">
          <span className="leading-[24px]">Proteins:</span>
          <span className="font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal leading-[24px]">{` Help in body building (e.g.,`}</span>
        </p>
        <p className="font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal leading-[24px]">pulses, milk).</p>
      </div>
    </div>
  );
}

function Item2() {
  return (
    <div className="h-[48px] relative shrink-0 w-full" data-name="Item">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center left-0 top-[12px]">
        <p className="leading-[24px]">{` `}</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center left-0 top-[24px]">
        <p className="mb-0">
          <span className="leading-[24px]">Fats:</span>
          <span className="font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal leading-[24px]">{` Give more energy than carbohydrates`}</span>
        </p>
        <p className="font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal leading-[24px]">(e.g., oil, butter).</p>
      </div>
    </div>
  );
}

function List() {
  return (
    <div className="relative shrink-0 w-full" data-name="List">
      <div className="content-stretch flex flex-col gap-[8px] items-start leading-[0] pl-[16px] pt-[8px] relative size-full text-[#1d1b20] text-[15px] whitespace-nowrap">
        <Item />
        <Item1 />
        <Item2 />
      </div>
    </div>
  );
}

function Container3() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <div className="overflow-auto size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start pb-[142.83px] pt-[23px] px-[24px] relative size-full">
          <Heading1 />
          <Container4 />
          <List />
        </div>
      </div>
    </div>
  );
}

function Container5() {
  return (
    <div className="-translate-y-1/2 absolute left-0 size-[16px] top-1/2" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p1c92c780} fill="var(--fill-0, #1B5E8B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button() {
  return (
    <div className="h-[24px] relative shrink-0 w-[116.28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container5 />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] left-[calc(50%+14.01px)] not-italic text-[#1b5e8b] text-[13px] text-center top-[calc(50%-0.6px)] tracking-[0.13px] whitespace-nowrap">
          <p className="leading-[18.2px]">Download PDF</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder() {
  return (
    <div className="bg-[#fdf7ff] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#cbc4d2] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pb-[16px] pt-[17px] px-[16px] relative size-full">
          <Button />
        </div>
      </div>
    </div>
  );
}

function SectionStandardEditionA() {
  return (
    <div className="bg-white col-1 h-[600px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="Section - Standard Edition (A)">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Header1 />
        <Container3 />
        <BackgroundHorizontalBorder />
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbc4d2] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Paragraph1() {
  return (
    <div className="font-bold h-[43.98px] leading-[0] relative shrink-0 text-white w-[188.8px] whitespace-nowrap" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] justify-center left-0 opacity-80 text-[11px] top-[7px] tracking-[0.55px] uppercase">
        <p className="leading-[15.4px]">EDITION B</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] justify-center left-0 text-[22px] top-[29.39px]">
        <p className="leading-[28.6px]">Dyslexia-Friendly</p>
      </div>
    </div>
  );
}

function Container6() {
  return (
    <div className="h-[20px] relative shrink-0 w-[29.333px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 29.3333 20">
        <g id="Container" opacity="0.5">
          <path d={svgPaths.pd471580} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Header2() {
  return (
    <div className="bg-[#4f378a] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Paragraph1 />
          <Container6 />
        </div>
      </div>
    </div>
  );
}

function Heading2() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 3">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#4f378a] text-[13px] tracking-[0.13px] w-full">
        <p className="leading-[18.2px]">Nu·tri·ents in Food</p>
      </div>
    </div>
  );
}

function Paragraph2() {
  return (
    <div className="content-stretch flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal gap-[28.29px] items-start leading-[0] relative shrink-0 text-[#1d1b20] text-[18px] tracking-[0.8px] w-full whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[28.8px] mb-0">Our body needs dif·fer·ent types of</p>
        <p className="leading-[28.8px] mb-0">food for growth, en·er·gy, and</p>
        <p className="leading-[28.8px]">pro·tec·tion a·gainst dis·eas·es.</p>
      </div>
      <div className="flex flex-col justify-center relative shrink-0">
        <p className="leading-[28.8px] mb-0">These spe·cial parts in our food</p>
        <p>
          <span className="leading-[28.8px]">{`are called `}</span>
          <span className="font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold leading-[28.8px]">nu·tri·ents</span>
          <span className="leading-[28.8px]">.</span>
        </p>
      </div>
    </div>
  );
}

function OverlayVerticalBorder() {
  return (
    <div className="bg-[rgba(103,80,164,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Overlay+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#1b5e8b] border-l-4 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start pl-[12px] pr-[8px] py-[8px] relative size-full">
        <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1d1b20] text-[16px] tracking-[0.8px] whitespace-nowrap">
          <p className="mb-0">
            <span className="leading-[28.8px]">Car·bo·hy·drates:</span>
            <span className="font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal leading-[28.8px]">{` Give en·er·gy`}</span>
          </p>
          <p className="font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal leading-[28.8px]">(like rice).</p>
        </div>
      </div>
    </div>
  );
}

function OverlayVerticalBorder1() {
  return (
    <div className="bg-[rgba(103,80,164,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Overlay+VerticalBorder">
      <div aria-hidden="true" className="absolute border-[#1b5e8b] border-l-4 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start pl-[12px] pr-[8px] py-[8px] relative size-full">
        <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1d1b20] text-[16px] tracking-[0.8px] whitespace-nowrap">
          <p className="mb-0">
            <span className="leading-[28.8px]">Pro·teins:</span>
            <span className="font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal leading-[28.8px]">{` Help body build (like`}</span>
          </p>
          <p className="font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal leading-[28.8px]">milk).</p>
        </div>
      </div>
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pt-[8.7px] relative shrink-0 w-full" data-name="Container">
      <OverlayVerticalBorder />
      <OverlayVerticalBorder1 />
    </div>
  );
}

function Container7() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <div className="overflow-auto size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[15.3px] items-start pb-[46.86px] pt-[23px] px-[24px] relative size-full">
          <Heading2 />
          <Paragraph2 />
          <Container8 />
        </div>
      </div>
    </div>
  );
}

function Container9() {
  return (
    <div className="-translate-y-1/2 absolute left-0 size-[16px] top-1/2" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p1c92c780} fill="var(--fill-0, #1B5E8B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button1() {
  return (
    <div className="h-[24px] relative shrink-0 w-[116.28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container9 />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] left-[calc(50%+14.01px)] not-italic text-[#1b5e8b] text-[13px] text-center top-[calc(50%-0.6px)] tracking-[0.13px] whitespace-nowrap">
          <p className="leading-[18.2px]">Download PDF</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder1() {
  return (
    <div className="bg-[#fdf7ff] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#cbc4d2] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pb-[16px] pt-[17px] px-[16px] relative size-full">
          <Button1 />
        </div>
      </div>
    </div>
  );
}

function SectionDyslexiaFriendlyEditionB() {
  return (
    <div className="bg-white col-2 h-[600px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="Section - Dyslexia-Friendly Edition (B)">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Header2 />
        <Container7 />
        <BackgroundHorizontalBorder1 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbc4d2] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function Paragraph3() {
  return (
    <div className="font-bold h-[43.98px] leading-[0] relative shrink-0 text-white w-[148.02px] whitespace-nowrap" data-name="Paragraph">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] justify-center left-0 opacity-80 text-[11px] top-[7px] tracking-[0.55px] uppercase">
        <p className="leading-[15.4px]">EDITION C</p>
      </div>
      <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] justify-center left-0 text-[22px] top-[29.39px]">
        <p className="leading-[28.6px]">ADHD / Focus</p>
      </div>
    </div>
  );
}

function Container10() {
  return (
    <div className="h-[26.667px] relative shrink-0 w-[24px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 24 26.6667">
        <g id="Container" opacity="0.5">
          <path d={svgPaths.p3f0c00c0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Header3() {
  return (
    <div className="bg-[#e67e22] relative shrink-0 w-full" data-name="Header">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between p-[16px] relative size-full">
          <Paragraph3 />
          <Container10 />
        </div>
      </div>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#c9a74d] content-stretch flex items-start px-[8px] py-[3px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#503d00] text-[10px] tracking-[1px] uppercase whitespace-nowrap">
        <p className="leading-[15px]">[DEFINITION]</p>
      </div>
    </div>
  );
}

function BackgroundBorder() {
  return (
    <div className="bg-[#f2ecf4] relative rounded-[8px] shrink-0 w-full" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border border-[#cbc4d2] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="content-stretch flex flex-col items-start p-[9px] relative size-full">
        <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1d1b20] text-[15px] whitespace-nowrap">
          <p className="mb-0">
            <span className="leading-[24px]">Nutrients:</span>
            <span className="font-['Atkinson_Hyperlegible_Next:Medium',sans-serif] font-medium leading-[24px]">{` Special parts of food we need`}</span>
          </p>
          <p className="font-['Atkinson_Hyperlegible_Next:Medium',sans-serif] font-medium leading-[24px]">to live and grow.</p>
        </div>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col gap-px items-start relative shrink-0 w-full" data-name="Container">
      <Background />
      <BackgroundBorder />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#e67e22] content-stretch flex items-center justify-center pb-[4.5px] pt-[3.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">1</p>
      </div>
    </div>
  );
}

function Container16() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#494551] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Energy food.</p>
      </div>
    </div>
  );
}

function Background2() {
  return (
    <div className="bg-[#e1d4fd] content-stretch flex items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#63597c] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">[EXAMPLE] Rice, Wheat</p>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1d1b20] text-[15px] whitespace-nowrap">
        <p className="leading-[24px]">Carbohydrates</p>
      </div>
      <Container16 />
      <Background2 />
    </div>
  );
}

function Container14() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Background1 />
      <Container15 />
    </div>
  );
}

function Background3() {
  return (
    <div className="bg-[#e67e22] content-stretch flex items-center justify-center pb-[4.5px] pt-[3.5px] relative rounded-[9999px] shrink-0 size-[32px]" data-name="Background">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[16px] text-center text-white whitespace-nowrap">
        <p className="leading-[24px]">2</p>
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[4px] relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#494551] text-[14px] whitespace-nowrap">
        <p className="leading-[20px]">Building food.</p>
      </div>
    </div>
  );
}

function Background4() {
  return (
    <div className="bg-[#e1d4fd] content-stretch flex items-start px-[8px] py-[4px] relative rounded-[4px] shrink-0" data-name="Background">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#63597c] text-[12px] whitespace-nowrap">
        <p className="leading-[16px]">[EXAMPLE] Milk, Pulses</p>
      </div>
    </div>
  );
}

function Container18() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#1d1b20] text-[15px] whitespace-nowrap">
        <p className="leading-[24px]">Proteins</p>
      </div>
      <Container19 />
      <Background4 />
    </div>
  );
}

function Container17() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <Background3 />
      <Container18 />
    </div>
  );
}

function Container13() {
  return (
    <div className="content-stretch flex flex-col gap-[16px] items-start pb-[8px] relative shrink-0 w-full" data-name="Container">
      <Container14 />
      <Container17 />
    </div>
  );
}

function Container20() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start relative size-full">
        <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#494551] text-[11px] tracking-[0.33px] w-full">
          <p className="leading-[15.4px]">Visual Progress</p>
        </div>
      </div>
    </div>
  );
}

function Background6() {
  return (
    <div className="bg-[#1b5e8b] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[24px]" data-name="Background">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[12px] text-center text-white whitespace-nowrap">
        <p className="leading-[16px]">1</p>
      </div>
    </div>
  );
}

function Margin() {
  return (
    <div className="flex-[1_0_0] h-[4px] min-w-px relative" data-name="Margin">
      <div className="content-stretch flex flex-col items-start px-[4px] relative size-full">
        <div className="bg-[#1b5e8b] h-[4px] relative shrink-0 w-full" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorder1() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[2px] relative rounded-[9999px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#1b5e8b] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#1b5e8b] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">2</p>
      </div>
    </div>
  );
}

function Margin1() {
  return (
    <div className="flex-[1_0_0] h-[4px] min-w-px relative" data-name="Margin">
      <div className="content-stretch flex flex-col items-start px-[4px] relative size-full">
        <div className="bg-[#cbc4d2] h-[4px] relative shrink-0 w-full" data-name="Background" />
      </div>
    </div>
  );
}

function BackgroundBorder2() {
  return (
    <div className="bg-white content-stretch flex items-center justify-center p-[2px] relative rounded-[9999px] shrink-0 size-[24px]" data-name="Background+Border">
      <div aria-hidden="true" className="absolute border-2 border-[#cbc4d2] border-solid inset-0 pointer-events-none rounded-[9999px]" />
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#cbc4d2] text-[12px] text-center whitespace-nowrap">
        <p className="leading-[16px]">3</p>
      </div>
    </div>
  );
}

function Background5() {
  return (
    <div className="bg-[#f8f2fa] relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="flex flex-row items-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-center justify-between p-[8px] relative size-full">
          <Background6 />
          <Margin />
          <BackgroundBorder1 />
          <Margin1 />
          <BackgroundBorder2 />
        </div>
      </div>
    </div>
  );
}

function HorizontalBorder() {
  return (
    <div className="content-stretch flex flex-col gap-[4px] items-start pt-[16px] relative shrink-0 w-full" data-name="HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#cbc4d2] border-solid border-t inset-0 pointer-events-none" />
      <Container20 />
      <Background5 />
    </div>
  );
}

function Container11() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Container">
      <div className="overflow-auto size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start pb-[79.63px] pt-[21px] px-[24px] relative size-full">
          <Container12 />
          <Container13 />
          <HorizontalBorder />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="-translate-y-1/2 absolute left-0 size-[16px] top-1/2" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p1c92c780} fill="var(--fill-0, #1B5E8B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button2() {
  return (
    <div className="h-[24px] relative shrink-0 w-[116.28px]" data-name="Button">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <Container21 />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] left-[calc(50%+14.01px)] not-italic text-[#1b5e8b] text-[13px] text-center top-[calc(50%-0.6px)] tracking-[0.13px] whitespace-nowrap">
          <p className="leading-[18.2px]">Download PDF</p>
        </div>
      </div>
    </div>
  );
}

function BackgroundHorizontalBorder2() {
  return (
    <div className="bg-[#fdf7ff] relative shrink-0 w-full" data-name="Background+HorizontalBorder">
      <div aria-hidden="true" className="absolute border-[#cbc4d2] border-solid border-t inset-0 pointer-events-none" />
      <div className="flex flex-row justify-center size-full">
        <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pb-[16px] pt-[17px] px-[16px] relative size-full">
          <Button2 />
        </div>
      </div>
    </div>
  );
}

function SectionDyscalculiaAdhdEditionC() {
  return (
    <div className="bg-white col-3 h-[600px] justify-self-stretch relative rounded-[12px] row-1 shrink-0" data-name="Section - Dyscalculia / ADHD Edition (C)">
      <div className="content-stretch flex flex-col items-start overflow-clip p-px relative rounded-[inherit] size-full">
        <Header3 />
        <Container11 />
        <BackgroundHorizontalBorder2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbc4d2] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function BentoGridSideBySidePanels() {
  return (
    <div className="gap-x-[24px] gap-y-[24px] grid grid-cols-[repeat(3,minmax(0,1fr))] grid-rows-[_600px] relative shrink-0 w-full" data-name="Bento Grid / Side-by-Side Panels">
      <SectionStandardEditionA />
      <SectionDyslexiaFriendlyEditionB />
      <SectionDyscalculiaAdhdEditionC />
    </div>
  );
}

function Paragraph4() {
  return (
    <div className="content-stretch flex flex-col gap-[0.09px] items-start leading-[0] relative shrink-0 whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[#1d1b20] text-[22px]">
        <p className="leading-[28.6px]">Not satisfied?</p>
      </div>
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#494551] text-[15px]">
        <p className="leading-[24px]">You can adjust parameters or report issues.</p>
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="-translate-y-1/2 absolute left-[17px] size-[16px] top-1/2" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p3e942640} fill="var(--fill-0, #1B5E8B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button3() {
  return (
    <div className="bg-white h-[48px] relative rounded-[8px] shrink-0 w-[131.42px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d0d8e4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container23 />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] left-[calc(50%+14.02px)] not-italic text-[#1b5e8b] text-[13px] text-center top-[calc(50%-0.59px)] tracking-[0.13px] whitespace-nowrap">
        <p className="leading-[18.2px]">Regenerate</p>
      </div>
    </div>
  );
}

function Container24() {
  return (
    <div className="-translate-y-1/2 absolute left-[17px] size-[18px] top-1/2" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 18">
        <g id="Container">
          <path d={svgPaths.p7eb0b80} fill="var(--fill-0, #1B5E8B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button4() {
  return (
    <div className="bg-white h-[48px] relative rounded-[8px] shrink-0 w-[155.17px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d0d8e4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container24 />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] left-[calc(50%+14.02px)] not-italic text-[#1b5e8b] text-[13px] text-center top-[calc(50%-0.59px)] tracking-[0.13px] whitespace-nowrap">
        <p className="leading-[18.2px]">Adjust Settings</p>
      </div>
    </div>
  );
}

function Container25() {
  return (
    <div className="-translate-y-1/2 absolute h-[17px] left-[16px] top-1/2 w-[15px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 15 17">
        <g id="Container">
          <path d={svgPaths.p399f9f00} fill="var(--fill-0, #BA1A1A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button5() {
  return (
    <div className="h-[48px] relative rounded-[8px] shrink-0 w-[138.52px]" data-name="Button">
      <Container25 />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] left-[calc(50%+14.01px)] not-italic text-[#1b5e8b] text-[13px] text-center top-[calc(50%-0.59px)] tracking-[0.13px] whitespace-nowrap">
        <p className="leading-[18.2px]">Report Issue</p>
      </div>
    </div>
  );
}

function Container22() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Container">
      <Button3 />
      <Button4 />
      <Button5 />
    </div>
  );
}

function FeedbackRow() {
  return (
    <div className="bg-[#e6e0e9] relative rounded-[12px] shrink-0 w-full" data-name="Feedback Row">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex items-center justify-between p-[24px] relative size-full">
          <Paragraph4 />
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function MainContentArea() {
  return (
    <div className="max-w-[1200px] relative shrink-0 w-full" data-name="Main Content Area">
      <div className="content-stretch flex flex-col gap-[32px] items-start max-w-[inherit] pb-[50.02px] pt-[48px] px-[48px] relative size-full">
        <Header />
        <BentoGridSideBySidePanels />
        <FeedbackRow />
      </div>
    </div>
  );
}

function MainContentAreaMargin() {
  return (
    <div className="absolute content-stretch flex flex-col items-start left-0 px-[40px] right-0 top-[80px]" data-name="Main Content Area:margin">
      <MainContentArea />
    </div>
  );
}

function Paragraph5() {
  return (
    <div className="content-stretch flex flex-col gap-[8.09px] items-start leading-[0] relative shrink-0 whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center relative shrink-0 text-[#63597c] text-[22px]">
        <p className="leading-[28.6px]">AbhyasAI</p>
      </div>
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#494551] text-[15px]">
        <p className="leading-[24px]">© 2026 AbhyasAI. Your AI Study & Interview Coach.</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#494551] text-[15px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[24px] underline">About</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#494551] text-[15px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[24px] underline">Privacy Policy</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="content-stretch flex flex-col items-start relative self-stretch shrink-0" data-name="Link">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#494551] text-[15px] whitespace-nowrap">
        <p className="[text-decoration-skip-ink:none] decoration-solid leading-[24px] underline">Contact Support</p>
      </div>
    </div>
  );
}

function Container26() {
  return (
    <div className="content-stretch flex gap-[24px] h-[24px] items-start relative shrink-0" data-name="Container">
      <Link />
      <Link1 />
      <Link2 />
    </div>
  );
}

function Footer() {
  return (
    <div className="absolute bg-[#e6e0e9] bottom-0 content-stretch flex items-center justify-between left-0 px-[48px] py-[32px] right-0" data-name="Footer">
      <Paragraph5 />
      <Container26 />
    </div>
  );
}

function Container28() {
  return (
    <div className="h-[36.39px] relative shrink-0 w-[183.55px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] left-0 text-[#63597c] text-[28px] top-[17.5px] whitespace-nowrap">
        <p className="leading-[36.4px]">AbhyasAI</p>
      </div>
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[24px] pr-[17.27px] relative shrink-0" data-name="Margin">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#494551] text-[15px] whitespace-nowrap">
        <p className="leading-[24px] mb-0">Class 5 · Science · Chapter 2 · Components of</p>
        <p className="leading-[24px]">Food</p>
      </div>
    </div>
  );
}

function Container29() {
  return (
    <div className="-translate-y-1/2 absolute left-[8px] size-[11.667px] top-1/2" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 11.6667 11.6667">
        <g id="Container">
          <path d={svgPaths.p1d9bcc00} fill="var(--fill-0, #1E7E34)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background7() {
  return (
    <div className="bg-[#eaf5ea] h-[38.78px] relative rounded-[9999px] shrink-0 w-[146.64px]" data-name="Background">
      <Container29 />
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center leading-[0] left-[26.01px] text-[#1e7e34] text-[11px] top-[calc(50%-0.69px)] tracking-[0.33px] whitespace-nowrap">
        <p className="leading-[15.4px] mb-0">All objectives</p>
        <p className="leading-[15.4px]">verified</p>
      </div>
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col items-start pl-[8px] relative shrink-0" data-name="Margin">
      <Background7 />
    </div>
  );
}

function Container27() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0" data-name="Container">
      <Container28 />
      <Margin2 />
      <Margin3 />
    </div>
  );
}

function Link3() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[38.59px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#494551] text-[15px] whitespace-nowrap">
        <p className="leading-[24px] mb-0">How it</p>
        <p className="leading-[24px]">works</p>
      </div>
    </div>
  );
}

function Link4() {
  return (
    <div className="content-stretch flex flex-col items-start pr-[22.36px] relative shrink-0" data-name="Link">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#494551] text-[15px] whitespace-nowrap">
        <p className="leading-[24px] mb-0">WhatsApp</p>
        <p className="leading-[24px]">Bot</p>
      </div>
    </div>
  );
}

function Container31() {
  return (
    <div className="-translate-y-1/2 absolute h-[20px] left-[17px] top-1/2 w-[18px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 18 20">
        <g id="Container">
          <path d={svgPaths.p2b729200} fill="var(--fill-0, #1B5E8B)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button6() {
  return (
    <div className="bg-white h-[48px] relative rounded-[8px] shrink-0 w-[96.75px]" data-name="Button">
      <div aria-hidden="true" className="absolute border border-[#d0d8e4] border-solid inset-0 pointer-events-none rounded-[8px]" />
      <Container31 />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] left-[calc(50%+14.01px)] not-italic text-[#1b5e8b] text-[13px] text-center top-[calc(50%-0.59px)] tracking-[0.13px] whitespace-nowrap">
        <p className="leading-[18.2px]">Share</p>
      </div>
    </div>
  );
}

function Container32() {
  return (
    <div className="-translate-y-1/2 absolute left-[16px] size-[16px] top-1/2" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 16">
        <g id="Container">
          <path d={svgPaths.p1c92c780} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Button7() {
  return (
    <div className="bg-[#e67e22] h-[48px] relative rounded-[8px] shrink-0 w-[165.08px]" data-name="Button">
      <Container32 />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center leading-[0] left-[calc(50%+14.01px)] text-[13px] text-center text-white top-[calc(50%-0.59px)] tracking-[0.13px] whitespace-nowrap">
        <p className="leading-[18.2px] mb-0">Download All</p>
        <p className="leading-[18.2px]">(ZIP)</p>
      </div>
    </div>
  );
}

function Container30() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0" data-name="Container">
      <Button6 />
      <Button7 />
    </div>
  );
}

function NavigationLinksActions() {
  return (
    <div className="content-stretch flex gap-[24px] items-center relative shrink-0" data-name="Navigation Links & Actions">
      <Link3 />
      <Link4 />
      <Container30 />
    </div>
  );
}

function TopNavBarSemanticShellVisibleAsThisIsACoreDestinationThoughArguablyASubViewThePr() {
  return (
    <div className="absolute bg-[#fdf7ff] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex items-center justify-between left-0 px-[48px] py-[16px] right-0 top-0" data-name="TopNavBar (Semantic Shell: Visible as this is a core destination, though arguably a sub-view, the pr...">
      <Container27 />
      <NavigationLinksActions />
    </div>
  );
}

export default function GeneratorResultsState() {
  return (
    <div className="relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(253, 247, 255) 0%, rgb(253, 247, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Generator - Results State">
      <MainContentAreaMargin />
      <Footer />
      <TopNavBarSemanticShellVisibleAsThisIsACoreDestinationThoughArguablyASubViewThePr />
    </div>
  );
}
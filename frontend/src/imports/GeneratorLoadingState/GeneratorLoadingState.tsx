import svgPaths from "./svg-gma692cn0h";

function Heading1() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Heading 2">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#1d1b20] text-[28px] text-center whitespace-nowrap">
        <p className="leading-[36.4px]">Crafting Inclusivity</p>
      </div>
    </div>
  );
}

function Container2() {
  return (
    <div className="content-stretch flex flex-col items-center relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#494551] text-[15px] text-center whitespace-nowrap">
        <p className="leading-[24px]">We are preparing multiple tailored versions of your content.</p>
      </div>
    </div>
  );
}

function Container1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[8px] items-start left-0 top-[-1px] w-[390.14px]" data-name="Container">
      <Heading1 />
      <Container2 />
    </div>
  );
}

function Margin() {
  return (
    <div className="h-[100.39px] relative shrink-0 w-[390.14px]" data-name="Margin">
      <Container1 />
    </div>
  );
}

function HeaderSkeleton() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Header skeleton">
      <div className="bg-[#e6e0e9] relative rounded-[4px] shrink-0 size-[32px]" data-name="Background" />
      <div className="bg-[#e6e0e9] h-[16px] relative rounded-[4px] shrink-0 w-[116.33px]" data-name="Background" />
    </div>
  );
}

function HeaderSkeletonMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Header skeleton:margin">
      <HeaderSkeleton />
    </div>
  );
}

function Margin1() {
  return (
    <div className="content-stretch flex flex-col h-[36px] items-start pt-[24px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-full" data-name="Background" />
    </div>
  );
}

function TopBarAccent() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] inset-[0_0_-34.53px_0] items-start p-[24px]" data-name="Top bar accent">
      <HeaderSkeletonMargin />
      <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-full" data-name="Content lines" />
      <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-[193.89px]" data-name="Background" />
      <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-[155.11px]" data-name="Background" />
      <Margin1 />
      <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-[209.39px]" data-name="Background" />
      <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-[174.5px]" data-name="Background" />
      <div className="bg-[#e6e0e9] h-[96px] relative rounded-[8px] shrink-0 w-full" data-name="Image placeholder skeleton" />
    </div>
  );
}

function Skeleton1Standard() {
  return (
    <div className="absolute bg-[#fdf7ff] border border-[#cbc4d2] border-solid inset-[0_613.33px_0_0] overflow-clip rounded-[12px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)]" data-name="Skeleton 1: Standard">
      <TopBarAccent />
    </div>
  );
}

function HeaderSkeleton1() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Header skeleton">
      <div className="bg-[#e6e0e9] relative rounded-[4px] shrink-0 size-[32px]" data-name="Background" />
      <div className="bg-[#e6e0e9] h-[16px] relative rounded-[4px] shrink-0 w-[116.33px]" data-name="Background" />
    </div>
  );
}

function HeaderSkeletonMargin1() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Header skeleton:margin">
      <HeaderSkeleton1 />
    </div>
  );
}

function Margin2() {
  return (
    <div className="content-stretch flex flex-col h-[160px] items-start py-[16px] relative shrink-0 w-full" data-name="Margin">
      <div className="bg-[#e6e0e9] h-[128px] relative rounded-[8px] shrink-0 w-full" data-name="Background" />
    </div>
  );
}

function TopBarAccent1() {
  return (
    <div className="absolute content-stretch flex flex-col gap-[16px] inset-[0_0_-18.53px_0] items-start p-[24px]" data-name="Top bar accent">
      <HeaderSkeletonMargin1 />
      <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-[193.89px]" data-name="Content lines (shorter for simplified)" />
      <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-[155.11px]" data-name="Background" />
      <Margin2 />
      <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-[174.5px]" data-name="Background" />
      <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-[116.33px]" data-name="Background" />
    </div>
  );
}

function Skeleton2SimplifiedVisual() {
  return (
    <div className="absolute bg-[#fdf7ff] border border-[#cbc4d2] border-solid inset-[16px_306.66px_-16px_306.67px] overflow-clip rounded-[12px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)]" data-name="Skeleton 2: Simplified/Visual">
      <TopBarAccent1 />
      <div className="absolute bg-[#e1d4fd] h-[8px] left-0 right-0 top-0" data-name="Background" />
    </div>
  );
}

function HeaderSkeleton2() {
  return (
    <div className="content-stretch flex gap-[8px] items-center relative shrink-0 w-full" data-name="Header skeleton">
      <div className="bg-[#e6e0e9] relative rounded-[4px] shrink-0 size-[32px]" data-name="Background" />
      <div className="bg-[#e6e0e9] h-[16px] relative rounded-[4px] shrink-0 w-[155.11px]" data-name="Background" />
    </div>
  );
}

function HeaderSkeletonMargin2() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[16px] relative shrink-0 w-full" data-name="Header skeleton:margin">
      <HeaderSkeleton2 />
    </div>
  );
}

function Margin3() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start pt-[16px] relative shrink-0 w-[193.89px]" data-name="Margin">
      <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-full" data-name="Background" />
    </div>
  );
}

function Container3() {
  return (
    <div className="content-stretch flex gap-[8px] items-start relative shrink-0 w-full" data-name="Container">
      <div className="bg-[#e6e0e9] h-[24px] relative rounded-[9999px] shrink-0 w-[64px]" data-name="Background" />
      <div className="bg-[#e6e0e9] h-[24px] relative rounded-[9999px] shrink-0 w-[64px]" data-name="Background" />
    </div>
  );
}

function Margin4() {
  return (
    <div className="flex-[1_0_0] min-h-[24px] relative w-full" data-name="Margin">
      <div className="flex flex-col justify-end min-h-[inherit] size-full">
        <div className="content-stretch flex flex-col items-start justify-end min-h-[inherit] pt-[17.469px] relative size-full">
          <Container3 />
        </div>
      </div>
    </div>
  );
}

function TopBarAccent2() {
  return (
    <div className="flex-[1_0_0] min-h-px relative w-full" data-name="Top bar accent">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start p-[24px] relative size-full">
        <HeaderSkeletonMargin2 />
        <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-full" data-name="Content lines (denser)" />
        <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-full" data-name="Background" />
        <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-[221.03px]" data-name="Background" />
        <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-[209.39px]" data-name="Background" />
        <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-full" data-name="Background" />
        <Margin3 />
        <div className="bg-[#e6e0e9] h-[12px] relative rounded-[4px] shrink-0 w-[155.11px]" data-name="Background" />
        <Margin4 />
      </div>
    </div>
  );
}

function Skeleton3AdvancedChallenging() {
  return (
    <div className="absolute bg-[#fdf7ff] inset-[0_-0.01px_0_613.34px] max-w-[300px] rounded-[12px]" data-name="Skeleton 3: Advanced/Challenging">
      <div className="content-stretch flex flex-col items-start justify-center max-w-[inherit] overflow-clip p-px relative rounded-[inherit] size-full">
        <TopBarAccent2 />
      </div>
      <div aria-hidden="true" className="absolute border border-[#cbc4d2] border-solid inset-0 pointer-events-none rounded-[12px] shadow-[0px_2px_12px_0px_rgba(0,0,0,0.06)]" />
    </div>
  );
}

function SkeletonPanelsPulsingSideBySide() {
  return (
    <div className="h-[367.47px] relative shrink-0 w-full" data-name="Skeleton Panels (Pulsing Side-by-Side)">
      <Skeleton1Standard />
      <Skeleton2SimplifiedVisual />
      <Skeleton3AdvancedChallenging />
    </div>
  );
}

function SkeletonPanelsPulsingSideBySideMargin() {
  return (
    <div className="content-stretch flex flex-col items-start pb-[32px] relative shrink-0 w-full" data-name="Skeleton Panels (Pulsing Side-by-Side):margin">
      <SkeletonPanelsPulsingSideBySide />
    </div>
  );
}

function Container5() {
  return (
    <div className="h-[8.017px] relative shrink-0 w-[10.867px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10.8667 8.01667">
        <g id="Container">
          <path d={svgPaths.p8c91f20} fill="var(--fill-0, #1E7E34)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Background() {
  return (
    <div className="bg-[#eaf5ea] content-stretch flex items-center justify-center relative rounded-[9999px] shrink-0 size-[24px]" data-name="Background">
      <Container5 />
    </div>
  );
}

function Margin5() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start pt-[4px] relative shrink-0 w-[24px]" data-name="Margin">
      <Background />
    </div>
  );
}

function Paragraph() {
  return (
    <div className="content-stretch flex flex-col items-start leading-[0] relative shrink-0 whitespace-nowrap" data-name="Paragraph">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Medium',sans-serif] font-medium justify-center relative shrink-0 text-[#1d1b20] text-[15px]">
        <p className="leading-[24px]">Analysing chapter content</p>
      </div>
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center relative shrink-0 text-[#494551] text-[14px]">
        <p className="leading-[20px]">Extracted key concepts and vocabulary.</p>
      </div>
    </div>
  );
}

function CompletedStep() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Completed Step">
      <Margin5 />
      <Paragraph />
    </div>
  );
}

function Container7() {
  return (
    <div className="relative shrink-0 size-[16.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
        <g id="Container">
          <path d={svgPaths.p50881c0} fill="var(--fill-0, #4F378A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container6() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Container">
      <Container7 />
    </div>
  );
}

function Margin6() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start pt-[4px] relative shrink-0 w-[24px]" data-name="Margin">
      <Container6 />
    </div>
  );
}

function Background1() {
  return (
    <div className="bg-[#e6e0e9] h-[6px] overflow-clip relative rounded-[9999px] shrink-0 w-full" data-name="Background">
      <div className="absolute bg-[#4f378a] inset-[0_55.01%_0_0] rounded-[9999px]" data-name="Background" />
    </div>
  );
}

function Container8() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0" data-name="Container">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#4f378a] text-[15px] whitespace-nowrap">
        <p className="leading-[24px]">Generating Standard version...</p>
      </div>
      <Background1 />
    </div>
  );
}

function ActiveStep() {
  return (
    <div className="content-stretch flex gap-[16px] items-start relative shrink-0 w-full" data-name="Active Step">
      <Margin6 />
      <Container8 />
    </div>
  );
}

function Container10() {
  return (
    <div className="relative shrink-0 size-[10px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 10 10">
        <g id="Container">
          <path d={svgPaths.p88bcb80} fill="var(--fill-0, #494551)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container9() {
  return (
    <div className="content-stretch flex items-center justify-center relative shrink-0 size-[24px]" data-name="Container">
      <Container10 />
    </div>
  );
}

function Margin7() {
  return (
    <div className="content-stretch flex flex-col h-[28px] items-start pt-[4px] relative shrink-0 w-[24px]" data-name="Margin">
      <Container9 />
    </div>
  );
}

function PendingStepImplied() {
  return (
    <div className="content-stretch flex gap-[16px] items-start opacity-40 relative shrink-0 w-full" data-name="Pending Step (Implied)">
      <Margin7 />
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Medium',sans-serif] font-medium justify-center leading-[0] relative shrink-0 text-[#494551] text-[15px] whitespace-nowrap">
        <p className="leading-[24px]">Formatting visual layouts</p>
      </div>
    </div>
  );
}

function Container4() {
  return (
    <div className="relative shrink-0 w-full" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[16px] items-start relative size-full">
        <CompletedStep />
        <ActiveStep />
        <PendingStepImplied />
      </div>
    </div>
  );
}

function Overlay() {
  return (
    <div className="bg-[rgba(225,212,253,0.3)] relative rounded-[9999px] shrink-0" data-name="Overlay">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex items-start justify-center pb-[4.19px] pt-[3px] px-[16px] relative size-full">
        <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[#63597c] text-[13px] text-center tracking-[0.13px] whitespace-nowrap">
          <p className="leading-[18.2px]">~18 seconds remaining</p>
        </div>
      </div>
    </div>
  );
}

function Timer() {
  return (
    <div className="relative shrink-0 w-full" data-name="Timer">
      <div aria-hidden="true" className="absolute border-[#cbc4d2] border-solid border-t inset-0 pointer-events-none" />
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-center pt-[17px] relative size-full">
        <Overlay />
      </div>
    </div>
  );
}

function ProgressIndicatorSection() {
  return (
    <div className="bg-[#f8f2fa] content-stretch drop-shadow-[0px_1px_1px_rgba(0,0,0,0.05)] flex flex-col gap-[24px] items-start max-w-[600px] px-[33px] py-[25px] relative rounded-[12px] shrink-0 w-[600px]" data-name="Progress Indicator Section">
      <div aria-hidden="true" className="absolute border border-[#cbc4d2] border-solid inset-0 pointer-events-none rounded-[12px]" />
      <Container4 />
      <Timer />
    </div>
  );
}

function Container() {
  return (
    <div className="content-stretch flex flex-col items-center justify-center max-w-[1000px] relative shrink-0 w-full" data-name="Container">
      <Margin />
      <SkeletonPanelsPulsingSideBySideMargin />
      <ProgressIndicatorSection />
    </div>
  );
}

function MainContentCanvas() {
  return (
    <div className="flex-[1_0_0] h-full min-w-px relative" data-name="Main Content Canvas">
      <div className="flex flex-col items-center justify-center overflow-auto size-full">
        <div className="content-stretch flex flex-col items-center justify-center p-[32px] relative size-full">
          <div className="absolute bg-[rgba(255,255,255,0.5)] inset-0" data-name="Subtle background pattern or tonal shift can go here if needed, keeping it clean for focus" />
          <Container />
        </div>
      </div>
    </div>
  );
}

function Container11() {
  return (
    <div className="h-[18px] relative shrink-0 w-[22px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 22 18">
        <g id="Container">
          <path d={svgPaths.p3dd55c80} fill="var(--fill-0, #4F378A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function AbhyasAILogo() {
  return (
    <div className="bg-[#6750a4] content-stretch flex items-center justify-center relative rounded-[8px] shrink-0 size-[48px]" data-name="AbhyasAI Logo">
      <Container11 />
    </div>
  );
}

function AbhyasAILogoMargin() {
  return (
    <div className="content-stretch flex flex-col h-[52px] items-start pb-[4px] relative shrink-0 w-[48px]" data-name="AbhyasAI Logo:margin">
      <AbhyasAILogo />
    </div>
  );
}

function Heading() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Heading 1">
      <div className="flex flex-col font-['Plus_Jakarta_Sans:Bold',sans-serif] font-bold justify-center leading-[0] relative shrink-0 text-[#63597c] text-[22px] w-full">
        <p className="leading-[28.6px]">Generate Worksheet</p>
      </div>
    </div>
  );
}

function Container12() {
  return (
    <div className="content-stretch flex flex-col items-start relative shrink-0 w-full" data-name="Container">
      <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Regular',sans-serif] font-normal justify-center leading-[0] relative shrink-0 text-[#494551] text-[15px] w-full">
        <p className="leading-[24px]">Select your parameters</p>
      </div>
    </div>
  );
}

function HeaderArea() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Header area">
      <AbhyasAILogoMargin />
      <Heading />
      <Container12 />
    </div>
  );
}

function HeaderAreaMargin() {
  return (
    <div className="relative shrink-0 w-full" data-name="Header area:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start pb-[16px] relative size-full">
        <HeaderArea />
      </div>
    </div>
  );
}

function Container13() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p241800} fill="var(--fill-0, #4F378A)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container14() {
  return (
    <div className="h-[18.19px] relative shrink-0 w-[41.95px]" data-name="Container">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid relative size-full">
        <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] left-0 not-italic text-[#4f378a] text-[13px] top-[8.5px] tracking-[0.13px] whitespace-nowrap">
          <p className="leading-[18.2px]">NCERT</p>
        </div>
      </div>
    </div>
  );
}

function LinkActiveTabNcertAssumingTheySelectedParametersFromHereBeforeGenerating() {
  return (
    <div className="bg-[rgba(103,80,164,0.1)] relative rounded-[8px] shrink-0 w-full" data-name="Link - Active Tab: NCERT (Assuming they selected parameters from here before generating)">
      <div aria-hidden="true" className="absolute border-[#4f378a] border-l-4 border-solid inset-0 pointer-events-none rounded-[8px]" />
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center pl-[20px] pr-[16px] py-[8px] relative size-full">
          <Container13 />
          <Container14 />
        </div>
      </div>
    </div>
  );
}

function Container15() {
  return (
    <div className="h-[20px] relative shrink-0 w-[16px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16 20">
        <g id="Container">
          <path d={svgPaths.p11fdd840} fill="var(--fill-0, #494551)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container16() {
  return (
    <div className="h-[18.19px] relative shrink-0 w-[43.09px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] left-0 not-italic text-[#494551] text-[13px] top-[8.5px] tracking-[0.13px] whitespace-nowrap">
        <p className="leading-[18.2px]">Upload</p>
      </div>
    </div>
  );
}

function Link() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative size-full">
          <Container15 />
          <Container16 />
        </div>
      </div>
    </div>
  );
}

function Container17() {
  return (
    <div className="h-[18px] relative shrink-0 w-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 18">
        <g id="Container">
          <path d={svgPaths.p15b83880} fill="var(--fill-0, #494551)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container18() {
  return (
    <div className="h-[18.19px] relative shrink-0 w-[46.59px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] left-0 not-italic text-[#494551] text-[13px] top-[8.5px] tracking-[0.13px] whitespace-nowrap">
        <p className="leading-[18.2px]">Camera</p>
      </div>
    </div>
  );
}

function Link1() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative size-full">
          <Container17 />
          <Container18 />
        </div>
      </div>
    </div>
  );
}

function NavigationLinks() {
  return (
    <div className="h-[603.41px] relative shrink-0 w-full" data-name="Navigation Links">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col gap-[8px] items-start relative size-full">
        <LinkActiveTabNcertAssumingTheySelectedParametersFromHereBeforeGenerating />
        <Link />
        <Link1 />
      </div>
    </div>
  );
}

function Container19() {
  return (
    <div className="h-[20px] relative shrink-0 w-[20.1px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20.1 20">
        <g id="Container">
          <path d={svgPaths.p3cdadd00} fill="var(--fill-0, #494551)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container20() {
  return (
    <div className="h-[18.19px] relative shrink-0 w-[50.56px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] left-0 not-italic text-[#494551] text-[13px] top-[8.5px] tracking-[0.13px] whitespace-nowrap">
        <p className="leading-[18.2px]">Settings</p>
      </div>
    </div>
  );
}

function Link2() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative size-full">
          <Container19 />
          <Container20 />
        </div>
      </div>
    </div>
  );
}

function Container21() {
  return (
    <div className="relative shrink-0 size-[20px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 20 20">
        <g id="Container">
          <path d={svgPaths.p2816f2c0} fill="var(--fill-0, #494551)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function Container22() {
  return (
    <div className="h-[18.19px] relative shrink-0 w-[28.38px]" data-name="Container">
      <div className="-translate-y-1/2 absolute flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] left-0 not-italic text-[#494551] text-[13px] top-[8.5px] tracking-[0.13px] whitespace-nowrap">
        <p className="leading-[18.2px]">Help</p>
      </div>
    </div>
  );
}

function Link3() {
  return (
    <div className="relative rounded-[8px] shrink-0 w-full" data-name="Link">
      <div className="flex flex-row items-center size-full">
        <div className="content-stretch flex gap-[16px] items-center px-[16px] py-[8px] relative size-full">
          <Container21 />
          <Container22 />
        </div>
      </div>
    </div>
  );
}

function FooterLinks() {
  return (
    <div className="content-stretch flex flex-col gap-[8px] items-start relative shrink-0 w-full" data-name="Footer Links">
      <Link2 />
      <Link3 />
    </div>
  );
}

function FooterLinksMargin() {
  return (
    <div className="h-[112px] min-h-[88px] relative shrink-0 w-full" data-name="Footer Links:margin">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex flex-col items-start justify-end min-h-[inherit] pb-[24px] relative size-full">
        <FooterLinks />
      </div>
    </div>
  );
}

function Container23() {
  return (
    <div className="relative shrink-0 size-[16.667px]" data-name="Container">
      <svg className="absolute block inset-0 size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 16.6667 16.6667">
        <g id="Container">
          <path d={svgPaths.p50881c0} fill="var(--fill-0, white)" id="Icon" />
        </g>
      </svg>
    </div>
  );
}

function CtaButtonLoadingState() {
  return (
    <div className="bg-[rgba(79,55,138,0.7)] relative rounded-[8px] shrink-0 w-full" data-name="CTA Button (Loading State)">
      <div className="bg-clip-padding border-0 border-[transparent] border-solid content-stretch flex gap-[8px] items-start justify-center py-[16px] relative size-full">
        <Container23 />
        <div className="flex flex-col font-['Atkinson_Hyperlegible_Next:Semi_Bold',sans-serif] justify-center leading-[0] not-italic relative shrink-0 text-[13px] text-center text-white tracking-[0.13px] whitespace-nowrap">
          <p className="leading-[18.2px]">Generating...</p>
        </div>
      </div>
    </div>
  );
}

function AsideSideNavBarSharedComponentBlueprint() {
  return (
    <div className="absolute bg-[#f8f2fa] content-stretch flex flex-col gap-[24px] h-[1024px] items-start left-0 pl-[24px] pr-[25px] py-[24px] top-0 w-[320px]" data-name="Aside - SideNavBar (Shared Component Blueprint)">
      <div aria-hidden="true" className="absolute border-[#cbc4d2] border-r border-solid inset-0 pointer-events-none" />
      <HeaderAreaMargin />
      <NavigationLinks />
      <FooterLinksMargin />
      <CtaButtonLoadingState />
    </div>
  );
}

export default function GeneratorLoadingState() {
  return (
    <div className="content-stretch flex items-start justify-center pl-[320px] relative size-full" style={{ backgroundImage: "linear-gradient(90deg, rgb(253, 247, 255) 0%, rgb(253, 247, 255) 100%), linear-gradient(90deg, rgb(255, 255, 255) 0%, rgb(255, 255, 255) 100%)" }} data-name="Generator - Loading State">
      <MainContentCanvas />
      <AsideSideNavBarSharedComponentBlueprint />
    </div>
  );
}
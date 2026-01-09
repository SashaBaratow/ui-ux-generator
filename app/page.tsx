import Header from "@/app/_shared/Header";
import Hero from "@/app/_shared/hero/Hero";

export default function Home() {
  return (
    <div className={'w-full px-2 py-3'}>
        <Header/>
        <Hero/>
        <div className={'absolute -top-40 -left-40 h-[500px] w-[500px] bg-purple-400/20 blur-[120px] rounded-full z-0'}/>
        <div className={'absolute -top-40 -right-0 h-[500px] w-[500px] bg-pink-400/20 blur-[120px] rounded-full z-0'}/>
        <div className={'absolute -bottom-40 left-1/5 h-[500px] w-[500px] bg-blue-400/20 blur-[120px] rounded-full z-0'}/>
        <div className={'absolute -bottom-40 -right-[-200px] h-[500px] w-[500px] bg-sky-400/20 blur-[120px] rounded-full z-0'}/>
    </div>
  );
}

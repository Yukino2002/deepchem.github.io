import Script from 'next/script';
import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import TutorialLink from '../components/Tutorials/TutorialLink';
import tutorials from '../data/tutorials/tutorials';

import ScrollToTop from 'react-scroll-to-top';


export default function TutorialLayout({children}) {
  const [currentTutorialIndex, setCurrentTutorialIndex] = useState(1);
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const router = useRouter();

  function toggleNavbar() {
    setIsNavbarOpen((prev) => !prev);
  }

  useEffect(() => {
    if (!router.isReady) return;
    const url = router.pathname;
    const tutorialName = url.split('\/')[2];
    const tutorialIndex = tutorials.findIndex((element) => element.urlifiedFileName.includes(tutorialName));
    setCurrentTutorialIndex(tutorialIndex);
  }, [router.isReady]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1024) {
        setIsNavbarOpen(false);
      }
    });
  }, []);


  return <>
    <Script
      src="https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.7/latest.js?config=TeX-AMS_CHTML-full,Safe" />
    <Script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.1.10/require.min.js" />
    <Script id="mathjax-setup-script">
      {`MathJax = {
                    TeX: {
                        equationNumbers: {
                            autoNumber: "AMS",
                            useLabelIds: true
                        }
                    },
                    tex2jax: {
                        inlineMath: [['$', '$']],
                        displayMath: [['$$', '$$']],
                        processEscapes: true,
                        processEnvironments: true
                    },
                    displayAlign: 'center',
                    CommonHTML: {
                        linebreaks: {
                            automatic: true
                        }
                    }
                }`}
    </Script>

    <div className={`${isNavbarOpen ? 'flex' : 'hidden'} fixed bg-dc-gray/80 w-full h-[100vh] top-0 lg:hidden z-10`}
      onClick={toggleNavbar}></div>
    <div
      className="flex flex-col px-[25px] 2xl:px-[300px] items-start overflow-x-scroll gap-8 font-poppins py-8 lg:py-16"
    >
      <div className="flex flex-row items-center">
        <i className="block lg:hidden fas fa-angle-right text-lg mr-5 cursor-pointer"
          onClick={toggleNavbar}></i>
        <h2 className="mb-0">Tutorials</h2>
      </div>
      <div className="flex flex-row justify-between w-full">
        <nav
          className={`notebook-menu ${isNavbarOpen ? 'translate-x-0' : '-translate-x-full'} bg-white ease-in-out duration-300 lg:duration-0 fixed top-0 left-0 shadow-xl py-8 lg:py-0 h-screen w-[70vw] max-w-[300px]`}>
          {/* <i className="block lg:hidden fas fa-close text-lg mb-5 cursor-pointer self-end" onClick={toggleNavbar}></i> */}
          {tutorials.map((tutorial, i) => {
            return <TutorialLink key={i} title={tutorial.title}
              active={i === currentTutorialIndex} onClick={setCurrentTutorialIndex}
              index={i} fileName={tutorial.urlifiedFileName} />;
          })}
        </nav>
        <div className="notebook overflow-x-hidden bg-dc-light-gray/10">
          {children}
        </div>
      </div>
    </div>

    <ScrollToTop
      className="flex items-center justify-center !rounded-full !opacity-70 hover:!opacity-100 transition-all !bg-dc-orange"
      smooth component={<i className="fa-solid fa-chevron-up text-dc-white !text-lg "></i>}
    />

  </>;
}

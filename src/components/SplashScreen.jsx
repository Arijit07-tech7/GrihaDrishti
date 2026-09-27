import { useEffect, useState } from "react";

const HOUSE_IMAGE =
  "https://images.pexels.com/photos/31737860/pexels-photo-31737860.jpeg?cs=srgb&dl=pexels-dropshado-31737860.jpg&fm=jpg";

const stages = [
  "Calibrating spatial intelligence",
  "Reading architectural patterns",
  "Understanding property context",
  "Mapping intelligent value signals",
  "Preparing GrihaDrishti",
];

function SplashScreen({ onComplete }) {
  const [progress, setProgress] = useState(8);
  const [stageIndex, setStageIndex] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const start = Date.now();
    const duration = 6000;

    const timer = setInterval(() => {
      const elapsed = Date.now() - start;

      const next = Math.min(
        100,
        8 + Math.floor((elapsed / duration) * 92)
      );

      setProgress(next);

      const nextStage = Math.min(
        stages.length - 1,
        Math.floor((next / 100) * stages.length)
      );

      setStageIndex(nextStage);

      if (next >= 100) {
        clearInterval(timer);

        setTimeout(() => {
          setFinished(true);

          setTimeout(() => {
            if (onComplete) {
              onComplete();
            }
          }, 850);
        }, 450);
      }
    }, 35);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="gd-splash">
      <style>{`

        /* =========================================================
           GRIHADRISHTI — PREMIUM SPATIAL INTELLIGENCE SPLASH
        ========================================================= */

        .gd-splash {
          position: fixed;
          inset: 0;

          width: 100%;
          height: 100svh;

          min-height: 620px;

          overflow: hidden;

          z-index: 99999;

          background:
            #03080d;

          color: #fff;

          font-family:
            Inter,
            Manrope,
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;

          isolation: isolate;
        }

        /* =========================================================
           FULL CINEMATIC HOUSE BACKGROUND
        ========================================================= */

        .gd-visual {
          position: absolute;

          inset: 0;

          z-index: 0;

          overflow: hidden;

          background:
            linear-gradient(
              180deg,
              #071522 0%,
              #06101a 45%,
              #02070c 100%
            );
        }

        .gd-house-photo {
          position: absolute;

          inset: -3%;

          width: 106%;
          height: 106%;

          object-fit: cover;

          object-position: center 58%;

          transform:
            scale(1.035);

          filter:
            brightness(0.60)
            contrast(1.15)
            saturate(0.72)
            sepia(0.05);

          animation:
            gdPhotoBreath 12s ease-in-out infinite alternate;
        }

        /* =========================================================
           PHOTO → CINEMATIC SCENE INTEGRATION
        ========================================================= */

        .gd-photo-color {
          position: absolute;

          inset: 0;

          background:

            linear-gradient(
              180deg,
              rgba(3, 11, 18, 0.72) 0%,
              rgba(4, 15, 25, 0.22) 32%,
              rgba(2, 8, 13, 0.16) 53%,
              rgba(1, 5, 9, 0.78) 100%
            ),

            linear-gradient(
              90deg,
              rgba(1, 6, 11, 0.78) 0%,
              rgba(1, 7, 13, 0.25) 28%,
              transparent 52%,
              rgba(1, 5, 9, 0.20) 76%,
              rgba(1, 5, 9, 0.72) 100%
            ),

            radial-gradient(
              ellipse 48% 58% at 66% 54%,
              transparent 0%,
              rgba(1, 7, 12, 0.08) 52%,
              rgba(1, 5, 9, 0.60) 100%
            );

          z-index: 2;

          pointer-events: none;
        }

        .gd-photo-atmosphere {
          position: absolute;

          inset: 0;

          z-index: 3;

          background:
            radial-gradient(
              ellipse 55% 50% at 66% 52%,
              rgba(229, 180, 84, 0.15),
              transparent 68%
            ),

            radial-gradient(
              ellipse 60% 35% at 50% 15%,
              rgba(33, 78, 105, 0.28),
              transparent 75%
            );

          mix-blend-mode:
            screen;

          pointer-events: none;
        }

        .gd-vignette {
          position: absolute;

          inset: 0;

          z-index: 15;

          pointer-events: none;

          background:
            radial-gradient(
              ellipse at center,
              transparent 43%,
              rgba(0,0,0,0.18) 70%,
              rgba(0,0,0,0.68) 100%
            );
        }

        /* =========================================================
           TECHNICAL GRID
        ========================================================= */

        .gd-grid {
          position: absolute;

          inset: 0;

          z-index: 4;

          opacity: 0.075;

          pointer-events: none;

          background-image:
            linear-gradient(
              rgba(220, 174, 78, 0.18) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(220, 174, 78, 0.18) 1px,
              transparent 1px
            );

          background-size:
            80px 80px;

          mask-image:
            linear-gradient(
              to bottom,
              black,
              transparent 75%
            );
        }

        /* =========================================================
           TOP TECH LINE
        ========================================================= */

        .gd-top-line {
          position: absolute;

          top: 18px;
          left: 26px;
          right: 26px;

          height: 1px;

          z-index: 30;

          background:
            linear-gradient(
              90deg,
              rgba(225,178,82,0.0),
              rgba(225,178,82,0.28) 12%,
              rgba(255,255,255,0.13) 50%,
              rgba(225,178,82,0.28) 88%,
              rgba(225,178,82,0.0)
            );
        }

        .gd-top-line::before,
        .gd-top-line::after {
          content: "";

          position: absolute;

          top: -2px;

          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            #dcae4f;

          box-shadow:
            0 0 8px
            rgba(220,174,79,0.75);
        }

        .gd-top-line::before {
          left: 0;
        }

        .gd-top-line::after {
          right: 0;
        }

        /* =========================================================
           BRAND PANEL — DESKTOP
        ========================================================= */

        .gd-brand-panel {
          position: absolute;

          left: 5%;

          top: 8%;

          width: 334px;

          padding: 23px 23px 24px;

          z-index: 40;

          border:
            1px solid
            rgba(224,177,79,0.28);

          border-radius: 19px;

          background:
            linear-gradient(
              145deg,
              rgba(5,17,29,0.88),
              rgba(4,12,21,0.68)
            );

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);

          box-shadow:
            0 25px 70px rgba(0,0,0,0.42),
            inset 0 1px rgba(255,255,255,0.07);

          animation:
            gdPanelIn
            1.1s
            cubic-bezier(.22,1,.36,1)
            both;
        }

        .gd-brand-panel::after {
          content: "";

          position: absolute;

          inset: 0;

          border-radius: inherit;

          pointer-events: none;

          background:
            linear-gradient(
              135deg,
              rgba(255,255,255,0.055),
              transparent 32%,
              transparent 70%,
              rgba(218,170,73,0.035)
            );
        }

        .gd-brand-mini {
          display: inline-flex;

          align-items: center;

          gap: 8px;

          padding: 7px 10px;

          border:
            1px solid
            rgba(220,174,78,0.28);

          border-radius: 999px;

          background:
            rgba(220,174,78,0.045);

          color:
            #dcb05c;

          font-size: 7px;

          font-weight: 700;

          letter-spacing:
            0.16em;

          text-transform:
            uppercase;
        }

        .gd-mini-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            #e2b65a;

          box-shadow:
            0 0 8px
            rgba(226,182,90,0.9);
        }

        .gd-brand-title {
          margin-top: 17px;

          font-family:
            Georgia,
            "Times New Roman",
            serif;

          font-size: 36px;

          line-height: 1;

          font-weight: 400;

          letter-spacing:
            -0.035em;

          color:
            #f4f0e8;

          text-shadow:
            0 5px 30px
            rgba(0,0,0,0.55);
        }

        .gd-brand-title span {
          color:
            #e0b253;
        }

        .gd-brand-description {
          margin-top: 12px;

          color:
            rgba(237,234,225,0.58);

          font-size: 10px;

          letter-spacing:
            0.015em;
        }

        .gd-brand-corner {
          position: absolute;

          top: 18px;
          right: 18px;

          width: 38px;
          height: 38px;

          display: grid;
          place-items: center;

          border-radius: 11px;

          color:
            #e5b95f;

          border:
            1px solid
            rgba(220,174,78,0.25);

          background:
            rgba(220,174,78,0.055);
        }

        .gd-brand-corner svg {
          width: 18px;
          height: 18px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.35;

          stroke-linecap: round;
          stroke-linejoin: round;
        }

        /* =========================================================
           ENGINE STATUS
        ========================================================= */

        .gd-engine {
          position: absolute;

          top: 8%;

          right: 4%;

          z-index: 40;

          min-width: 230px;

          display: flex;

          align-items: center;

          justify-content: space-between;

          gap: 16px;

          padding: 9px 13px;

          border:
            1px solid
            rgba(221,174,78,0.30);

          border-radius: 999px;

          background:
            rgba(4,13,22,0.72);

          backdrop-filter:
            blur(16px);

          -webkit-backdrop-filter:
            blur(16px);

          box-shadow:
            0 12px 35px
            rgba(0,0,0,0.28);

          animation:
            gdFadeDown
            1s
            .25s
            both;
        }

        .gd-engine-left {
          display: flex;

          align-items: center;

          gap: 8px;

          color:
            #d8b25f;

          font-size: 7px;

          font-weight: 700;

          letter-spacing:
            0.13em;

          white-space: nowrap;
        }

        .gd-engine-dot {
          width: 5px;
          height: 5px;

          border-radius: 50%;

          background:
            #e7bb61;

          box-shadow:
            0 0 9px
            rgba(231,187,97,0.9);

          animation:
            gdEnginePulse 2s ease-in-out infinite;
        }

        .gd-engine-value {
          color:
            rgba(230,225,212,0.5);

          font-size: 7px;

          white-space: nowrap;
        }

        /* =========================================================
           ORBIT SYSTEM
        ========================================================= */

        .gd-orbits {
          position: absolute;

          left: 61%;

          top: 49%;

          width: 67%;

          height: 62%;

          transform:
            translate(-50%, -50%);

          z-index: 12;

          pointer-events: none;

          perspective: 1200px;
        }

        .gd-orbit {
          position: absolute;

          left: 50%;
          top: 50%;

          width: 100%;
          height: 43%;

          border:
            1px solid
            rgba(246,215,157,0.70);

          border-radius: 50%;

          box-shadow:
            0 0 13px
            rgba(238,194,105,0.17),
            inset 0 0 15px
            rgba(238,194,105,0.08);

          transform-style:
            preserve-3d;

          opacity: 0.9;
        }

        .gd-orbit-a {
          transform:
            translate(-50%,-50%)
            rotateX(69deg)
            rotateZ(-12deg);

          animation:
            gdOrbitA
            16s
            ease-in-out
            infinite
            alternate;
        }

        .gd-orbit-b {
          width: 84%;
          height: 53%;

          opacity: 0.58;

          transform:
            translate(-50%,-50%)
            rotateX(72deg)
            rotateZ(28deg);

          animation:
            gdOrbitB
            19s
            ease-in-out
            infinite
            alternate;
        }

        .gd-orbit-c {
          width: 78%;
          height: 62%;

          opacity: 0.35;

          transform:
            translate(-50%,-50%)
            rotateX(74deg)
            rotateZ(-34deg);

          animation:
            gdOrbitC
            22s
            ease-in-out
            infinite
            alternate;
        }

        .gd-orbit-dot {
          position: absolute;

          width: 6px;
          height: 6px;

          border-radius: 50%;

          background:
            #fff0bd;

          box-shadow:
            0 0 8px #ffe09b,
            0 0 20px
            rgba(255,190,67,0.9);
        }

        .gd-orbit-dot.a {
          left: 14%;
          top: 18%;
        }

        .gd-orbit-dot.b {
          right: 12%;
          top: 67%;

          width: 5px;
          height: 5px;
        }

        .gd-orbit-dot.c {
          left: 50%;
          bottom: 1%;

          width: 4px;
          height: 4px;
        }

        /* =========================================================
           SPATIAL CARD
        ========================================================= */

        .gd-spatial {
          position: absolute;

          right: 5%;

          bottom: 19%;

          z-index: 42;

          width: 214px;

          padding: 12px 13px;

          display: flex;

          align-items: center;

          gap: 11px;

          border:
            1px solid
            rgba(222,174,75,0.28);

          border-radius: 13px;

          background:
            linear-gradient(
              135deg,
              rgba(10,24,38,0.90),
              rgba(3,10,17,0.78)
            );

          backdrop-filter:
            blur(18px);

          -webkit-backdrop-filter:
            blur(18px);

          box-shadow:
            0 20px 50px
            rgba(0,0,0,0.42),
            inset 0 1px
            rgba(255,255,255,0.06);

          animation:
            gdCardIn
            1s
            .65s
            both,
            gdCardFloat
            5s
            1.8s
            ease-in-out
            infinite;
        }

        .gd-spatial-icon {
          width: 34px;
          height: 34px;

          flex: 0 0 34px;

          display: grid;
          place-items: center;

          color:
            #dfb45d;

          border:
            1px solid
            rgba(220,174,78,0.25);

          border-radius: 9px;

          background:
            rgba(220,174,78,0.055);
        }

        .gd-spatial-icon svg {
          width: 17px;
          height: 17px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.35;

          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .gd-spatial-title {
          font-size: 8px;

          font-weight: 700;

          letter-spacing:
            0.12em;

          color:
            #dfb55f;
        }

        .gd-spatial-sub {
          margin-top: 5px;

          color:
            rgba(224,224,218,0.57);

          font-size: 8px;
        }

        /* =========================================================
           BOTTOM INFORMATION
        ========================================================= */

        .gd-bottom-info {
          position: absolute;

          left: 4.8%;
          right: 4.8%;

          bottom: 4.4%;

          z-index: 45;

          display: flex;

          align-items: flex-end;

          justify-content: space-between;

          pointer-events: none;
        }

        .gd-preview {
          display: flex;

          flex-direction: column;

          gap: 5px;
        }

        .gd-preview strong {
          color:
            #e1b45a;

          font-size: 7px;

          letter-spacing:
            0.13em;

          font-weight: 700;
        }

        .gd-preview span {
          color:
            rgba(238,235,226,0.46);

          font-size: 7px;
        }

        .gd-engine-id {
          display: flex;

          flex-direction: column;

          align-items: flex-end;

          gap: 4px;
        }

        .gd-engine-id strong {
          color:
            rgba(238,235,226,0.52);

          font-size: 7px;

          font-weight: 500;
        }

        .gd-engine-id span {
          color:
            rgba(224,174,76,0.7);

          font-size: 6px;

          letter-spacing:
            0.1em;
        }

        /* =========================================================
           LOADING
        ========================================================= */

        .gd-loader {
          position: absolute;

          left: 4.8%;
          right: 4.8%;

          bottom: 2.1%;

          z-index: 46;
        }

        .gd-loader-top {
          display: flex;

          align-items: center;

          justify-content: space-between;

          margin-bottom: 8px;

          color:
            rgba(236,233,223,0.63);

          font-size: 7px;

          text-transform:
            uppercase;

          letter-spacing:
            0.08em;
        }

        .gd-loader-count {
          color:
            #e5ba62;

          font-weight: 700;
        }

        .gd-progress {
          position: relative;

          height: 2px;

          width: 100%;

          background:
            rgba(255,255,255,0.10);
        }

        .gd-progress-fill {
          position: absolute;

          left: 0;
          top: 0;
          bottom: 0;

          background:
            linear-gradient(
              90deg,
              #9b6823,
              #dfb052,
              #fff0b2
            );

          box-shadow:
            0 0 12px
            rgba(227,178,78,0.85);

          transition:
            width .08s linear;
        }

        .gd-progress-dot {
          position: absolute;

          top: 50%;

          width: 7px;
          height: 7px;

          transform:
            translate(-50%,-50%);

          border-radius: 50%;

          background:
            #fff0b2;

          box-shadow:
            0 0 8px #fff,
            0 0 16px
            rgba(230,179,75,0.9);

          transition:
            left .08s linear;
        }

        /* =========================================================
           WELCOME
        ========================================================= */

        .gd-welcome {
          position: absolute;

          left: 50%;
          bottom: 6%;

          transform:
            translateX(-50%);

          z-index: 60;

          width:
            min(360px, 82vw);

          padding:
            13px 17px;

          display: flex;

          align-items: center;

          gap: 11px;

          border:
            1px solid
            rgba(224,177,79,0.38);

          border-radius: 14px;

          background:
            rgba(4,14,23,0.88);

          backdrop-filter:
            blur(20px);

          box-shadow:
            0 25px 60px
            rgba(0,0,0,0.55);

          animation:
            gdWelcome
            .8s
            cubic-bezier(.22,1,.36,1);
        }

        .gd-welcome-icon {
          width: 36px;
          height: 36px;

          display: grid;
          place-items: center;

          flex: 0 0 36px;

          color:
            #e4b75e;

          border:
            1px solid
            rgba(220,174,78,0.25);

          border-radius: 10px;

          background:
            rgba(220,174,78,0.06);
        }

        .gd-welcome-icon svg {
          width: 21px;
          height: 21px;

          fill: none;

          stroke: currentColor;

          stroke-width: 1.6;

          stroke-linecap: round;
          stroke-linejoin: round;
        }

        .gd-welcome-text strong {
          display: block;

          font-size: 11px;
        }

        .gd-welcome-text span {
          display: block;

          margin-top: 3px;

          color:
            rgba(225,225,220,0.52);

          font-size: 8px;
        }

        .gd-welcome-arrow {
          margin-left: auto;

          color:
            #e5b75e;

          font-size: 18px;
        }

        /* =========================================================
           CORNER HUD
        ========================================================= */

        .gd-corner {
          position: absolute;

          width: 22px;
          height: 22px;

          z-index: 35;

          opacity: 0.48;

          pointer-events: none;
        }

        .gd-corner.tl {
          left: 25px;
          top: 25px;

          border-left:
            1px solid #d8aa4e;

          border-top:
            1px solid #d8aa4e;
        }

        .gd-corner.tr {
          right: 25px;
          top: 25px;

          border-right:
            1px solid #d8aa4e;

          border-top:
            1px solid #d8aa4e;
        }

        .gd-corner.bl {
          left: 25px;
          bottom: 25px;

          border-left:
            1px solid #d8aa4e;

          border-bottom:
            1px solid #d8aa4e;
        }

        .gd-corner.br {
          right: 25px;
          bottom: 25px;

          border-right:
            1px solid #d8aa4e;

          border-bottom:
            1px solid #d8aa4e;
        }

        /* =========================================================
           CINEMA BARS
        ========================================================= */

        .gd-bar-top,
        .gd-bar-bottom {
          position: absolute;

          left: 0;
          right: 0;

          height: 7px;

          z-index: 90;

          background:
            #000;
        }

        .gd-bar-top {
          top: 0;
        }

        .gd-bar-bottom {
          bottom: 0;
        }

        /* =========================================================
           ANIMATIONS
        ========================================================= */

        @keyframes gdPhotoBreath {
          from {
            transform:
              scale(1.035)
              translate3d(0,0,0);
          }

          to {
            transform:
              scale(1.065)
              translate3d(-0.4%, -0.25%, 0);
          }
        }

        @keyframes gdPanelIn {
          from {
            opacity: 0;

            transform:
              translateY(-22px)
              scale(.97);

            filter:
              blur(8px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);

            filter:
              blur(0);
          }
        }

        @keyframes gdFadeDown {
          from {
            opacity: 0;

            transform:
              translateY(-15px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0);
          }
        }

        @keyframes gdCardIn {
          from {
            opacity: 0;

            transform:
              translateY(20px)
              scale(.94);

            filter:
              blur(7px);
          }

          to {
            opacity: 1;

            transform:
              translateY(0)
              scale(1);

            filter:
              blur(0);
          }
        }

        @keyframes gdCardFloat {
          0%,100% {
            margin-top: 0;
          }

          50% {
            margin-top: -5px;
          }
        }

        @keyframes gdEnginePulse {
          0%,100% {
            opacity: .35;
            transform: scale(.8);
          }

          50% {
            opacity: 1;
            transform: scale(1.25);
          }
        }

        @keyframes gdOrbitA {
          from {
            transform:
              translate(-50%,-50%)
              rotateX(69deg)
              rotateZ(-12deg);
          }

          to {
            transform:
              translate(-50%,-50%)
              rotateX(69deg)
              rotateZ(17deg);
          }
        }

        @keyframes gdOrbitB {
          from {
            transform:
              translate(-50%,-50%)
              rotateX(72deg)
              rotateZ(28deg);
          }

          to {
            transform:
              translate(-50%,-50%)
              rotateX(72deg)
              rotateZ(-15deg);
          }
        }

        @keyframes gdOrbitC {
          from {
            transform:
              translate(-50%,-50%)
              rotateX(74deg)
              rotateZ(-34deg);
          }

          to {
            transform:
              translate(-50%,-50%)
              rotateX(74deg)
              rotateZ(22deg);
          }
        }

        @keyframes gdWelcome {
          from {
            opacity: 0;

            transform:
              translateX(-50%)
              translateY(20px)
              scale(.95);
          }

          to {
            opacity: 1;

            transform:
              translateX(-50%)
              translateY(0)
              scale(1);
          }
        }

        /* =========================================================
           ANDROID / MOBILE
        ========================================================= */

        @media (max-width: 700px) {

          .gd-splash {
            min-height: 700px;
          }

          .gd-house-photo {
            inset: -2% -18%;

            width: 136%;

            height: 104%;

            object-position:
              55% 56%;

            filter:
              brightness(0.57)
              contrast(1.17)
              saturate(0.68)
              sepia(0.05);
          }

          .gd-photo-color {
            background:

              linear-gradient(
                180deg,
                rgba(3,10,17,0.58),
                rgba(3,11,18,0.10) 34%,
                rgba(1,6,10,0.12) 54%,
                rgba(1,5,9,0.91) 100%
              ),

              linear-gradient(
                90deg,
                rgba(1,5,9,0.55),
                transparent 35%,
                transparent 68%,
                rgba(1,5,9,0.48)
              );
          }

          .gd-grid {
            background-size:
              55px 55px;

            opacity: .045;
          }

          .gd-top-line {
            top: 17px;

            left: 22px;
            right: 22px;
          }

          /* -----------------------------------------------
             MOBILE BRAND PANEL
          ----------------------------------------------- */

          .gd-brand-panel {
            top: 5.1%;
            left: 5.5%;

            width: 89%;

            padding:
              23px 21px 25px;

            border-radius: 21px;

            text-align: center;
          }

          .gd-brand-mini {
            font-size: 7px;

            padding:
              7px 11px;
          }

          .gd-brand-title {
            margin-top: 15px;

            font-size:
              clamp(34px, 10vw, 42px);
          }

          .gd-brand-description {
            margin-top: 11px;

            font-size: 9px;
          }

          .gd-brand-corner {
            top: 18px;
            right: 18px;

            width: 36px;
            height: 36px;
          }

          /* -----------------------------------------------
             ENGINE STATUS
          ----------------------------------------------- */

          .gd-engine {
            display: none;
          }

          /* -----------------------------------------------
             MOBILE HOUSE
          ----------------------------------------------- */

          .gd-orbits {
            left: 50%;
            top: 55%;

            width: 132%;
            height: 45%;
          }

          .gd-orbit {
            height: 42%;
          }

          .gd-orbit-b {
            width: 88%;
            height: 53%;
          }

          .gd-orbit-c {
            width: 80%;
            height: 62%;
          }

          /* -----------------------------------------------
             SPATIAL CARD
          ----------------------------------------------- */

          .gd-spatial {
            right: auto;
            left: 50%;

            transform:
              translateX(-50%);

            bottom: 19%;

            width:
              min(286px, 74vw);

            padding:
              11px 13px;

            border-radius: 15px;

            animation:
              gdCardIn
              1s
              .65s
              both,
              gdMobileCardFloat
              5s
              1.8s
              ease-in-out
              infinite;
          }

          .gd-spatial-icon {
            width: 34px;
            height: 34px;

            flex-basis: 34px;
          }

          .gd-spatial-title {
            font-size: 8px;
          }

          .gd-spatial-sub {
            font-size: 8px;
          }

          /* -----------------------------------------------
             BOTTOM INFORMATION
          ----------------------------------------------- */

          .gd-bottom-info {
            left: 6%;

            right: 6%;

            bottom: 9.6%;
          }

          .gd-preview strong {
            font-size: 8px;
          }

          .gd-preview span {
            font-size: 7px;
          }

          .gd-engine-id strong {
            font-size: 8px;
          }

          .gd-engine-id span {
            font-size: 6px;
          }

          /* -----------------------------------------------
             MOBILE LOADER
          ----------------------------------------------- */

          .gd-loader {
            left: 6%;
            right: 6%;

            bottom: 5%;
          }

          .gd-loader-top {
            font-size: 8px;

            margin-bottom: 9px;
          }

          .gd-progress {
            height: 2px;
          }

          /* -----------------------------------------------
             CORNERS
          ----------------------------------------------- */

          .gd-corner {
            width: 17px;
            height: 17px;

            opacity: .42;
          }

          .gd-corner.tl {
            left: 17px;
            top: 24px;
          }

          .gd-corner.tr {
            right: 17px;
            top: 24px;
          }

          .gd-corner.bl {
            left: 17px;
            bottom: 24px;
          }

          .gd-corner.br {
            right: 17px;
            bottom: 24px;
          }
        }

        /* =========================================================
           SMALL ANDROID
        ========================================================= */

        @media (max-width: 390px) {

          .gd-brand-panel {
            top: 4.7%;

            padding:
              21px 17px 23px;
          }

          .gd-brand-title {
            font-size: 34px;
          }

          .gd-brand-description {
            font-size: 8px;
          }

          .gd-house-photo {
            inset:
              -1% -25%;

            width: 150%;

            object-position:
              54% 56%;
          }

          .gd-orbits {
            top: 54%;

            width: 142%;
          }

          .gd-spatial {
            bottom: 19%;

            width: 76%;
          }

          .gd-bottom-info {
            bottom: 9.5%;
          }

          .gd-loader {
            bottom: 4.7%;
          }
        }

        /* =========================================================
           REDUCED MOTION
        ========================================================= */

        @media (prefers-reduced-motion: reduce) {

          *,
          *::before,
          *::after {
            animation-duration:
              .01ms !important;

            animation-iteration-count:
              1 !important;

            transition-duration:
              .01ms !important;
          }
        }

      `}</style>

      {/* =========================================================
          FULL VISUAL
      ========================================================= */}

      <div className="gd-visual">

        <img
          className="gd-house-photo"
          src={HOUSE_IMAGE}
          alt="Luxury modern home"
        />

        <div className="gd-photo-color" />

        <div className="gd-photo-atmosphere" />

        <div className="gd-grid" />

        <div className="gd-vignette" />

      </div>

      {/* =========================================================
          TECHNICAL FRAME
      ========================================================= */}

      <div className="gd-top-line" />

      <div className="gd-corner tl" />
      <div className="gd-corner tr" />
      <div className="gd-corner bl" />
      <div className="gd-corner br" />

      {/* =========================================================
          BRAND PANEL
      ========================================================= */}

      <div className="gd-brand-panel">

        <div className="gd-brand-corner">

          <svg viewBox="0 0 24 24">

            <circle
              cx="12"
              cy="12"
              r="7"
            />

            <circle
              cx="12"
              cy="12"
              r="2.3"
            />

            <path d="M12 2v3" />
            <path d="M12 19v3" />
            <path d="M2 12h3" />
            <path d="M19 12h3" />

          </svg>

        </div>

        <div className="gd-brand-mini">

          <span className="gd-mini-dot" />

          AI PROPERTY INTELLIGENCE

        </div>

        <div className="gd-brand-title">

          Griha<span>Drishti</span>

        </div>

        <div className="gd-brand-description">

          Intelligence for every address.

        </div>

      </div>

      {/* =========================================================
          ENGINE STATUS
      ========================================================= */}

      <div className="gd-engine">

        <div className="gd-engine-left">

          <span className="gd-engine-dot" />

          VISION ENGINE ONLINE

        </div>

        <div className="gd-engine-value">

          28.6139° N

        </div>

      </div>

      {/* =========================================================
          ORBIT SYSTEM
      ========================================================= */}

      <div className="gd-orbits">

        <div className="gd-orbit gd-orbit-a">

          <span className="gd-orbit-dot a" />
          <span className="gd-orbit-dot b" />

        </div>

        <div className="gd-orbit gd-orbit-b">

          <span className="gd-orbit-dot c" />

        </div>

        <div className="gd-orbit gd-orbit-c" />

      </div>

      {/* =========================================================
          SPATIAL INTELLIGENCE CARD
      ========================================================= */}

      <div className="gd-spatial">

        <div className="gd-spatial-icon">

          <svg viewBox="0 0 24 24">

            <rect
              x="6"
              y="6"
              width="12"
              height="12"
              rx="2"
            />

            <path d="M9 3v3" />
            <path d="M15 3v3" />
            <path d="M9 18v3" />
            <path d="M15 18v3" />
            <path d="M3 9h3" />
            <path d="M18 9h3" />
            <path d="M3 15h3" />
            <path d="M18 15h3" />

          </svg>

        </div>

        <div>

          <div className="gd-spatial-title">

            SPATIAL MODEL ACTIVE

          </div>

          <div className="gd-spatial-sub">

            Reading light, form & context

          </div>

        </div>

      </div>

      {/* =========================================================
          BOTTOM INFORMATION
      ========================================================= */}

      <div className="gd-bottom-info">

        <div className="gd-preview">

          <strong>
            PRIVATE PREVIEW
          </strong>

          <span>
            Architecture understood.
          </span>

        </div>

        <div className="gd-engine-id">

          <strong>
            Vision engine 01
          </strong>

          <span>
            SPATIAL INTELLIGENCE
          </span>

        </div>

      </div>

      {/* =========================================================
          LOADING
      ========================================================= */}

      {!finished ? (

        <div className="gd-loader">

          <div className="gd-loader-top">

            <span>
              {stages[stageIndex]}
            </span>

            <span className="gd-loader-count">

              {String(
                Math.max(
                  1,
                  Math.ceil(progress / 4)
                )
              ).padStart(2, "0")}

              {" / 24"}

            </span>

          </div>

          <div className="gd-progress">

            <div
              className="gd-progress-fill"
              style={{
                width: `${progress}%`,
              }}
            />

            <div
              className="gd-progress-dot"
              style={{
                left: `${progress}%`,
              }}
            />

          </div>

        </div>

      ) : (

        <div className="gd-welcome">

          <div className="gd-welcome-icon">

            <svg viewBox="0 0 24 24">

              <path d="M4 11 12 4l8 7v8H4v-8Z" />

              <path d="M9 20v-5h6v5" />

            </svg>

          </div>

          <div className="gd-welcome-text">

            <strong>
              Welcome to GrihaDrishti
            </strong>

            <span>
              Smarter property intelligence starts here.
            </span>

          </div>

          <div className="gd-welcome-arrow">
            →
          </div>

        </div>

      )}

      {/* =========================================================
          CINEMA BARS
      ========================================================= */}

      <div className="gd-bar-top" />

      <div className="gd-bar-bottom" />

    </div>
  );
}

export default SplashScreen;
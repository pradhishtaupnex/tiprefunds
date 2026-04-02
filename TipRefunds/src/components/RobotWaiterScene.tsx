import React, { useState } from "react";

export function RobotWaiterScene() {
  const [tipping, setTipping] = useState(false);
  const [collected, setCollected] = useState(0);

  const handleTip = () => {
    setTipping(true);
    setTimeout(() => {
      setCollected(prev => prev + 1);
      setTipping(false);
    }, 1200);
  };

  return (
    <div className="w-full max-w-lg h-[400px] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative flex justify-center items-center overflow-hidden rounded-xl shadow-2xl">
      {/* Floating Tips Background */}
      <div className="absolute inset-0 opacity-20">
        <div className="floating-bill" style={{ left: '10%', animationDelay: '0s' }}>💵</div>
        <div className="floating-bill" style={{ left: '80%', animationDelay: '2s' }}>💵</div>
        <div className="floating-bill" style={{ left: '50%', animationDelay: '4s' }}>💵</div>
      </div>

      {/* Robot Waiter */}
      <div className={`robot-waiter ${tipping ? 'robot-receiving' : ''}`}>
        {/* Antenna */}
        <div className="robot-antenna">
          <div className="antenna-base"></div>
          <div className="antenna-light"></div>
        </div>

        {/* Head */}
        <div className="robot-head">
          <div className="robot-eyes">
            <div className="robot-eye left"></div>
            <div className="robot-eye right"></div>
          </div>
          <div className="robot-smile"></div>
        </div>

        {/* Body */}
        <div className="robot-body">
          <div className="robot-chest-light"></div>
          <div className="robot-display">
            <span className="text-green-400 text-xs font-mono">TIPS: {collected}</span>
          </div>
        </div>

        {/* Arms */}
        <div className="robot-arm left-arm">
          <div className="robot-hand"></div>
        </div>
        <div className="robot-arm right-arm">
          <div className="robot-hand"></div>
        </div>

        {/* Wheels */}
        <div className="robot-wheels">
          <div className="wheel"></div>
          <div className="wheel"></div>
        </div>
      </div>

      {/* Tip Coin */}
      {tipping && (
        <div className="tip-coin">
          <div className="coin-inner">$</div>
        </div>
      )}

      {/* Interactive Button */}
      <button
        onClick={handleTip}
        disabled={tipping}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-amber-500 text-slate-900 px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {tipping ? 'Tipping...' : 'Drop a Tip! 💰'}
      </button>

      <style>{`
        .floating-bill {
          position: absolute;
          font-size: 2rem;
          animation: float-up 6s infinite ease-in-out;
        }

        @keyframes float-up {
          0% { transform: translateY(500px) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
        }

        .robot-waiter {
          animation: idle-float 4s ease-in-out infinite;
        }

        @keyframes idle-float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        .robot-waiter {
          position: relative;
          width: 150px;
          height: 280px;
          transform-style: preserve-3d;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .robot-waiter:hover {
          transform: translateY(-15px) scale(1.08) rotateY(8deg);
          filter: drop-shadow(0 20px 40px rgba(59, 130, 246, 0.4));
        }

        .robot-receiving {
          animation: robot-celebrate 1.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }

        @keyframes robot-celebrate {
          0% { transform: scale(1) rotateZ(0deg) translateY(0); }
          15% { transform: scale(1.05) rotateZ(-8deg) translateY(-10px); }
          30% { transform: scale(1.15) rotateZ(8deg) translateY(-5px); }
          45% { transform: scale(1.1) rotateZ(-5deg) translateY(-8px); }
          60% { transform: scale(1.12) rotateZ(5deg) translateY(-3px); }
          75% { transform: scale(1.05) rotateZ(-2deg) translateY(-5px); }
          90% { transform: scale(1.02) rotateZ(1deg) translateY(-2px); }
          100% { transform: scale(1) rotateZ(0deg) translateY(0); }
        }

        /* Antenna */
        .robot-antenna {
          position: absolute;
          top: -30px;
          left: 50%;
          transform: translateX(-50%);
          width: 4px;
          height: 30px;
        }

        .antenna-base {
          width: 4px;
          height: 20px;
          background: linear-gradient(to bottom, #64748b, #94a3b8);
          border-radius: 2px;
        }

        .antenna-light {
          width: 12px;
          height: 12px;
          background: #ef4444;
          border-radius: 50%;
          margin-left: -4px;
          margin-top: 2px;
          box-shadow: 0 0 15px #ef4444;
          animation: blink 1.5s infinite;
        }

        @keyframes blink {
          0%, 100% { opacity: 1; box-shadow: 0 0 20px #ef4444, 0 0 40px rgba(239, 68, 68, 0.5); }
          50% { opacity: 0.4; box-shadow: 0 0 8px #ef4444; }
        }

        /* Head */
        .robot-head {
          width: 100px;
          height: 80px;
          background: linear-gradient(135deg, #475569, #334155);
          border-radius: 20px;
          margin: 0 auto;
          position: relative;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .robot-eyes {
          position: absolute;
          top: 25px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          gap: 20px;
        }

        .robot-eye {
          width: 16px;
          height: 16px;
          background: #3b82f6;
          border-radius: 50%;
          box-shadow: 0 0 15px #3b82f6, inset 0 0 8px #60a5fa;
          animation: eye-glow 3s ease-in-out infinite;
          transition: all 0.3s ease;
        }

        .robot-waiter:hover .robot-eye {
          background: #60a5fa;
          box-shadow: 0 0 25px #3b82f6, inset 0 0 12px #93c5fd;
        }

        @keyframes eye-glow {
          0%, 100% { box-shadow: 0 0 15px #3b82f6, inset 0 0 8px #60a5fa; }
          50% { box-shadow: 0 0 30px #3b82f6, inset 0 0 15px #60a5fa; }
        }

        .robot-smile {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          width: 40px;
          height: 8px;
          border: 2px solid #10b981;
          border-top: none;
          border-radius: 0 0 20px 20px;
        }

        /* Body */
        .robot-body {
          width: 120px;
          height: 100px;
          background: linear-gradient(135deg, #1e293b, #0f172a);
          border-radius: 15px;
          margin: 10px auto 0;
          position: relative;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
        }

        .robot-chest-light {
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, #10b981, #059669);
          border-radius: 50%;
          position: absolute;
          top: 15px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 0 20px #10b981;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: translateX(-50%) scale(1); opacity: 1; box-shadow: 0 0 20px #10b981; }
          50% { transform: translateX(-50%) scale(1.2); opacity: 0.9; box-shadow: 0 0 40px #10b981, 0 0 60px rgba(16, 185, 129, 0.5); }
        }

        .robot-display {
          position: absolute;
          bottom: 15px;
          left: 50%;
          transform: translateX(-50%);
          background: #0a0a0a;
          padding: 4px 12px;
          border-radius: 8px;
          border: 1px solid #22c55e;
          box-shadow: inset 0 0 10px rgba(34, 197, 94, 0.3);
        }

        /* Arms */
        .robot-arm {
          position: absolute;
          width: 15px;
          height: 70px;
          background: linear-gradient(to bottom, #475569, #334155);
          border-radius: 10px;
          top: 100px;
        }

        .left-arm {
          left: -5px;
          transform-origin: top center;
          animation: wave-left 3s infinite ease-in-out;
        }

        .right-arm {
          right: -5px;
          transform-origin: top center;
          animation: wave-right 3s infinite ease-in-out;
        }

        @keyframes wave-left {
          0%, 100% { transform: rotate(-10deg); }
          25% { transform: rotate(-35deg); }
          50% { transform: rotate(-25deg); }
          75% { transform: rotate(-30deg); }
        }

        @keyframes wave-right {
          0%, 100% { transform: rotate(10deg); }
          25% { transform: rotate(35deg); }
          50% { transform: rotate(25deg); }
          75% { transform: rotate(30deg); }
        }

        .robot-hand {
          width: 20px;
          height: 20px;
          background: #64748b;
          border-radius: 50%;
          position: absolute;
          bottom: -10px;
          left: 50%;
          transform: translateX(-50%);
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
        }

        /* Wheels */
        .robot-wheels {
          display: flex;
          justify-content: space-around;
          width: 100px;
          margin: 10px auto 0;
          gap: 30px;
        }

        .wheel {
          width: 30px;
          height: 30px;
          background: radial-gradient(circle, #475569, #1e293b);
          border-radius: 50%;
          border: 3px solid #334155;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
          animation: spin 2s linear infinite;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Tip Coin Animation */
        .tip-coin {
          position: absolute;
          top: 50px;
          left: 50%;
          transform: translateX(-50%);
          width: 50px;
          height: 50px;
          animation: coin-drop 1.2s ease-in;
          z-index: 10;
        }

        .coin-inner {
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, #fbbf24, #f59e0b);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          font-weight: bold;
          color: #78350f;
          box-shadow: 0 4px 20px rgba(251, 191, 36, 0.6);
          animation: coin-spin 1.2s ease-in;
        }

        @keyframes coin-drop {
          0% { top: -50px; opacity: 0; transform: scale(0.5); }
          10% { opacity: 1; transform: scale(1.2); }
          15% { transform: scale(1); }
          70% { top: 170px; opacity: 1; }
          85% { top: 185px; opacity: 0.8; }
          100% { top: 200px; opacity: 0; transform: scale(0.8); }
        }

        @keyframes coin-spin {
          0% { transform: rotateY(0deg) rotateZ(0deg); }
          50% { transform: rotateY(540deg) rotateZ(180deg); }
          100% { transform: rotateY(1440deg) rotateZ(360deg); }
        }
      `}</style>
    </div>
  );
}

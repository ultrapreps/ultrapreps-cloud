import React from 'react';

interface StatBlock {
  [key: string]: string | number;
}

interface Role {
  type: string;
  position: string;
  stats: StatBlock;
}

interface Overlay {
  label: string;
  value?: string | number;
  type?: string;
}

interface HeroCardProps {
  athleteName: string;
  school: string;
  mascot: string;
  schoolColors: [string, string];
  roles: Role[];
  hypeScore: number;
  overlays: Overlay[];
  avatarMode: boolean;
  chainOfCustody: string;
}

export default function HeroCard({
  athleteName,
  school,
  mascot,
  schoolColors,
  roles,
  hypeScore,
  // overlays, // Reserved for future overlay functionality
  avatarMode,
  chainOfCustody
}: HeroCardProps) {
  const primaryRole = roles?.[0];
  const secondaryRoles = roles?.slice(1) || [];

  return (
    <div 
      className="relative w-full max-w-md mx-auto font-oswald overflow-hidden"
      style={{ 
        aspectRatio: '3/4',
        maxWidth: '600px',
        height: '800px',
        borderRadius: '24px',
        boxShadow: '0px 8px 32px rgba(0,0,0,0.35)'
      }}
    >
      {/* Dynamic Background - School Colors Gradient */}
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: `linear-gradient(135deg, ${schoolColors[0]} 0%, ${schoolColors[1]} 50%, #F59E0B 100%)`,
          filter: 'brightness(1.1) saturate(1.2)'
        }}
      />

      {/* Stadium Lighting Overlay */}
      <div 
        className="absolute inset-0 z-10"
        style={{
          background: 'radial-gradient(ellipse at center top, rgba(255,255,255,0.3) 0%, rgba(0,0,0,0.4) 70%)',
          mixBlendMode: 'overlay'
        }}
      />

      {/* Content Container with Safe Zone */}
      <div className="relative z-20 h-full flex flex-col" style={{ padding: '32px' }}>
        
        {/* Hype Wheel - Top Right */}
        <div className="absolute top-8 right-8 z-30">
          <div 
            className="relative flex items-center justify-center text-white font-black text-2xl"
            style={{ 
              width: '100px', 
              height: '100px',
              borderRadius: '50%',
              background: `conic-gradient(${schoolColors[1]} 0deg, ${schoolColors[0]} ${(hypeScore/100) * 360}deg, rgba(255,255,255,0.3) ${(hypeScore/100) * 360}deg)`,
              border: '4px solid rgba(255,255,255,0.8)'
            }}
          >
            <div className="absolute inset-2 bg-black bg-opacity-60 rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-xs text-yellow-400 font-bold">HYPE</div>
                <div className="text-xl text-white font-black">{hypeScore}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col justify-end">
          
          {/* Athlete Name - Large Display */}
          <div 
            className="text-white font-black uppercase tracking-wider mb-2 drop-shadow-lg"
            style={{ 
              fontSize: '64px', 
              lineHeight: '1',
              textShadow: '3px 3px 0 rgba(0,0,0,0.8)'
            }}
          >
            {athleteName}
          </div>

          {/* Primary Role */}
          {primaryRole && (
            <div 
              className="text-white font-bold uppercase mb-4 drop-shadow-md"
              style={{ 
                fontSize: '28px',
                textShadow: '2px 2px 0 rgba(0,0,0,0.7)'
              }}
            >
              {primaryRole.position} #{primaryRole.stats.number || Math.floor(Math.random() * 99) + 1}
            </div>
          )}

          {/* School and Mascot */}
          <div className="mb-6">
            <div 
              className="font-bold uppercase mb-1"
              style={{ 
                fontSize: '20px',
                color: schoolColors[1],
                textShadow: '2px 2px 0 rgba(0,0,0,0.8)'
              }}
            >
              {school}
            </div>
            <div 
              className="text-white font-semibold uppercase"
              style={{ 
                fontSize: '18px',
                textShadow: '1px 1px 0 rgba(0,0,0,0.8)'
              }}
            >
              {mascot}
            </div>
          </div>

          {/* Stats Grid - 2 Column */}
          {primaryRole && (
            <div 
              className="grid grid-cols-2 gap-2 mb-4"
              style={{ gap: '8px' }}
            >
              {Object.entries(primaryRole.stats).slice(0, 6).map(([stat, value]) => (
                <div 
                  key={stat}
                  className="bg-black bg-opacity-60 backdrop-blur-sm rounded-xl p-3 border border-white border-opacity-30"
                >
                  <div className="text-yellow-400 font-bold text-xs uppercase tracking-wide mb-1">
                    {stat.replace(/([A-Z])/g, ' $1').trim()}
                  </div>
                  <div className="text-white font-black text-lg">
                    {value}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Secondary Roles */}
          {secondaryRoles.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {secondaryRoles.map((role, idx) => (
                <div 
                  key={idx}
                  className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-3 py-1 border border-white border-opacity-40"
                >
                  <span className="text-white font-bold text-sm uppercase">
                    {role.type} {role.position}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Avatar Mode Badge */}
          {avatarMode && (
            <div className="mb-2">
              <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
                Avatar Mode
              </span>
            </div>
          )}

          {/* Chain of Custody */}
          <div className="text-white text-opacity-60 text-xs font-mono">
            {chainOfCustody.split('timestamp: ')[1]?.split('T')[0] || 'Generated Today'}
          </div>
        </div>
      </div>

      {/* Mascot Silhouette - Behind Content */}
      <div 
        className="absolute bottom-0 right-0 z-5 opacity-20"
        style={{
          fontSize: '200px',
          transform: 'rotate(-15deg) translate(20%, 10%)',
          color: schoolColors[0],
          filter: 'drop-shadow(0 0 20px rgba(0,0,0,0.5))'
        }}
      >
        🐎
      </div>
    </div>
  );
}
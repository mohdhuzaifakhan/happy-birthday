import { Check, Share2 } from 'lucide-react';
import { useState } from 'react';
import { peopleData } from '../config/birthdayData';

export default function PersonSelector({ currentPersonId, onSelectPerson }) {
  const [copied, setCopied] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const copyLink = (personId) => {
    const url = new URL(window.location.href);
    url.searchParams.set('person', personId);
    navigator.clipboard.writeText(url.toString()).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="fixed top-4 left-4 z-50 flex items-center gap-2">
      <div className="relative">
        {/* <button
          onClick={() => setShowMenu(!showMenu)}
          className="glass-card hover:bg-white/10 text-white rounded-full px-3.5 py-2 text-xs font-semibold flex items-center gap-2 border border-pink-500/30 shadow-lg cursor-pointer transition-all"
        >
          <Heart className="w-4 h-4 text-pink-400 fill-pink-400/30" />
          <span className="hidden sm:inline">Selected:</span>
          <span className="text-pink-300 font-bold">
            {peopleData[currentPersonId]?.friendName || "Person"}
          </span>
        </button> */}

        {showMenu && (
          <div className="absolute top-12 left-0 w-64 glass-card rounded-2xl p-3 shadow-2xl border border-white/20 z-50 space-y-2 text-left bg-slate-950/90 backdrop-blur-xl">
            <p className="text-[11px] uppercase tracking-wider text-slate-400 font-bold px-2">
              Select Birthday Person:
            </p>

            {Object.values(peopleData).map((person) => (
              <div
                key={person.id}
                className={`p-2.5 rounded-xl transition-all cursor-pointer flex items-center justify-between ${currentPersonId === person.id
                    ? 'bg-gradient-to-r from-pink-500/20 to-purple-500/20 border border-pink-400/40'
                    : 'hover:bg-white/5 border border-transparent'
                  }`}
                onClick={() => {
                  onSelectPerson(person.id);
                  setShowMenu(false);
                }}
              >
                <div>
                  <div className="text-xs font-bold text-white">
                    {person.friendName}
                  </div>
                  <div className="text-[10px] text-pink-300">
                    🎂 {person.birthdayDate}
                  </div>
                </div>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    copyLink(person.id);
                  }}
                  className="p-1.5 rounded-lg glass-card hover:bg-white/20 text-slate-300 hover:text-white text-[10px] flex items-center gap-1 cursor-pointer border border-white/10"
                  title="Copy direct link for this person"
                >
                  {copied && currentPersonId === person.id ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3 h-3 text-pink-300" />
                      <span>Copy Link</span>
                    </>
                  )}
                </button>
              </div>
            ))}

            <div className="pt-2 border-t border-white/10 px-2 text-[10px] text-slate-400">
              💡 Sending link with <code className="text-pink-300">?person=afifah</code> automatically opens Afifah's surprise!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

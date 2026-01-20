import React from 'react';
import { StaffMember } from '../types';
import { Coffee, Heart, Star } from 'lucide-react';

interface StaffCardProps {
  staff: StaffMember;
}

const roleColors = {
  Leader: 'bg-red-400',
  Translator: 'bg-blue-400',
  Redrawer: 'bg-green-400',
  Typesetter: 'bg-purple-400',
  'Quality Check': 'bg-kawai-pink',
  'Raw Provider': 'bg-gray-500',
};

export const StaffCard: React.FC<StaffCardProps> = ({ staff }) => {
  return (
    <div className="relative group">
      {/* Background Offset decoration */}
      <div className="absolute inset-0 bg-black translate-x-2 translate-y-2 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform" />
      
      <div className="relative bg-white border-4 border-black p-0 h-full flex flex-col transition-transform group-hover:translate-x-1 group-hover:translate-y-1">
        {/* Header / Avatar Area */}
        <div className={`h-32 ${roleColors[staff.role]} border-b-4 border-black relative overflow-hidden`}>
           {/* Pattern overlay */}
           <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(#fff 2px, transparent 2px)', backgroundSize: '8px 8px'}}></div>
           
           <div className="absolute -bottom-10 left-4">
             <img 
               src={staff.avatarUrl} 
               alt={staff.name} 
               className="w-24 h-24 rounded-none border-4 border-black bg-white object-cover"
             />
           </div>
           
           <div className="absolute top-2 right-2 bg-black text-white px-2 py-1 font-display text-sm -rotate-2">
             {staff.role.toUpperCase()}
           </div>
        </div>

        {/* Content */}
        <div className="pt-12 px-4 pb-4 flex-grow flex flex-col gap-3">
          <div>
            <h2 className="text-2xl font-display font-bold text-black uppercase">{staff.name}</h2>
            <p className="text-sm font-bold text-gray-500 italic">"{staff.favManga}" Fanatic</p>
          </div>
          
          <p className="text-sm border-l-4 border-kawai-yellow pl-2 italic">
            {staff.bio}
          </p>

          <div className="grid grid-cols-2 gap-2 my-2 bg-gray-100 p-2 border-2 border-black border-dashed">
            <div className="flex items-center gap-1">
               <Coffee size={16} className="text-amber-700" />
               <span className="font-bold text-xs">COFFEE: {staff.coffeeConsumption}</span>
            </div>
            <div className="flex items-center gap-1">
               <Star size={16} className="text-kawai-yellow fill-kawai-yellow" />
               <span className="font-bold text-xs">PWR: {staff.powerLevel}</span>
            </div>
          </div>

          <div className="mt-auto">
            <div className="flex items-center gap-2 mb-2">
              <Heart size={16} className="text-kawai-pink fill-kawai-pink animate-pulse" />
              <span className="font-display text-lg">HOBBIES</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {staff.hobbies.map((hobby, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-1 text-xs font-bold border-2 border-black bg-kawai-cyan shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] transition-all cursor-default"
                >
                  {hobby.name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
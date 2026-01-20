import React, { useState, useEffect } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { Link } from 'react-router-dom';
import { getStaffData, saveStaffData, getMascotData, saveMascotData, getHobbyCategories, saveHobbyCategories } from '../utils/storage';
import { StaffMember, MascotData } from '../types';
import { Trash2, Save, UploadCloud, Plus, RefreshCw, LogOut, Dices, X } from 'lucide-react';

export default function Admin() {
  const [user, setUser] = useState<any>(null);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [mascotData, setMascotData] = useState<MascotData>({ gifs: [], quotes: [], fallbackImage: '' });
  const [hobbyCategories, setHobbyCategories] = useState<string[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMsg, setStatusMsg] = useState('');
  const [newCategory, setNewCategory] = useState('');

  // Authorized emails from env
  const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || '').split(',');

  useEffect(() => {
    // Load initial data
    setStaffList(getStaffData());
    setMascotData(getMascotData());
    setHobbyCategories(getHobbyCategories());
  }, []);

  const handleLoginSuccess = (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      if (adminEmails.includes(decoded.email)) {
        setUser(decoded);
      } else {
        alert('Access Denied: Your email is not in the admin list.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSaveLocal = () => {
    saveStaffData(staffList);
    saveMascotData(mascotData);
    saveHobbyCategories(hobbyCategories);
    setStatusMsg('Saved to local browser storage! (Visitors won\'t see this yet)');
    setTimeout(() => setStatusMsg(''), 3000);
  };

  const handlePushToGithub = async () => {
    setIsSyncing(true);
    setStatusMsg('Pushing to GitHub... This might take a few seconds.');
    
    try {
      // Generate the file content string
      const fileContent = `
import { StaffMember, MascotData } from '../types';

// Update this version number whenever you push new changes to GitHub!
// This forces visitors' browsers to load the new data instead of their old cached copy.
export const DATA_VERSION = '${new Date().getTime()}';

export const INITIAL_HOBBY_CATEGORIES = ${JSON.stringify(hobbyCategories, null, 2)};

export const INITIAL_STAFF: StaffMember[] = ${JSON.stringify(staffList, null, 2)};

export const INITIAL_MASCOT: MascotData = ${JSON.stringify(mascotData, null, 2)};
`;

      const response = await fetch(`https://api.github.com/repos/${import.meta.env.VITE_GITHUB_REPO}/dispatches`, {
        method: 'POST',
        headers: {
          Accept: 'application/vnd.github.v3+json',
          Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
        },
        body: JSON.stringify({
          event_type: 'update_data',
          client_payload: { content: fileContent },
        }),
      });

      if (response.ok) {
        setStatusMsg('SUCCESS! GitHub is rebuilding the site. Wait ~2 mins.');
      } else {
        setStatusMsg('ERROR: Check console for details.');
        console.error('GitHub Error:', await response.text());
      }
    } catch (error) {
      console.error(error);
      setStatusMsg('Network Error.');
    } finally {
      setIsSyncing(false);
    }
  };

  // ---- STAFF EDITING HELPERS ----
  const updateStaff = (id: string, field: keyof StaffMember, value: any) => {
    setStaffList(prev => prev.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  const addHobby = (staffId: string) => {
    setStaffList(prev => prev.map(s => {
      if (s.id === staffId) {
        return { ...s, hobbies: [...s.hobbies, { name: 'New Hobby', category: hobbyCategories[0] || 'Creative' }] };
      }
      return s;
    }));
  };

  const updateHobby = (staffId: string, hobbyIdx: number, field: 'name' | 'category', value: string) => {
    setStaffList(prev => prev.map(s => {
      if (s.id === staffId) {
        const newHobbies = [...s.hobbies];
        newHobbies[hobbyIdx] = { ...newHobbies[hobbyIdx], [field]: value };
        return { ...s, hobbies: newHobbies };
      }
      return s;
    }));
  };

  const removeHobby = (staffId: string, hobbyIdx: number) => {
     setStaffList(prev => prev.map(s => {
      if (s.id === staffId) {
        return { ...s, hobbies: s.hobbies.filter((_, i) => i !== hobbyIdx) };
      }
      return s;
    }));
  };

  const deleteStaff = (id: string) => {
    if (confirm('Delete this staff member?')) {
      setStaffList(prev => prev.filter(s => s.id !== id));
    }
  };

  const addNewStaff = () => {
    const newStaff: StaffMember = {
      id: Date.now().toString(),
      name: 'New Staff',
      role: 'Quality Check',
      avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=' + Date.now(),
      bio: 'Bio goes here...',
      favManga: 'Manga name',
      hobbies: [],
      powerLevel: 5000,
      coffeeConsumption: 1
    };
    setStaffList([...staffList, newStaff]);
  };

  // ---- CATEGORY HELPERS ----
  const addCategory = () => {
    if (newCategory.trim() && !hobbyCategories.includes(newCategory.trim())) {
      setHobbyCategories([...hobbyCategories, newCategory.trim()]);
      setNewCategory('');
    }
  };

  const removeCategory = (cat: string) => {
    if (confirm(`Remove category "${cat}"?`)) {
      setHobbyCategories(hobbyCategories.filter(c => c !== cat));
    }
  };

  // Render Login
  if (!user) {
    return (
      <div className="min-h-screen bg-kawai-dark flex items-center justify-center p-4">
        <div className="bg-white border-4 border-kawai-pink shadow-funky p-8 max-w-md w-full text-center">
          <h1 className="font-display text-4xl mb-6">Staff Access</h1>
          <div className="flex justify-center">
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={() => console.log('Login Failed')}
            />
          </div>
          <p className="mt-4 text-sm text-gray-500">Only authorized emails allowed.</p>
          <Link to="/" className="block mt-6 text-kawai-pink underline hover:text-kawai-cyan">Back to Home</Link>
        </div>
      </div>
    );
  }

  // Render Dashboard
  return (
    <div className="min-h-screen bg-gray-100 font-body pb-20">
      <nav className="bg-kawai-dark text-white p-4 sticky top-0 z-50 flex justify-between items-center border-b-4 border-kawai-cyan">
        <h1 className="font-display text-2xl text-kawai-yellow">ADMIN PANEL</h1>
        <div className="flex items-center gap-4">
          <span className="hidden md:inline">Welcome, {user.given_name}</span>
          <button onClick={() => setUser(null)} className="p-2 bg-red-500 hover:bg-red-600 rounded text-xs font-bold">LOGOUT</button>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto p-4 space-y-8 mt-8">
        
        {/* ACTION BAR */}
        <div className="bg-white p-4 border-4 border-black shadow-funky flex flex-col md:flex-row gap-4 justify-between items-center sticky top-20 z-40">
           <div className="text-lg font-bold">
             {statusMsg && <span className="text-kawai-purple animate-pulse">{statusMsg}</span>}
           </div>
           <div className="flex gap-4">
             <button onClick={handleSaveLocal} className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-black hover:bg-gray-100 font-bold">
               <Save size={18} /> Save Local
             </button>
             <button onClick={handlePushToGithub} disabled={isSyncing} className={`flex items-center gap-2 px-4 py-2 bg-kawai-pink text-white border-2 border-black font-bold shadow-[2px_2px_0px_#000] hover:translate-y-1 hover:shadow-none transition-all ${isSyncing ? 'opacity-50 cursor-not-allowed' : ''}`}>
               <UploadCloud size={18} /> {isSyncing ? 'Syncing...' : 'PUSH TO GITHUB'}
             </button>
           </div>
        </div>

        {/* HOBBY CATEGORY CONFIG */}
        <div className="bg-white p-6 border-4 border-black">
          <h2 className="text-3xl font-display mb-6 border-b-2 border-gray-200 pb-2">Hobby Categories</h2>
          <p className="text-sm text-gray-500 mb-4">Manage the categories available for staff hobbies. These are used in the charts.</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
             {hobbyCategories.map(cat => (
               <span key={cat} className="bg-gray-100 border border-black px-3 py-1 flex items-center gap-2 font-bold text-sm">
                 {cat}
                 <button onClick={() => removeCategory(cat)} className="text-red-500 hover:text-red-700"><X size={14}/></button>
               </span>
             ))}
          </div>

          <div className="flex gap-2 max-w-sm">
             <input 
               type="text" 
               className="border-2 border-gray-300 p-2 w-full" 
               placeholder="New Category..." 
               value={newCategory} 
               onChange={(e) => setNewCategory(e.target.value)}
               onKeyDown={(e) => e.key === 'Enter' && addCategory()}
             />
             <button onClick={addCategory} className="bg-kawai-cyan border-2 border-black px-4 font-bold hover:bg-cyan-300">ADD</button>
          </div>
        </div>

        {/* STAFF SECTION */}
        <div className="bg-white p-6 border-4 border-black">
          <div className="flex justify-between items-center mb-6 border-b-2 border-gray-200 pb-2">
            <h2 className="text-3xl font-display">Staff List ({staffList.length})</h2>
            <button onClick={addNewStaff} className="flex items-center gap-2 bg-kawai-cyan px-4 py-2 font-bold border-2 border-black hover:bg-cyan-300">
              <Plus size={18} /> ADD NEW
            </button>
          </div>

          <div className="space-y-6">
            {staffList.map((staff) => (
              <div key={staff.id} className="border-2 border-gray-300 p-4 relative bg-gray-50 group hover:border-black transition-colors">
                <button 
                  onClick={() => deleteStaff(staff.id)}
                  className="absolute top-2 right-2 text-red-400 hover:text-red-600 z-10"
                >
                  <Trash2 size={20} />
                </button>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    
                    {/* AVATAR CONTROL */}
                    <div className="flex items-start gap-2 bg-gray-100 p-2 border border-gray-300">
                        <img src={staff.avatarUrl || `https://api.dicebear.com/7.x/avataaars/svg?seed=${staff.id}`} className="w-12 h-12 border-2 border-black bg-white object-cover shrink-0" alt="avatar" />
                        <div className="min-w-0 flex-1">
                            <label className="text-xs font-bold text-gray-500 block">Avatar URL</label>
                            <div className="flex gap-1">
                                <input 
                                    className="w-full border p-1 text-xs" 
                                    value={staff.avatarUrl} 
                                    onChange={(e) => updateStaff(staff.id, 'avatarUrl', e.target.value)}
                                    placeholder="https://..."
                                />
                                <button 
                                    onClick={() => updateStaff(staff.id, 'avatarUrl', `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`)}
                                    className="bg-kawai-yellow px-2 border border-black hover:bg-yellow-400 text-black flex items-center justify-center"
                                    title="Generate Random Avatar"
                                >
                                <Dices size={14} />
                                </button>
                            </div>
                        </div>
                    </div>

                    <label className="text-xs font-bold text-gray-500">Name</label>
                    <input className="w-full border p-1" value={staff.name} onChange={(e) => updateStaff(staff.id, 'name', e.target.value)} />
                    
                    <label className="text-xs font-bold text-gray-500">Role</label>
                    <select className="w-full border p-1" value={staff.role} onChange={(e) => updateStaff(staff.id, 'role', e.target.value)}>
                       {['Leader', 'Translator', 'Redrawer', 'Typesetter', 'Quality Check', 'Raw Provider'].map(r => <option key={r} value={r}>{r}</option>)}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500">Bio</label>
                    <textarea className="w-full border p-1 text-sm" rows={3} value={staff.bio} onChange={(e) => updateStaff(staff.id, 'bio', e.target.value)} />
                  </div>
                  
                  <div className="space-y-2">
                     <label className="text-xs font-bold text-gray-500">Fav Manga</label>
                     <input className="w-full border p-1" value={staff.favManga} onChange={(e) => updateStaff(staff.id, 'favManga', e.target.value)} />
                     <div className="flex gap-2">
                        <div>
                          <label className="text-xs font-bold text-gray-500">Coffee</label>
                          <input type="number" className="w-full border p-1" value={staff.coffeeConsumption} onChange={(e) => updateStaff(staff.id, 'coffeeConsumption', parseInt(e.target.value))} />
                        </div>
                        <div>
                          <label className="text-xs font-bold text-gray-500">Power</label>
                          <input type="number" className="w-full border p-1" value={staff.powerLevel} onChange={(e) => updateStaff(staff.id, 'powerLevel', parseInt(e.target.value))} />
                        </div>
                     </div>
                  </div>

                  <div className="space-y-2 bg-white p-2 border border-dashed border-gray-400">
                    <label className="text-xs font-bold text-gray-500 block">Hobbies <button onClick={() => addHobby(staff.id)} className="text-blue-500 ml-2">(+Add)</button></label>
                    {staff.hobbies.map((hobby, idx) => (
                      <div key={idx} className="flex gap-1 mb-1">
                        <input className="w-2/3 border text-xs p-1" value={hobby.name} onChange={(e) => updateHobby(staff.id, idx, 'name', e.target.value)} />
                        <select className="w-1/3 border text-xs p-1" value={hobby.category} onChange={(e) => updateHobby(staff.id, idx, 'category', e.target.value as any)}>
                          {hobbyCategories.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                        <button onClick={() => removeHobby(staff.id, idx)} className="text-red-500 text-xs">x</button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MASCOT SECTION */}
        <div className="bg-white p-6 border-4 border-black">
           <h2 className="text-3xl font-display mb-6 border-b-2 border-gray-200 pb-2">Mascot Config</h2>
           <div className="grid md:grid-cols-2 gap-8">
             <div>
               <h3 className="font-bold mb-2">GIF URLs (One per line)</h3>
               <textarea 
                 className="w-full border-2 border-gray-300 p-2 font-mono text-xs h-40"
                 value={mascotData.gifs.join('\n')}
                 onChange={(e) => setMascotData({...mascotData, gifs: e.target.value.split('\n').filter(s => s.trim() !== '')})}
               />
               <p className="text-xs text-gray-500 mt-1">These cycle randomly on the home page.</p>
             </div>
             <div>
               <h3 className="font-bold mb-2">Quotes (One per line)</h3>
               <textarea 
                 className="w-full border-2 border-gray-300 p-2 font-mono text-xs h-40"
                 value={mascotData.quotes.join('\n')}
                 onChange={(e) => setMascotData({...mascotData, quotes: e.target.value.split('\n').filter(s => s.trim() !== '')})}
               />
             </div>
           </div>
        </div>

      </div>
    </div>
  );
}
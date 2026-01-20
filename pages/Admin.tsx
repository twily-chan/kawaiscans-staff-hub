import React, { useState, useEffect } from 'react';
import { getStaffData, saveStaffData, getMascotData, saveMascotData } from '../utils/storage';
import { StaffMember, MascotData, Hobby } from '../types';
import { Trash2, Plus, Save, Edit, LogOut, Download, AlertTriangle, UserCheck, CloudLightning, Key, Github, CheckCircle, ShieldCheck, Lock } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [loginError, setLoginError] = useState('');
  
  // Dashboard State
  const [activeTab, setActiveTab] = useState<'staff' | 'mascot'>('staff');
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [mascotData, setMascotData] = useState<MascotData | null>(null);
  
  // Editing State
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Cloud Sync State
  const [showSyncModal, setShowSyncModal] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);

  // Environment Variables
  const ADMIN_EMAILS_STR = import.meta.env.VITE_ADMIN_EMAILS || "";
  const ALLOWED_ADMINS = ADMIN_EMAILS_STR.split(',').map((e: string) => e.trim());

  // Detect if secrets are injected via GitHub Actions
  const ENV_GITHUB_TOKEN = import.meta.env.VITE_GITHUB_TOKEN || "";
  const ENV_GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || "";

  // Local state for manual override if env vars are missing
  const [manualToken, setManualToken] = useState('');
  const [manualRepo, setManualRepo] = useState('');

  // Effective values
  const githubToken = ENV_GITHUB_TOKEN || manualToken;
  const githubRepo = ENV_GITHUB_REPO || manualRepo;

  useEffect(() => {
    // Check session storage for auth persistence
    const auth = sessionStorage.getItem('kawai_admin_auth');
    const storedEmail = sessionStorage.getItem('kawai_admin_email');
    if (auth === 'true' && storedEmail) {
      setIsAuthenticated(true);
      setUserEmail(storedEmail);
      loadData();
    }
  }, []);

  const loadData = () => {
    setStaffList(getStaffData());
    setMascotData(getMascotData());
  };

  const handleGoogleSuccess = (credentialResponse: any) => {
    try {
      const decoded: any = jwtDecode(credentialResponse.credential);
      const email = decoded.email;

      if (ALLOWED_ADMINS.includes(email) || ALLOWED_ADMINS.length === 0) {
        // If list is empty, we allow access (dev mode) or block all? 
        // Better to allow if empty for testing, but warn.
        setIsAuthenticated(true);
        setUserEmail(email);
        sessionStorage.setItem('kawai_admin_auth', 'true');
        sessionStorage.setItem('kawai_admin_email', email);
        loadData();
        setLoginError('');
      } else {
        setLoginError(`Access Denied: ${email} is not in the authorized list.`);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Login Failed', error);
      setLoginError('Authentication failed. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserEmail('');
    sessionStorage.removeItem('kawai_admin_auth');
    sessionStorage.removeItem('kawai_admin_email');
    window.location.href = '/';
  };

  // Staff Management
  const handleDeleteStaff = (id: string) => {
    if (window.confirm('Are you sure you want to fire this person?')) {
      const updated = staffList.filter(s => s.id !== id);
      setStaffList(updated);
      saveStaffData(updated);
    }
  };

  const handleEditStaff = (staff: StaffMember) => {
    setEditingStaff({ ...staff });
    setIsEditing(true);
  };

  const handleNewStaff = () => {
    setEditingStaff({
      id: Date.now().toString(),
      name: 'Newbie',
      role: 'Quality Check',
      avatarUrl: 'https://picsum.photos/200',
      bio: 'New recruit.',
      favManga: 'Naruto',
      hobbies: [],
      powerLevel: 100,
      coffeeConsumption: 1
    });
    setIsEditing(true);
  };

  const saveStaffEdit = () => {
    if (!editingStaff) return;
    const existingIndex = staffList.findIndex(s => s.id === editingStaff.id);
    let updatedList;
    if (existingIndex >= 0) {
      updatedList = [...staffList];
      updatedList[existingIndex] = editingStaff;
    } else {
      updatedList = [...staffList, editingStaff];
    }
    setStaffList(updatedList);
    saveStaffData(updatedList);
    setIsEditing(false);
    setEditingStaff(null);
  };

  // Mascot Management
  const handleMascotSave = () => {
    if (mascotData) {
      saveMascotData(mascotData);
      alert('Mascot updated locally!');
    }
  };

  // --- Generation Logic ---
  const generateFileContent = () => {
    if (!mascotData) return '';
    const newVersion = `1.0.${Math.floor(Date.now() / 1000)}`;
    return `import { StaffMember, MascotData } from '../types';

// Update this version number whenever you push new changes to GitHub!
// This forces visitors' browsers to load the new data instead of their old cached copy.
export const DATA_VERSION = '${newVersion}';

export const INITIAL_STAFF: StaffMember[] = ${JSON.stringify(staffList, null, 2)};

export const INITIAL_MASCOT: MascotData = ${JSON.stringify(mascotData, null, 2)};
`;
  };

  const handleDownloadConfig = () => {
    const fileContent = generateFileContent();
    if (!fileContent) return;
    
    const blob = new Blob([fileContent], { type: 'text/typescript' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'initialData.ts';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    alert('Config downloaded! Replace utils/initialData.ts with this file and push to GitHub.');
  };

  const handleCloudSync = async () => {
    if (!githubToken || !githubRepo) {
      alert("Error: Missing Configuration. Please enter Repo Name and Token.");
      return;
    }

    if (!window.confirm(`Are you sure you want to push updates to ${githubRepo}? This will trigger a site rebuild.`)) return;

    setIsSyncing(true);
    const content = generateFileContent();

    try {
      const response = await fetch(`https://api.github.com/repos/${githubRepo}/dispatches`, {
        method: 'POST',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': `token ${githubToken}`,
        },
        body: JSON.stringify({
          event_type: 'update_data',
          client_payload: {
            content: content
          }
        })
      });

      if (response.ok) {
        alert("🚀 Success! GitHub is now rebuilding your site. It should be live in ~2 minutes.");
        setShowSyncModal(false);
      } else {
        const err = await response.json();
        alert(`Error: ${err.message || "Failed to trigger update"}`);
      }
    } catch (e) {
      alert("Network error. Check console.");
      console.error(e);
    } finally {
      setIsSyncing(false);
    }
  };

  // Login Screen
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-kawai-dark flex items-center justify-center p-4">
        <div className="bg-white border-4 border-kawai-pink shadow-funky p-8 max-w-md w-full relative">
          <div className="absolute -top-6 -left-6 bg-kawai-yellow border-4 border-black px-4 py-2 font-display text-2xl rotate-[-10deg]">
             SECRET BASE
          </div>
          <h1 className="font-display text-4xl mb-6 text-center">ADMIN LOGIN</h1>
          
          <div className="flex flex-col items-center gap-4">
             <div className="bg-gray-100 p-4 border-2 border-dashed border-black w-full text-center">
                <div className="mb-4">
                  <Lock className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                  <p className="font-bold mb-2">Google Secure Access</p>
                </div>
                <div className="flex justify-center">
                   <GoogleLogin 
                      onSuccess={handleGoogleSuccess}
                      onError={() => setLoginError('Login Failed')}
                      useOneTap
                      theme="filled_black"
                      shape="pill"
                   />
                </div>
             </div>

             {loginError && (
                <div className="bg-red-100 border-2 border-red-500 text-red-700 p-2 text-sm font-bold w-full text-center animate-wiggle">
                   {loginError}
                </div>
             )}
          </div>
          
          <div className="mt-8 text-center">
            <a href="/" className="underline text-gray-500 hover:text-black">Back to Home</a>
          </div>
        </div>
      </div>
    );
  }

  // Edit Form Modal
  const EditModal = () => {
    if (!editingStaff) return null;
    const handleHobbyChange = (str: string) => {
       const parts = str.split(',').map(s => s.trim());
       const newHobbies: Hobby[] = parts.map(name => ({ name, category: 'Otaku' }));
       setEditingStaff({ ...editingStaff, hobbies: newHobbies });
    };

    return (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto">
        <div className="bg-white border-4 border-kawai-cyan w-full max-w-2xl p-6 shadow-funky relative">
          <h2 className="font-display text-3xl mb-4 border-b-4 border-black pb-2">Editing: {editingStaff.name}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             {/* ... inputs ... */}
            <div>
              <label className="font-bold text-xs">Name</label>
              <input className="w-full border-2 border-black p-1" value={editingStaff.name} onChange={e => setEditingStaff({...editingStaff, name: e.target.value})} />
            </div>
            <div>
              <label className="font-bold text-xs">Role</label>
              <select className="w-full border-2 border-black p-1" value={editingStaff.role} onChange={e => setEditingStaff({...editingStaff, role: e.target.value as any})}>
                <option>Leader</option>
                <option>Translator</option>
                <option>Redrawer</option>
                <option>Typesetter</option>
                <option>Quality Check</option>
                <option>Raw Provider</option>
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="font-bold text-xs">Avatar URL</label>
              <input className="w-full border-2 border-black p-1" value={editingStaff.avatarUrl} onChange={e => setEditingStaff({...editingStaff, avatarUrl: e.target.value})} />
            </div>
            <div className="md:col-span-2">
              <label className="font-bold text-xs">Bio</label>
              <textarea className="w-full border-2 border-black p-1 h-20" value={editingStaff.bio} onChange={e => setEditingStaff({...editingStaff, bio: e.target.value})} />
            </div>
            <div>
              <label className="font-bold text-xs">Fav Manga</label>
              <input className="w-full border-2 border-black p-1" value={editingStaff.favManga} onChange={e => setEditingStaff({...editingStaff, favManga: e.target.value})} />
            </div>
            <div>
              <label className="font-bold text-xs">Hobbies (comma separated)</label>
              <input className="w-full border-2 border-black p-1" value={editingStaff.hobbies.map(h => h.name).join(', ')} onChange={e => handleHobbyChange(e.target.value)} placeholder="Gaming, Reading, ..." />
            </div>
             <div>
              <label className="font-bold text-xs">Power Level</label>
              <input type="number" className="w-full border-2 border-black p-1" value={editingStaff.powerLevel} onChange={e => setEditingStaff({...editingStaff, powerLevel: parseInt(e.target.value)})} />
            </div>
            <div>
              <label className="font-bold text-xs">Coffee (Cups)</label>
              <input type="number" className="w-full border-2 border-black p-1" value={editingStaff.coffeeConsumption} onChange={e => setEditingStaff({...editingStaff, coffeeConsumption: parseInt(e.target.value)})} />
            </div>
          </div>
          <div className="flex justify-end gap-4 mt-6">
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 border-2 border-black hover:bg-gray-200 font-bold">CANCEL</button>
            <button onClick={saveStaffEdit} className="px-4 py-2 bg-kawai-pink text-white border-2 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-1 hover:shadow-none font-bold">SAVE CHANGES</button>
          </div>
        </div>
      </div>
    );
  };

  // Sync Modal
  const SyncModal = () => {
    if (!showSyncModal) return null;
    return (
      <div className="fixed inset-0 bg-black/90 z-[60] flex items-center justify-center p-4">
        <div className="bg-white border-4 border-kawai-pink max-w-md w-full p-6 shadow-funky">
           <h3 className="font-display text-2xl mb-4 flex items-center gap-2">
             <CloudLightning className="text-kawai-yellow fill-kawai-yellow" /> Cloud Auto-Deploy
           </h3>
           <p className="text-sm mb-4 bg-gray-100 p-2 border-l-4 border-black">
             This triggers a "Repository Dispatch". GitHub Actions will pick up the data and rebuild the site.
           </p>
           
           <div className="space-y-4 bg-gray-50 p-4 border-2 border-gray-200 mb-6">
              
              {/* REPO CONFIG */}
              <div className="flex items-center gap-2">
                 <Github size={16} />
                 <span className="font-bold text-sm min-w-[50px]">Repo:</span>
                 {ENV_GITHUB_REPO ? (
                   <div className="flex items-center gap-2 text-green-600 font-bold bg-green-100 px-2 py-1 rounded">
                     <CheckCircle size={14} />
                     <span className="font-mono text-sm">{ENV_GITHUB_REPO}</span>
                   </div>
                 ) : (
                   <input 
                      className="border-2 border-black p-1 text-sm w-full" 
                      placeholder="username/repo"
                      value={manualRepo}
                      onChange={(e) => setManualRepo(e.target.value)}
                   />
                 )}
              </div>

              {/* TOKEN CONFIG */}
              <div className="flex items-center gap-2">
                 <Key size={16} />
                 <span className="font-bold text-sm min-w-[50px]">Token:</span>
                 {ENV_GITHUB_TOKEN ? (
                   <div className="flex items-center gap-2 text-green-600 font-bold bg-green-100 px-2 py-1 rounded w-full">
                      <ShieldCheck size={14} />
                      <span className="text-xs">Securely Loaded from GitHub Secrets</span>
                   </div>
                 ) : (
                   <input 
                      type="password"
                      className="border-2 border-black p-1 text-sm w-full" 
                      placeholder="ghp_xxxxxxxxxxxx"
                      value={manualToken}
                      onChange={(e) => setManualToken(e.target.value)}
                   />
                 )}
              </div>
           </div>

           <div className="flex justify-end gap-4">
              <button onClick={() => setShowSyncModal(false)} className="font-bold underline text-sm text-gray-500">Cancel</button>
              <button 
                onClick={handleCloudSync} 
                disabled={isSyncing || (!githubToken || !githubRepo)}
                className="bg-kawai-purple text-white px-6 py-2 border-2 border-black font-bold hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSyncing ? 'SENDING SIGNAL...' : 'PUSH UPDATE'}
              </button>
           </div>
        </div>
      </div>
    );
  };

  // Main Dashboard
  return (
    <div className="min-h-screen bg-gray-100 font-body">
      <div className="bg-black text-white p-4 flex justify-between items-center border-b-4 border-kawai-cyan">
        <h1 className="font-display text-2xl text-kawai-yellow">KAWAISCANS ADMIN PANEL</h1>
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-2 text-sm text-gray-300">
             <UserCheck size={16} />
             <span>{userEmail}</span>
          </div>
          <a href="/" target="_blank" rel="noopener noreferrer" className="hover:text-kawai-pink font-bold underline">Open Site</a>
          <button onClick={handleLogout} className="flex items-center gap-2 bg-red-500 text-white px-3 py-1 font-bold border-2 border-white hover:bg-red-600">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        
        {/* Security Banner if Token is Present */}
        {ENV_GITHUB_TOKEN && (
          <div className="bg-red-100 border-4 border-red-500 p-3 mb-6 flex items-center gap-3 animate-pulse">
             <ShieldCheck className="text-red-600" size={24} />
             <div>
                <p className="font-bold text-red-700 uppercase text-sm">Security Notice</p>
                <p className="text-xs text-red-900">
                  Your GitHub Token is currently active in this session. 
                  Ensure this repository is <strong>PRIVATE</strong> or anyone can view your token by inspecting the code.
                </p>
             </div>
          </div>
        )}

        <div className="bg-kawai-yellow border-4 border-black p-4 mb-8 shadow-funky flex flex-col md:flex-row items-center justify-between gap-4">
           <div className="flex items-center gap-4">
              <AlertTriangle className="w-10 h-10 text-black animate-bounce" />
              <div>
                 <h3 className="font-display text-xl">DEPLOYMENT MODE</h3>
                 <p className="font-bold text-sm">Save your changes below, then choose how to deploy.</p>
              </div>
           </div>
           
           <div className="flex gap-2">
             <button onClick={handleDownloadConfig} className="bg-white text-black font-bold px-4 py-2 border-4 border-black hover:bg-gray-100 flex items-center gap-2">
                <Download size={20} /> MANUAL (FILE)
             </button>
             <button onClick={() => setShowSyncModal(true)} className="bg-kawai-purple text-white font-bold px-4 py-2 border-4 border-black hover:bg-purple-600 flex items-center gap-2 animate-pulse">
                <CloudLightning size={20} /> AUTO (CLOUD)
             </button>
           </div>
        </div>

        <div className="flex gap-4 mb-6">
          <button onClick={() => setActiveTab('staff')} className={`px-6 py-2 font-display text-xl border-4 border-black ${activeTab === 'staff' ? 'bg-kawai-pink text-white shadow-funky' : 'bg-white hover:bg-gray-100'}`}>STAFF LIST</button>
          <button onClick={() => setActiveTab('mascot')} className={`px-6 py-2 font-display text-xl border-4 border-black ${activeTab === 'mascot' ? 'bg-kawai-cyan text-black shadow-funky' : 'bg-white hover:bg-gray-100'}`}>MASCOT CONFIG</button>
        </div>

        {activeTab === 'staff' && (
          <div className="bg-white border-4 border-black p-6 shadow-funky">
            <div className="flex justify-between mb-6">
              <h2 className="font-display text-2xl">Manage Team ({staffList.length})</h2>
              <button onClick={handleNewStaff} className="flex items-center gap-2 bg-kawai-yellow border-2 border-black px-4 py-2 font-bold hover:bg-yellow-400">
                <Plus size={20} /> Add Member
              </button>
            </div>
            <div className="grid grid-cols-1 gap-4">
              {staffList.map(staff => (
                <div key={staff.id} className="flex items-center justify-between border-2 border-gray-200 p-4 hover:border-black transition-colors bg-gray-50">
                   <div className="flex items-center gap-4">
                      <img src={staff.avatarUrl} alt={staff.name} className="w-12 h-12 object-cover border-2 border-black" />
                      <div>
                        <h3 className="font-bold text-lg">{staff.name}</h3>
                        <span className="text-xs bg-black text-white px-2 py-0.5 rounded-full">{staff.role}</span>
                      </div>
                   </div>
                   <div className="flex gap-2">
                      <button onClick={() => handleEditStaff(staff)} className="p-2 text-blue-600 hover:bg-blue-100 rounded border-2 border-transparent hover:border-blue-600"><Edit size={20} /></button>
                      <button onClick={() => handleDeleteStaff(staff.id)} className="p-2 text-red-600 hover:bg-red-100 rounded border-2 border-transparent hover:border-red-600"><Trash2 size={20} /></button>
                   </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'mascot' && mascotData && (
          <div className="bg-white border-4 border-black p-6 shadow-funky">
             <h2 className="font-display text-2xl mb-6">Mascot Settings (Kubo)</h2>
             <div className="grid gap-6">
               <div><label className="font-bold block mb-2">GIF URLs</label><textarea className="w-full h-32 border-4 border-gray-200 p-2 font-mono text-sm focus:border-black" value={mascotData.gifs.join('\n')} onChange={(e) => setMascotData({...mascotData, gifs: e.target.value.split('\n').filter(s => s.trim() !== '')})} /></div>
               <div><label className="font-bold block mb-2">Quotes</label><textarea className="w-full h-32 border-4 border-gray-200 p-2 font-mono text-sm focus:border-black" value={mascotData.quotes.join('\n')} onChange={(e) => setMascotData({...mascotData, quotes: e.target.value.split('\n').filter(s => s.trim() !== '')})} /></div>
               <div><label className="font-bold block mb-2">Fallback Image URL</label><input className="w-full border-4 border-gray-200 p-2 focus:border-black" value={mascotData.fallbackImage} onChange={(e) => setMascotData({...mascotData, fallbackImage: e.target.value})} /></div>
               <button onClick={handleMascotSave} className="flex items-center justify-center gap-2 bg-kawai-purple text-white font-bold py-3 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-y-1 hover:shadow-none w-full md:w-auto px-8"><Save size={20} /> SAVE MASCOT DATA</button>
             </div>
          </div>
        )}
      </div>

      {isEditing && <EditModal />}
      {showSyncModal && <SyncModal />}
    </div>
  );
}
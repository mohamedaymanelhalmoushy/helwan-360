'use client';

import { useEffect, useMemo, useState } from 'react';
import AdminSidebar from '../../components/AdminSidebar';
import { buildings as seedBuildings, type Building, type Floor, type Room } from '../../lib/data';
import { BellIcon, BuildingsIcon, EditIcon, GridIcon, ImageIcon, LayersIcon, PlusIcon, SearchIcon, TrashIcon, UsersIcon } from '../../components/icons';

type ImageItem = { name: string; url: string };

function cloneBuildings(): Building[] {
  return JSON.parse(JSON.stringify(seedBuildings));
}

export default function AdminPage() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [checking, setChecking] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/check')
      .then((r) => r.json())
      .then((data) => setAuthenticated(Boolean(data.authenticated)))
      .finally(() => setChecking(false));
  }, []);

  async function handleLogin(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    const response = await fetch('/api/admin/validate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const data = await response.json();
    if (data.authenticated) {
      setAuthenticated(true);
      setPassword('');
    } else {
      setError('Invalid password.');
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/logout', { method: 'POST' });
    setAuthenticated(false);
  }

  if (checking) return <div className="min-h-screen bg-ink-950" />;

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink-950 p-4">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-white/10 bg-ink-900 p-8">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 text-lg font-black text-white">
              H
            </div>
            <div>
              <p className="text-sm font-bold text-white">Helwan National University</p>
              <p className="text-xs text-slate-500">Admin Dashboard</p>
            </div>
          </div>
          <label htmlFor="admin-password" className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-500">
            Admin Password
          </label>
          <input
            id="admin-password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-white/10 bg-ink-800 px-4 py-3 text-sm text-white outline-none focus:border-brand-500"
          />
          <button type="submit" className="mt-4 w-full rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-500">
            Sign In
          </button>
          {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          <p className="mt-4 text-center text-[11px] text-slate-600">Default password: university360</p>
        </form>
      </div>
    );
  }

  return <Dashboard onLogout={handleLogout} />;
}

function Dashboard({ onLogout }: { onLogout: () => void }) {
  const [buildingsState, setBuildingsState] = useState<Building[]>(cloneBuildings);
  const [selectedId, setSelectedId] = useState<string>(buildingsState[0]?.id ?? '');
  const [selectedFloorId, setSelectedFloorId] = useState<string>(buildingsState[0]?.floorList[0]?.id ?? '');
  const [query, setQuery] = useState('');
  const [tab, setTab] = useState<'general' | 'media'>('general');
  const [savedFlash, setSavedFlash] = useState(false);

  const selected = buildingsState.find((b) => b.id === selectedId);
  const selectedFloor = selected?.floorList.find((f) => f.id === selectedFloorId);

  const filtered = buildingsState.filter((b) => b.name.toLowerCase().includes(query.toLowerCase()));

  const totals = useMemo(() => {
    const floors = buildingsState.reduce((s, b) => s + b.floorList.length, 0);
    const rooms = buildingsState.reduce((s, b) => s + b.roomsCount, 0);
    const tours = buildingsState.reduce((s, b) => s + b.floorList.reduce((fs, f) => fs + f.tourRooms.length, 0), 0);
    return { buildings: buildingsState.length, floors, rooms, tours };
  }, [buildingsState]);

  function updateSelected(patch: Partial<Building>) {
    setBuildingsState((prev) => prev.map((b) => (b.id === selectedId ? { ...b, ...patch } : b)));
  }

  function updateFloor(floorId: string, patch: Partial<Floor>) {
    setBuildingsState((prev) =>
      prev.map((b) =>
        b.id === selectedId
          ? { ...b, floorList: b.floorList.map((f) => (f.id === floorId ? { ...f, ...patch } : f)) }
          : b,
      ),
    );
  }

  function addFloor() {
    if (!selected) return;
    const id = `floor-${Date.now()}`;
    const newFloor: Floor = {
      id,
      name: `New Floor`,
      rooms: 0,
      labs: 0,
      offices: 0,
      facilities: 0,
      description: '',
      tourRooms: [],
    };
    setBuildingsState((prev) =>
      prev.map((b) => (b.id === selectedId ? { ...b, floorList: [...b.floorList, newFloor] } : b)),
    );
    setSelectedFloorId(id);
  }

  function deleteFloor(floorId: string) {
    if (!selected) return;
    setBuildingsState((prev) =>
      prev.map((b) => (b.id === selectedId ? { ...b, floorList: b.floorList.filter((f) => f.id !== floorId) } : b)),
    );
    if (selectedFloorId === floorId) setSelectedFloorId(selected.floorList[0]?.id ?? '');
  }

  function addRoom() {
    if (!selected || !selectedFloor) return;
    const id = `room-${Date.now()}`;
    const room: Room = {
      id,
      code: `${selectedFloor.name.slice(0, 1)}-${(selectedFloor.tourRooms.length + 1).toString().padStart(2, '0')}`,
      name: 'New Room',
      type: 'Office',
      description: '',
      panorama: '/uploads/sphere.jpg',
    };
    updateFloor(selectedFloor.id, { tourRooms: [...selectedFloor.tourRooms, room] });
  }

  function deleteRoom(roomId: string) {
    if (!selectedFloor) return;
    updateFloor(selectedFloor.id, { tourRooms: selectedFloor.tourRooms.filter((r) => r.id !== roomId) });
  }

  function saveBuilding() {
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  }

  return (
    <div className="flex min-h-screen bg-ink-950">
      <AdminSidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {/* header */}
        <div className="flex items-center justify-between border-b border-white/5 bg-ink-900 px-5 py-4 sm:px-8">
          <div>
            <h1 className="text-lg font-bold text-white">Dashboard</h1>
            <p className="text-sm text-slate-500">Manage your campus virtual tour content</p>
          </div>
          <div className="flex items-center gap-3">
            <button type="button" className="relative rounded-xl border border-white/10 bg-ink-800 p-2.5 text-slate-300 hover:bg-ink-700">
              <BellIcon className="h-4 w-4" />
              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent-500 text-[9px] font-bold text-ink-950">3</span>
            </button>
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">AD</div>
              <div className="hidden text-left sm:block">
                <p className="text-xs font-semibold text-white">Admin User</p>
                <p className="text-[10px] text-slate-500">Super Admin</p>
              </div>
            </div>
            <button type="button" onClick={onLogout} className="rounded-xl border border-white/10 px-3 py-2 text-xs font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white">
              Log out
            </button>
          </div>
        </div>

        <div className="flex-1 space-y-6 p-5 sm:p-8">
          {/* stats */}
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard icon={BuildingsIcon} label="Buildings" value={totals.buildings} sub="Total Buildings" />
            <StatCard icon={LayersIcon} label="Floors" value={totals.floors} sub="Total Floors" />
            <StatCard icon={GridIcon} label="Rooms" value={totals.rooms} sub="Total Rooms" />
            <StatCard icon={ImageIcon} label="360° Tours" value={totals.tours} sub="Total Tours" />
          </div>

          <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
            {/* buildings list */}
            <div className="rounded-2xl border border-white/10 bg-ink-900 p-5">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-bold text-white">Buildings List</p>
                <button type="button" className="flex items-center gap-1.5 rounded-lg bg-brand-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-brand-500">
                  <PlusIcon className="h-3.5 w-3.5" />
                  Add
                </button>
              </div>
              <div className="relative mb-3">
                <SearchIcon className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-500" />
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search buildings..."
                  className="w-full rounded-lg border border-white/10 bg-ink-800 py-2 pl-9 pr-3 text-xs text-slate-200 outline-none focus:border-brand-500"
                />
              </div>
              <div className="max-h-[420px] space-y-1.5 overflow-y-auto pr-1">
                {filtered.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => {
                      setSelectedId(b.id);
                      setSelectedFloorId(b.floorList[0]?.id ?? '');
                      setTab('general');
                    }}
                    className={`flex w-full items-center justify-between gap-2 rounded-xl px-3 py-2.5 text-left transition ${
                      b.id === selectedId ? 'bg-brand-600/20 ring-1 ring-brand-500' : 'hover:bg-white/5'
                    }`}
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold text-white">{b.name}</p>
                      <p className="text-[11px] text-slate-500">
                        {b.floorList.length} Floors · {b.roomsCount} Rooms
                      </p>
                    </div>
                    <EditIcon className="h-3.5 w-3.5 shrink-0 text-slate-500" />
                  </button>
                ))}
              </div>
            </div>

            {/* add/edit building */}
            {selected && (
              <div className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                <p className="mb-3 text-sm font-bold text-white">Add / Edit Building</p>
                <div className="mb-4 flex gap-1 rounded-lg bg-ink-800 p-1 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={() => setTab('general')}
                    className={`flex-1 rounded-md py-1.5 transition ${tab === 'general' ? 'bg-brand-600 text-white' : 'text-slate-400'}`}
                  >
                    General Information
                  </button>
                  <button
                    type="button"
                    onClick={() => setTab('media')}
                    className={`flex-1 rounded-md py-1.5 transition ${tab === 'media' ? 'bg-brand-600 text-white' : 'text-slate-400'}`}
                  >
                    Media & Images
                  </button>
                </div>

                {tab === 'general' ? (
                  <div className="space-y-3">
                    <Field label="Building Name (English)">
                      <input
                        value={selected.name}
                        onChange={(e) => updateSelected({ name: e.target.value })}
                        className="w-full rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                      />
                    </Field>
                    <Field label="Building Number">
                      <input
                        type="number"
                        value={selected.number}
                        onChange={(e) => updateSelected({ number: Number(e.target.value) || 0 })}
                        className="w-full rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                      />
                    </Field>
                    <Field label="Description (English)">
                      <textarea
                        value={selected.description}
                        onChange={(e) => updateSelected({ description: e.target.value })}
                        rows={3}
                        className="w-full resize-none rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                      />
                    </Field>
                    <div className="grid grid-cols-2 gap-3">
                      <Field label="Total Floors">
                        <input
                          type="number"
                          value={selected.floors}
                          onChange={(e) => updateSelected({ floors: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                        />
                      </Field>
                      <Field label="Total Rooms">
                        <input
                          type="number"
                          value={selected.roomsCount}
                          onChange={(e) => updateSelected({ roomsCount: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                        />
                      </Field>
                      <Field label="Total Labs">
                        <input
                          type="number"
                          value={selected.labsCount}
                          onChange={(e) => updateSelected({ labsCount: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                        />
                      </Field>
                      <Field label="Departments">
                        <input
                          type="number"
                          value={selected.departmentsCount}
                          onChange={(e) => updateSelected({ departmentsCount: Number(e.target.value) || 0 })}
                          className="w-full rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                        />
                      </Field>
                    </div>
                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button type="button" className="rounded-lg border border-white/10 px-4 py-2 text-xs font-semibold text-slate-300 hover:bg-white/5">
                        Cancel
                      </button>
                      <div className="flex items-center gap-3">
                        {savedFlash && <span className="text-xs text-green-400">Saved locally ✓</span>}
                        <button
                          type="button"
                          onClick={saveBuilding}
                          className="rounded-lg bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-500"
                        >
                          Save Building
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <MediaTab />
                )}
              </div>
            )}

            {/* floors & rooms */}
            {selected && (
              <div className="rounded-2xl border border-white/10 bg-ink-900 p-5">
                <p className="mb-3 text-sm font-bold text-white">Floors & Rooms Management</p>
                <div className="mb-3 flex items-center gap-2">
                  <select
                    value={selectedFloorId}
                    onChange={(e) => setSelectedFloorId(e.target.value)}
                    className="flex-1 rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-xs text-white outline-none focus:border-brand-500"
                  >
                    {selected.floorList.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                  </select>
                  <button type="button" onClick={addFloor} className="flex items-center gap-1 rounded-lg bg-brand-600 px-3 py-2 text-xs font-semibold text-white hover:bg-brand-500">
                    <PlusIcon className="h-3.5 w-3.5" /> Floor
                  </button>
                  <button type="button" onClick={addRoom} className="flex items-center gap-1 rounded-lg bg-green-600 px-3 py-2 text-xs font-semibold text-white hover:bg-green-500">
                    <PlusIcon className="h-3.5 w-3.5" /> Room
                  </button>
                </div>

                {selectedFloor && (
                  <>
                    <div className="space-y-3">
                      <Field label="Floor Name">
                        <input
                          value={selectedFloor.name}
                          onChange={(e) => updateFloor(selectedFloor.id, { name: e.target.value })}
                          className="w-full rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                        />
                      </Field>
                      <Field label="Description">
                        <textarea
                          value={selectedFloor.description}
                          onChange={(e) => updateFloor(selectedFloor.id, { description: e.target.value })}
                          rows={2}
                          className="w-full resize-none rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-sm text-white outline-none focus:border-brand-500"
                        />
                      </Field>
                      <button
                        type="button"
                        onClick={() => deleteFloor(selectedFloor.id)}
                        className="flex items-center gap-1.5 rounded-lg border border-red-500/30 px-3 py-2 text-xs font-semibold text-red-400 hover:bg-red-500/10"
                      >
                        <TrashIcon className="h-3.5 w-3.5" /> Delete Floor
                      </button>
                    </div>

                    <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">
                      Rooms in this Floor ({selectedFloor.tourRooms.length})
                    </p>
                    <div className="max-h-[220px] space-y-1.5 overflow-y-auto pr-1">
                      {selectedFloor.tourRooms.map((room) => (
                        <div key={room.id} className="flex items-center justify-between gap-2 rounded-lg bg-ink-800 px-3 py-2">
                          <div className="min-w-0">
                            <p className="truncate text-xs font-semibold text-white">
                              {room.code} - {room.name}
                            </p>
                            <span className="text-[10px] text-slate-500">{room.type}</span>
                          </div>
                          <button type="button" onClick={() => deleteRoom(room.id)} className="shrink-0 text-slate-500 hover:text-red-400">
                            <TrashIcon className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      ))}
                      {selectedFloor.tourRooms.length === 0 && (
                        <p className="py-4 text-center text-xs text-slate-500">No rooms added yet.</p>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>

          <p className="text-center text-[11px] text-slate-600">
            Changes made here are stored in this browser session only. Connect a database to persist edits permanently.
          </p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, sub }: { icon: any; label: string; value: number; sub: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-ink-900 p-4">
      <div className="flex items-center gap-2.5">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600/20 text-brand-300">
          <Icon className="h-4.5 w-4.5" />
        </div>
        <p className="text-sm font-semibold text-slate-300">{label}</p>
      </div>
      <p className="mt-3 text-2xl font-bold text-white">{value}</p>
      <p className="text-[11px] text-slate-500">{sub}</p>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-semibold text-slate-400">{label}</span>
      {children}
    </label>
  );
}

function MediaTab() {
  const [images, setImages] = useState<ImageItem[]>([]);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');

  function loadImages() {
    fetch('/api/360-images/list')
      .then((r) => r.json())
      .then((data) => setImages(data.images || []));
  }

  useEffect(() => {
    loadImages();
  }, []);

  async function handleUpload(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setMessage('');
    const formData = new FormData();
    formData.append('image', file);
    const response = await fetch('/api/360-images', { method: 'POST', body: formData });
    const result = await response.json();
    setMessage(response.ok ? 'Image uploaded successfully.' : result.message || 'Upload failed.');
    setUploading(false);
    loadImages();
  }

  return (
    <div>
      <label className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-white/15 bg-ink-800 px-4 py-8 text-center transition hover:border-brand-500">
        <ImageIcon className="h-6 w-6 text-slate-500" />
        <span className="text-sm font-semibold text-slate-300">{uploading ? 'Uploading...' : 'Click to upload a 360° image'}</span>
        <span className="text-[11px] text-slate-500">JPG or PNG, equirectangular panorama</span>
        <input type="file" accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
      </label>
      {message && <p className="mt-2 text-xs text-slate-400">{message}</p>}

      <p className="mb-2 mt-5 text-xs font-bold uppercase tracking-[0.15em] text-slate-500">Uploaded Images ({images.length})</p>
      <div className="max-h-[220px] space-y-1.5 overflow-y-auto pr-1">
        {images.map((img) => (
          <a
            key={img.name}
            href={img.url}
            target="_blank"
            rel="noreferrer"
            className="block truncate rounded-lg bg-ink-800 px-3 py-2 text-xs text-brand-300 hover:text-brand-200"
          >
            {img.name}
          </a>
        ))}
        {images.length === 0 && <p className="py-4 text-center text-xs text-slate-500">No images uploaded yet.</p>}
      </div>
    </div>
  );
}

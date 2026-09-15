import React, { useState, useEffect } from 'react';
import {
  Video,
  Shield,
  Clock,
  Activity,
  Layers,
  FileText,
  CheckCheck,
  Lock,
  Download,
  Phone,
  MoreVertical,
  CheckCircle,
  AlertCircle,
  Wifi,
  Battery,
  Sliders,
  Sparkles,
  Zap,
  Camera,
  X,
  Eye,
  Server,
  Terminal
} from 'lucide-react';
import { Language } from '../types';
import { playSound } from '../utils/audioSystem';

interface MockupProps {
  language: Language;
}

// -------------------------------------------------------------
// 1. NVR CON IA: Live Camera CCTV & YOLOv8 Detection Mockup
// -------------------------------------------------------------
export const NvrMockupView: React.FC<MockupProps> = ({ language }) => {
  const [isAlarmMode, setIsAlarmMode] = useState(true);
  const [activeCamera, setActiveCamera] = useState<'CAM_01' | 'CAM_02' | 'CAM_03'>('CAM_01');
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const pad = (n: number) => n.toString().padStart(2, '0');
      const padMs = (n: number) => n.toString().padStart(3, '0');
      const dateStr = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
      const timeStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${padMs(now.getMilliseconds())}`;
      setCurrentTime(`${dateStr} ${timeStr}`);
    };

    updateTime();
    const interval = setInterval(updateTime, 120);
    return () => clearInterval(interval);
  }, []);

  const cameraMetadata = {
    CAM_01: {
      name: language === 'es' ? 'ACCESO NORTE' : 'NORTH ACCESS',
      location: language === 'es' ? 'Portón Principal [1080p RTSP]' : 'Main Gate [1080p RTSP]',
      objectType: 'PERSON 98.7%',
      zoneAlert: language === 'es' ? 'ZONA RESTRINGIDA' : 'RESTRICTED ZONE'
    },
    CAM_02: {
      name: language === 'es' ? 'PERÍMETRO ESTE' : 'EAST PERIMETER',
      location: language === 'es' ? 'Patio de Maniobras [1080p RTSP]' : 'Maneuver Yard [1080p RTSP]',
      objectType: 'VEHICLE 96.2%',
      zoneAlert: language === 'es' ? 'CRUCE DE LÍNEA' : 'LINE CROSSING'
    },
    CAM_03: {
      name: language === 'es' ? 'DEPÓSITO CENTRAL' : 'CENTRAL WAREHOUSE',
      location: language === 'es' ? 'Almacén Sector B [1080p RTSP]' : 'Warehouse Sector B [1080p RTSP]',
      objectType: 'PACKAGE / FORKLIFT',
      zoneAlert: language === 'es' ? 'ÁREA CARGA ACTIVA' : 'ACTIVE LOADING AREA'
    }
  };

  const currentCam = cameraMetadata[activeCamera];

  return (
    <div className="space-y-3 font-mono">
      {/* CCTV Top Status Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 py-2 rounded-xl bg-black/60 border border-white/[0.08] text-[10.5px]">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500" />
          </span>
          <span className="text-white font-bold tracking-wider">REC</span>
          <span className="text-neutral-500">|</span>
          <span className="text-neutral-300 font-semibold">{activeCamera}: {currentCam.name}</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-neutral-400 text-[10px]">
            {currentTime || '2026-09-12 20:46:12.842'}
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
            isAlarmMode
              ? 'bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/40 animate-pulse'
              : 'bg-white/[0.06] text-neutral-400 border border-white/[0.08]'
          }`}>
            {isAlarmMode
              ? (language === 'es' ? 'MODO 30 FPS [ALARMA ONNX]' : '30 FPS MODE [ONNX ALARM]')
              : (language === 'es' ? 'MODO 1 FPS [ECO MOG2]' : '1 FPS MODE [ECO MOG2]')}
          </span>
        </div>
      </div>

      {/* CCTV Live Viewport */}
      <div className="relative h-56 sm:h-64 bg-[#07070b] rounded-2xl overflow-hidden border border-white/[0.08] shadow-inner flex flex-col justify-between p-3.5 group">
        {/* Subtle camera scanlines & surveillance grid */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.4)_50%)] bg-[length:100%_4px] pointer-events-none opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)] pointer-events-none" />

        {/* Reticle grid marks in corners */}
        <div className="absolute top-4 left-4 w-5 h-5 border-t-2 border-l-2 border-[var(--accent-primary)]/50 pointer-events-none" />
        <div className="absolute top-4 right-4 w-5 h-5 border-t-2 border-r-2 border-[var(--accent-secondary)]/50 pointer-events-none" />
        <div className="absolute bottom-4 left-4 w-5 h-5 border-b-2 border-l-2 border-[var(--accent-secondary)]/50 pointer-events-none" />
        <div className="absolute bottom-4 right-4 w-5 h-5 border-b-2 border-r-2 border-[var(--accent-primary)]/50 pointer-events-none" />

        {/* Center Crosshair */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 pointer-events-none opacity-25">
          <div className="w-full h-0.5 bg-white/60 absolute top-1/2 -translate-y-1/2" />
          <div className="h-full w-0.5 bg-white/60 absolute left-1/2 -translate-x-1/2" />
        </div>

        {/* Detection Visualization: Mode dependent */}
        {isAlarmMode ? (
          <>
            {/* Dynamic Bounding Box 1: Verified Target */}
            <div className="absolute top-8 left-10 sm:left-16 w-32 sm:w-40 h-36 sm:h-44 border-2 border-[var(--accent-primary)] bg-[var(--accent-primary)]/15 shadow-[0_0_20px_var(--accent-glow)] rounded-lg p-1.5 transition-all duration-300">
              <div className="inline-flex items-center gap-1 bg-[var(--accent-primary)] text-black font-extrabold text-[8.5px] px-1.5 py-0.5 rounded tracking-wider shadow">
                <span>{currentCam.objectType}</span>
              </div>
              <div className="mt-1 flex flex-col gap-0.5 text-[8px] text-[var(--accent-primary)] font-mono">
                <span>TRACK: [x:320, y:180]</span>
                <span>YOLOv8 ONNX RUNTIME</span>
              </div>
            </div>

            {/* Dynamic Bounding Box 2: Perimeter Zone Warning */}
            <div className="absolute top-14 right-8 sm:right-16 w-28 sm:w-32 h-28 sm:h-32 border-2 border-rose-500 bg-rose-500/10 rounded-lg p-1.5 shadow-[0_0_20px_rgba(244,63,94,0.25)] animate-pulse">
              <div className="inline-block bg-rose-500 text-white font-extrabold text-[8px] px-1.5 py-0.5 rounded tracking-wider">
                {currentCam.zoneAlert}
              </div>
              <div className="mt-1 text-[8px] text-rose-400 font-mono">
                ALERT: MOT_TRIGGER
              </div>
            </div>
          </>
        ) : (
          /* ECO Standby Mode Overlay */
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="bg-black/80 backdrop-blur-md px-4 py-2.5 rounded-xl border border-white/10 text-center space-y-1">
              <div className="text-[var(--accent-primary)] text-xs font-bold flex items-center justify-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[var(--accent-primary)] animate-ping" />
                <span>ECO 1 FPS STANDBY</span>
              </div>
              <div className="text-[10px] text-neutral-400">
                {language === 'es'
                  ? 'Filtro MOG2 en segundo plano (0% carga GPU/ONNX)'
                  : 'Background MOG2 filter (0% GPU/ONNX load)'}
              </div>
            </div>
          </div>
        )}

        {/* Top Viewport Telemetry HUD */}
        <div className="relative z-10 flex items-center justify-between text-[10px]">
          <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/[0.08]">
            <span className="text-neutral-400">FPS:</span>
            <span className={`font-bold ${isAlarmMode ? 'text-[var(--accent-primary)]' : 'text-neutral-300'}`}>
              {isAlarmMode ? '30.2 FPS' : '1.0 FPS'}
            </span>
            <span className="text-neutral-600">•</span>
            <span className="text-neutral-400">LAT:</span>
            <span className="text-[var(--accent-secondary)] font-semibold">{isAlarmMode ? '64ms' : '8ms'}</span>
          </div>

          <div className="flex items-center gap-2 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/[0.08]">
            <span className="text-neutral-400">CPU LOAD:</span>
            <span className={`font-bold ${isAlarmMode ? 'text-amber-400' : 'text-[var(--accent-primary)]'}`}>
              {isAlarmMode ? '18.4% (ONNX)' : '3.1% (ECO)'}
            </span>
          </div>
        </div>

        {/* Bottom Viewport Telemetry HUD */}
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 text-[10px]">
          <div className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/[0.08] text-neutral-300">
            {currentCam.location}
          </div>
          <div className="bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/[0.08] text-[var(--accent-primary)] font-semibold">
            {isAlarmMode
              ? (language === 'es' ? 'MOG2: MOVIMIENTO DETECTADO' : 'MOG2: MOTION DETECTED')
              : (language === 'es' ? 'MOG2: EN ESPERA (STANDBY)' : 'MOG2: STANDBY')}
          </div>
        </div>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06]">
        {/* Camera Selector Pills */}
        <div className="flex items-center gap-1.5">
          {(['CAM_01', 'CAM_02', 'CAM_03'] as const).map((cam) => (
            <button
              key={cam}
              onClick={() => {
                playSound('scan');
                setActiveCamera(cam);
              }}
              className={`px-2.5 py-1 rounded-md text-[10px] font-mono transition-all ${
                activeCamera === cam
                  ? 'bg-white/[0.14] text-white border border-white/[0.25] font-bold shadow-sm'
                  : 'text-neutral-400 hover:text-white bg-transparent'
              }`}
            >
              {cam}
            </button>
          ))}
        </div>

        {/* Interactive Mode Toggle */}
        <button
          onClick={() => {
            playSound('simulation');
            setIsAlarmMode(!isAlarmMode);
          }}
          className={`px-3 py-1.5 rounded-lg text-[10.5px] font-semibold transition-all flex items-center gap-2 shadow-sm ${
            isAlarmMode
              ? 'bg-[var(--accent-primary)] text-black hover:brightness-110'
              : 'bg-white/[0.08] text-white hover:bg-white/[0.15] border border-white/[0.1]'
          }`}
        >
          <Zap className="w-3.5 h-3.5" />
          <span>
            {isAlarmMode
              ? (language === 'es' ? 'Simular Escena Estática (ECO 1 FPS)' : 'Simulate Static Scene (1 FPS)')
              : (language === 'es' ? 'Simular Detección (Alarma 30 FPS)' : 'Simulate Detection (30 FPS)')}
          </span>
        </button>
      </div>
    </div>
  );
};

// -------------------------------------------------------------
// 2. ODOO WHATSAPP: Enterprise Chatter & In-RAM PDF Mockup
// -------------------------------------------------------------
export const OdooMockupView: React.FC<MockupProps> = ({ language }) => {
  const [showPdfModal, setShowPdfModal] = useState(false);

  return (
    <div className="space-y-3 font-sans">
      {/* Odoo ERP Header Breadcrumb */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 rounded-xl bg-[#14121a] border border-white/[0.08] text-xs">
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-[#714B67] border border-white/20" />
          <span className="text-neutral-400 font-mono text-[11px]">Odoo 17 ERP</span>
          <span className="text-neutral-600">/</span>
          <span className="text-white font-semibold">
            {language === 'es' ? 'Ventas / Presupuesto #SO-2025-084' : 'Sales / Quotation #SO-2025-084'}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-0.5 rounded-full bg-[var(--accent-primary)]/15 text-[var(--accent-primary)] border border-[var(--accent-primary)]/30 text-[10.5px] font-medium font-mono">
            {language === 'es' ? '● Presupuesto Enviado' : '● Quotation Sent'}
          </span>
        </div>
      </div>

      {/* Odoo Chatter Message Stream Container */}
      <div className="bg-[#0b0b12] rounded-2xl p-4 border border-white/[0.08] space-y-3 font-sans">
        {/* System Activity Entry */}
        <div className="flex items-center justify-between text-[10.5px] font-mono text-neutral-400 pb-2 border-b border-white/[0.06]">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent-secondary)]" />
            <span>
              {language === 'es'
                ? 'Sistema Odoo (Automático) > WhatsApp Meta Cloud API'
                : 'Odoo System (Automated) > WhatsApp Meta Cloud API'}
            </span>
          </div>
          <span className="text-neutral-500">{language === 'es' ? 'Hoy 14:32' : 'Today 14:32'}</span>
        </div>

        {/* WhatsApp Sent Message Bubble (Chatter Integration) */}
        <div className="rounded-xl p-3.5 bg-[#121b18] border border-white/[0.08] space-y-3 relative overflow-hidden">
          {/* Subtle WhatsApp top tag */}
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-[var(--accent-primary)] flex items-center gap-1.5">
              <span>{language === 'es' ? 'Mensaje HSM WhatsApp' : 'WhatsApp HSM Template'}</span>
              <span className="text-[10px] text-neutral-400 font-mono font-normal">a +58 412 892 1044</span>
            </span>
            <span className="text-[10.5px] text-[var(--accent-secondary)] flex items-center gap-1 font-mono">
              <CheckCheck className="w-3.5 h-3.5 text-[var(--accent-secondary)]" />
              <span>{language === 'es' ? 'Leído' : 'Read'}</span>
            </span>
          </div>

          <p className="text-xs text-neutral-200 leading-relaxed font-normal">
            {language === 'es'
              ? 'Estimado cliente de Distribuidora Industrial C.A., adjuntamos su cotización formal #SO-2025-084 generada automáticamente. Puede responder a este chat para cualquier requerimiento adicional.'
              : 'Dear Industrial Distributor client, please find attached your automated quotation #SO-2025-084. Feel free to reply directly to this chat for any questions or confirmation.'}
          </p>

          {/* Embedded PDF Invoice Card (Generated via in-RAM BytesIO) */}
          <div className="p-3 rounded-xl bg-black/60 border border-white/[0.1] hover:border-[var(--accent-primary)]/40 transition-colors flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-9 h-9 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-rose-400" />
              </div>
              <div className="min-w-0">
                <div className="text-xs font-semibold text-white truncate">
                  {language === 'es' ? 'Presupuesto_SO-2025-084.pdf' : 'Quotation_SO-2025-084.pdf'}
                </div>
                <div className="text-[10.5px] font-mono text-neutral-400 flex items-center gap-2">
                  <span className="text-[var(--accent-primary)] font-bold">1,428 KB (RAM Stream)</span>
                  <span className="text-neutral-600">•</span>
                  <span className="text-neutral-400">$1,450.00 USD</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => {
                playSound('open');
                setShowPdfModal(true);
              }}
              className="px-3 py-1.5 rounded-lg bg-gradient-to-r from-[var(--accent-primary)]/20 to-[var(--accent-secondary)]/20 hover:from-[var(--accent-primary)]/30 hover:to-[var(--accent-secondary)]/30 border border-[var(--accent-primary)]/40 text-xs font-mono text-white transition-all flex items-center gap-1.5 shrink-0 shadow-sm"
            >
              <Eye className="w-3.5 h-3.5 text-[var(--accent-primary)]" />
              <span className="text-[11px] font-semibold">{language === 'es' ? 'Previsualizar PDF' : 'Preview PDF'}</span>
            </button>
          </div>
        </div>

        {/* Cryptographic & Memory Guarantee Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[10.5px]">
          <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2 text-neutral-300">
            <Lock className="w-3.5 h-3.5 text-[var(--accent-primary)] shrink-0" />
            <div className="truncate">
              <span className="text-neutral-400">HMAC-SHA256: </span>
              <span className="text-[var(--accent-primary)] font-semibold">
                {language === 'es' ? 'VALIDADO (sha256=8f4b...)' : 'VALIDATED (sha256=8f4b...)'}
              </span>
            </div>
          </div>
          <div className="p-2 rounded-xl bg-white/[0.02] border border-white/[0.06] flex items-center gap-2 text-neutral-300">
            <Zap className="w-3.5 h-3.5 text-[var(--accent-secondary)] shrink-0" />
            <div className="truncate">
              <span className="text-neutral-400">{language === 'es' ? 'Disco: ' : 'Disk: '}</span>
              <span className="text-[var(--accent-secondary)] font-semibold">
                {language === 'es' ? '0 bytes escritos (100% RAM)' : '0 bytes written (100% RAM)'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* In-RAM PDF Interactive Preview Drawer */}
      {showPdfModal && (
        <div className="p-4 rounded-2xl bg-[#0c0d14] border border-[var(--accent-primary)]/30 shadow-2xl space-y-3 font-sans animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-rose-400" />
              <span className="text-xs font-semibold text-white">
                {language === 'es'
                  ? 'Previsualización de Factura en RAM (BytesIO)'
                  : 'In-RAM Invoice Preview (BytesIO)'}
              </span>
            </div>
            <button
              onClick={() => {
                playSound('close');
                setShowPdfModal(false);
              }}
              className="p-1 rounded-md text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Invoice Document Simulation */}
          <div className="bg-white text-slate-900 rounded-xl p-4 text-[11px] shadow space-y-3 font-sans">
            <div className="flex justify-between items-start border-b border-slate-200 pb-2">
              <div>
                <div className="font-bold text-slate-900 text-xs">DISTRIBUIDORA INDUSTRIAL C.A.</div>
                <div className="text-[9.5px] text-slate-500 font-mono">RIF: J-40192831-2 • Maturín, VE</div>
              </div>
              <div className="text-right font-mono">
                <div className="text-[10px] font-bold text-emerald-700">
                  {language === 'es' ? 'COTIZACIÓN #SO-2025-084' : 'QUOTATION #SO-2025-084'}
                </div>
                <div className="text-[9px] text-slate-500">
                  {language === 'es' ? 'Fecha: 2026-09-12' : 'Date: 2026-09-12'}
                </div>
              </div>
            </div>

            {/* Line items table */}
            <div className="space-y-1 font-mono text-[10px]">
              <div className="flex justify-between font-bold text-slate-700 border-b border-slate-200 pb-1">
                <span>{language === 'es' ? 'Descripción' : 'Description'}</span>
                <span>{language === 'es' ? 'Total USD' : 'Total USD'}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{language === 'es' ? '4x Válvula Solenoide Neumática Festo 24V' : '4x Festo 24V Pneumatic Solenoid Valve'}</span>
                <span>$480.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{language === 'es' ? '2x Sensor Óptico Industrial Banner' : '2x Banner Industrial Optical Sensor'}</span>
                <span>$320.00</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>{language === 'es' ? '1x Módulo Gateway IoT Industrial Modbus' : '1x Modbus Industrial IoT Gateway Module'}</span>
                <span>$650.00</span>
              </div>
            </div>

            <div className="flex justify-between items-center pt-2 border-t border-slate-200 font-bold">
              <span className="text-slate-700">{language === 'es' ? 'TOTAL FACTURADO' : 'TOTAL BILLED'}</span>
              <span className="text-emerald-700 font-mono text-xs">$1,450.00 USD</span>
            </div>

            {/* Zero Disk RAM Buffer Stamp */}
            <div className="bg-emerald-50 border border-emerald-300 rounded p-1.5 text-center font-mono text-[9px] text-emerald-800">
              ✓ STREAMED FROM BytesIO MEMORY BUFFER • 0 BYTES PERSISTED TO DISK
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// -------------------------------------------------------------
// 3. WHATSBOT GLAM NAILS: Smartphone Frame & FSM Chat Mockup
// -------------------------------------------------------------
export const WhatsBotMockupView: React.FC<MockupProps> = ({ language }) => {
  const [concurrencySimulated, setConcurrencySimulated] = useState(false);

  return (
    <div className="space-y-3 font-sans">
      {/* Smartphone Housing Frame */}
      <div className="max-w-[370px] mx-auto bg-[#101017] rounded-[2.25rem] p-3 border-2 border-white/[0.12] shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative">
        {/* Dynamic Island / Speaker Pill */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-20 flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-[#181822] mr-2" />
          <div className="w-1 h-1 rounded-full bg-[var(--accent-primary)]" />
        </div>

        {/* Screen Content Wrapper */}
        <div className="bg-[#0b141a] rounded-[1.75rem] overflow-hidden border border-white/[0.06] flex flex-col min-h-[360px]">
          {/* Phone Status Bar */}
          <div className="px-4 pt-3 pb-1 flex justify-between items-center text-[10px] font-mono text-neutral-400 bg-[#1f2c34]">
            <span>14:30</span>
            <div className="flex items-center gap-1.5">
              <Wifi className="w-3 h-3 text-neutral-300" />
              <span className="text-[9px]">5G</span>
              <Battery className="w-3.5 h-3.5 text-neutral-300" />
            </div>
          </div>

          {/* WhatsApp Header */}
          <div className="px-3.5 py-2 bg-[#1f2c34] border-b border-white/[0.06] flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-pink-500 to-rose-400 flex items-center justify-center text-white text-xs font-bold shadow-md">
                💅
              </div>
              <div>
                <div className="text-xs font-semibold text-white flex items-center gap-1">
                  <span>Glam Nails Studio</span>
                  <CheckCircle className="w-3 h-3 text-[var(--accent-primary)]" />
                </div>
                <div className="text-[10px] text-[var(--accent-primary)] font-mono">
                  {language === 'es' ? 'en línea • bot FSM activo' : 'online • active FSM bot'}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-neutral-300">
              <Phone className="w-3.5 h-3.5" />
              <MoreVertical className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* WhatsApp Messages Scrollable Body */}
          <div className="p-3 space-y-2.5 flex-1 text-xs bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:16px_16px]">
            {/* Bubble 1: Inbound Customer */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#005c4b] text-white p-2.5 rounded-xl rounded-tr-none shadow-sm space-y-1">
                <p className="text-[11.5px] leading-relaxed">
                  {language === 'es'
                    ? '¡Hola! Quisiera reservar cita para manicura y esculpidas este viernes en la tarde 💅'
                    : 'Hi! I would like to book an appointment for manicure & extensions this Friday afternoon 💅'}
                </p>
                <div className="text-[9px] text-emerald-200 text-right font-mono flex items-center justify-end gap-1">
                  <span>14:28</span>
                  <CheckCheck className="w-3 h-3 text-[var(--accent-secondary)]" />
                </div>
              </div>
            </div>

            {/* Bubble 2: Bot FSM Response */}
            <div className="flex justify-start">
              <div className="max-w-[88%] bg-[#202c33] text-neutral-200 p-2.5 rounded-xl rounded-tl-none shadow-sm space-y-1.5 border border-white/[0.05]">
                <p className="text-[11.5px] leading-relaxed">
                  {language === 'es'
                    ? '¡Hola! Bienvenida a Glam Nails. Tenemos estos turnos disponibles para el Viernes:\n[1] 2:30 PM\n[2] 4:00 PM\n[3] 5:30 PM\nResponde con el número de tu preferencia.'
                    : 'Hello! Welcome to Glam Nails. We have these open slots for Friday:\n[1] 2:30 PM\n[2] 4:00 PM\n[3] 5:30 PM\nReply with your preferred number.'}
                </p>
                <div className="text-[9px] text-neutral-400 text-right font-mono">14:28</div>
              </div>
            </div>

            {/* Bubble 3: Inbound Customer Selection */}
            <div className="flex justify-end">
              <div className="max-w-[85%] bg-[#005c4b] text-white p-2.5 rounded-xl rounded-tr-none shadow-sm space-y-1">
                <p className="text-[11.5px]">
                  {language === 'es' ? 'El 2 por favor (4:00 PM)' : 'Option 2 please (4:00 PM)'}
                </p>
                <div className="text-[9px] text-emerald-200 text-right font-mono flex items-center justify-end gap-1">
                  <span>14:29</span>
                  <CheckCheck className="w-3 h-3 text-[var(--accent-secondary)]" />
                </div>
              </div>
            </div>

            {/* Bubble 4: Bot FSM Lock & Confirmation */}
            <div className="flex justify-start">
              <div className="max-w-[88%] bg-[#202c33] text-neutral-200 p-2.5 rounded-xl rounded-tl-none shadow-sm space-y-1.5 border border-[var(--accent-primary)]/30">
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-[var(--accent-primary)]">
                  <Lock className="w-3 h-3" />
                  <span>
                    {language === 'es' ? 'PostgreSQL FOR UPDATE Bloqueado' : 'PostgreSQL FOR UPDATE Locked'}
                  </span>
                </div>
                <p className="text-[11.5px] text-white leading-relaxed">
                  {language === 'es'
                    ? '✓ ¡Cita confirmada! Viernes 4:00 PM. Tu código de reserva es #GN-9281. Te esperamos en el salón.'
                    : '✓ Confirmed! Friday at 4:00 PM. Your booking code is #GN-9281. See you at the salon.'}
                </p>
                <div className="text-[9px] text-neutral-400 text-right font-mono flex items-center justify-end gap-1">
                  <span>14:29</span>
                  <CheckCheck className="w-3 h-3 text-[var(--accent-primary)]" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Concurrency Simulator Control Strip */}
      <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/[0.06] flex flex-wrap items-center justify-between gap-3 text-xs font-mono">
        <div className="flex items-center gap-2 text-neutral-300">
          <Shield className="w-4 h-4 text-[var(--accent-primary)]" />
          <span>
            {language === 'es'
              ? 'PostgreSQL Row-Level Lock: 0 Colisiones'
              : 'PostgreSQL Row-Level Lock: 0 Overbooking'}
          </span>
        </div>

        <button
          onClick={() => {
            playSound('simulation');
            setConcurrencySimulated(true);
            setTimeout(() => setConcurrencySimulated(false), 4500);
          }}
          className="px-3 py-1.5 rounded-lg bg-[var(--accent-secondary)]/15 hover:bg-[var(--accent-secondary)]/25 border border-[var(--accent-secondary)]/40 text-[var(--accent-secondary)] font-semibold text-[11px] transition-all flex items-center gap-1.5"
        >
          <Sparkles className="w-3 h-3" />
          <span>{language === 'es' ? 'Simular Concurrencia Simultánea' : 'Simulate Simultaneous Collision'}</span>
        </button>
      </div>

      {/* Concurrency Simulation Interactive Dual-Thread Visualizer */}
      {concurrencySimulated && (
        <div className="p-3 rounded-xl bg-black/80 border border-amber-500/30 text-xs font-mono space-y-2 animate-in fade-in duration-300">
          <div className="flex items-center gap-2 text-amber-300 font-semibold text-[11px]">
            <Server className="w-4 h-4 text-amber-400 shrink-0" />
            <span>{language === 'es' ? 'Simulación de Carrera en Tiempo Real (Mismo Milisegundo)' : 'Real-Time Race Condition Simulation (Same Millisecond)'}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[10px]">
            {/* Thread 1: Winner */}
            <div className="p-2 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-neutral-300 space-y-1">
              <div className="text-[var(--accent-primary)] font-bold flex items-center justify-between">
                <span>{language === 'es' ? 'HILO A (Cliente 1)' : 'THREAD A (Client 1)'}</span>
                <span>{language === 'es' ? 'LOCK ADQUIRIDO' : 'LOCK ACQUIRED'}</span>
              </div>
              <div className="text-neutral-400">14:29:00.104210</div>
              <div className="text-neutral-200">SELECT ... FOR UPDATE NOWAIT</div>
              <div className="text-[var(--accent-primary)]">
                {language === 'es' ? '✓ Commit: Turno 4:00 PM Otorgado' : '✓ Commit: 4:00 PM Slot Granted'}
              </div>
            </div>

            {/* Thread 2: Safely Blocked */}
            <div className="p-2 rounded-lg bg-rose-950/40 border border-rose-500/40 text-neutral-300 space-y-1">
              <div className="text-rose-400 font-bold flex items-center justify-between">
                <span>{language === 'es' ? 'HILO B (Cliente 2)' : 'THREAD B (Client 2)'}</span>
                <span>{language === 'es' ? 'RECHAZADO SEGURO' : 'SAFELY REJECTED'}</span>
              </div>
              <div className="text-neutral-400">14:29:00.104214 (+4µs)</div>
              <div className="text-neutral-200">SELECT ... FOR UPDATE NOWAIT</div>
              <div className="text-rose-400">
                {language === 'es'
                  ? '✗ SlotAlreadyReservedError (0 colisiones)'
                  : '✗ SlotAlreadyReservedError (0 collisions)'}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

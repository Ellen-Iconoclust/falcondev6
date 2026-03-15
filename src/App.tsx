/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Page, Project, Experience } from './types';
import { 
  FileCode, 
  Terminal, 
  Search, 
  Play, 
  Settings, 
  HelpCircle, 
  Cpu, 
  FolderOpen,
  X,
  Maximize2,
  Minimize2,
  Menu
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activePage, setActivePage] = useState<Page>('FILE');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [hasStarted, setHasStarted] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const startApp = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    }
    setHasStarted(true);
  };

  const menuOptions: { label: string; id: Page; shortcut: string }[] = [
    { label: 'File', id: 'FILE', shortcut: 'F' },
    { label: 'Edit', id: 'EDIT', shortcut: 'E' },
    { label: 'Search', id: 'SEARCH', shortcut: 'S' },
    { label: 'Run', id: 'RUN', shortcut: 'R' },
    { label: 'Compile', id: 'COMPILE', shortcut: 'C' },
    { label: 'Debug', id: 'DEBUG', shortcut: 'D' },
    { label: 'Project', id: 'PROJECT', shortcut: 'P' },
    { label: 'Options', id: 'OPTIONS', shortcut: 'O' },
    { label: 'Window', id: 'WINDOW', shortcut: 'W' },
    { label: 'Help', id: 'HELP', shortcut: 'H' },
  ];

  const projects: Project[] = [
    {
      id: '1',
      title: 'VINTAGE_OS.EXE',
      description: 'A browser-based operating system simulation with classic UI components.',
      tags: ['React', 'TypeScript', 'Tailwind'],
      link: '#'
    },
    {
      id: '2',
      title: 'ALGO_VIZ.CPP',
      description: 'Visualizing complex sorting and pathfinding algorithms in real-time.',
      tags: ['D3.js', 'JavaScript', 'Algorithms'],
      link: '#'
    },
    {
      id: '3',
      title: 'NEURAL_NET.PY',
      description: 'Simple neural network implementation from scratch for digit recognition.',
      tags: ['Python', 'NumPy', 'ML'],
      link: '#'
    }
  ];

  const experiences: Experience[] = [
    {
      company: 'RETRO TECH CORP',
      role: 'Senior Software Engineer',
      period: '2022 - PRESENT',
      description: 'Leading the development of legacy system modernization tools.'
    },
    {
      company: 'PIXEL PERFECT STUDIOS',
      role: 'Full Stack Developer',
      period: '2020 - 2022',
      description: 'Built high-performance web applications with a focus on UX.'
    }
  ];

  const renderContent = () => {
    switch (activePage) {
      case 'FILE':
        return (
          <div className="space-y-10">
            <div className="border-b border-turbo-cyan pb-6">
              <h1 className="text-base text-turbo-yellow font-bold leading-relaxed">WELCOME TO TURBO PORTFOLIO v3.0</h1>
              <p className="text-[10px] text-turbo-white mt-3">Copyright (c) 1990-2026 Ellen Iconoclust</p>
            </div>
            <div className="space-y-8">
              <p className="text-[12px] md:text-sm text-turbo-white leading-[2.2]">
                I am a passionate software engineer dedicated to building robust and efficient solutions. 
                My journey started with C++ and assembly, and today I specialize in modern full-stack 
                development while keeping the efficiency of the old school alive.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                <div className="border border-turbo-white p-6">
                  <h3 className="text-turbo-cyan text-[12px] md:text-sm mb-6">SYSTEM INFO</h3>
                  <ul className="text-[10px] md:text-[12px] space-y-6 text-turbo-red">
                    <li>OS: PORTFOLIO_OS v1.0</li>
                    <li>CPU: CREATIVE_MIND @ 4.2GHz</li>
                    <li>RAM: 64GB IMAGINATION</li>
                    <li>DISK: 2TB EXPERIENCE</li>
                  </ul>
                </div>
                <div className="border border-turbo-white p-6">
                  <h3 className="text-turbo-cyan text-[12px] md:text-sm mb-6">CORE SKILLS</h3>
                  <ul className="text-[10px] md:text-[12px] space-y-6 text-turbo-red">
                    <li>- TYPESCRIPT / JS</li>
                    <li>- REACT / NEXT.JS</li>
                    <li>- NODE.JS / EXPRESS</li>
                    <li>- C++ / SYSTEMS</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        );
      case 'EDIT':
        return (
          <div className="space-y-10">
            <h2 className="text-[12px] md:text-sm text-turbo-yellow underline">EXPERIENCE_LOG.TXT</h2>
            <div className="space-y-16">
              {experiences.map((exp, i) => (
                <div key={i} className="relative pl-10 border-l-2 border-turbo-cyan">
                  <div className="absolute -left-[9px] top-0 w-4 h-4 bg-turbo-cyan rounded-full" />
                  <h3 className="text-turbo-cyan text-[12px] md:text-sm font-bold leading-relaxed">{exp.role} @ {exp.company}</h3>
                  <p className="text-[10px] text-turbo-gray mt-3 mb-6">{exp.period}</p>
                  <p className="text-turbo-white text-[12px] md:text-sm leading-[2.2]">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'SEARCH':
        return (
          <div className="space-y-10">
            <h2 className="text-[12px] md:text-sm text-turbo-yellow">PROJECT_DATABASE.DB</h2>
            <div className="grid grid-cols-1 gap-8">
              {projects.map((project) => (
                <div key={project.id} className="border-2 border-turbo-white p-8 hover:bg-turbo-cyan/20 cursor-pointer transition-colors">
                  <h3 className="text-turbo-cyan text-[12px] md:text-sm font-bold mb-6 flex items-center gap-3">
                    <FolderOpen size={16} /> {project.title}
                  </h3>
                  <p className="text-[12px] md:text-sm text-turbo-white mb-8 leading-[2.2]">{project.description}</p>
                  <div className="flex flex-wrap gap-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[8px] bg-turbo-blue border border-turbo-cyan px-3 py-2 text-turbo-cyan">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 'RUN':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-16 py-12">
            <div className="text-center space-y-8">
              <Terminal size={48} className="mx-auto text-turbo-yellow animate-pulse" />
              <h2 className="text-[12px] md:text-sm text-turbo-yellow font-bold leading-relaxed">ESTABLISHING CONNECTION...</h2>
            </div>
            <div className="w-full max-w-md border-2 border-turbo-white p-8 space-y-8">
              <p className="text-turbo-cyan text-[12px] md:text-sm text-center">CONTACT_INITIATED</p>
              <div className="space-y-8">
                <p className="text-turbo-white text-[12px] md:text-sm leading-relaxed">EMAIL: elleniconoclust@gmail.com</p>
                <p className="text-turbo-white text-[12px] md:text-sm leading-relaxed">GITHUB: github.com/elleniconoclust</p>
                <p className="text-turbo-white text-[12px] md:text-sm leading-relaxed">LINKEDIN: linkedin.com/in/ellen</p>
              </div>
              <button className="w-full bg-turbo-cyan text-turbo-black text-[12px] md:text-sm font-bold py-5 hover:bg-turbo-white transition-colors">
                SEND MESSAGE [ENTER]
              </button>
            </div>
          </div>
        );
      case 'COMPILE':
        return (
          <div className="space-y-8">
            <h2 className="text-[12px] md:text-sm text-turbo-yellow">COMPILING PORTFOLIO.CPP...</h2>
            <div className="bg-turbo-black p-8 border border-turbo-white text-[12px] md:text-sm space-y-6 leading-[2.2]">
              <p className="text-turbo-white">Turbo C++  Version 3.00 Copyright (c) 1990, 1992 Borland Intl.</p>
              <p className="text-turbo-white">portfolio.cpp:</p>
              <p className="text-turbo-cyan">Warning portfolio.cpp 42: 'Ellen' is initialized but never used</p>
              <p className="text-turbo-white">Linking portfolio.exe:</p>
              <p className="text-turbo-white">Success: 0 errors, 1 warning</p>
            </div>
            <div className="grid grid-cols-1 gap-8">
              <div className="border border-turbo-white p-6">
                <p className="text-turbo-cyan text-[12px] md:text-sm mb-6">MEMORY USAGE</p>
                <div className="h-8 bg-turbo-gray mt-2">
                  <div className="h-full bg-turbo-cyan w-[65%]" />
                </div>
              </div>
            </div>
            <button 
              onClick={() => setActivePage('RUN')}
              className="bg-turbo-white text-turbo-black px-8 py-4 text-[12px] md:text-sm font-bold hover:bg-turbo-cyan"
            >
              PRESS ANY KEY TO RUN
            </button>
          </div>
        );
      case 'DEBUG':
        return (
          <div className="space-y-8">
            <h2 className="text-[12px] md:text-sm text-turbo-yellow">DEBUGGER_WATCH.LOG</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[12px] md:text-sm border-collapse">
                <thead>
                  <tr className="bg-turbo-cyan text-turbo-black">
                    <th className="border border-turbo-white p-4 text-left">VARIABLE</th>
                    <th className="border border-turbo-white p-4 text-left">VALUE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="leading-loose">
                    <td className="border border-turbo-white p-4">coffee_level</td>
                    <td className="border border-turbo-white p-4 text-turbo-yellow">0x7FFFFFFF</td>
                  </tr>
                  <tr className="leading-loose">
                    <td className="border border-turbo-white p-4">is_coding</td>
                    <td className="border border-turbo-white p-4 text-turbo-yellow">TRUE</td>
                  </tr>
                  <tr className="leading-loose">
                    <td className="border border-turbo-white p-4">bugs_found</td>
                    <td className="border border-turbo-white p-4 text-turbo-yellow">0</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="p-6 border border-turbo-red bg-turbo-red/10">
              <p className="text-turbo-red text-[12px] md:text-sm font-bold leading-relaxed">BREAKPOINT REACHED AT LINE 1024</p>
            </div>
          </div>
        );
      case 'HELP':
        return (
          <div className="space-y-10">
            <h2 className="text-[12px] md:text-sm text-turbo-yellow">HELP_INDEX.HLP</h2>
            <div className="bg-turbo-cyan/10 p-8 border border-turbo-cyan">
              <p className="text-turbo-white text-[12px] md:text-sm italic mb-8 leading-[2.2]">"The best way to predict the future is to invent it."</p>
              <div className="space-y-8 text-[12px] md:text-sm">
                <p><span className="text-turbo-yellow">F1:</span> Show this help screen</p>
                <p><span className="text-turbo-yellow">ALT+X:</span> Exit application</p>
                <p><span className="text-turbo-yellow">F9:</span> Compile current thoughts</p>
                <p><span className="text-turbo-yellow">F10:</span> Access top menu</p>
              </div>
            </div>
            <div className="space-y-8">
              <h3 className="text-turbo-cyan text-[12px] md:text-sm">ABOUT THIS INTERFACE</h3>
              <p className="text-turbo-white text-[12px] md:text-sm leading-[2.2]">
                This portfolio is a tribute to the Borland Turbo C++ IDE, which was instrumental 
                in the education of millions of programmers.
              </p>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex items-center justify-center h-full">
            <div className="text-center space-y-4">
              <Cpu size={48} className="mx-auto text-turbo-red" />
              <h2 className="text-xl text-turbo-red font-bold">MODULE NOT IMPLEMENTED</h2>
              <p className="text-turbo-white">The requested page '{activePage}' is under construction.</p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="h-screen flex flex-col select-none overflow-hidden">
      {!hasStarted && (
        <div 
          onClick={startApp}
          className="fixed inset-0 z-[100] bg-turbo-black flex flex-col items-center justify-center cursor-pointer"
        >
          <div className="border-4 border-turbo-cyan p-12 text-center space-y-8">
            <h1 className="text-turbo-yellow text-2xl font-bold tracking-widest">TURBO PORTFOLIO v3.0</h1>
            <p className="text-turbo-white text-base animate-pulse">CLICK ANYWHERE TO BOOT SYSTEM</p>
            <div className="text-turbo-gray text-xs mt-8">
              (C) 1990-2026 BORLAND INTERNATIONAL / ELLEN ICONOCLUST
            </div>
          </div>
        </div>
      )}
      {/* Top Menu Bar */}
      <nav className="bg-turbo-gray h-10 flex items-center px-4 z-50 relative">
        {/* Desktop View (lg and above) */}
        <div className="hidden lg:flex gap-1 h-full items-center w-full">
          <div className="flex gap-2 h-full">
            {menuOptions.map((opt) => (
              <button
                key={opt.id}
                onClick={() => setActivePage(opt.id)}
                className={`px-3 text-[18px] flex items-center h-full transition-colors ${
                  activePage === opt.id 
                    ? 'bg-turbo-cyan text-turbo-black' 
                    : 'text-turbo-black hover:bg-turbo-white'
                }`}
              >
                <span className="text-turbo-red font-bold">{opt.shortcut}</span>
                {opt.label.substring(1)}
              </button>
            ))}
          </div>
          <div className="ml-auto text-turbo-black text-[18px] font-bold">
            {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
          </div>
        </div>

        {/* Mobile/Tablet View (below lg) */}
        <div className="flex lg:hidden items-center justify-between w-full h-full">
          {/* Active Page Name on the Left */}
          <div className="px-3 text-[18px] flex items-center h-full bg-turbo-cyan text-turbo-black font-bold">
            {menuOptions.find(opt => opt.id === activePage)?.label}
          </div>

          {/* Hamburger Menu on the Right */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="px-3 text-turbo-black hover:bg-turbo-white h-full flex items-center"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile/Tablet Dropdown Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute top-10 left-0 w-full bg-turbo-gray border-b-2 border-turbo-black lg:hidden shadow-2xl z-50"
            >
              <div className="flex flex-col">
                {menuOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      setActivePage(opt.id);
                      setIsMenuOpen(false);
                    }}
                    className={`px-6 py-3 text-[18px] text-left transition-colors border-b border-turbo-black/10 ${
                      activePage === opt.id 
                        ? 'bg-turbo-cyan text-turbo-black' 
                        : 'text-turbo-black hover:bg-turbo-white'
                    }`}
                  >
                    <span className="text-turbo-red font-bold">{opt.shortcut}</span>
                    {opt.label.substring(1)}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Main Workspace */}
      <main className="flex-1 bg-turbo-blue p-2 relative overflow-hidden">
        {/* The Classic Double Line Window */}
        <div className="w-full h-full border-[3px] border-turbo-cyan relative flex flex-col">
          {/* Window Title Bar */}
          <div className="h-6 border-b-[3px] border-turbo-cyan flex items-center px-4 justify-between bg-turbo-blue">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border border-turbo-cyan flex items-center justify-center text-[10px] text-turbo-cyan">
                ≡
              </div>
              <span className="text-turbo-white text-xs font-bold tracking-widest">
                C:\PORTFOLIO\{activePage}.CPP
              </span>
            </div>
            <div className="flex gap-2">
              <button className="w-4 h-4 border border-turbo-cyan flex items-center justify-center text-[10px] text-turbo-cyan hover:bg-turbo-cyan hover:text-turbo-blue">
                ↑
              </button>
              <button className="w-4 h-4 border border-turbo-cyan flex items-center justify-center text-[10px] text-turbo-cyan hover:bg-turbo-cyan hover:text-turbo-blue">
                ■
              </button>
            </div>
          </div>

          {/* Window Content Area */}
          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar">
            {renderContent()}
          </div>

          {/* Scroll Indicators (Retro style) */}
          <div className="absolute right-0 top-6 bottom-0 w-4 border-l-[3px] border-turbo-cyan bg-turbo-blue flex flex-col justify-between items-center py-1">
            <div className="text-turbo-cyan text-[10px]">▲</div>
            <div className="w-3 h-8 bg-turbo-cyan" />
            <div className="text-turbo-cyan text-[10px]">▼</div>
          </div>
          <div className="absolute bottom-0 left-0 right-4 h-4 border-t-[3px] border-turbo-cyan bg-turbo-blue flex justify-between items-center px-1">
            <div className="text-turbo-cyan text-[10px]">◄</div>
            <div className="w-8 h-3 bg-turbo-cyan" />
            <div className="text-turbo-cyan text-[10px]">►</div>
          </div>
        </div>
      </main>

      {/* Bottom Status Bar */}
      <footer className="bg-turbo-gray h-10 flex items-center px-4 gap-4 overflow-x-auto whitespace-nowrap">
        <div className="flex gap-4 text-[18px] text-turbo-black font-bold">
          <div className="flex gap-2">
            <span className="bg-turbo-black text-turbo-white px-2">F1</span> Help
          </div>
          <div className="flex gap-2">
            <span className="bg-turbo-black text-turbo-white px-2">F2</span> Save
          </div>
          <div className="flex gap-2">
            <span className="bg-turbo-black text-turbo-white px-2">F3</span> Open
          </div>
          <div className="flex gap-2">
            <span className="bg-turbo-black text-turbo-white px-2">Alt+F9</span> Compile
          </div>
          <div className="flex gap-2">
            <span className="bg-turbo-black text-turbo-white px-2">F10</span> Menu
          </div>
        </div>
        <div className="ml-auto flex gap-6 text-[18px] text-turbo-black font-bold">
          <span>1:1</span>
          <span className="text-turbo-red">INS</span>
        </div>
      </footer>
    </div>
  );
}

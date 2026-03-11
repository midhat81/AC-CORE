import {
    Component,
    signal,
    computed,
    ElementRef,
    viewChild,
    inject,
  } from '@angular/core';
  import { CommonModule, DatePipe } from '@angular/common';
  import { FormsModule } from '@angular/forms';
  import { NgIcon, provideIcons } from '@ng-icons/core';
  import {
    lucideFileText,
    lucideDownload,
    lucideCalendar,
    lucideFilter,
    lucideArchive,
    lucideRefreshCw,
    lucidePrinter,
    lucideChevronDown,
    lucideChevronUp,
    lucideCheckSquare,
    lucideSquare,
    lucideCheck,
    lucideX,
    lucideMapPin,
    lucideAlertTriangle,
    lucideBarChart2,
    lucideFileDown,
    lucideSearch,
    lucideEye,
    lucideUser,
    lucideBuildingIcon,
  } from '@ng-icons/lucide';
  
  export interface ArchivedReport {
    id: number;
    title: string;
    date: string;
    type: string;
    pages: number;
    size: string;
    author: string;
    hazards: string[];
  }
  
  export const BARANGAYS: string[] = [
    'Anunas', 'Balibago', 'Capaya', 'Claro M. Recto', 'Cuayan', 'Cutcut',
    'Cutud', 'Lourdes Norte', 'Lourdes Sur', 'Lourdes Sur Este', 'Malabanias',
    'Margot', 'Mining', 'Pampang', 'Pandan', 'Pulung Cacutud', 'Pulung Maragul',
    'Salapungan', 'San Jose', 'San Nicolas', 'Santa Teresita', 'Santo Cristo',
    'Santo Domingo', 'Sapang Bato', 'Sapalibutad', 'Tabun', 'Virgen Delas Flores',
  ];
  
  export const HAZARD_CATEGORIES = [
    { id: 'flood',      label: 'Flood',         icon: '🌊', color: '#3B82F6' },
    { id: 'fire',       label: 'Fire Incident', icon: '🔥', color: '#EF4444' },
    { id: 'earthquake', label: 'Earthquake',    icon: '🌍', color: '#F59E0B' },
    { id: 'landslide',  label: 'Landslide',     icon: '⛰️', color: '#8B5CF6' },
    { id: 'typhoon',    label: 'Typhoon',       icon: '🌀', color: '#06B6D4' },
    { id: 'drought',    label: 'Drought',       icon: '☀️', color: '#D97706' },
  ];
  
  export const PERIOD_PRESETS = [
    { label: 'Q1 2026', start: '2026-01-01', end: '2026-03-31' },
    { label: 'Q4 2025', start: '2025-10-01', end: '2025-12-31' },
    { label: 'Q3 2025', start: '2025-07-01', end: '2025-09-30' },
    { label: 'Q2 2025', start: '2025-04-01', end: '2025-06-30' },
    { label: 'FY 2025', start: '2025-01-01', end: '2025-12-31' },
    { label: 'Last 30 Days', start: '2026-02-09', end: '2026-03-11' },
  ];
  
  export const ARCHIVED_REPORTS: ArchivedReport[] = [
    {
      id: 1,
      title: 'Q4 2025 Hazard Incident Summary',
      date: 'Jan 15, 2026',
      type: 'Quarterly',
      pages: 14,
      size: '2.3 MB',
      author: 'Admin Reyes',
      hazards: ['flood', 'typhoon'],
    },
    {
      id: 2,
      title: 'Flood Response — Typhoon Season 2025',
      date: 'Dec 3, 2025',
      type: 'Event-based',
      pages: 8,
      size: '1.1 MB',
      author: 'Admin Santos',
      hazards: ['flood', 'typhoon'],
    },
    {
      id: 3,
      title: 'Q3 2025 Multi-Hazard Report',
      date: 'Oct 10, 2025',
      type: 'Quarterly',
      pages: 17,
      size: '3.0 MB',
      author: 'Admin Reyes',
      hazards: ['flood', 'fire', 'earthquake'],
    },
    {
      id: 4,
      title: 'Annual Disaster Risk Summary 2024',
      date: 'Feb 1, 2025',
      type: 'Annual',
      pages: 42,
      size: '8.7 MB',
      author: "Mayor's Office",
      hazards: ['flood', 'fire', 'earthquake', 'landslide', 'typhoon', 'drought'],
    },
  ];
  
  @Component({
    selector: 'app-reports-generation',
    standalone: true,
    imports: [CommonModule, FormsModule, NgIcon, DatePipe],
    providers: [
      provideIcons({
        lucideFileText,
        lucideDownload,
        lucideCalendar,
        lucideFilter,
        lucideArchive,
        lucideRefreshCw,
        lucidePrinter,
        lucideChevronDown,
        lucideChevronUp,
        lucideCheckSquare,
        lucideSquare,
        lucideCheck,
        lucideX,
        lucideMapPin,
        lucideAlertTriangle,
        lucideBarChart2,
        lucideFileDown,
        lucideSearch,
        lucideEye,
        lucideUser,
        lucideBuildingIcon,
      }),
    ],
    templateUrl: './reports-generation.html',
    styleUrl: './reports-generation.css',
  })
  export class ReportsGeneration {
    // ── Expose constants to template ─────────────────────────────────────────
    readonly barangays = BARANGAYS;
    readonly hazardCategories = HAZARD_CATEGORIES;
    readonly periodPresets = PERIOD_PRESETS;
    readonly archivedReports = ARCHIVED_REPORTS;
  
    // ── View refs ────────────────────────────────────────────────────────────
    previewEl = viewChild<ElementRef<HTMLElement>>('reportPreview');
  
    // ── Tab state ────────────────────────────────────────────────────────────
    activeTab = signal<'configure' | 'archive'>('configure');
  
    // ── Form signals ─────────────────────────────────────────────────────────
    reportTitle   = signal('Q1 2026 Hazard Incident Report');
    preparedBy    = signal('Admin Reyes');
    startDate     = signal('2026-01-01');
    endDate       = signal('2026-03-31');
    activePreset  = signal('Q1 2026');
    includeCharts = signal(true);
    includeMap    = signal(false);
    includeSummary= signal(true);
  
    selectedHazards   = signal<Set<string>>(new Set(['flood', 'fire', 'typhoon']));
    allBarangays      = signal(true);
    selectedBarangays = signal<Set<string>>(new Set());
    barangaySearch    = signal('');
    barangayDropdown  = signal(false);
  
    // ── UI state ─────────────────────────────────────────────────────────────
    isGenerating = signal(false);
    showPreview  = signal(false);
    archiveSearch= signal('');
  
    // ── Computed ─────────────────────────────────────────────────────────────
    selectedHazardCount = computed(() => this.selectedHazards().size);
  
    selectedBarangayCount = computed(() =>
      this.allBarangays() ? BARANGAYS.length : this.selectedBarangays().size,
    );
  
    filteredBarangays = computed(() => {
      const q = this.barangaySearch().toLowerCase();
      return q ? BARANGAYS.filter(b => b.toLowerCase().includes(q)) : BARANGAYS;
    });
  
    filteredArchive = computed(() => {
      const q = this.archiveSearch().toLowerCase();
      return q
        ? ARCHIVED_REPORTS.filter(
            r =>
              r.title.toLowerCase().includes(q) ||
              r.author.toLowerCase().includes(q) ||
              r.type.toLowerCase().includes(q),
          )
        : ARCHIVED_REPORTS;
    });
  
    selectedHazardList = computed(() =>
      HAZARD_CATEGORIES.filter(h => this.selectedHazards().has(h.id)),
    );
  
    barangayLabel = computed(() =>
      this.allBarangays()
        ? 'All 27 Barangays'
        : `${this.selectedBarangays().size} barangay${this.selectedBarangays().size !== 1 ? 's' : ''} selected`,
    );
  
    isFormValid = computed(
      () =>
        this.reportTitle().trim().length > 0 &&
        this.startDate().length > 0 &&
        this.endDate().length > 0 &&
        this.selectedHazardCount() > 0 &&
        (this.allBarangays() || this.selectedBarangays().size > 0),
    );
  
    today = new Date().toLocaleDateString('en-PH', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  
    // ── Preset ───────────────────────────────────────────────────────────────
    applyPreset(preset: (typeof PERIOD_PRESETS)[number]): void {
      this.activePreset.set(preset.label);
      this.startDate.set(preset.start);
      this.endDate.set(preset.end);
      this.reportTitle.set(`${preset.label} Hazard Incident Report`);
    }
  
    // ── Hazard toggle ────────────────────────────────────────────────────────
    toggleHazard(id: string): void {
      const s = new Set(this.selectedHazards());
      s.has(id) ? s.delete(id) : s.add(id);
      this.selectedHazards.set(s);
    }
  
    isHazardSelected(id: string): boolean {
      return this.selectedHazards().has(id);
    }
  
    // ── Barangay toggle ──────────────────────────────────────────────────────
    toggleBarangay(b: string): void {
      const s = new Set(this.selectedBarangays());
      s.has(b) ? s.delete(b) : s.add(b);
      this.selectedBarangays.set(s);
      this.allBarangays.set(false);
    }
  
    isBarangaySelected(b: string): boolean {
      return this.allBarangays() || this.selectedBarangays().has(b);
    }
  
    selectAllBarangays(): void {
      this.allBarangays.set(true);
      this.selectedBarangays.set(new Set());
    }
  
    clearBarangays(): void {
      this.allBarangays.set(false);
      this.selectedBarangays.set(new Set());
    }
  
    // ── PDF Generation ───────────────────────────────────────────────────────
    async generatePDF(): Promise<void> {
      if (!this.isFormValid()) return;
  
      this.isGenerating.set(true);
      this.showPreview.set(true);
  
      // Allow preview to render, then trigger print-to-PDF
      await new Promise(r => setTimeout(r, 400));
  
      try {
        // Dynamically load html2pdf.js if available, otherwise use print
        // Install via: npm install html2pdf.js
        const html2pdf = await this.loadHtml2Pdf();
  
        if (html2pdf && this.previewEl()?.nativeElement) {
          const options = {
            margin:      [10, 10, 10, 10],
            filename:    `${this.reportTitle().replace(/\s+/g, '_')}.pdf`,
            image:       { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF:       { unit: 'mm', format: 'a4', orientation: 'portrait' },
            pagebreak:   { mode: ['avoid-all', 'css', 'legacy'] },
          };
          await html2pdf()
            .set(options)
            .from(this.previewEl()!.nativeElement)
            .save();
        } else {
          // Fallback: browser print dialog (also saves as PDF)
          window.print();
        }
      } catch {
        window.print();
      } finally {
        this.isGenerating.set(false);
      }
    }
  
    private async loadHtml2Pdf(): Promise<any> {
      try {
        // Works if html2pdf.js is installed via npm
        const mod = await import('html2pdf.js' as any);
        return mod.default ?? mod;
      } catch {
        return null;
      }
    }
  
    formatDateRange(): string {
      const s = new Date(this.startDate() + 'T00:00:00');
      const e = new Date(this.endDate() + 'T00:00:00');
      const fmt = (d: Date) =>
        d.toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
      return `${fmt(s)} – ${fmt(e)}`;
    }
  
    // Mock incident stats for preview
    get mockStats() {
      return [
        { label: 'Total Incidents', value: 147, delta: '+12%' },
        { label: 'Affected Families', value: '3,842', delta: '+8%' },
        { label: 'Barangays Affected', value: this.selectedBarangayCount(), delta: '' },
        { label: 'Response Rate', value: '94%', delta: '+2%' },
      ];
    }
  
    get mockIncidents() {
      return [
        { date: 'Jan 12, 2026', barangay: 'Balibago', type: 'Flood', severity: 'High', affected: 245 },
        { date: 'Jan 28, 2026', barangay: 'Sapang Bato', type: 'Fire Incident', severity: 'Critical', affected: 82 },
        { date: 'Feb 4, 2026', barangay: 'Pampang', type: 'Flood', severity: 'Medium', affected: 130 },
        { date: 'Feb 19, 2026', barangay: 'Cutcut', type: 'Typhoon', severity: 'High', affected: 512 },
        { date: 'Mar 3, 2026', barangay: 'Lourdes Sur', type: 'Flood', severity: 'Medium', affected: 98 },
      ];
    }
  }
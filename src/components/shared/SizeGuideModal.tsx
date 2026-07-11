"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

interface SizeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const womenData = [
  { size: "XS", chest: "32\"", waist: "26\"", length: "34\"" },
  { size: "S", chest: "34\"", waist: "28\"", length: "35\"" },
  { size: "M", chest: "36\"", waist: "30\"", length: "36\"" },
  { size: "L", chest: "38\"", waist: "32\"", length: "37\"" },
  { size: "XL", chest: "40\"", waist: "34\"", length: "38\"" },
  { size: "XXL", chest: "42\"", waist: "36\"", length: "39\"" },
];

const menData = [
  { size: "XS", chest: "36\"", waist: "28\"", length: "27\"" },
  { size: "S", chest: "38\"", waist: "30\"", length: "28\"" },
  { size: "M", chest: "40\"", waist: "32\"", length: "29\"" },
  { size: "L", chest: "42\"", waist: "34\"", length: "30\"" },
  { size: "XL", chest: "44\"", waist: "36\"", length: "31\"" },
  { size: "XXL", chest: "46\"", waist: "38\"", length: "32\"" },
];

function SizeTable({
  data,
}: {
  data: { size: string; chest: string; waist: string; length: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-sand">
            <th className="py-3 pr-4 text-left font-medium text-ink">Size</th>
            <th className="py-3 pr-4 text-left font-medium text-ink">Chest</th>
            <th className="py-3 pr-4 text-left font-medium text-ink">Waist</th>
            <th className="py-3 text-left font-medium text-ink">Length</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.size} className="border-b border-sand/50 last:border-b-0">
              <td className="py-3 pr-4 font-medium text-ink">{row.size}</td>
              <td className="py-3 pr-4 text-muted-foreground">{row.chest}</td>
              <td className="py-3 pr-4 text-muted-foreground">{row.waist}</td>
              <td className="py-3 text-muted-foreground">{row.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function SizeGuideModal({ open, onOpenChange }: SizeGuideModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg bg-offwhite border-sand max-h-[85vh] overflow-y-auto scrollbar-thin">
        <DialogHeader>
          <DialogTitle className="font-[family-name:var(--font-instrument-serif)] text-2xl text-ink">
            Size Guide
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            All measurements are in inches. When in between sizes, we recommend sizing up for a relaxed fit.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-2">
          <div>
            <h4 className="font-medium text-ink mb-3 text-sm uppercase tracking-wider">
              Women
            </h4>
            <SizeTable data={womenData} />
          </div>

          <div>
            <h4 className="font-medium text-ink mb-3 text-sm uppercase tracking-wider">
              Men
            </h4>
            <SizeTable data={menData} />
          </div>

          <p className="text-xs text-muted-foreground italic">
            * These are demo measurements. Actual measurements may vary slightly by style. 
            Each product page will have specific fit notes.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
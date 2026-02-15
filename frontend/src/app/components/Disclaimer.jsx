import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from './ui/dialog';
import { Button } from './ui/button';
import { AlertTriangle } from 'lucide-react';

export function Disclaimer({ onAccept }) {
  const { t } = useTranslation();
  const [open, setOpen] = useState(true);

  const handleAccept = () => {
    setOpen(false);
    onAccept();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <AlertTriangle className="w-6 h-6 text-yellow-600" />
            {t('disclaimer.title')}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <p className="text-gray-700 leading-relaxed">
            {t('disclaimer.content')}
          </p>
          
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-800 font-semibold">
              {t('disclaimer.emergency')}
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <h4 className="font-semibold mb-2">Important Notes:</h4>
            <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
              <li>This tool uses AI to provide preliminary medical triage</li>
              <li>Results are for informational purposes only</li>
              <li>Always consult with a healthcare professional</li>
              <li>In emergencies, call 108 immediately</li>
              <li>Do not delay seeking professional medical care</li>
            </ul>
          </div>
        </div>

        <DialogFooter>
          <Button onClick={handleAccept} className="w-full sm:w-auto">
            {t('disclaimer.agree')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

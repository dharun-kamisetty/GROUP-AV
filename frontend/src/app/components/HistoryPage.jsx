import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Button } from './ui/button';
import { TriageHistory } from './TriageHistory';
import { getTriageHistory, clearTriageHistory } from '../utils/storage';
import { Trash2, Home } from 'lucide-react';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';

export function HistoryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  useEffect(() => {
    loadHistory();
  }, []);

  const loadHistory = () => {
    const triageHistory = getTriageHistory();
    setHistory(triageHistory);
  };

  const handleView = (triage) => {
    navigate('/results', {
      state: { result: triage.result, symptoms: triage.symptoms }
    });
  };

  const handleClearHistory = () => {
    clearTriageHistory();
    setHistory([]);
    toast.success('History cleared');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Triage History</h1>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate('/')}
            >
              <Home className="w-4 h-4 mr-2" />
              Home
            </Button>
            
            {history.length > 0 && (
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button variant="destructive">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Clear History?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This will permanently delete all your triage history. This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleClearHistory}>
                      Clear History
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            )}
          </div>
        </div>

        <TriageHistory history={history} onView={handleView} />
      </div>
    </div>
  );
}

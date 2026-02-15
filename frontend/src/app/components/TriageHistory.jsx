import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Clock, Download, Eye } from 'lucide-react';
import { format } from 'date-fns';
import { downloadReferralNote } from '../utils/download';

export function TriageHistory({ history, onView }) {
  if (history.length === 0) {
    return (
      <Card>
        <CardContent className="p-12 text-center">
          <Clock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No triage history yet</p>
        </CardContent>
      </Card>
    );
  }

  const getUrgencyColor = (level) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-100 text-red-800';
      case 'High':
        return 'bg-orange-100 text-orange-800';
      case 'Moderate':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-4">
      {history.map((triage) => (
        <Card key={triage.id}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Badge className={getUrgencyColor(triage.result.urgencyLevel)}>
                    {triage.result.urgencyLevel}
                  </Badge>
                  <span className="text-sm text-gray-600">
                    {format(new Date(triage.timestamp), 'MMM dd, yyyy - hh:mm a')}
                  </span>
                </div>
                <p className="text-gray-700 line-clamp-2">
                  {triage.symptoms}
                </p>
              </div>
            </div>
            
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => onView(triage)}
              >
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => downloadReferralNote(triage.result, triage.symptoms)}
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

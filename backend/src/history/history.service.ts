import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class HistoryService {
   private filePath = path.resolve(process.cwd(), 'search-history.json');

  logSearch(payload: { user_id: string, name: string, ein?: number; organization_name?: string }) {
    const history = this.getHistory();
    history.push({ ...payload, timestamp: new Date() });
    fs.writeFileSync(this.filePath, JSON.stringify(history, null, 2));
  }

  getHistory(): any[] {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch {
      return [];
    }
  }
}

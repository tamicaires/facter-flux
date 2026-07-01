import { EntriesRepository, type DashboardStats } from '@/core/domain/repositories/entries.repository';

export class GetDashboardStats {
  constructor(private entriesRepository: EntriesRepository) {}

  async execute(userId: string): Promise<DashboardStats> {
    return this.entriesRepository.getDashboardStats(userId);
  }
}

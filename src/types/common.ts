type Status = 'ready' | 'running' | 'completed';

type Bar = {
  id: number,
  status: Status
};


export type { Bar, Status }
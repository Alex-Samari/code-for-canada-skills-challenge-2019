export interface DatasetRecord {
  violation_id: string;
  inspection_id: string;
  violation_category: string;
  violation_date: string;
  violation_date_closed: string;
  violation_type: string;
}

export class DatasetRecord implements DatasetRecord {
  constructor(
    violation_id = null,
    inspection_id = null,
    violation_category = null,
    violation_date = null,
    violation_date_closed = null,
    violation_type = null
  ) {}
}

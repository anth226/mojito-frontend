export interface MonthData {
  value: Number;
  percent: Number;
}

export interface CompaniesInTypeColumn {
  name: string;
  color: string;
}

export interface CompaniesMonthlyData {
  value: number;
  color: string;
}

export interface CompaniesData {
  key: React.ReactNode;
  type: CompaniesInTypeColumn[];
  jan: CompaniesMonthlyData[];
  feb: CompaniesMonthlyData[];
  mar: CompaniesMonthlyData[];
  apr: CompaniesMonthlyData[];
  may: CompaniesMonthlyData[];
  jun: CompaniesMonthlyData[];
  jul: CompaniesMonthlyData[];
  aug: CompaniesMonthlyData[];
  sep: CompaniesMonthlyData[];
  oct: CompaniesMonthlyData[];
  nov: CompaniesMonthlyData[];
  dec: CompaniesMonthlyData[];
}

export interface DataType {
  key: React.ReactNode;
  type: string;
  jan: MonthData;
  feb: MonthData;
  mar: MonthData;
  apr: MonthData;
  may: MonthData;
  jun: MonthData;
  jul: MonthData;
  aug: MonthData;
  sep: MonthData;
  oct: MonthData;
  nov: MonthData;
  dec: MonthData;
  children?: CompaniesData[];
}

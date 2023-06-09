import { ColumnsType } from "antd/es/table";
import { USDcurrency } from "../../../../utils/formatters";
import { VerticalColumn } from "./enums";
import {
  CompaniesInTypeColumn,
  CompaniesMonthlyData,
  DataType,
  MonthData,
} from "./interfaces";

const reportTypeFormatter = (value: number, type: VerticalColumn) => {
  switch (type) {
    case VerticalColumn.REVENUE:
      return USDcurrency.format(value);
    case VerticalColumn.AD_SPEND:
      return USDcurrency.format(value);
    case VerticalColumn.CPM:
      return USDcurrency.format(value);
    case VerticalColumn.CTR:
      return String(value.toFixed(2)) + '%';
    case VerticalColumn.TRAFFIC:
      return value.toLocaleString();

    default:
      break;
  }
};

function MonthDataRenderer(
  cellData: MonthData | any,
  record: DataType | any,
  index: Number | any
) {
  if (cellData instanceof Array) {
    return (
      <div style={{ display: "grid", justifyItems: "end" }}>
        {cellData.map((companyData: CompaniesMonthlyData) => {
          return (
            <span style={{ color: companyData.color, fontWeight: "600" }}>
              {USDcurrency.format(companyData.value)}
            </span>
          );
        })}
      </div>
    );
  }
  return (
    <div style={{ display: "grid", justifyItems: "end" }}>
      <span style={{ fontWeight: "600" }}>
        {/* {USDcurrency.format(cellData.value)} */}
        {reportTypeFormatter(cellData.value, record.type)}
      </span>
      <span style={{ fontWeight: "400", color: "#24CA49" }}>
        {cellData.percent.toFixed(2)}%
      </span>
    </div>
  );
}

function VerticalColumnCellRenderer(cellData: any) {
  if (cellData instanceof Array) {
    return (
      <div style={{ display: "grid", fontWeight: "600" }}>
        {cellData.map((company: CompaniesInTypeColumn) => {
          return <span style={{ color: company.color }}>{company.name}</span>;
        })}
      </div>
    );
  }
  return <span style={{ fontWeight: "600" }}>{cellData}</span>;
}

export const columns: ColumnsType<DataType> = [
  {
    title: "",
    dataIndex: "type",
    key: "type",
    render: VerticalColumnCellRenderer,
    fixed: true,
    width: '150px',
  },
  {
    title: "Jan",
    dataIndex: "jan",
    key: "jan",
    align: "center",
    render: MonthDataRenderer,
  },
  {
    title: "Feb",
    dataIndex: "feb",
    key: "feb",
    align: "center",
    render: MonthDataRenderer,
  },
  {
    title: "Mar",
    dataIndex: "mar",
    key: "mar",
    align: "center",
    render: MonthDataRenderer,
  },
  {
    title: "Apr",
    dataIndex: "apr",
    key: "apr",
    align: "center",
    render: MonthDataRenderer,
  },
  {
    title: "May",
    dataIndex: "may",
    key: "may",
    align: "center",
    render: MonthDataRenderer,
  },
  {
    title: "Jun",
    dataIndex: "jun",
    key: "jun",
    align: "center",
    render: MonthDataRenderer,
  },
  {
    title: "Jul",
    dataIndex: "jul",
    key: "jul",
    align: "center",
    render: MonthDataRenderer,
  },
  {
    title: "Aug",
    dataIndex: "aug",
    key: "aug",
    align: "center",
    render: MonthDataRenderer,
  },
  {
    title: "Sep",
    dataIndex: "sep",
    key: "sep",
    align: "center",
    render: MonthDataRenderer,
  },
  {
    title: "Oct",
    dataIndex: "oct",
    key: "oct",
    align: "center",
    render: MonthDataRenderer,
  },
  {
    title: "Nov",
    dataIndex: "nov",
    key: "nov",
    align: "center",
    render: MonthDataRenderer,
  },
  {
    title: "Dec",
    dataIndex: "dec",
    key: "dec",
    align: "center",
    render: MonthDataRenderer,
  },
];

export const data: DataType[] = [
  {
    key: 1,
    type: VerticalColumn.REVENUE,
    jan: { value: 9843, percent: 14.83 },
    feb: { value: 9843, percent: 14.83 },
    mar: { value: 9843, percent: 14.83 },
    apr: { value: 9843, percent: 14.83 },
    may: { value: 9843, percent: 14.83 },
    jun: { value: 9843, percent: 14.83 },
    jul: { value: 9843, percent: 14.83 },
    aug: { value: 9843, percent: 14.83 },
    sep: { value: 9843, percent: 14.83 },
    oct: { value: 9843, percent: 14.83 },
    nov: { value: 9843, percent: 14.83 },
    dec: { value: 9843, percent: 14.83 },
  },
  {
    key: 2,
    type: VerticalColumn.AD_SPEND,
    jan: { value: 149.87, percent: 14.83 },
    feb: { value: 149.87, percent: 14.83 },
    mar: { value: 149.87, percent: 14.83 },
    apr: { value: 149.87, percent: 14.83 },
    may: { value: 149.87, percent: 14.83 },
    jun: { value: 149.87, percent: 14.83 },
    jul: { value: 149.87, percent: 14.83 },
    aug: { value: 149.87, percent: 14.83 },
    sep: { value: 149.87, percent: 14.83 },
    oct: { value: 149.87, percent: 14.83 },
    nov: { value: 149.87, percent: 14.83 },
    dec: { value: 149.87, percent: 14.83 },
    children: [
      {
        key: 3,
        type: [
          {
            name: "Meta",
            color: "#0062FF",
          },
          {
            name: "Google",
            color: "#24CA49",
          },
        ],

        jan: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        feb: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        mar: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        apr: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        may: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        jun: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        jul: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        aug: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        sep: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        oct: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        nov: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        dec: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
      },
    ],
  },
  {
    key: 4,
    type: VerticalColumn.CPM,
    jan: { value: 15.86, percent: 14.83 },
    feb: { value: 15.86, percent: 14.83 },
    mar: { value: 15.86, percent: 14.83 },
    apr: { value: 15.86, percent: 14.83 },
    may: { value: 15.86, percent: 14.83 },
    jun: { value: 15.86, percent: 14.83 },
    jul: { value: 15.86, percent: 14.83 },
    aug: { value: 15.86, percent: 14.83 },
    sep: { value: 15.86, percent: 14.83 },
    oct: { value: 15.86, percent: 14.83 },
    nov: { value: 15.86, percent: 14.83 },
    dec: { value: 15.86, percent: 14.83 },
    children: [
      {
        key: 5,
        type: [
          {
            name: "Meta",
            color: "#0062FF",
          },
          {
            name: "Google",
            color: "#24CA49",
          },
        ],

        jan: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        feb: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        mar: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        apr: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        may: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        jun: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        jul: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        aug: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        sep: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        oct: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        nov: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        dec: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
      },
    ],
  },
  {
    key: 6,
    type: VerticalColumn.CTR,
    jan: { value: 5.83, percent: 14.83 },
    feb: { value: 5.83, percent: 14.83 },
    mar: { value: 5.83, percent: 14.83 },
    apr: { value: 5.83, percent: 14.83 },
    may: { value: 5.83, percent: 14.83 },
    jun: { value: 5.83, percent: 14.83 },
    jul: { value: 5.83, percent: 14.83 },
    aug: { value: 5.83, percent: 14.83 },
    sep: { value: 5.83, percent: 14.83 },
    oct: { value: 5.83, percent: 14.83 },
    nov: { value: 5.83, percent: 14.83 },
    dec: { value: 5.83, percent: 14.83 },
    children: [
      {
        key: 7,
        type: [
          {
            name: "Meta",
            color: "#0062FF",
          },
          {
            name: "Google",
            color: "#24CA49",
          },
        ],

        jan: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        feb: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        mar: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        apr: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        may: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        jun: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        jul: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        aug: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        sep: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        oct: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        nov: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
        dec: [
          {
            value: 18.78,
            color: "#0062FF",
          },
          {
            value: 13.92,
            color: "#24CA49",
          },
        ],
      },
    ],
  },
  {
    key: 8,
    type: VerticalColumn.TRAFFIC,
    jan: { value: 12765, percent: 14.83 },
    feb: { value: 12765, percent: 14.83 },
    mar: { value: 12765, percent: 14.83 },
    apr: { value: 12765, percent: 14.83 },
    may: { value: 12765, percent: 14.83 },
    jun: { value: 12765, percent: 14.83 },
    jul: { value: 12765, percent: 14.83 },
    aug: { value: 12765, percent: 14.83 },
    sep: { value: 12765, percent: 14.83 },
    oct: { value: 12765, percent: 14.83 },
    nov: { value: 12765, percent: 14.83 },
    dec: { value: 12765, percent: 14.83 },
  },
];

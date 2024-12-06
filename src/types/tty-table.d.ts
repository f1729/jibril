declare module 'tty-table' {
  interface HeaderConfig {
    value: string;
    width?: number;
    color?: string;
    align?: string;
  }

  interface TableConfig {
    borderStyle?: number;
    paddingBottom?: number;
    headerAlign?: string;
    align?: string;
    color?: string;
  }

  function Table(header: HeaderConfig[], rows: any[][], config?: TableConfig): {
    render(): string;
  };

  export = Table;
}

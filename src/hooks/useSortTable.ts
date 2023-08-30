import * as React from "react";

import type { TablePaginationConfig } from "antd";
import type { FilterValue, SorterResult } from "antd/es/table/interface";

export const useSortTable = () => {
  const [orderBy, setOrderBy] = React.useState<"ASC" | "DESC" | "">("");

  const onChangeTable = (
    _pagination: TablePaginationConfig,
    _filters: Record<string, FilterValue | null>,
    sorter: SorterResult<any> | SorterResult<any>[],
  ) => {
    if (!Array.isArray(sorter)) {
      if (!sorter.order) return setOrderBy("");
      if (sorter.order === "ascend") return setOrderBy("ASC");
      return setOrderBy("DESC");
    }
  };

  return {
    orderBy,
    onChangeTable,
  };
};
